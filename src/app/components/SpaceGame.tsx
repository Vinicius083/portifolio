'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────
interface Bullet {
    x: number;
    y: number;
    speed: number;
    width: number;
    height: number;
}

interface Enemy {
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
    alive: boolean;
    color: string;
    points: number;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    color: string;
    size: number;
}

interface EnemyBullet {
    x: number;
    y: number;
    speed: number;
    width: number;
    height: number;
}

// ─── Constants ────────────────────────────────────────────────────────────
const PLAYER_WIDTH = 30;
const PLAYER_HEIGHT = 20;
const BULLET_SPEED = 6;
const ENEMY_BULLET_SPEED = 3;
const PLAYER_SPEED = 5;
const FIRE_RATE = 250; // ms between shots

const BUG_TYPES = [
    { label: 'NullPointer', color: '#ff00ff', points: 100 },
    { label: 'SyntaxError', color: '#ff4444', points: 150 },
    { label: 'CORS', color: '#ffaa00', points: 200 },
    { label: '404', color: '#ff6666', points: 120 },
    { label: 'TypeError', color: '#ff33cc', points: 130 },
    { label: 'Timeout', color: '#ff8800', points: 160 },
    { label: 'undefined', color: '#cc44ff', points: 110 },
    { label: 'MemLeak', color: '#ff2255', points: 180 },
];

export default function SpaceGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>(0);
    const lastFireRef = useRef<number>(0);

    const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
    const [score, setScore] = useState(0);
    const [wave, setWave] = useState(1);
    const [lives, setLives] = useState(3);

    // Refs for game state that need to be accessed in the animation loop
    const gameStateRef = useRef(gameState);
    const scoreRef = useRef(score);
    const waveRef = useRef(wave);
    const livesRef = useRef(lives);

    // Keep refs in sync
    useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
    useEffect(() => { scoreRef.current = score; }, [score]);
    useEffect(() => { waveRef.current = wave; }, [wave]);
    useEffect(() => { livesRef.current = lives; }, [lives]);

    // Game objects stored in refs to avoid re-renders during the game loop
    const playerRef = useRef({ x: 0, y: 0 });
    const bulletsRef = useRef<Bullet[]>([]);
    const enemyBulletsRef = useRef<EnemyBullet[]>([]);
    const enemiesRef = useRef<Enemy[]>([]);
    const particlesRef = useRef<Particle[]>([]);
    const keysRef = useRef<Set<string>>(new Set());
    const enemyDirRef = useRef<number>(1); // 1 = right, -1 = left
    const enemySpeedRef = useRef<number>(0.5);
    const enemyDropRef = useRef<boolean>(false);
    const invincibleRef = useRef<number>(0);

    // ─── Spawn enemies for a wave ───────────────────────────────────────
    const spawnWave = useCallback((waveNum: number, canvasWidth: number) => {
        const enemies: Enemy[] = [];
        const cols = Math.min(6 + waveNum, 10);
        const rows = Math.min(2 + Math.floor(waveNum / 2), 5);
        const enemyW = 60;
        const enemyH = 24;
        const padding = 16;
        const totalW = cols * (enemyW + padding);
        const startX = (canvasWidth - totalW) / 2 + padding / 2;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const bugType = BUG_TYPES[(r * cols + c) % BUG_TYPES.length];
                enemies.push({
                    x: startX + c * (enemyW + padding),
                    y: 40 + r * (enemyH + padding + 8),
                    width: enemyW,
                    height: enemyH,
                    label: bugType.label,
                    alive: true,
                    color: bugType.color,
                    points: bugType.points + waveNum * 10,
                });
            }
        }
        enemiesRef.current = enemies;
        enemyDirRef.current = 1;
        enemySpeedRef.current = 0.5 + waveNum * 0.15;
        enemyDropRef.current = false;
    }, []);

    // ─── Create explosion particles ─────────────────────────────────────
    const createExplosion = useCallback((x: number, y: number, color: string) => {
        const count = 12;
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 / count) * i + Math.random() * 0.3;
            const speed = 1 + Math.random() * 3;
            particlesRef.current.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                maxLife: 1,
                color,
                size: 2 + Math.random() * 3,
            });
        }
    }, []);

    // ─── Start game ─────────────────────────────────────────────────────
    const startGame = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        setScore(0);
        setWave(1);
        setLives(3);
        scoreRef.current = 0;
        waveRef.current = 1;
        livesRef.current = 3;

        playerRef.current = { x: canvas.width / 2 - PLAYER_WIDTH / 2, y: canvas.height - 40 };
        bulletsRef.current = [];
        enemyBulletsRef.current = [];
        particlesRef.current = [];
        invincibleRef.current = 0;

        spawnWave(1, canvas.width);
        setGameState('playing');
    }, [spawnWave]);

    // ─── Main game loop ─────────────────────────────────────────────────
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        // Resize canvas to container
        const resizeCanvas = () => {
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };
        resizeCanvas();
        const ro = new ResizeObserver(resizeCanvas);
        ro.observe(container);

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // ─── Input Handling ───────────────────────────────────────────
        const handleKeyDown = (e: KeyboardEvent) => {
            keysRef.current.add(e.key);
            if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
                e.preventDefault();
            }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            keysRef.current.delete(e.key);
        };

        // Touch support
        let touchX: number | null = null;
        let touchShooting = false;

        const handleTouchStart = (e: TouchEvent) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            touchX = touch.clientX - rect.left;
            touchShooting = true;
        };
        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            touchX = touch.clientX - rect.left;
        };
        const handleTouchEnd = (e: TouchEvent) => {
            e.preventDefault();
            touchX = null;
            touchShooting = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

        // ─── Draw helpers ─────────────────────────────────────────────
        const drawPlayer = (x: number, y: number) => {
            const invincible = invincibleRef.current > 0;
            if (invincible && Math.floor(Date.now() / 100) % 2 === 0) return;

            ctx.save();
            // Ship body - triangle pointing up
            ctx.beginPath();
            ctx.moveTo(x + PLAYER_WIDTH / 2, y);
            ctx.lineTo(x, y + PLAYER_HEIGHT);
            ctx.lineTo(x + PLAYER_WIDTH, y + PLAYER_HEIGHT);
            ctx.closePath();
            ctx.fillStyle = '#00f3ff';
            ctx.fill();
            ctx.shadowColor = '#00f3ff';
            ctx.shadowBlur = 10;
            ctx.fill();

            // Engine glow
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#00f3ff44';
            ctx.beginPath();
            ctx.moveTo(x + PLAYER_WIDTH / 2 - 4, y + PLAYER_HEIGHT);
            ctx.lineTo(x + PLAYER_WIDTH / 2, y + PLAYER_HEIGHT + 6 + Math.random() * 4);
            ctx.lineTo(x + PLAYER_WIDTH / 2 + 4, y + PLAYER_HEIGHT);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        };

        const drawBullet = (b: Bullet) => {
            ctx.save();
            ctx.fillStyle = '#00f3ff';
            ctx.shadowColor = '#00f3ff';
            ctx.shadowBlur = 8;
            ctx.fillRect(b.x, b.y, b.width, b.height);
            ctx.restore();
        };

        const drawEnemyBullet = (b: EnemyBullet) => {
            ctx.save();
            ctx.fillStyle = '#ff00ff';
            ctx.shadowColor = '#ff00ff';
            ctx.shadowBlur = 6;
            ctx.fillRect(b.x, b.y, b.width, b.height);
            ctx.restore();
        };

        const drawEnemy = (e: Enemy) => {
            if (!e.alive) return;
            ctx.save();

            // Bug body - rectangle with glow
            ctx.fillStyle = e.color + '33';
            ctx.strokeStyle = e.color;
            ctx.lineWidth = 1;
            ctx.shadowColor = e.color;
            ctx.shadowBlur = 6;

            // Rounded rect
            const r = 4;
            ctx.beginPath();
            ctx.moveTo(e.x + r, e.y);
            ctx.lineTo(e.x + e.width - r, e.y);
            ctx.quadraticCurveTo(e.x + e.width, e.y, e.x + e.width, e.y + r);
            ctx.lineTo(e.x + e.width, e.y + e.height - r);
            ctx.quadraticCurveTo(e.x + e.width, e.y + e.height, e.x + e.width - r, e.y + e.height);
            ctx.lineTo(e.x + r, e.y + e.height);
            ctx.quadraticCurveTo(e.x, e.y + e.height, e.x, e.y + e.height - r);
            ctx.lineTo(e.x, e.y + r);
            ctx.quadraticCurveTo(e.x, e.y, e.x + r, e.y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Label
            ctx.shadowBlur = 0;
            ctx.fillStyle = e.color;
            ctx.font = 'bold 9px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(e.label, e.x + e.width / 2, e.y + e.height / 2);

            ctx.restore();
        };

        const drawParticle = (p: Particle) => {
            ctx.save();
            ctx.globalAlpha = p.life / p.maxLife;
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 4;
            ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
            ctx.restore();
        };

        // ─── AABB collision ───────────────────────────────────────────
        const collides = (a: { x: number; y: number; width: number; height: number },
                          b: { x: number; y: number; width: number; height: number }) => {
            return a.x < b.x + b.width &&
                   a.x + a.width > b.x &&
                   a.y < b.y + b.height &&
                   a.y + a.height > b.y;
        };

        // ─── Game loop ───────────────────────────────────────────────
        const loop = () => {
            animationRef.current = requestAnimationFrame(loop);
            const w = canvas.width;
            const h = canvas.height;

            // Clear
            ctx.clearRect(0, 0, w, h);

            // Draw scan lines overlay
            ctx.save();
            ctx.fillStyle = 'rgba(0,0,0,0.03)';
            for (let i = 0; i < h; i += 3) {
                ctx.fillRect(0, i, w, 1);
            }
            ctx.restore();

            if (gameStateRef.current !== 'playing') {
                // Idle or game over → draw idle screen
                ctx.save();
                ctx.fillStyle = '#00f3ff22';
                ctx.font = 'bold 14px monospace';
                ctx.textAlign = 'center';

                if (gameStateRef.current === 'gameover') {
                    ctx.fillStyle = '#ff004488';
                    ctx.font = 'bold 22px monospace';
                    ctx.fillText('GAME OVER', w / 2, h / 2 - 40);
                    ctx.fillStyle = '#ff00ff';
                    ctx.font = 'bold 14px monospace';
                    ctx.fillText(`Score: ${scoreRef.current}`, w / 2, h / 2);
                    ctx.fillStyle = '#00f3ff66';
                    ctx.font = '11px monospace';
                    ctx.fillText('Pressione ENTER ou clique para jogar', w / 2, h / 2 + 40);
                } else {
                    // Idle
                    ctx.fillStyle = '#00f3ff44';
                    ctx.font = 'bold 16px monospace';
                    ctx.fillText('SIMULADOR DE DEFESA', w / 2, h / 2 - 30);
                    ctx.fillStyle = '#ff00ff66';
                    ctx.font = '12px monospace';
                    ctx.fillText('Destrua os bugs do código', w / 2, h / 2 + 5);
                    ctx.fillStyle = '#00f3ff66';
                    ctx.font = '11px monospace';
                    ctx.fillText('← → para mover, ESPAÇO para atirar', w / 2, h / 2 + 35);
                    ctx.fillText('Pressione ENTER ou clique para iniciar', w / 2, h / 2 + 55);
                }

                // Draw particles even in idle/gameover
                particlesRef.current.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life -= 0.02;
                    drawParticle(p);
                });
                particlesRef.current = particlesRef.current.filter(p => p.life > 0);

                ctx.restore();
                return;
            }

            // ─── Update player ──────────────────────────────────────
            const player = playerRef.current;
            const keys = keysRef.current;

            if (keys.has('ArrowLeft') || keys.has('a')) {
                player.x -= PLAYER_SPEED;
            }
            if (keys.has('ArrowRight') || keys.has('d')) {
                player.x += PLAYER_SPEED;
            }

            // Touch movement
            if (touchX !== null) {
                const targetX = touchX - PLAYER_WIDTH / 2;
                const diff = targetX - player.x;
                player.x += diff * 0.15;
            }

            // Clamp
            player.x = Math.max(0, Math.min(w - PLAYER_WIDTH, player.x));

            // ─── Shooting ───────────────────────────────────────────
            const now = Date.now();
            if ((keys.has(' ') || keys.has('ArrowUp') || touchShooting) && now - lastFireRef.current > FIRE_RATE) {
                lastFireRef.current = now;
                bulletsRef.current.push({
                    x: player.x + PLAYER_WIDTH / 2 - 2,
                    y: player.y - 4,
                    speed: BULLET_SPEED,
                    width: 4,
                    height: 10,
                });
            }

            // ─── Update bullets ─────────────────────────────────────
            bulletsRef.current = bulletsRef.current.filter(b => {
                b.y -= b.speed;
                return b.y > -10;
            });

            // ─── Update enemy bullets ────────────────────────────────
            enemyBulletsRef.current = enemyBulletsRef.current.filter(b => {
                b.y += b.speed;
                return b.y < h + 10;
            });

            // ─── Update enemies ─────────────────────────────────────
            const enemies = enemiesRef.current;
            const aliveEnemies = enemies.filter(e => e.alive);

            // Move enemies
            let hitEdge = false;
            aliveEnemies.forEach(e => {
                e.x += enemySpeedRef.current * enemyDirRef.current;
                if (e.x + e.width > w - 5 || e.x < 5) {
                    hitEdge = true;
                }
            });

            if (hitEdge) {
                enemyDirRef.current *= -1;
                aliveEnemies.forEach(e => {
                    e.y += 12;
                });
            }

            // Random enemy shooting
            if (aliveEnemies.length > 0 && Math.random() < 0.01 + waveRef.current * 0.003) {
                const shooter = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
                enemyBulletsRef.current.push({
                    x: shooter.x + shooter.width / 2 - 2,
                    y: shooter.y + shooter.height,
                    speed: ENEMY_BULLET_SPEED + waveRef.current * 0.2,
                    width: 4,
                    height: 8,
                });
            }

            // ─── Collision: bullets vs enemies ──────────────────────
            bulletsRef.current = bulletsRef.current.filter(bullet => {
                for (const enemy of enemies) {
                    if (!enemy.alive) continue;
                    if (collides(bullet, enemy)) {
                        enemy.alive = false;
                        createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.color);
                        const newScore = scoreRef.current + enemy.points;
                        scoreRef.current = newScore;
                        setScore(newScore);
                        return false; // remove bullet
                    }
                }
                return true;
            });

            // ─── Collision: enemy bullets vs player ─────────────────
            if (invincibleRef.current > 0) {
                invincibleRef.current--;
            }

            enemyBulletsRef.current = enemyBulletsRef.current.filter(eb => {
                const playerHitbox = { x: player.x, y: player.y, width: PLAYER_WIDTH, height: PLAYER_HEIGHT };
                if (invincibleRef.current <= 0 && collides(eb, playerHitbox)) {
                    const newLives = livesRef.current - 1;
                    livesRef.current = newLives;
                    setLives(newLives);
                    createExplosion(player.x + PLAYER_WIDTH / 2, player.y + PLAYER_HEIGHT / 2, '#00f3ff');
                    invincibleRef.current = 120; // 2 seconds of invincibility

                    if (newLives <= 0) {
                        setGameState('gameover');
                    }
                    return false;
                }
                return true;
            });

            // ─── Check if enemies reached player ────────────────────
            for (const enemy of aliveEnemies) {
                if (enemy.y + enemy.height >= player.y) {
                    setLives(0);
                    livesRef.current = 0;
                    setGameState('gameover');
                    break;
                }
            }

            // ─── Next wave ──────────────────────────────────────────
            if (aliveEnemies.length === 0 && gameStateRef.current === 'playing') {
                const newWave = waveRef.current + 1;
                waveRef.current = newWave;
                setWave(newWave);
                bulletsRef.current = [];
                enemyBulletsRef.current = [];
                spawnWave(newWave, w);
            }

            // ─── Update particles ───────────────────────────────────
            particlesRef.current.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.025;
            });
            particlesRef.current = particlesRef.current.filter(p => p.life > 0);

            // ─── Draw everything ────────────────────────────────────
            // Draw enemies
            enemies.forEach(drawEnemy);

            // Draw bullets
            bulletsRef.current.forEach(drawBullet);

            // Draw enemy bullets
            enemyBulletsRef.current.forEach(drawEnemyBullet);

            // Draw particles
            particlesRef.current.forEach(drawParticle);

            // Draw player
            drawPlayer(player.x, player.y);

            // ─── HUD ────────────────────────────────────────────────
            ctx.save();
            ctx.fillStyle = '#00f3ff88';
            ctx.font = 'bold 10px monospace';
            ctx.textAlign = 'left';
            ctx.fillText(`SCORE: ${scoreRef.current}`, 8, 16);
            ctx.fillText(`WAVE: ${waveRef.current}`, 8, 30);
            ctx.textAlign = 'right';
            // Draw lives as tiny ships
            for (let i = 0; i < livesRef.current; i++) {
                const lx = w - 16 - i * 20;
                const ly = 8;
                ctx.fillStyle = '#00f3ff';
                ctx.beginPath();
                ctx.moveTo(lx + 6, ly);
                ctx.lineTo(lx, ly + 12);
                ctx.lineTo(lx + 12, ly + 12);
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();
        };

        animationRef.current = requestAnimationFrame(loop);

        // ─── Click / Enter to start ─────────────────────────────────
        const handleClick = () => {
            if (gameStateRef.current !== 'playing') {
                startGame();
            }
        };
        const handleEnter = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && gameStateRef.current !== 'playing') {
                startGame();
            }
        };

        canvas.addEventListener('click', handleClick);
        window.addEventListener('keydown', handleEnter);

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchmove', handleTouchMove);
            canvas.removeEventListener('touchend', handleTouchEnd);
            canvas.removeEventListener('click', handleClick);
            window.removeEventListener('keydown', handleEnter);
            ro.disconnect();
        };
    }, [startGame, createExplosion, spawnWave]);

    return (
        <div ref={containerRef} className="w-full h-full relative" style={{ minHeight: 200 }}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full outline-none"
                tabIndex={0}
                style={{ imageRendering: 'pixelated' }}
            />
        </div>
    );
}
