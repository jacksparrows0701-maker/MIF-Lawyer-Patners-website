document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const backToTop = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateStats() {
        if (animated) return;
        
        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animated = true;
            
            statNumbers.forEach(function(stat) {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = function() {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }
    }

    animateStats();
    window.addEventListener('scroll', animateStats);

    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(function(question) {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(function(item) {
                item.classList.remove('active');
            });
            
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // WhatsApp modal
    const waFloat = document.getElementById('waFloat');
    const waFooter = document.getElementById('waFooter');
    const waBtn1 = document.getElementById('waBtn1');
    const waBtn2 = document.getElementById('waBtn2');
    const waCancel = document.getElementById('waCancel');
    const waModal = document.getElementById('waModal');

    function showWaModal() {
        waModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function hideWaModal() {
        waModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (waFloat) {
        waFloat.addEventListener('click', function(e) {
            e.preventDefault();
            window.waMessage = 'Assalamualaikum, saya ingin konsultasi hukum.';
            showWaModal();
        });
    }

    if (waFooter) {
        waFooter.addEventListener('click', function(e) {
            e.preventDefault();
            window.waMessage = 'Assalamualaikum, saya ingin konsultasi hukum.';
            showWaModal();
        });
    }

    if (waBtn1) {
        waBtn1.addEventListener('click', function() {
            hideWaModal();
            window.location.href = 'https://wa.me/6285759977665?text=' + encodeURIComponent(window.waMessage || 'Assalamualaikum, saya ingin konsultasi hukum.');
        });
    }

    if (waBtn2) {
        waBtn2.addEventListener('click', function() {
            hideWaModal();
            window.location.href = 'https://wa.me/6281285313618?text=' + encodeURIComponent(window.waMessage || 'Assalamualaikum, saya ingin konsultasi hukum.');
        });
    }

    if (waCancel) {
        waCancel.addEventListener('click', function() {
            hideWaModal();
        });
    }

    // Close modal on backdrop click
    if (waModal) {
        waModal.addEventListener('click', function(e) {
            if (e.target === waModal) {
                hideWaModal();
            }
        });
    }

    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !phone || !service || !message) {
                alert('Mohon lengkapi semua field yang diperlukan.');
                return;
            }
            
            const serviceNames = {
                'cerai-talak': 'Cerai Talak (Suami Menggugat)',
                'cerai-gugat': 'Cerai Gugat (Istri Menggugat)',
                'nafkah': 'Nafkah Iddah & Mut\'ah',
                'anak': 'Hak Asuh Anak',
                'harta': 'Pembagian Harta Bersama',
                'waris': 'Sengketa Waris',
                'perwalian': 'Perwalian Anak'
            };
            
            const serviceName = serviceNames[service] || service;
            
            window.waMessage = 'Assalamualaikum, saya ingin konsultasi hukum.%0A%0A' +
                '*Nama:* ' + name + '%0A' +
                '*Email:* ' + email + '%0A' +
                '*Telepon:* ' + phone + '%0A' +
                '*Jenis Perkara:* ' + serviceName + '%0A' +
                '*Deskripsi:* ' + message;
            
            showWaModal();
            contactForm.reset();
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .process-step, .faq-item, .testimonial-card, .blog-card, .team-card, .about-content, .contact-grid, .maps-grid').forEach(function(el) {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Parallax effect on hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroLogo = document.querySelector('.hero-logo-bg');
        if (heroLogo && scrolled < window.innerHeight) {
            heroLogo.style.transform = 'translate(-50%, calc(-50% + ' + (scrolled * 0.3) + 'px))';
        }
    });

    // WA Tooltip Speech Bubble
    const waTooltip = document.getElementById('waTooltip');
    const waTooltipClose = document.getElementById('waTooltipClose');

    console.log('WA Tooltip: init', { waTooltip, waFloat });

    if (waTooltip && waFloat) {
        if (localStorage.getItem('waTooltipDismissed') === 'true') {
            console.log('WA Tooltip: dismissed in localStorage');
            waTooltip.style.display = 'none';
        } else {
            console.log('WA Tooltip: showing in 2s');
            // Icon WA pulse setelah 2 detik
            setTimeout(function() {
                console.log('WA Tooltip: pulse');
                waFloat.classList.add('pulse');
            }, 2000);

            // Tooltip muncul setelah 3 detik
            setTimeout(function() {
                console.log('WA Tooltip: show');
                waTooltip.classList.add('show');
            }, 3000);

            // Tooltip hilang setelah 8 detik
            setTimeout(function() {
                console.log('WA Tooltip: disappear');
                if (waTooltip.classList.contains('show')) {
                    waTooltip.classList.add('disappear');
                    setTimeout(function() {
                        waTooltip.classList.remove('show');
                        waTooltip.classList.remove('disappear');
                        waFloat.classList.remove('pulse');
                    }, 500);
                }
            }, 8000);
        }

        // Klik tooltip bubble → buka modal
        if (waTooltipClose) {
            waTooltipClose.addEventListener('click', function(e) {
                e.stopPropagation();
                waTooltip.classList.add('disappear');
                localStorage.setItem('waTooltipDismissed', 'true');
                setTimeout(function() {
                    waTooltip.classList.remove('show');
                    waTooltip.classList.remove('disappear');
                }, 500);
            });
        }

        // Klik teks → buka modal
        var waTooltipText = document.querySelector('.wa-tooltip-text');
        if (waTooltipText) {
            waTooltipText.style.cursor = 'pointer';
            waTooltipText.addEventListener('click', function() {
                document.getElementById('waModal').classList.add('active');
                localStorage.setItem('waTooltipDismissed', 'true');
                waTooltip.classList.add('disappear');
                setTimeout(function() {
                    waTooltip.classList.remove('show');
                    waTooltip.classList.remove('disappear');
                }, 500);
            });
        }
    }
});
