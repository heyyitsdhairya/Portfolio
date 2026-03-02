/* ═══════════════════════════════════════
   DHAIRYA SHAH — PORTFOLIO SCRIPT
   ════════════════════════════════════ */

'use strict';

/* ─── LOADER ──────────────────────────────── */
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
        initAll();
    }, 1900);
});

function initAll() {
    initNoise();
    initNavbar();
    initHamburger();
    initTyping();
    initTerminalLines();
    initRevealObserver();
    initSkillBars();
    initFormFeedback();
}

/* ─── NOISE CANVAS ────────────────────────── */
function initNoise() {
    const canvas = document.getElementById('noise-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function drawNoise() {
        const w = canvas.width, h = canvas.height;
        const imageData = ctx.createImageData(w, h);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const v = Math.random() * 255 | 0;
            data[i] = data[i + 1] = data[i + 2] = v;
            data[i + 3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);
    }

    let last = 0;
    function loop(ts) {
        if (ts - last > 120) { drawNoise(); last = ts; }
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
}

/* ─── NAVBAR SCROLL ───────────────────────── */
function initNavbar() {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    /* Active link highlight */
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
        });
        links.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === '#' + current);
        });
    }, { passive: true });
}

/* ─── HAMBURGER MENU ──────────────────────── */
function initHamburger() {
    const btn = document.getElementById('hamburger');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        btn.classList.toggle('open');
        menu.classList.toggle('open');
    });

    menu.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            btn.classList.remove('open');
            menu.classList.remove('open');
        });
    });
}

/* ─── TYPING ANIMATION ────────────────────── */
function initTyping() {
    const el = document.getElementById('typed-text');
    if (!el) return;

    const phrases = [
        'ICT Student @ PDEU',
        'Security Enthusiast',
        'Competitive Programmer',
        'Python & Java Developer',
        'Systems Builder',
        'Open to Opportunities',
    ];

    let phraseIdx = 0, charIdx = 0, deleting = false;

    function type() {
        const phrase = phrases[phraseIdx];
        if (!deleting) {
            el.textContent = phrase.slice(0, ++charIdx);
            if (charIdx === phrase.length) {
                deleting = true;
                setTimeout(type, 2000);
                return;
            }
            setTimeout(type, 70);
        } else {
            el.textContent = phrase.slice(0, --charIdx);
            if (charIdx === 0) {
                deleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                setTimeout(type, 400);
                return;
            }
            setTimeout(type, 35);
        }
    }
    type();
}

/* ─── TERMINAL LINES ──────────────────────── */
function initTerminalLines() {
    const lines = document.querySelectorAll('#terminal-body .t-line');
    lines.forEach((line, i) => {
        line.style.animationDelay = `${i * 180}ms`;
    });
}

/* ─── REVEAL ON SCROLL ────────────────────── */
function initRevealObserver() {
    const targets = [
        '.about-text', '.about-edu',
        '.skill-category', '.proficiency-section',
        '.project-card',
        '.ach-card', '.cp-card',
        '.contact-item', '.contact-form',
        '.edu-item', '.stat-card',
    ];

    targets.forEach(sel => {
        document.querySelectorAll(sel).forEach((el, i) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${i * 80}ms`;
        });
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ─── SKILL BARS ──────────────────────────── */
function initSkillBars() {
    const bars = document.querySelectorAll('.prof-bar-fill');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    bars.forEach(bar => observer.observe(bar));
}

/* ─── FORM VISUAL FEEDBACK ──────────────────
   The form submits natively to Formspree.
   This just adds a loading state while the
   browser waits for Formspree's redirect.
─────────────────────────────────────────── */
function initFormFeedback() {
    const form = document.getElementById('contact-form');
    const btn = document.getElementById('form-submit-btn');
    if (!form || !btn) return;

    form.addEventListener('submit', () => {
        btn.innerHTML = '<span>Sending…  ⏳</span>';
        btn.disabled = true;
        btn.style.opacity = '0.75';
        /* Form submits natively — no e.preventDefault() */
    });
}

/* ─── PARALLAX HERO GLOW ──────────────────── */
(function heroParallax() {
    const glow1 = document.querySelector('.glow-1');
    const glow2 = document.querySelector('.glow-2');
    if (!glow1 || !glow2) return;

    window.addEventListener('mousemove', e => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        glow1.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
        glow2.style.transform = `translate(${-x * 30}px, ${-y * 30}px)`;
    });
})();

/* ─── ACTIVE NAV STYLE ───────────────────── */
const style = document.createElement('style');
style.textContent = `.nav-link.active { color: var(--accent); }
.nav-link.active::after { width: 100%; }`;
document.head.appendChild(style);
