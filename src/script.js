/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('header, section');
    const navLinks = document.querySelectorAll('.nav-link');
    const logo = document.getElementById('logo-scroll');
    const openBtn = document.getElementById('open-sidebar');
    const closeBtn = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    // Sidebar logic
    const toggleSidebar = () => {
        if (!sidebar || !overlay) return;
        sidebar.classList.toggle('open');
        overlay.classList.toggle('visible');
        document.body.classList.toggle('overflow-hidden');
    };

    if (openBtn) openBtn.addEventListener('click', toggleSidebar);
    if (closeBtn) closeBtn.addEventListener('click', toggleSidebar);
    if (overlay) overlay.addEventListener('click', toggleSidebar);

    // Logo click -> top
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Scroll Active State Detection
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });

                // Reset highlighting if back at the very top (Hero)
                if (id === 'home') {
                     navLinks.forEach(link => link.classList.remove('active'));
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.id) observer.observe(section);
    });

    // Click handler for immediate feedback and closing sidebar
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Optional: e.preventDefault() and manual scroll if smooth-scroll target is finicky
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Auto close mobile sidebar
            if (sidebar && sidebar.classList.contains('open')) {
                toggleSidebar();
            }
        });
    });
});
