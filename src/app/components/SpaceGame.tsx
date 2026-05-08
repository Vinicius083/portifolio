'use client';

import React, { useEffect, useRef, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────
interface Bullet       { x: number; y: number; speed: number; w: number; h: number }
interface EnemyBullet  { x: number; y: number; speed: number; w: number; h: number }
interface Enemy        { x: number; y: number; w: number; h: number; label: string; alive: boolean; color: string; points: number }
interface Particle     { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number }

// ─── Constants ────────────────────────────────────────────────────────────
const PLAYER_W = 28;
const PLAYER_H = 18;
const BULLET_SPEED = 7;
const PLAYER_SPEED = 5;
const FIRE_RATE = 260; // ms

const BUG_TYPES = [
    { label: 'NullPtr',   color: '#ff00ff', points: 100 },
    { label: 'Syntax',    color: '#ff4444', points: 150 },
    { label: 'CORS',      color: '#ffaa00', points: 200 },
    { label: '404',       color: '#ff6666', points: 120 },
    { label: 'TypeError', color: '#ff33cc', points: 130 },
    { label: 'Timeout',   color: '#ff8800', points: 160 },
    { label: 'undefined', color: '#cc44ff', points: 110 },
    { label: 'MemLeak',   color: '#ff2255', points: 180 },
];

// ─── Touch state (module-level to avoid closure issues) ───────────────────
const touch = { x: null as number | null, active: false };

export default function SpaceGame() {
    const canvasRef    = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const rafRef       = useRef<number>(0);
    const lastFireRef  = useRef<number>(0);

    // Game state refs (avoid re-renders in rAF loop)
    const stateRef   = useRef<'idle' | 'playing' | 'gameover'>('idle');
    const scoreRef   = useRef(0);
    const waveRef    = useRef(1);
    const livesRef   = useRef(3);
    const invinceRef = useRef(0);

    const playerRef      = useRef({ x: 0, y: 0 });
    const bulletsRef     = useRef<Bullet[]>([]);
    const eBulletsRef    = useRef<EnemyBullet[]>([]);
    const enemiesRef     = useRef<Enemy[]>([]);
    const particlesRef   = useRef<Particle[]>([]);
    const keysRef        = useRef<Set<string>>(new Set());
    const enemyDirRef    = useRef(1);
    const enemySpeedRef  = useRef(0.5);

    // ─── Helpers ─────────────────────────────────────────────────────────
    const aabb = (
        a: { x: number; y: number; w: number; h: number },
        b: { x: number; y: number; w: number; h: number }
    ) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

    const boom = useCallback((x: number, y: number, color: string) => {
        for (let i = 0; i < 10; i++) {
            const angle = (Math.PI * 2 / 10) * i + Math.random() * 0.3;
            const spd   = 1.5 + Math.random() * 2.5;
            particlesRef.current.push({
                x, y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                life: 1,
                color,
                size: 2 + Math.random() * 3,
            });
        }
    }, []);

    // ─── Spawn wave (adaptive to canvas width) ────────────────────────────
    const spawnWave = useCallback((waveNum: number, cw: number) => {
        const isMobile = cw < 480;
        const cols     = isMobile ? Math.min(4 + waveNum, 6) : Math.min(6 + waveNum, 10);
        const rows     = Math.min(2 + Math.floor(waveNum / 2), 5);
        const eW       = isMobile ? 44 : 60;
        const eH       = 22;
        const pad      = isMobile ? 8 : 14;
        const totalW   = cols * (eW + pad);
        const startX   = Math.max(4, (cw - totalW) / 2 + pad / 2);

        const enemies: Enemy[] = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const bug = BUG_TYPES[(r * cols + c) % BUG_TYPES.length];
                const ex  = startX + c * (eW + pad);
                if (ex + eW > cw - 4) continue; // skip enemies that would overflow
                enemies.push({
                    x: ex,
                    y: 38 + r * (eH + pad + 4),
                    w: eW,
                    h: eH,
                    label: bug.label,
                    alive: true,
                    color: bug.color,
                    points: bug.points + waveNum * 10,
                });
            }
        }
        enemiesRef.current   = enemies;
        enemyDirRef.current  = 1;
        enemySpeedRef.current = 0.4 + waveNum * 0.12;
    }, []);

    // ─── Start ────────────────────────────────────────────────────────────
    const startGame = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        scoreRef.current  = 0;
        waveRef.current   = 1;
        livesRef.current  = 3;
        invinceRef.current = 0;
        playerRef.current = { x: canvas.width / 2 - PLAYER_W / 2, y: canvas.height - 38 };
        bulletsRef.current  = [];
        eBulletsRef.current = [];
        particlesRef.current = [];
        spawnWave(1, canvas.width);
        stateRef.current = 'playing';
    }, [spawnWave]);

    // ─── Main effect ─────────────────────────────────────────────────────
    useEffect(() => {
        const canvas    = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        // Resize
        const resize = () => {
            const r = container.getBoundingClientRect();
            canvas.width  = r.width;
            canvas.height = r.height;
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(container);

        const ctx = canvas.getContext('2d')!;

        // ─── Keyboard ──────────────────────────────────────────────────
        const onKeyDown = (e: KeyboardEvent) => {
            keysRef.current.add(e.key);
            if ([' ', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                e.preventDefault();
            }
        };
        const onKeyUp = (e: KeyboardEvent) => keysRef.current.delete(e.key);

        // ─── Touch ─────────────────────────────────────────────────────
        const onTouchStart = (e: TouchEvent) => {
            e.preventDefault();
            const rect  = canvas.getBoundingClientRect();
            const t     = e.changedTouches[0];
            touch.x     = (t.clientX - rect.left) * (canvas.width / rect.width);
            touch.active = true;

            // Tap to start game
            if (stateRef.current !== 'playing') {
                startGame();
            }
        };
        const onTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const t    = e.changedTouches[0];
            touch.x    = (t.clientX - rect.left) * (canvas.width / rect.width);
        };
        const onTouchEnd = (e: TouchEvent) => {
            e.preventDefault();
            // Only clear if no more touches remain
            if (e.touches.length === 0) {
                touch.x      = null;
                touch.active = false;
            }
        };

        // ─── Click to start (desktop) ──────────────────────────────────
        const onClick = () => {
            if (stateRef.current !== 'playing') startGame();
        };
        const onEnter = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && stateRef.current !== 'playing') startGame();
        };

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
        window.addEventListener('keydown', onEnter);
        canvas.addEventListener('click', onClick);
        canvas.addEventListener('touchstart', onTouchStart, { passive: false });
        canvas.addEventListener('touchmove',  onTouchMove,  { passive: false });
        canvas.addEventListener('touchend',   onTouchEnd,   { passive: false });

        // ─── Draw helpers ───────────────────────────────────────────────
        const drawPlayer = (x: number, y: number) => {
            if (invinceRef.current > 0 && Math.floor(Date.now() / 80) % 2 === 0) return;
            ctx.save();
            ctx.fillStyle = '#00f3ff';
            ctx.shadowColor = '#00f3ff';
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.moveTo(x + PLAYER_W / 2, y);
            ctx.lineTo(x, y + PLAYER_H);
            ctx.lineTo(x + PLAYER_W, y + PLAYER_H);
            ctx.closePath();
            ctx.fill();
            // Engine flame
            ctx.shadowBlur = 0;
            ctx.fillStyle = `rgba(0,243,255,${0.3 + Math.random() * 0.3})`;
            ctx.beginPath();
            ctx.moveTo(x + PLAYER_W / 2 - 4, y + PLAYER_H);
            ctx.lineTo(x + PLAYER_W / 2, y + PLAYER_H + 5 + Math.random() * 5);
            ctx.lineTo(x + PLAYER_W / 2 + 4, y + PLAYER_H);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        };

        const drawEnemy = (e: Enemy) => {
            if (!e.alive) return;
            ctx.save();
            ctx.fillStyle   = e.color + '28';
            ctx.strokeStyle = e.color;
            ctx.lineWidth   = 1;
            ctx.shadowColor = e.color;
            ctx.shadowBlur  = 5;
            const r = 3;
            ctx.beginPath();
            ctx.moveTo(e.x + r, e.y);
            ctx.lineTo(e.x + e.w - r, e.y);
            ctx.quadraticCurveTo(e.x + e.w, e.y, e.x + e.w, e.y + r);
            ctx.lineTo(e.x + e.w, e.y + e.h - r);
            ctx.quadraticCurveTo(e.x + e.w, e.y + e.h, e.x + e.w - r, e.y + e.h);
            ctx.lineTo(e.x + r, e.y + e.h);
            ctx.quadraticCurveTo(e.x, e.y + e.h, e.x, e.y + e.h - r);
            ctx.lineTo(e.x, e.y + r);
            ctx.quadraticCurveTo(e.x, e.y, e.x + r, e.y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.shadowBlur    = 0;
            ctx.fillStyle     = e.color;
            const fontSize    = canvas.width < 400 ? 7 : 8;
            ctx.font          = `bold ${fontSize}px monospace`;
            ctx.textAlign     = 'center';
            ctx.textBaseline  = 'middle';
            ctx.fillText(e.label, e.x + e.w / 2, e.y + e.h / 2);
            ctx.restore();
        };

        const drawBullet = (b: Bullet) => {
            ctx.save();
            ctx.fillStyle = '#00f3ff';
            ctx.shadowColor = '#00f3ff';
            ctx.shadowBlur = 8;
            ctx.fillRect(b.x, b.y, b.w, b.h);
            ctx.restore();
        };

        const drawEBullet = (b: EnemyBullet) => {
            ctx.save();
            ctx.fillStyle = '#ff00ff';
            ctx.shadowColor = '#ff00ff';
            ctx.shadowBlur = 6;
            ctx.fillRect(b.x, b.y, b.w, b.h);
            ctx.restore();
        };

        const drawParticle = (p: Particle) => {
            ctx.save();
            ctx.globalAlpha = p.life;
            ctx.fillStyle   = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur  = 4;
            ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
            ctx.restore();
        };

        // ─── Game loop ───────────────────────────────────────────────────
        const loop = () => {
            rafRef.current = requestAnimationFrame(loop);
            const w = canvas.width;
            const h = canvas.height;
            const isMobile = w < 480;

            ctx.clearRect(0, 0, w, h);

            // Scanlines
            ctx.save();
            ctx.fillStyle = 'rgba(0,0,0,0.025)';
            for (let i = 0; i < h; i += 3) ctx.fillRect(0, i, w, 1);
            ctx.restore();

            // ─── Non-playing screens ──────────────────────────────────
            if (stateRef.current !== 'playing') {
                ctx.save();
                ctx.textAlign = 'center';
                const fScale  = isMobile ? 0.8 : 1;

                if (stateRef.current === 'gameover') {
                    ctx.fillStyle = '#ff0044aa';
                    ctx.font      = `bold ${Math.round(22 * fScale)}px monospace`;
                    ctx.fillText('GAME OVER', w / 2, h / 2 - 36);
                    ctx.fillStyle = '#ff00ff';
                    ctx.font      = `bold ${Math.round(14 * fScale)}px monospace`;
                    ctx.fillText(`Score: ${scoreRef.current}`, w / 2, h / 2 - 6);
                    ctx.fillStyle = '#00f3ff88';
                    ctx.font      = `${Math.round(11 * fScale)}px monospace`;
                    ctx.fillText(isMobile ? 'Toque para jogar novamente' : 'Clique ou ENTER para jogar novamente', w / 2, h / 2 + 28);
                } else {
                    ctx.fillStyle = '#00f3ffaa';
                    ctx.font      = `bold ${Math.round(15 * fScale)}px monospace`;
                    ctx.fillText('SIMULADOR DE DEFESA', w / 2, h / 2 - 38);
                    ctx.fillStyle = '#ff00ff88';
                    ctx.font      = `${Math.round(11 * fScale)}px monospace`;
                    ctx.fillText('Destrua os bugs do código', w / 2, h / 2 - 10);
                    ctx.fillStyle = '#00f3ff66';
                    ctx.font      = `${Math.round(10 * fScale)}px monospace`;
                    if (isMobile) {
                        ctx.fillText('Arraste para mover · atirador automático', w / 2, h / 2 + 18);
                        ctx.fillText('Toque para iniciar', w / 2, h / 2 + 38);
                    } else {
                        ctx.fillText('← → mover   ESPAÇO atirar', w / 2, h / 2 + 18);
                        ctx.fillText('Clique ou ENTER para iniciar', w / 2, h / 2 + 38);
                    }
                }

                // Particles linger through screens
                particlesRef.current.forEach(p => {
                    p.x += p.vx; p.y += p.vy; p.life -= 0.025;
                    drawParticle(p);
                });
                particlesRef.current = particlesRef.current.filter(p => p.life > 0);
                ctx.restore();
                return;
            }

            // ─── Update player position ───────────────────────────────
            const player = playerRef.current;

            if (keysRef.current.has('ArrowLeft') || keysRef.current.has('a')) player.x -= PLAYER_SPEED;
            if (keysRef.current.has('ArrowRight') || keysRef.current.has('d')) player.x += PLAYER_SPEED;

            // Touch movement: follow finger
            if (touch.x !== null) {
                const target = touch.x - PLAYER_W / 2;
                const diff   = target - player.x;
                player.x    += diff * 0.18;
            }

            player.x = Math.max(0, Math.min(w - PLAYER_W, player.x));

            // ─── Shooting ─────────────────────────────────────────────
            const now = Date.now();
            // On mobile: auto-fire while touching. On desktop: space/up key.
            const shouldFire = touch.active || keysRef.current.has(' ') || keysRef.current.has('ArrowUp');
            if (shouldFire && now - lastFireRef.current > FIRE_RATE) {
                lastFireRef.current = now;
                bulletsRef.current.push({
                    x: player.x + PLAYER_W / 2 - 2,
                    y: player.y - 4,
                    speed: BULLET_SPEED,
                    w: 4, h: 10,
                });
            }

            // ─── Update bullets ───────────────────────────────────────
            bulletsRef.current = bulletsRef.current.filter(b => { b.y -= b.speed; return b.y > -12; });
            eBulletsRef.current = eBulletsRef.current.filter(b => { b.y += b.speed; return b.y < h + 12; });

            // ─── Update enemies ───────────────────────────────────────
            const alive  = enemiesRef.current.filter(e => e.alive);
            let hitEdge  = false;
            alive.forEach(e => {
                e.x += enemySpeedRef.current * enemyDirRef.current;
                if (e.x + e.w > w - 4 || e.x < 4) hitEdge = true;
            });
            if (hitEdge) {
                enemyDirRef.current *= -1;
                alive.forEach(e => { e.y += 10; });
            }

            // Enemy shoots
            if (alive.length > 0 && Math.random() < 0.008 + waveRef.current * 0.003) {
                const src = alive[Math.floor(Math.random() * alive.length)];
                eBulletsRef.current.push({
                    x: src.x + src.w / 2 - 2,
                    y: src.y + src.h,
                    speed: 2.5 + waveRef.current * 0.18,
                    w: 4, h: 8,
                });
            }

            // ─── Bullet ↔ Enemy collisions ────────────────────────────
            bulletsRef.current = bulletsRef.current.filter(b => {
                for (const e of enemiesRef.current) {
                    if (!e.alive) continue;
                    if (aabb(b, e)) {
                        e.alive = false;
                        boom(e.x + e.w / 2, e.y + e.h / 2, e.color);
                        scoreRef.current += e.points;
                        return false;
                    }
                }
                return true;
            });

            // ─── Enemy bullet ↔ Player collisions ────────────────────
            if (invinceRef.current > 0) invinceRef.current--;

            eBulletsRef.current = eBulletsRef.current.filter(eb => {
                const ph = { x: player.x, y: player.y, w: PLAYER_W, h: PLAYER_H };
                if (invinceRef.current <= 0 && aabb(eb, ph)) {
                    livesRef.current--;
                    boom(player.x + PLAYER_W / 2, player.y, '#00f3ff');
                    invinceRef.current = 100;
                    if (livesRef.current <= 0) stateRef.current = 'gameover';
                    return false;
                }
                return true;
            });

            // ─── Enemies reach player ─────────────────────────────────
            for (const e of alive) {
                if (e.y + e.h >= player.y) {
                    livesRef.current = 0;
                    stateRef.current = 'gameover';
                    break;
                }
            }

            // ─── Next wave ────────────────────────────────────────────
            if (alive.length === 0 && stateRef.current === 'playing') {
                waveRef.current++;
                bulletsRef.current  = [];
                eBulletsRef.current = [];
                spawnWave(waveRef.current, w);
            }

            // ─── Update particles ─────────────────────────────────────
            particlesRef.current.forEach(p => { p.x += p.vx; p.y += p.vy; p.life -= 0.03; });
            particlesRef.current = particlesRef.current.filter(p => p.life > 0);

            // ─── Draw ─────────────────────────────────────────────────
            enemiesRef.current.forEach(drawEnemy);
            bulletsRef.current.forEach(drawBullet);
            eBulletsRef.current.forEach(drawEBullet);
            particlesRef.current.forEach(drawParticle);
            drawPlayer(player.x, player.y);

            // HUD
            ctx.save();
            ctx.fillStyle = '#00f3ffaa';
            const hudFont = isMobile ? '9px monospace' : 'bold 10px monospace';
            ctx.font = hudFont;
            ctx.textAlign = 'left';
            ctx.fillText(`SCORE: ${scoreRef.current}`, 6, 14);
            ctx.fillText(`WAVE: ${waveRef.current}`, 6, 26);
            // Lives
            for (let i = 0; i < livesRef.current; i++) {
                const lx = w - 14 - i * 18;
                const ly = 6;
                ctx.fillStyle = '#00f3ff';
                ctx.shadowColor = '#00f3ff';
                ctx.shadowBlur = 6;
                ctx.beginPath();
                ctx.moveTo(lx + 5, ly);
                ctx.lineTo(lx, ly + 10);
                ctx.lineTo(lx + 10, ly + 10);
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();
        };

        rafRef.current = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
            window.removeEventListener('keydown', onEnter);
            canvas.removeEventListener('click', onClick);
            canvas.removeEventListener('touchstart', onTouchStart);
            canvas.removeEventListener('touchmove',  onTouchMove);
            canvas.removeEventListener('touchend',   onTouchEnd);
            ro.disconnect();
            // Reset touch state on unmount
            touch.x = null;
            touch.active = false;
        };
    }, [startGame, boom, spawnWave]);

    return (
        <div ref={containerRef} className="w-full h-full relative select-none">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full touch-none outline-none"
                tabIndex={0}
                style={{ imageRendering: 'pixelated', cursor: 'crosshair' }}
            />
        </div>
    );
}
