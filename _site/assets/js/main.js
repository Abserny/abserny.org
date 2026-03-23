// ── Mobile nav toggle (top nav panel) ────────────────────────
const menuToggle  = document.getElementById('menuToggle');
const mobileNav   = document.getElementById('mobileNav');

if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
        const open = mobileNav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', open);
    });

    mobileNav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => mobileNav.classList.remove('open'));
    });

    document.addEventListener('click', e => {
        if (!menuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
            mobileNav.classList.remove('open');
        }
    });
}

// ── Doc sidebar toggle (slide-in panel on doc pages) ─────────
const sidebar        = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

if (sidebar && sidebarOverlay) {
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            sidebarOverlay.classList.toggle('open');
        });
    }
    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('open');
        if (mobileNav) mobileNav.classList.remove('open');
    });
    sidebar.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('open');
        });
    });
}

// ── Scrollspy ─────────────────────────────────────────────────
const headings     = document.querySelectorAll('.prose h2[id], .prose h3[id]');
const sidebarLinks = document.querySelectorAll('.sidebar a[href^="#"]');

if (headings.length && sidebarLinks.length) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                sidebarLinks.forEach(l => l.classList.remove('scrollspy-active'));
                const active = document.querySelector(`.sidebar a[href="#${entry.target.id}"]`);
                if (active) active.classList.add('scrollspy-active');
            }
        });
    }, { rootMargin: '-64px 0px -70% 0px', threshold: 0 });

    headings.forEach(h => observer.observe(h));
}
