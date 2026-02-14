/* ============================================
   VALENTINE'S WEBSITE — WORLD CLASS JS
   Featuring: GSAP, Confetti, Canvas particles,
   Typewriter, Magnetic buttons, 3D tilt,
   Smooth scroll reveal, Custom cursor, etc.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // ============================
    // PRELOADER + CURTAIN
    // ============================
    const loaderFill = document.getElementById('loader-fill');
    let progress = 0;
    const loadInterval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadInterval);
            setTimeout(() => {
                document.getElementById('preloader').classList.add('loaded');
                setTimeout(() => {
                    document.getElementById('curtain').classList.add('open');
                    setTimeout(initHeroAnimations, 600);
                }, 300);
            }, 400);
        }
        loaderFill.style.width = progress + '%';
    }, 200);

    // ============================
    // HERO ANIMATIONS (GSAP)
    // ============================
    function initHeroAnimations() {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.to('.hero-badge', { opacity: 1, y: 0, duration: 0.8 })
          .to('.hero-line-1', { opacity: 0.85, y: 0, duration: 1 }, '-=0.4')
          .to('.hero-line-2', { opacity: 1, y: 0, duration: 1.2 }, '-=0.6')
          .to('.hero-line-3', { opacity: 0.85, y: 0, duration: 1 }, '-=0.6')
          .to('.hero-divider', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
          .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.6, onComplete: startTypewriter }, '-=0.2')
          .to('.hero-buttons', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
          .to('.scroll-indicator', { opacity: 1, y: 0, duration: 0.6 }, '-=0.2');
    }

    // ============================
    // TYPEWRITER EFFECT
    // ============================
    const typewriterTexts = [
        "Love is not about how many days, months, or years you've been together.",
        "Love is about how much you love each other every single day.",
        "You are my today, my tomorrow, and my forever.",
        "In all the world, there is no heart like yours.",
        "Every love story is beautiful, but ours is my favorite."
    ];
    let twTextIndex = 0, twCharIndex = 0, twIsDeleting = false;
    const twElement = document.getElementById('typewriter');

    function startTypewriter() { typewrite(); }

    function typewrite() {
        const currentText = typewriterTexts[twTextIndex];
        if (twIsDeleting) {
            twCharIndex--;
        } else {
            twCharIndex++;
        }

        if (twElement) {
            twElement.textContent = currentText.substring(0, twCharIndex);
        }

        let delay = twIsDeleting ? 30 : 50;

        if (!twIsDeleting && twCharIndex === currentText.length) {
            delay = 3000;
            twIsDeleting = true;
        } else if (twIsDeleting && twCharIndex === 0) {
            twIsDeleting = false;
            twTextIndex = (twTextIndex + 1) % typewriterTexts.length;
            delay = 500;
        }

        setTimeout(typewrite, delay);
    }

    // ============================
    // CUSTOM CURSOR
    // ============================
    const cursor = document.getElementById('cursor');
    if (cursor && window.innerWidth > 768) {
        let cx = 0, cy = 0, px = 0, py = 0;

        document.addEventListener('mousemove', e => {
            cx = e.clientX;
            cy = e.clientY;
        });

        function updateCursor() {
            px += (cx - px) * 0.15;
            py += (cy - py) * 0.15;
            cursor.style.transform = `translate(${px}px, ${py}px)`;
            requestAnimationFrame(updateCursor);
        }
        updateCursor();

        // Hover effect for interactive elements
        document.querySelectorAll('a, button, .gallery-item, .envelope-wrapper, .reason-heart-btn, .magnetic-btn').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // ============================
    // SPARKLE ON CLICK
    // ============================
    const sparkleEmojis = ['💕', '💖', '💗', '✨', '💝', '💘', '🌹', '♥', '💫', '🦋'];
    document.addEventListener('click', e => {
        for (let i = 0; i < 6; i++) {
            const s = document.createElement('div');
            s.className = 'sparkle';
            s.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
            s.style.left = (e.clientX + (Math.random() - 0.5) * 80) + 'px';
            s.style.top = (e.clientY + (Math.random() - 0.5) * 80) + 'px';
            s.style.fontSize = (Math.random() * 15 + 10) + 'px';
            document.body.appendChild(s);
            setTimeout(() => s.remove(), 1000);
        }
    });

    // ============================
    // NAVBAR
    // ============================
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');
    const sectionEls = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        navbar.classList.toggle('scrolled', scrollY > 80);
        backToTop.classList.toggle('visible', scrollY > 600);

        // Active nav link
        sectionEls.forEach(sec => {
            const top = sec.offsetTop - 200;
            const id = sec.getAttribute('id');
            if (scrollY >= top && scrollY < top + sec.offsetHeight) {
                navLinks.forEach(l => {
                    l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
                });
            }
        });
    });

    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Mobile nav
    const navToggle = document.getElementById('nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });
    document.querySelectorAll('.mobile-link').forEach(l => {
        l.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ============================
    // COUNTDOWN (time together since Jan 1, 2025)
    // ============================
    const loveStartDate = new Date('January 1, 2025 00:00:00').getTime();
    const circumference = 2 * Math.PI * 52;

    function updateCountdown() {
        const now = Date.now();
        const diff = now - loveStartDate; // counting UP

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
        document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');

        // Ring progress
        const setRing = (id, value, max) => {
            const el = document.getElementById(id);
            if (el) el.style.strokeDashoffset = circumference - (value / max) * circumference;
        };
        setRing('ring-days', days % 365, 365);
        setRing('ring-hours', hours, 24);
        setRing('ring-minutes', minutes, 60);
        setRing('ring-seconds', seconds, 60);

        // Update the message with milestone info
        const msgEl = document.getElementById('cd-message');
        if (msgEl) {
            const years = Math.floor(days / 365);
            const remainDays = days % 365;
            if (years > 0) {
                msgEl.textContent = `💕 ${years} year${years > 1 ? 's' : ''} and ${remainDays} day${remainDays !== 1 ? 's' : ''} of pure love 💕`;
            } else {
                msgEl.textContent = `💕 ${days} beautiful day${days !== 1 ? 's' : ''} of love and counting 💕`;
            }
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ============================
    // DYNAMIC STATS (calculated from love start date)
    // ============================
    (function updateStats() {
        const now = Date.now();
        const diff = now - loveStartDate;
        const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        const totalHours = Math.floor(diff / (1000 * 60 * 60));
        const totalMinutes = Math.floor(diff / (1000 * 60));
        
        const statCards = document.querySelectorAll('.stat-card');
        if (statCards[0]) statCards[0].dataset.count = totalDays;
        if (statCards[1]) statCards[1].dataset.count = totalHours;
        if (statCards[2]) statCards[2].dataset.count = totalMinutes;
        // Reasons stays at 999
    })();

    // ============================
    // STATS COUNTER (GSAP ScrollTrigger)
    // ============================
    document.querySelectorAll('.stat-card').forEach(card => {
        const numEl = card.querySelector('.stat-number');
        const target = parseInt(card.dataset.count);

        ScrollTrigger.create({
            trigger: card,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                gsap.to({ val: 0 }, {
                    val: target,
                    duration: 2.5,
                    ease: 'power2.out',
                    onUpdate: function () {
                        numEl.textContent = Math.floor(this.targets()[0].val).toLocaleString();
                    }
                });
            }
        });
    });

    // ============================
    // TIMELINE SCROLL ANIMATION
    // ============================
    const timelineFill = document.getElementById('timeline-fill');

    // Timeline line fill based on scroll
    ScrollTrigger.create({
        trigger: '.timeline',
        start: 'top 70%',
        end: 'bottom 50%',
        scrub: 1,
        onUpdate: self => {
            if (timelineFill) timelineFill.style.height = (self.progress * 100) + '%';
        }
    });

    // Animate timeline items
    document.querySelectorAll('.timeline-item').forEach((item, i) => {
        const side = item.dataset.side;
        gsap.fromTo(item,
            { opacity: 0, x: side === 'left' ? -80 : 80, y: 40 },
            {
                opacity: 1, x: 0, y: 0, duration: 1, ease: 'power3.out',
                scrollTrigger: { trigger: item, start: 'top 80%', once: true }
            }
        );
    });

    // ============================
    // PARALLAX QUOTE
    // ============================
    gsap.fromTo('.quote-text', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.5,
        scrollTrigger: { trigger: '.parallax-quote-section', start: 'top 70%', once: true }
    });
    gsap.fromTo('.quote-cite', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, delay: 0.3,
        scrollTrigger: { trigger: '.parallax-quote-section', start: 'top 70%', once: true }
    });

    // ============================
    // GALLERY 3D TILT
    // ============================
    document.querySelectorAll('[data-tilt]').forEach(item => {
        item.addEventListener('mousemove', e => {
            const rect = item.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rotX = (y - 0.5) * 15;
            const rotY = (0.5 - x) * 15;
            item.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
            item.style.transition = 'transform 0.5s ease';
        });
        item.addEventListener('mouseenter', () => {
            item.style.transition = 'none';
        });

        // GSAP scroll reveal
        gsap.fromTo(item, { opacity: 0, y: 60, scale: 0.9 }, {
            opacity: 1, y: 0, scale: 1, duration: 0.8,
            scrollTrigger: { trigger: item, start: 'top 85%', once: true },
            delay: Math.random() * 0.3
        });
    });

    // ============================
    // POEMS CAROUSEL
    // ============================
    const poemCards = document.querySelectorAll('.poem-card');
    const poemDots = document.getElementById('poem-dots');
    let currentPoem = 0;

    poemCards.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `poem-dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToPoem(i));
        poemDots.appendChild(dot);
    });

    function goToPoem(idx) {
        poemCards.forEach(c => c.classList.remove('active'));
        document.querySelectorAll('.poem-dot').forEach(d => d.classList.remove('active'));
        currentPoem = idx;
        poemCards[currentPoem].classList.add('active');
        document.querySelectorAll('.poem-dot')[currentPoem].classList.add('active');
    }

    document.getElementById('poem-prev').addEventListener('click', () => {
        goToPoem((currentPoem - 1 + poemCards.length) % poemCards.length);
    });
    document.getElementById('poem-next').addEventListener('click', () => {
        goToPoem((currentPoem + 1) % poemCards.length);
    });
    setInterval(() => goToPoem((currentPoem + 1) % poemCards.length), 7000);

    // ============================
    // LOVE LETTER ENVELOPE
    // ============================
    const envelope = document.getElementById('envelope');
    envelope.addEventListener('click', () => {
        if (!envelope.classList.contains('opened')) {
            envelope.classList.add('opened');
            // Confetti burst
            if (typeof confetti === 'function') {
                const rect = envelope.getBoundingClientRect();
                const x = (rect.left + rect.width / 2) / window.innerWidth;
                const y = (rect.top + rect.height / 4) / window.innerHeight;
                confetti({ particleCount: 100, spread: 70, origin: { x, y }, colors: ['#e91e63', '#ff6090', '#f48fb1', '#ffd700', '#ff1744'] });
            }
            // Hearts burst
            for (let i = 0; i < 25; i++) {
                setTimeout(() => {
                    const h = document.createElement('div');
                    h.className = 'sparkle';
                    h.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
                    const rect = envelope.getBoundingClientRect();
                    h.style.left = (rect.left + rect.width / 2 + (Math.random() - 0.5) * 250) + 'px';
                    h.style.top = (rect.top + 50 + (Math.random() - 0.5) * 100) + 'px';
                    h.style.fontSize = (Math.random() * 20 + 15) + 'px';
                    document.body.appendChild(h);
                    setTimeout(() => h.remove(), 1200);
                }, i * 40);
            }
        }
    });

    // ============================
    // REASONS I LOVE YOU
    // ============================
    const reasons = [
        "Your smile lights up my entire world 😊",
        "The way you laugh makes everything better 😄",
        "You believe in me even when I don't 💪",
        "Your hugs feel like home 🤗",
        "The way your eyes sparkle when you're happy ✨",
        "You make ordinary days extraordinary 🌟",
        "Your kindness inspires me to be better 💝",
        "The way you say my name gives me butterflies 🦋",
        "You're my best friend and greatest love 👫",
        "Your courage amazes me every day 💫",
        "The way you dance when nobody's watching 💃",
        "You make me feel safe and loved 🛡️",
        "Your creativity inspires me 🎨",
        "The little notes you leave for me 📝",
        "Your passion for life is contagious 🔥",
        "You always know how to make me laugh 😂",
        "Your beautiful heart shows in everything you do 💖",
        "You challenge me to grow ✨",
        "Your voice is my favorite sound 🎵",
        "The way you hold my hand 🤝",
        "You make every moment worth remembering 📸",
        "Your patience means the world 🌍",
        "The way you look at me makes me feel lucky 🍀",
        "You accept me completely, flaws and all 💕",
        "Your dreams and ambitions motivate me 🚀",
        "The way you comfort me during storms 🌈",
        "You're the missing piece I never knew I needed 🧩",
        "Your intelligence blows my mind 🧠",
        "The sound of your heartbeat is my peace 💓",
        "You sacrifice for our love without hesitation 💝",
        "Your inner beauty outshines everything 🌸",
        "You remember the little things 🎀",
        "You give the best advice 💡",
        "Your presence calms my soul 🕊️",
        "You support my craziest ideas 🌈",
        "You never give up on us 💪",
        "Your morning messages make my day 🌅",
        "The way your hand fits perfectly in mine 🤞",
        "You turn my tears into smiles 😊",
        "Your faith in love inspires me 🙏",
        "The adventures we share together 🗺️",
        "You're beautiful inside and out 🌺",
        "The way you sing off-key and don't care 🎤",
        "You make me want to be the best version of myself ⭐",
        "Your forgiveness heals my heart 💗",
        "The future I see with you is brighter than stars 🌟",
        "You chose me, and I'm forever grateful 🎁",
        "The way you say 'I love you' — I feel it in my soul 💞",
        "Because with you, I am truly complete 💝",
        "Because you are you — the most beautiful reason of all 🥰"
    ];
    let currentReason = 0;
    const reasonText = document.getElementById('reason-text');
    const reasonNum = document.getElementById('reason-num');
    const reasonTotal = document.getElementById('reason-total');
    const reasonBar = document.getElementById('reason-bar');
    const reasonsHeart = document.getElementById('reasons-heart');
    reasonTotal.textContent = reasons.length;

    reasonsHeart.addEventListener('click', () => {
        currentReason = currentReason % reasons.length;
        reasonText.style.opacity = '0';

        // Mini confetti
        if (typeof confetti === 'function') {
            confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 }, colors: ['#e91e63', '#ff6090', '#f48fb1'] });
        }

        setTimeout(() => {
            reasonText.textContent = reasons[currentReason];
            reasonNum.textContent = currentReason + 1;
            reasonBar.style.width = ((currentReason + 1) / reasons.length * 100) + '%';
            reasonText.style.opacity = '1';
            currentReason++;
        }, 250);
    });

    // ============================
    // FIREWORKS BUTTON
    // ============================
    document.getElementById('fireworks-btn').addEventListener('click', () => {
        if (typeof confetti !== 'function') return;

        // Grand finale fireworks
        const duration = 5000;
        const end = Date.now() + duration;
        const colors = ['#e91e63', '#ff6090', '#ff1744', '#f48fb1', '#ffd700', '#ff80ab', '#c2185b'];

        (function frame() {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 65,
                origin: { x: 0, y: 0.7 },
                colors
            });
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 65,
                origin: { x: 1, y: 0.7 },
                colors
            });
            confetti({
                particleCount: 3,
                angle: 90,
                spread: 100,
                origin: { x: 0.5, y: 0.5 },
                colors
            });

            if (Date.now() < end) requestAnimationFrame(frame);
        })();

        // Big central burst at start
        confetti({
            particleCount: 150,
            spread: 120,
            startVelocity: 45,
            origin: { y: 0.6 },
            colors,
            shapes: ['circle', 'square'],
            ticks: 200
        });

        // Heart sparkles
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const s = document.createElement('div');
                s.className = 'sparkle';
                s.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
                s.style.left = Math.random() * window.innerWidth + 'px';
                s.style.top = Math.random() * window.innerHeight + 'px';
                s.style.fontSize = (Math.random() * 25 + 15) + 'px';
                document.body.appendChild(s);
                setTimeout(() => s.remove(), 1200);
            }, i * 100);
        }
    });

    // ============================
    // PROMISES GSAP ANIMATION
    // ============================
    document.querySelectorAll('.promise-card').forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 60, rotateY: 10 },
            {
                opacity: 1, y: 0, rotateY: 0,
                duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: card, start: 'top 85%', once: true },
                delay: i * 0.1
            }
        );
    });

    // ============================
    // SECTION HEADERS ANIMATION
    // ============================
    document.querySelectorAll('.section-header').forEach(header => {
        const tag = header.querySelector('.section-tag');
        const title = header.querySelector('.section-title');
        const sub = header.querySelector('.section-sub');
        const accent = header.querySelector('.title-accent');

        const tl = gsap.timeline({
            scrollTrigger: { trigger: header, start: 'top 80%', once: true }
        });

        if (tag) tl.fromTo(tag, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
        if (title) tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.2');
        if (sub) tl.fromTo(sub, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');
        if (accent) tl.fromTo(accent, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(3)' }, '-=0.2');
    });

    // ============================
    // FINALE ANIMATION
    // ============================
    gsap.fromTo('.finale-emoji', { scale: 0, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(2)',
        scrollTrigger: { trigger: '.finale-section', start: 'top 70%', once: true }
    });
    gsap.fromTo('.finale-title', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1,
        scrollTrigger: { trigger: '.finale-section', start: 'top 70%', once: true },
        delay: 0.2
    });
    document.querySelectorAll('.finale-text p').forEach((p, i) => {
        gsap.fromTo(p, { y: 30, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.6,
            scrollTrigger: { trigger: '.finale-section', start: 'top 65%', once: true },
            delay: 0.4 + i * 0.15
        });
    });

    // ============================
    // MAGNETIC BUTTONS
    // ============================
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
            btn.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'none';
        });
    });

    // ============================
    // STARFIELD CANVAS
    // ============================
    const starsCanvas = document.getElementById('stars-canvas');
    const starsCtx = starsCanvas.getContext('2d');
    let stars = [];

    function resizeStars() {
        starsCanvas.width = window.innerWidth;
        starsCanvas.height = window.innerHeight;
    }
    resizeStars();
    window.addEventListener('resize', resizeStars);

    class Star {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * starsCanvas.width;
            this.y = Math.random() * starsCanvas.height;
            this.size = Math.random() * 2;
            this.twinkleSpeed = Math.random() * 0.02 + 0.005;
            this.opacity = Math.random();
            this.growing = Math.random() > 0.5;
        }
        update() {
            if (this.growing) {
                this.opacity += this.twinkleSpeed;
                if (this.opacity >= 1) this.growing = false;
            } else {
                this.opacity -= this.twinkleSpeed;
                if (this.opacity <= 0.1) this.growing = true;
            }
        }
        draw() {
            starsCtx.beginPath();
            starsCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            starsCtx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
            starsCtx.fill();
        }
    }

    for (let i = 0; i < 150; i++) stars.push(new Star());

    function animateStars() {
        starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
        stars.forEach(s => { s.update(); s.draw(); });
        requestAnimationFrame(animateStars);
    }
    animateStars();

    // ============================
    // HEARTS CANVAS
    // ============================
    const heartsCanvas = document.getElementById('hearts-canvas');
    const hCtx = heartsCanvas.getContext('2d');
    let heartParticles = [];

    function resizeHearts() {
        heartsCanvas.width = window.innerWidth;
        heartsCanvas.height = window.innerHeight;
    }
    resizeHearts();
    window.addEventListener('resize', resizeHearts);

    class HeartParticle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * heartsCanvas.width;
            this.y = heartsCanvas.height + 20;
            this.size = Math.random() * 12 + 4;
            this.speedY = Math.random() * 0.8 + 0.2;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.25 + 0.05;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotSpeed = (Math.random() - 0.5) * 0.015;
            this.hue = 340 + Math.random() * 25;
        }
        update() {
            this.y -= this.speedY;
            this.x += this.speedX + Math.sin(this.y * 0.008) * 0.3;
            this.rotation += this.rotSpeed;
            if (this.y < -20) this.reset();
        }
        draw() {
            hCtx.save();
            hCtx.translate(this.x, this.y);
            hCtx.rotate(this.rotation);
            hCtx.beginPath();
            const s = this.size;
            const t = s * 0.3;
            hCtx.moveTo(0, t);
            hCtx.bezierCurveTo(0, 0, -s/2, 0, -s/2, t);
            hCtx.bezierCurveTo(-s/2, (s+t)/2, 0, (s+t)/1.5, 0, s);
            hCtx.bezierCurveTo(0, (s+t)/1.5, s/2, (s+t)/2, s/2, t);
            hCtx.bezierCurveTo(s/2, 0, 0, 0, 0, t);
            hCtx.fillStyle = `hsla(${this.hue}, 80%, 55%, ${this.opacity})`;
            hCtx.fill();
            hCtx.restore();
        }
    }

    for (let i = 0; i < 20; i++) {
        const p = new HeartParticle();
        p.y = Math.random() * heartsCanvas.height;
        heartParticles.push(p);
    }

    function animateHearts() {
        hCtx.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);
        heartParticles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animateHearts);
    }
    animateHearts();

    // ============================
    // HEART MOUSE TRAIL
    // ============================
    let trailCount = 0;
    document.addEventListener('mousemove', e => {
        trailCount++;
        if (trailCount % 6 !== 0) return;
        const trail = document.createElement('div');
        trail.style.cssText = `
            position:fixed; left:${e.clientX}px; top:${e.clientY}px;
            pointer-events:none; z-index:99996; font-size:${Math.random()*8+6}px;
            opacity:0.5; transition:all 0.8s ease; transform:translate(-50%,-50%);
            color:hsl(${340+Math.random()*25},80%,60%);
        `;
        trail.textContent = '♥';
        document.body.appendChild(trail);
        requestAnimationFrame(() => {
            trail.style.opacity = '0';
            trail.style.transform = `translate(-50%, calc(-50% - 25px)) scale(0)`;
        });
        setTimeout(() => trail.remove(), 800);
    });

    // ============================
    // KONAMI CODE
    // ============================
    const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let ki = 0;
    document.addEventListener('keydown', e => {
        if (e.key === konami[ki]) {
            ki++;
            if (ki === konami.length) {
                // Mega celebration!
                if (typeof confetti === 'function') {
                    for (let i = 0; i < 5; i++) {
                        setTimeout(() => {
                            confetti({
                                particleCount: 200, spread: 160, startVelocity: 50,
                                origin: { x: Math.random(), y: Math.random() * 0.5 },
                                colors: ['#e91e63','#ff6090','#ff1744','#ffd700','#f48fb1','#c2185b']
                            });
                        }, i * 400);
                    }
                }
                for (let i = 0; i < 80; i++) {
                    setTimeout(() => {
                        const s = document.createElement('div');
                        s.className = 'sparkle';
                        s.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
                        s.style.left = Math.random() * window.innerWidth + 'px';
                        s.style.top = Math.random() * window.innerHeight + 'px';
                        s.style.fontSize = (Math.random()*30+15) + 'px';
                        document.body.appendChild(s);
                        setTimeout(() => s.remove(), 1500);
                    }, i * 30);
                }
                ki = 0;
            }
        } else { ki = 0; }
    });

    // ============================
    // CONSOLE MESSAGE
    // ============================
    console.log('%c💕 Happy Valentine\'s Day! 💕', 'color:#e91e63; font-size:28px; font-weight:bold; text-shadow:0 0 10px rgba(233,30,99,0.5);');
    console.log('%cMade with infinite love ❤️', 'color:#ff6090; font-size:14px;');
    console.log('%cKonami Code: ↑↑↓↓←→←→BA 🎮', 'color:#f48fb1; font-size:11px;');

    // ============================
    // LIGHTBOX
    // ============================
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-img');
    const lbCounter = document.getElementById('lb-counter');
    const galleryItems = document.querySelectorAll('[data-lightbox]');
    const lbSources = Array.from(galleryItems).map(i => i.dataset.lightbox);
    let lbIndex = 0;

    function openLightbox(idx) {
        lbIndex = idx;
        lbImg.src = lbSources[lbIndex];
        lbCounter.textContent = `${lbIndex + 1} / ${lbSources.length}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    galleryItems.forEach((item, i) => {
        item.addEventListener('click', () => openLightbox(i));
    });
    document.getElementById('lb-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.getElementById('lb-prev').addEventListener('click', e => {
        e.stopPropagation();
        lbIndex = (lbIndex - 1 + lbSources.length) % lbSources.length;
        lbImg.src = lbSources[lbIndex];
        lbCounter.textContent = `${lbIndex + 1} / ${lbSources.length}`;
    });
    document.getElementById('lb-next').addEventListener('click', e => {
        e.stopPropagation();
        lbIndex = (lbIndex + 1) % lbSources.length;
        lbImg.src = lbSources[lbIndex];
        lbCounter.textContent = `${lbIndex + 1} / ${lbSources.length}`;
    });
    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') document.getElementById('lb-prev').click();
        if (e.key === 'ArrowRight') document.getElementById('lb-next').click();
    });

    // ============================
    // VIDEO PLAY OVERLAYS
    // ============================
    document.querySelectorAll('.video-play-overlay').forEach(overlay => {
        overlay.addEventListener('click', () => {
            const video = overlay.parentElement.querySelector('video');
            if (video) {
                video.play();
                overlay.classList.add('hidden');
            }
        });
    });
    document.querySelectorAll('.video-wrapper video').forEach(video => {
        video.addEventListener('pause', () => {
            const overlay = video.parentElement.querySelector('.video-play-overlay');
            if (overlay) overlay.classList.remove('hidden');
        });
        video.addEventListener('ended', () => {
            const overlay = video.parentElement.querySelector('.video-play-overlay');
            if (overlay) overlay.classList.remove('hidden');
        });
    });

    // ============================
    // VIDEO SECTION GSAP ANIMATION
    // ============================
    document.querySelectorAll('.video-card').forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 60, scale: 0.95 },
            {
                opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: card, start: 'top 85%', once: true },
                delay: i * 0.2
            }
        );
    });
});
