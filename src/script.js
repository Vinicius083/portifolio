document.addEventListener('DOMContentLoaded', () => {
    const starfield = document.getElementById('starfield');
    const numStars = 100;
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        // Random size
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.backgroundColor = 'white';
        star.style.borderRadius = '50%';
        // Random opacity and animation
        star.style.opacity = Math.random();
        const duration = Math.random() * 3 + 2;
        star.style.animation = `pulseGlow ${duration}s infinite alternate`;
        starfield.appendChild(star);
    }
});
