document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const backToTop = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

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
            
            const waNumber1 = '6285759977665';
            const waNumber2 = '6281285313618';
            
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
            
            const waMessage = 'Assalamualaikum, saya ingin konsultasi hukum.%0A%0A' +
                '*Nama:* ' + name + '%0A' +
                '*Email:* ' + email + '%0A' +
                '*Telepon:* ' + phone + '%0A' +
                '*Jenis Perkara:* ' + serviceName + '%0A' +
                '*Deskripsi:* ' + message;
            
            window.open('https://wa.me/' + waNumber1 + '?text=' + waMessage, '_blank');
            setTimeout(function() {
                window.open('https://wa.me/' + waNumber2 + '?text=' + waMessage, '_blank');
            }, 1000);
            
            contactForm.reset();
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .process-step, .faq-item').forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
