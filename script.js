document.addEventListener('DOMContentLoaded', function() {
    var navbar = document.getElementById('navbar');
    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');
    var backToTop = document.getElementById('backToTop');
    var contactForm = document.getElementById('contactForm');

    function safeGet(id) { return document.getElementById(id); }

    function safeGetItem(key) {
        try { return localStorage.getItem(key); } catch (e) { return null; }
    }

    function safeSetItem(key, val) {
        try { localStorage.setItem(key, val); } catch (e) {}
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    });

    // Mobile menu toggle
    if (navToggle && navMenu) {
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
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (!href || href === '#') return;
            e.preventDefault();
            var target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Stats counter animation
    var statNumbers = document.querySelectorAll('.stat-number');
    var animated = false;

    function animateStats() {
        if (animated) return;
        
        var statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;
        
        var rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animated = true;
            
            statNumbers.forEach(function(stat) {
                var target = parseInt(stat.getAttribute('data-target'));
                var duration = 2000;
                var increment = target / (duration / 16);
                var current = 0;
                
                function updateCounter() {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                    }
                }
                
                updateCounter();
            });
        }
    }

    animateStats();
    window.addEventListener('scroll', animateStats);

    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(function(question) {
        question.addEventListener('click', function() {
            var faqItem = this.parentElement;
            if (!faqItem) return;
            var isActive = faqItem.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(function(item) {
                item.classList.remove('active');
            });
            
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // WhatsApp modal
    var waFloat = document.getElementById('waFloat');
    var waFooter = document.getElementById('waFooter');
    var waBtn1 = document.getElementById('waBtn1');
    var waBtn2 = document.getElementById('waBtn2');
    var waCancel = document.getElementById('waCancel');
    var waModal = document.getElementById('waModal');

    function showWaModal() {
        if (waModal) {
            waModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function hideWaModal() {
        if (waModal) {
            waModal.classList.remove('active');
            document.body.style.overflow = '';
        }
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
            window.location.href = 'https://wa.me/6281545454594?text=' + encodeURIComponent(window.waMessage || 'Assalamualaikum, saya ingin konsultasi hukum.');
        });
    }

    if (waBtn2) {
        waBtn2.addEventListener('click', function() {
            hideWaModal();
            window.location.href = 'https://wa.me/6285119973606?text=' + encodeURIComponent(window.waMessage || 'Assalamualaikum, saya ingin konsultasi hukum.');
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
            
            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var phone = document.getElementById('phone').value;
            var service = document.getElementById('service').value;
            var message = document.getElementById('message').value;
            
            if (!name || !email || !phone || !service || !message) {
                alert('Mohon lengkapi semua field yang diperlukan.');
                return;
            }
            
            var serviceNames = {
                'cerai-talak': 'Cerai Talak (Suami Menggugat)',
                'cerai-gugat': 'Cerai Gugat (Istri Menggugat)',
                'nafkah': 'Nafkah Iddah & Mut\'ah',
                'anak': 'Hak Asuh Anak',
                'harta': 'Pembagian Harta Bersama',
                'waris': 'Sengketa Waris',
                'perwalian': 'Perwalian Anak'
            };
            
            var serviceName = serviceNames[service] || service;
            
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
    if (typeof IntersectionObserver !== 'undefined') {
        var observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        var observer = new IntersectionObserver(function(entries) {
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
    }

    // Parallax effect on hero
    window.addEventListener('scroll', function() {
        var scrolled = window.pageYOffset;
        var heroLogo = document.querySelector('.hero-logo-bg');
        if (heroLogo && scrolled < window.innerHeight) {
            heroLogo.style.transform = 'translate(-50%, calc(-50% + ' + (scrolled * 0.3) + 'px))';
        }
    });

    // WA Tooltip Speech Bubble
    var waTooltip = document.getElementById('waTooltip');
    var waTooltipClose = document.getElementById('waTooltipClose');

    if (waTooltip && waFloat) {
        if (safeGetItem('waTooltipDismissed') === 'true') {
            waTooltip.style.display = 'none';
        } else {
            var showCount = 0;
            var isMobile = window.innerWidth <= 768;
            var maxShow = isMobile ? 2 : 5;
            var displayTime = 8000;
            var gapTime = isMobile ? 20000 : 10000;

            function showCycle() {
                if (showCount >= maxShow) return;
                showCount++;

                waFloat.classList.add('pulse');
                waTooltip.classList.add('show');

                setTimeout(function() {
                    waTooltip.classList.add('disappear');
                    setTimeout(function() {
                        waTooltip.classList.remove('show');
                        waTooltip.classList.remove('disappear');
                        waFloat.classList.remove('pulse');

                        if (showCount < maxShow) {
                            setTimeout(showCycle, gapTime);
                        }
                    }, 500);
                }, displayTime);
            }

            setTimeout(showCycle, 3000);
        }

        function dismissTooltip() {
            safeSetItem('waTooltipDismissed', 'true');
            waTooltip.classList.add('disappear');
            setTimeout(function() {
                waTooltip.classList.remove('show');
                waTooltip.classList.remove('disappear');
                waFloat.classList.remove('pulse');
            }, 500);
        }

        if (waTooltipClose) {
            waTooltipClose.addEventListener('click', function(e) {
                e.stopPropagation();
                dismissTooltip();
            });
        }

        var waTooltipText = document.querySelector('.wa-tooltip-text');
        if (waTooltipText) {
            waTooltipText.style.cursor = 'pointer';
            waTooltipText.addEventListener('click', function() {
                if (waModal) waModal.classList.add('active');
                dismissTooltip();
            });
        }
    }
});
