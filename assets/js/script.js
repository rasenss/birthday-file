// MULTI-PAGE BIRTHDAY ENGINE INTERACTIVITY LOGIC
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Canvas Particle Setup Engine ---
    const canvas = document.getElementById('canvas-overlay');
    const ctx = canvas ? canvas.getContext('2d') : null;
    let particles = [];
    let animationFrameId;
    const confettiPalette = [
        'hsl(0, 0%, 98%)',
        'hsl(0, 0%, 92%)',
        'hsl(210, 12%, 94%)',
        'hsl(330, 15%, 92%)'
    ];

    if (canvas && ctx) {
        function matchWindowBounds() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', matchWindowBounds);
        matchWindowBounds();
    }

    class CelebrationParticle {
        constructor(startX, startY, hueColor = null) {
            this.x = startX;
            this.y = startY;
            this.size = Math.random() * 6 + 5;
            this.color = hueColor ? hueColor : confettiPalette[Math.floor(Math.random() * confettiPalette.length)];
            this.vx = Math.random() * 10 - 5;
            this.vy = Math.random() * -14 - 8;
            this.gravity = 0.35;
            this.rotationAngle = Math.random() * 360;
            this.spinSpeed = Math.random() * 4 - 2;
            this.lifeAlpha = 1;
        }

        performPhysicsUpdate() {
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;
            this.rotationAngle += this.spinSpeed;
            if (this.y > canvas.height) {
                this.lifeAlpha -= 0.025;
            }
        }

        renderGraphics() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotationAngle * Math.PI) / 180);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.lifeAlpha;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    function processParticleLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((item, index) => {
            item.performPhysicsUpdate();
            item.renderGraphics();
            if (item.lifeAlpha <= 0 || item.x < -20 || item.x > canvas.width + 20) {
                particles.splice(index, 1);
            }
        });

        if (particles.length > 0) {
            animationFrameId = requestAnimationFrame(processParticleLoop);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cancelAnimationFrame(animationFrameId);
        }
    }

    function triggerConfettiExplosion(customHue = null) {
        if (!canvas || !ctx) return;
        cancelAnimationFrame(animationFrameId);

        for (let i = 0; i < 60; i++) {
            particles.push(new CelebrationParticle(Math.random() * canvas.width, canvas.height - 10, customHue));
        }
        processParticleLoop();
    }

    // --- Floating Balloon Injection Engine ---
    function triggerAsymmetricBalloons(balloonColor = '#f7f8fb') {
        for (let i = 0; i < 16; i++) {
            setTimeout(() => {
                const element = document.createElement('div');
                element.className = 'floating-balloon';
                element.style.backgroundColor = balloonColor;
                element.style.left = `${Math.random() * 80 + 10}vw`;
                
                const variantScale = Math.random() * 0.4 + 0.8;
                element.style.transform = `scale(${variantScale})`;
                
                const speedTrack = Math.random() * 2.5 + 4.5;
                element.style.animationDuration = `${speedTrack}s`;

                document.body.appendChild(element);
                
                setTimeout(() => element.remove(), speedTrack * 1000);
            }, i * 150);
        }
    }

    // --- Header Controls + Quick Menu ---
    const heartButton = document.querySelector('.js-heart');
    if (heartButton) {
        heartButton.addEventListener('click', () => {
            triggerConfettiExplosion();
            triggerAsymmetricBalloons('#f1f2f6');
            heartButton.classList.remove('is-pulsing');
            void heartButton.offsetWidth;
            heartButton.classList.add('is-pulsing');
        });
    }

    // --- Interactive Feature Block: Digital Hugs Handler Engine ---
    const hugActionButtons = document.querySelectorAll('.hug-action-card');
    function spawnWarmthHalo(el) {
        const rc = el.getBoundingClientRect();
        const halo = document.createElement('div');
        halo.className = 'warmth-halo';
        halo.style.left = `${(rc.width - 120) / 2}px`;
        halo.style.top = `${(rc.height - 120) / 2}px`;
        el.appendChild(halo);
        setTimeout(() => halo.remove(), 800);
    }

    function spawnSparkles(el, count = 8) {
        const rc = el.getBoundingClientRect();
        for (let i = 0; i < count; i++) {
            const sp = document.createElement('div');
            sp.className = 'sparkle';
            sp.style.left = `${Math.random() * (rc.width - 6) + 4}px`;
            sp.style.top = `${Math.random() * (rc.height - 6) + 4}px`;
            sp.style.background = `radial-gradient(circle at 30% 30%, #fff, rgba(180,200,255,0.9))`;
            el.appendChild(sp);
            setTimeout(() => sp.remove(), 760);
        }
    }

    function spawnPetals(el, count = 7) {
        const rc = el.getBoundingClientRect();
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'petal';
            p.style.left = `${Math.random() * (rc.width - 10) + 4}px`;
            p.style.top = `${rc.height - 6}px`;
            p.style.transform = `translateY(0) rotate(${Math.random() * 40 - 20}deg)`;
            el.appendChild(p);
            setTimeout(() => p.remove(), 1150);
        }
    }

    function spawnLoveHearts(el, count = 7) {
        const rc = el.getBoundingClientRect();
        for (let i = 0; i < count; i++) {
            const h = document.createElement('div');
            h.className = 'love-heart';
            h.style.left = `${Math.random() * (rc.width - 12) + 4}px`;
            h.style.top = `${rc.height - 8}px`;
            el.appendChild(h);
            setTimeout(() => h.remove(), 950);
        }
    }

    function spawnSurpriseRing(el) {
        const rc = el.getBoundingClientRect();
        const ring = document.createElement('div');
        ring.className = 'surprise-ring';
        ring.style.left = `${(rc.width - 140) / 2}px`;
        ring.style.top = `${(rc.height - 140) / 2}px`;
        el.appendChild(ring);
        setTimeout(() => ring.remove(), 900);
    }

    hugActionButtons.forEach(btn => {
        btn.addEventListener('click', (ev) => {
            const flavor = btn.getAttribute('data-surprise');
            // add a class for CSS micro-animation
            btn.classList.remove('anim-warmth','anim-magic','anim-bloom','anim-love','anim-surprise');
            void btn.offsetWidth;

            if (flavor === 'warmth') {
                btn.classList.add('anim-warmth');
                spawnWarmthHalo(btn);
                triggerAsymmetricBalloons('#fde7e6');
            } else if (flavor === 'magic') {
                btn.classList.add('anim-magic');
                spawnSparkles(btn, 10);
                triggerConfettiExplosion('hsl(210, 14%, 92%)');
            } else if (flavor === 'bloom') {
                btn.classList.add('anim-bloom');
                spawnPetals(btn, 8);
                triggerConfettiExplosion('hsl(330, 18%, 90%)');
                triggerAsymmetricBalloons('#fff0f6');
            } else if (flavor === 'love') {
                btn.classList.add('anim-love');
                spawnLoveHearts(btn, 9);
                triggerConfettiExplosion('hsl(350, 16%, 90%)');
            } else {
                btn.classList.add('anim-surprise');
                spawnSurpriseRing(btn);
                spawnSparkles(btn, 12);
                triggerConfettiExplosion('hsl(0, 0%, 96%)');
                triggerAsymmetricBalloons('#f3f4f8');
            }

            // cleanup the animation class after it's done
            setTimeout(() => {
                btn.classList.remove('anim-warmth','anim-magic','anim-bloom','anim-love','anim-surprise');
            }, 900);
        });
    });

    // --- Main image click animations (memory cards) ---
    const memoryCards = document.querySelectorAll('.memory-card');
    const memoryAudio = document.getElementById('memory-audio');
    memoryCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const isVideoClick = !!e.target.closest('video');
            if (isVideoClick) {
                e.preventDefault();
                e.stopPropagation();
                if (memoryAudio) {
                    memoryAudio.play().catch(() => {});
                }
                return;
            }
            // if it's an anchor, prevent immediate navigation to play animation
            const anchor = card.closest('a') || (card.tagName === 'A' ? card : null);
            if (anchor) e.preventDefault();

            const image = card.querySelector('.memory-image') || card;
            if (!image) {
                if (anchor) window.location = anchor.href;
                return;
            }

            // add pop class
            image.classList.remove('image-click-animate');
            void image.offsetWidth;
            image.classList.add('image-click-animate');

            // ripple
            const rc = image.getBoundingClientRect();
            const ripple = document.createElement('div');
            ripple.className = 'image-ripple';
            ripple.style.width = `${Math.min(rc.width, rc.height) * 0.8}px`;
            ripple.style.height = ripple.style.width;
            ripple.style.left = `${(rc.width - parseFloat(ripple.style.width)) / 2}px`;
            ripple.style.top = `${(rc.height - parseFloat(ripple.style.height)) / 2}px`;
            ripple.style.position = 'absolute';
            image.style.position = 'relative';
            image.appendChild(ripple);

            triggerConfettiExplosion('hsl(220, 12%, 95%)');

            setTimeout(() => {
                ripple.remove();
            }, 650);

            // navigate after animation
            if (anchor) {
                setTimeout(() => {
                    window.location = anchor.href;
                }, 420);
            }
        });
    });

    // --- Scroll bounce effect for the page ---
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
        let lastScrollY = window.scrollY;
        let bounceTarget = 0;
        let bounceCurrent = 0;
        let bounceTicking = false;

        const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

        const applyBounce = () => {
            bounceCurrent += (bounceTarget - bounceCurrent) * 0.18;
            bounceTarget *= 0.82;
            document.body.style.setProperty('--bounce-y', `${bounceCurrent.toFixed(2)}px`);

            if (Math.abs(bounceCurrent) > 0.1 || Math.abs(bounceTarget) > 0.1) {
                requestAnimationFrame(applyBounce);
            } else {
                document.body.style.setProperty('--bounce-y', '0px');
                bounceTicking = false;
            }
        };

        window.addEventListener('scroll', () => {
            const currentY = window.scrollY;
            const delta = currentY - lastScrollY;
            lastScrollY = currentY;
            bounceTarget = clamp(-delta * 0.35, -12, 12);

            if (!bounceTicking) {
                bounceTicking = true;
                requestAnimationFrame(applyBounce);
            }
        }, { passive: true });
    }

    // --- Intersection Observer Setup for Scroll Reveals ---
    const scrollRevealItems = document.querySelectorAll('.animate-on-scroll');
    if (scrollRevealItems.length > 0) {
        const revealOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const visualObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        scrollRevealItems.forEach(item => visualObserver.observe(item));
    }

    const fadeItems = document.querySelectorAll('.fade-up');
    if (fadeItems.length > 0) {
        const fadeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeItems.forEach(item => fadeObserver.observe(item));
    }
});