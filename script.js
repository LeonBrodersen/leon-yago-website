// ========================================
// COOKIE BANNER
// ========================================

const cookieBanner = document.getElementById("cookie-banner");
const acceptCookieBtn = document.querySelector('.cookie-btn-accept');

function acceptCookies() {
    localStorage.setItem("cookiesAccepted", "true");
    if (cookieBanner) cookieBanner.classList.remove("show");
}

if (!localStorage.getItem('cookiesAccepted')) {
    if (cookieBanner) cookieBanner.classList.add('show');
}

if (acceptCookieBtn && cookieBanner) {
    acceptCookieBtn.addEventListener('click', acceptCookies);
}

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function () {
    if (scrollTopBtn) {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========================================
// MOBILE MENU
// ========================================

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// ========================================
// MODAL FUNCTIONS
// ========================================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
            modal.classList.remove('active');
        });
        closeStyleDemo();
        document.body.style.overflow = '';
    }
});

document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function () {
        const modal = this.closest('.modal-overlay');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function (e) {
        if (e.target === this) {
            this.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function () {
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        setTimeout(() => {
            submitBtn.classList.remove('loading');
        }, 2000);
    });
}

// ========================================
// STYLE DEMOS
// ========================================

const styleDemos = {
    minimalist: {
        name: 'Minimalist',
        industry: 'Zahnarztpraxis Dr. Schmidt',
        description: 'Sauberes, modernes Design für Gesundheitsdienstleistungen',
        html: `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dr. Schmidt - Zahnarztpraxis Oranienburg</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', -apple-system, sans-serif; background: #ffffff; color: #111827; line-height: 1.7; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        /* Navigation */
        nav { background: rgba(255,255,255,0.98); padding: 20px 0; border-bottom: 1px solid #f3f4f6; position: fixed; top: 0; left: 0; right: 0; z-index: 1000; backdrop-filter: blur(20px); }
        .nav-container { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5rem; font-weight: 800; color: #111827; display: flex; align-items: center; gap: 10px; }
        .logo-icon { width: 40px; height: 40px; background: #111827; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; }
        .nav-links { display: flex; gap: 40px; list-style: none; }
        .nav-links a { text-decoration: none; color: #6b7280; font-weight: 500; font-size: 0.95rem; transition: all 0.3s; position: relative; }
        .nav-links a:hover { color: #111827; }
        .nav-links a::after { content: ''; position: absolute; bottom: -5px; left: 0; width: 0; height: 2px; background: #111827; transition: width 0.3s; }
        .nav-links a:hover::after { width: 100%; }
        .nav-cta { background: #111827; color: white; padding: 12px 28px; border-radius: 8px; font-weight: 600; text-decoration: none; transition: all 0.3s; }
        .nav-cta:hover { background: #374151; transform: translateY(-2px); }
        
        /* Buttons */
        .btn { display: inline-flex; align-items: center; gap: 10px; padding: 16px 36px; background: #111827; color: white; border-radius: 10px; text-decoration: none; font-weight: 600; transition: all 0.3s; border: none; cursor: pointer; font-size: 1rem; }
        .btn:hover { background: #374151; transform: translateY(-3px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
        .btn-outline { background: transparent; border: 2px solid #111827; color: #111827; }
        .btn-outline:hover { background: #111827; color: white; }
        .btn-white { background: white; color: #111827; }
        .btn-white:hover { background: #f9fafb; }
        
        /* Hero Section */
        .hero { padding: 180px 0 120px; background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%); position: relative; overflow: hidden; }
        .hero::before { content: ''; position: absolute; width: 800px; height: 800px; background: radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%); top: -400px; right: -200px; }
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .hero-content { position: relative; z-index: 1; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: #f3f4f6; padding: 8px 16px; border-radius: 50px; font-size: 0.85rem; font-weight: 600; color: #374151; margin-bottom: 24px; }
        .hero-badge-dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .hero h1 { font-size: 3.8rem; font-weight: 800; line-height: 1.1; margin-bottom: 24px; color: #111827; letter-spacing: -0.02em; }
        .hero p { font-size: 1.25rem; color: #6b7280; margin-bottom: 40px; line-height: 1.8; }
        .hero-buttons { display: flex; gap: 16px; flex-wrap: wrap; }
        .hero-image { position: relative; }
        .hero-image-main { width: 100%; height: 500px; background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border-radius: 24px; display: flex; align-items: center; justify-content: center; font-size: 8rem; box-shadow: 0 40px 80px rgba(0,0,0,0.1); }
        .hero-card { position: absolute; background: white; padding: 20px 24px; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 16px; }
        .hero-card-1 { bottom: 40px; left: -40px; }
        .hero-card-2 { top: 40px; right: -40px; }
        .hero-card-icon { width: 50px; height: 50px; background: #f3f4f6; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
        .hero-card-text strong { display: block; font-weight: 700; color: #111827; }
        .hero-card-text span { font-size: 0.9rem; color: #6b7280; }
        
        /* Section Styles */
        section { padding: 120px 0; }
        .section-header { text-align: center; margin-bottom: 80px; }
        .section-label { display: inline-block; background: #f3f4f6; color: #374151; padding: 8px 20px; border-radius: 50px; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
        .section-title { font-size: 3rem; font-weight: 800; color: #111827; margin-bottom: 20px; letter-spacing: -0.02em; }
        .section-desc { font-size: 1.15rem; color: #6b7280; max-width: 600px; margin: 0 auto; }
        
        /* Services */
        .services { background: #fafafa; }
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        .service-card { background: white; padding: 48px 40px; border-radius: 20px; transition: all 0.4s; border: 1px solid #f3f4f6; }
        .service-card:hover { transform: translateY(-10px); box-shadow: 0 30px 60px rgba(0,0,0,0.1); border-color: #e5e7eb; }
        .service-icon { width: 70px; height: 70px; background: #f3f4f6; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 28px; transition: all 0.3s; }
        .service-card:hover .service-icon { background: #111827; transform: scale(1.1); }
        .service-card h3 { font-size: 1.4rem; font-weight: 700; margin-bottom: 16px; color: #111827; }
        .service-card p { color: #6b7280; line-height: 1.8; margin-bottom: 24px; }
        .service-link { color: #111827; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: gap 0.3s; }
        .service-link:hover { gap: 12px; }
        
        /* About */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: center; }
        .about-image { position: relative; }
        .about-image-main { width: 100%; height: 600px; background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border-radius: 24px; display: flex; align-items: center; justify-content: center; font-size: 6rem; }
        .about-stats { position: absolute; bottom: -30px; left: -30px; right: 30px; background: white; padding: 30px 40px; border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.1); display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
        .about-stat { text-align: center; }
        .about-stat-number { font-size: 2.5rem; font-weight: 800; color: #111827; }
        .about-stat-label { font-size: 0.9rem; color: #6b7280; }
        .about-content h2 { font-size: 2.8rem; font-weight: 800; color: #111827; margin-bottom: 24px; line-height: 1.2; }
        .about-content > p { font-size: 1.1rem; color: #6b7280; line-height: 1.9; margin-bottom: 20px; }
        .about-features { margin-top: 40px; display: flex; flex-direction: column; gap: 20px; }
        .about-feature { display: flex; align-items: flex-start; gap: 16px; }
        .about-feature-icon { width: 28px; height: 28px; background: #111827; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem; flex-shrink: 0; margin-top: 2px; }
        .about-feature-text strong { display: block; color: #111827; font-weight: 600; margin-bottom: 4px; }
        .about-feature-text span { color: #6b7280; font-size: 0.95rem; }
        
        /* Team */
        .team { background: #fafafa; }
        .team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
        .team-card { background: white; border-radius: 20px; overflow: hidden; transition: all 0.4s; }
        .team-card:hover { transform: translateY(-10px); box-shadow: 0 30px 60px rgba(0,0,0,0.1); }
        .team-image { width: 100%; height: 280px; background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); display: flex; align-items: center; justify-content: center; font-size: 4rem; }
        .team-info { padding: 28px; text-align: center; }
        .team-info h4 { font-size: 1.2rem; font-weight: 700; color: #111827; margin-bottom: 6px; }
        .team-role { color: #6b7280; font-size: 0.95rem; margin-bottom: 16px; }
        .team-social { display: flex; justify-content: center; gap: 12px; }
        .team-social a { width: 36px; height: 36px; background: #f3f4f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #6b7280; text-decoration: none; transition: all 0.3s; font-size: 0.9rem; }
        .team-social a:hover { background: #111827; color: white; }
        
        /* Testimonials */
        .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        .testimonial-card { background: #fafafa; padding: 40px; border-radius: 20px; position: relative; }
        .testimonial-quote { font-size: 4rem; color: #e5e7eb; position: absolute; top: 20px; right: 30px; font-family: Georgia, serif; }
        .testimonial-stars { color: #fbbf24; margin-bottom: 20px; font-size: 1.1rem; letter-spacing: 2px; }
        .testimonial-text { color: #374151; font-size: 1.05rem; line-height: 1.8; margin-bottom: 24px; font-style: italic; }
        .testimonial-author { display: flex; align-items: center; gap: 16px; }
        .testimonial-avatar { width: 50px; height: 50px; background: #e5e7eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
        .testimonial-author-info strong { display: block; color: #111827; font-weight: 600; }
        .testimonial-author-info span { color: #6b7280; font-size: 0.9rem; }
        
        /* CTA */
        .cta { background: #111827; color: white; padding: 100px 0; }
        .cta-content { text-align: center; max-width: 700px; margin: 0 auto; }
        .cta h2 { font-size: 3rem; font-weight: 800; margin-bottom: 20px; }
        .cta p { font-size: 1.2rem; opacity: 0.8; margin-bottom: 40px; }
        .cta-buttons { display: flex; justify-content: center; gap: 16px; }
        
        /* Contact */
        .contact { background: #fafafa; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; }
        .contact-info h2 { font-size: 2.5rem; font-weight: 800; color: #111827; margin-bottom: 20px; }
        .contact-info > p { color: #6b7280; font-size: 1.1rem; line-height: 1.8; margin-bottom: 40px; }
        .contact-items { display: flex; flex-direction: column; gap: 24px; }
        .contact-item { display: flex; align-items: center; gap: 20px; }
        .contact-item-icon { width: 60px; height: 60px; background: white; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .contact-item-text strong { display: block; color: #111827; font-weight: 600; margin-bottom: 4px; }
        .contact-item-text span { color: #6b7280; }
        .contact-form { background: white; padding: 50px; border-radius: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.08); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .form-group { margin-bottom: 24px; }
        .form-group label { display: block; font-weight: 600; color: #111827; margin-bottom: 10px; font-size: 0.95rem; }
        .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 16px 20px; border: 2px solid #f3f4f6; border-radius: 12px; font-size: 1rem; transition: all 0.3s; font-family: inherit; background: #fafafa; }
        .form-group input:focus, .form-group textarea:focus, .form-group select:focus { outline: none; border-color: #111827; background: white; }
        .form-group textarea { min-height: 150px; resize: vertical; }
        
        /* Footer */
        footer { background: #111827; color: white; padding: 80px 0 30px; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; margin-bottom: 60px; }
        .footer-brand .logo { color: white; margin-bottom: 20px; }
        .footer-brand p { color: #9ca3af; line-height: 1.8; }
        .footer-column h4 { font-weight: 700; margin-bottom: 24px; font-size: 1.1rem; }
        .footer-column a { display: block; color: #9ca3af; text-decoration: none; padding: 8px 0; transition: all 0.3s; }
        .footer-column a:hover { color: white; padding-left: 5px; }
        .footer-bottom { border-top: 1px solid #374151; padding-top: 30px; display: flex; justify-content: space-between; align-items: center; color: #9ca3af; font-size: 0.9rem; }
        .footer-legal { display: flex; gap: 30px; }
        .footer-legal a { color: #9ca3af; text-decoration: none; transition: color 0.3s; }
        .footer-legal a:hover { color: white; }
        
        /* Responsive */
        @media (max-width: 1024px) {
            .hero-grid, .about-grid, .contact-grid { grid-template-columns: 1fr; gap: 60px; }
            .services-grid { grid-template-columns: repeat(2, 1fr); }
            .team-grid { grid-template-columns: repeat(2, 1fr); }
            .footer-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
            .nav-links { display: none; }
            .hero h1 { font-size: 2.5rem; }
            .hero { padding: 140px 0 80px; }
            section { padding: 80px 0; }
            .section-title { font-size: 2.2rem; }
            .services-grid, .team-grid, .testimonials-grid { grid-template-columns: 1fr; }
            .hero-card { display: none; }
            .about-stats { position: relative; bottom: 0; left: 0; right: 0; margin-top: 30px; }
            .form-row { grid-template-columns: 1fr; }
            .footer-grid { grid-template-columns: 1fr; }
            .footer-bottom { flex-direction: column; gap: 20px; text-align: center; }
            .cta-buttons { flex-direction: column; }
        }
    </style>
</head>
<body>
    <nav>
        <div class="container nav-container">
            <div class="logo">
                <div class="logo-icon">🦷</div>
                Dr. Schmidt
            </div>
            <ul class="nav-links">
                <li><a href="#leistungen">Leistungen</a></li>
                <li><a href="#ueber">Über uns</a></li>
                <li><a href="#team">Team</a></li>
                <li><a href="#bewertungen">Bewertungen</a></li>
                <li><a href="#kontakt">Kontakt</a></li>
            </ul>
            <a href="#kontakt" class="nav-cta">Termin buchen</a>
        </div>
    </nav>

    <section class="hero">
        <div class="container">
            <div class="hero-grid">
                <div class="hero-content">
                    <div class="hero-badge">
                        <span class="hero-badge-dot"></span>
                        Jetzt Termine verfügbar
                    </div>
                    <h1>Moderne Zahnmedizin für Ihre Gesundheit</h1>
                    <p>Willkommen in unserer Praxis in Oranienburg. Mit modernster Technologie und einfühlsamer Betreuung sorgen wir für Ihr strahlendes Lächeln.</p>
                    <div class="hero-buttons">
                        <a href="#kontakt" class="btn">Termin vereinbaren →</a>
                        <a href="#leistungen" class="btn btn-outline">Unsere Leistungen</a>
                    </div>
                </div>
                <div class="hero-image">
                    <div class="hero-image-main">🦷</div>
                    <div class="hero-card hero-card-1">
                        <div class="hero-card-icon">⭐</div>
                        <div class="hero-card-text">
                            <strong>4.9 von 5</strong>
                            <span>120+ Bewertungen</span>
                        </div>
                    </div>
                    <div class="hero-card hero-card-2">
                        <div class="hero-card-icon">✓</div>
                        <div class="hero-card-text">
                            <strong>25+ Jahre</strong>
                            <span>Erfahrung</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="services" id="leistungen">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Unsere Leistungen</span>
                <h2 class="section-title">Zahnmedizin auf höchstem Niveau</h2>
                <p class="section-desc">Von der Prophylaxe bis zur Implantologie – wir bieten das volle Spektrum moderner Zahnmedizin.</p>
            </div>
            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon">🔍</div>
                    <h3>Prophylaxe & Vorsorge</h3>
                    <p>Regelmäßige Kontrollen und professionelle Zahnreinigung für langfristige Zahngesundheit.</p>
                    <a href="#" class="service-link">Mehr erfahren →</a>
                </div>
                <div class="service-card">
                    <div class="service-icon">💎</div>
                    <h3>Ästhetische Zahnmedizin</h3>
                    <p>Bleaching, Veneers und unsichtbare Zahnkorrekturen für Ihr perfektes Lächeln.</p>
                    <a href="#" class="service-link">Mehr erfahren →</a>
                </div>
                <div class="service-card">
                    <div class="service-icon">🔧</div>
                    <h3>Implantologie</h3>
                    <p>Hochwertige Zahnimplantate für natürliche Ästhetik und volle Funktionalität.</p>
                    <a href="#" class="service-link">Mehr erfahren →</a>
                </div>
                <div class="service-card">
                    <div class="service-icon">👶</div>
                    <h3>Kinderzahnheilkunde</h3>
                    <p>Einfühlsame Behandlung der kleinen Patienten in entspannter Atmosphäre.</p>
                    <a href="#" class="service-link">Mehr erfahren →</a>
                </div>
                <div class="service-card">
                    <div class="service-icon">🦴</div>
                    <h3>Parodontologie</h3>
                    <p>Behandlung von Zahnfleischerkrankungen für den Erhalt Ihrer natürlichen Zähne.</p>
                    <a href="#" class="service-link">Mehr erfahren →</a>
                </div>
                <div class="service-card">
                    <div class="service-icon">😴</div>
                    <h3>Behandlung im Schlaf</h3>
                    <p>Angstfreie Behandlung unter Sedierung für entspannte Zahnarztbesuche.</p>
                    <a href="#" class="service-link">Mehr erfahren →</a>
                </div>
            </div>
        </div>
    </section>

    <section class="about" id="ueber">
        <div class="container">
            <div class="about-grid">
                <div class="about-image">
                    <div class="about-image-main">👨‍⚕️</div>
                    <div class="about-stats">
                        <div class="about-stat">
                            <div class="about-stat-number">25+</div>
                            <div class="about-stat-label">Jahre Erfahrung</div>
                        </div>
                        <div class="about-stat">
                            <div class="about-stat-number">15k+</div>
                            <div class="about-stat-label">Behandlungen</div>
                        </div>
                        <div class="about-stat">
                            <div class="about-stat-number">98%</div>
                            <div class="about-stat-label">Zufriedenheit</div>
                        </div>
                    </div>
                </div>
                <div class="about-content">
                    <span class="section-label">Über unsere Praxis</span>
                    <h2>Ihr Wohlbefinden steht bei uns an erster Stelle</h2>
                    <p>Seit über 25 Jahren vertrauen uns Patienten aus Oranienburg und Umgebung ihre Zahngesundheit an. Unsere Praxis verbindet modernste Technologie mit persönlicher, einfühlsamer Betreuung.</p>
                    <p>Wir nehmen uns Zeit für Sie und erklären jeden Behandlungsschritt verständlich. In unseren hellen, freundlichen Räumlichkeiten fühlen Sie sich von Anfang an wohl.</p>
                    <div class="about-features">
                        <div class="about-feature">
                            <div class="about-feature-icon">✓</div>
                            <div class="about-feature-text">
                                <strong>Modernste Ausstattung</strong>
                                <span>Digitales Röntgen, 3D-Diagnostik & Laser-Behandlung</span>
                            </div>
                        </div>
                        <div class="about-feature">
                            <div class="about-feature-icon">✓</div>
                            <div class="about-feature-text">
                                <strong>Barrierefreier Zugang</strong>
                                <span>Ebenerdiger Eingang und breite Türen</span>
                            </div>
                        </div>
                        <div class="about-feature">
                            <div class="about-feature-icon">✓</div>
                            <div class="about-feature-text">
                                <strong>Flexible Termine</strong>
                                <span>Auch abends und samstags nach Vereinbarung</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="team" id="team">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Unser Team</span>
                <h2 class="section-title">Die Menschen hinter Ihrem Lächeln</h2>
                <p class="section-desc">Unser erfahrenes Team aus Zahnärzten und Fachpersonal freut sich auf Sie.</p>
            </div>
            <div class="team-grid">
                <div class="team-card">
                    <div class="team-image">👨‍⚕️</div>
                    <div class="team-info">
                        <h4>Dr. Frank Schmidt</h4>
                        <div class="team-role">Zahnarzt & Praxisinhaber</div>
                        <div class="team-social">
                            <a href="#">in</a>
                            <a href="#">✉</a>
                        </div>
                    </div>
                </div>
                <div class="team-card">
                    <div class="team-image">👩‍⚕️</div>
                    <div class="team-info">
                        <h4>Dr. Anna Müller</h4>
                        <div class="team-role">Zahnärztin, Implantologie</div>
                        <div class="team-social">
                            <a href="#">in</a>
                            <a href="#">✉</a>
                        </div>
                    </div>
                </div>
                <div class="team-card">
                    <div class="team-image">👩‍⚕️</div>
                    <div class="team-info">
                        <h4>Sandra Weber</h4>
                        <div class="team-role">Zahnmedizinische Fachangestellte</div>
                        <div class="team-social">
                            <a href="#">in</a>
                            <a href="#">✉</a>
                        </div>
                    </div>
                </div>
                <div class="team-card">
                    <div class="team-image">👩‍⚕️</div>
                    <div class="team-info">
                        <h4>Lisa Hoffmann</h4>
                        <div class="team-role">Prophylaxe-Assistentin</div>
                        <div class="team-social">
                            <a href="#">in</a>
                            <a href="#">✉</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="testimonials" id="bewertungen">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Bewertungen</span>
                <h2 class="section-title">Was unsere Patienten sagen</h2>
                <p class="section-desc">Über 120 zufriedene Patienten bewerten uns mit durchschnittlich 4.9 Sternen.</p>
            </div>
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <div class="testimonial-quote">"</div>
                    <div class="testimonial-stars">★★★★★</div>
                    <p class="testimonial-text">Endlich ein Zahnarzt, bei dem ich keine Angst mehr habe! Das gesamte Team ist unglaublich freundlich und einfühlsam.</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">👩</div>
                        <div class="testimonial-author-info">
                            <strong>Maria K.</strong>
                            <span>Patientin seit 2019</span>
                        </div>
                    </div>
                </div>
                <div class="testimonial-card">
                    <div class="testimonial-quote">"</div>
                    <div class="testimonial-stars">★★★★★</div>
                    <p class="testimonial-text">Meine Implantate sind perfekt! Die Beratung war ausführlich und das Ergebnis übertrifft meine Erwartungen.</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">👨</div>
                        <div class="testimonial-author-info">
                            <strong>Thomas B.</strong>
                            <span>Patient seit 2020</span>
                        </div>
                    </div>
                </div>
                <div class="testimonial-card">
                    <div class="testimonial-quote">"</div>
                    <div class="testimonial-stars">★★★★★</div>
                    <p class="testimonial-text">Kurze Wartezeiten, moderne Praxis und ein Team, das sich wirklich Zeit nimmt. Absolut empfehlenswert!</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">👩</div>
                        <div class="testimonial-author-info">
                            <strong>Sandra M.</strong>
                            <span>Patientin seit 2018</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="cta">
        <div class="container">
            <div class="cta-content">
                <h2>Bereit für Ihr strahlendes Lächeln?</h2>
                <p>Vereinbaren Sie jetzt Ihren Termin – wir freuen uns auf Sie!</p>
                <div class="cta-buttons">
                    <a href="#kontakt" class="btn btn-white">Termin vereinbaren →</a>
                    <a href="tel:+4933011234567" class="btn btn-outline" style="border-color: white; color: white;">+49 3301 123456</a>
                </div>
            </div>
        </div>
    </section>

    <section class="contact" id="kontakt">
        <div class="container">
            <div class="contact-grid">
                <div class="contact-info">
                    <span class="section-label">Kontakt</span>
                    <h2>Wir sind für Sie da</h2>
                    <p>Haben Sie Fragen oder möchten einen Termin vereinbaren? Kontaktieren Sie uns – wir helfen Ihnen gerne weiter.</p>
                    <div class="contact-items">
                        <div class="contact-item">
                            <div class="contact-item-icon">📍</div>
                            <div class="contact-item-text">
                                <strong>Adresse</strong>
                                <span>Königstraße 42, 16515 Oranienburg</span>
                            </div>
                        </div>
                        <div class="contact-item">
                            <div class="contact-item-icon">📞</div>
                            <div class="contact-item-text">
                                <strong>Telefon</strong>
                                <span>+49 (0) 3301 123456</span>
                            </div>
                        </div>
                        <div class="contact-item">
                            <div class="contact-item-icon">✉️</div>
                            <div class="contact-item-text">
                                <strong>E-Mail</strong>
                                <span>info@dr-schmidt-zahnarzt.de</span>
                            </div>
                        </div>
                        <div class="contact-item">
                            <div class="contact-item-icon">🕐</div>
                            <div class="contact-item-text">
                                <strong>Öffnungszeiten</strong>
                                <span>Mo-Fr: 08:00-18:00, Sa: nach Vereinbarung</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="contact-form">
                    <h3 style="font-size: 1.5rem; margin-bottom: 30px; color: #111827;">Termin anfragen</h3>
                    <form>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Vorname</label>
                                <input type="text" placeholder="Ihr Vorname">
                            </div>
                            <div class="form-group">
                                <label>Nachname</label>
                                <input type="text" placeholder="Ihr Nachname">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>E-Mail</label>
                                <input type="email" placeholder="ihre@email.de">
                            </div>
                            <div class="form-group">
                                <label>Telefon</label>
                                <input type="tel" placeholder="+49 123 456789">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Gewünschte Behandlung</label>
                            <select>
                                <option>Bitte wählen...</option>
                                <option>Kontrolluntersuchung</option>
                                <option>Professionelle Zahnreinigung</option>
                                <option>Zahnschmerzen / Akut</option>
                                <option>Implantologie</option>
                                <option>Ästhetische Behandlung</option>
                                <option>Sonstiges</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Ihre Nachricht</label>
                            <textarea placeholder="Beschreiben Sie kurz Ihr Anliegen..."></textarea>
                        </div>
                        <button type="submit" class="btn" style="width: 100%;">Anfrage senden →</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div class="logo">
                        <div class="logo-icon">🦷</div>
                        Dr. Schmidt
                    </div>
                    <p>Ihre Zahnarztpraxis in Oranienburg. Moderne Zahnmedizin mit persönlicher Betreuung seit über 25 Jahren.</p>
                </div>
                <div class="footer-column">
                    <h4>Leistungen</h4>
                    <a href="#">Prophylaxe</a>
                    <a href="#">Implantologie</a>
                    <a href="#">Ästhetik</a>
                    <a href="#">Kinderzahnarzt</a>
                </div>
                <div class="footer-column">
                    <h4>Praxis</h4>
                    <a href="#">Über uns</a>
                    <a href="#">Team</a>
                    <a href="#">Karriere</a>
                    <a href="#">Bewertungen</a>
                </div>
                <div class="footer-column">
                    <h4>Kontakt</h4>
                    <a href="#">Königstraße 42</a>
                    <a href="#">16515 Oranienburg</a>
                    <a href="#">+49 3301 123456</a>
                    <a href="#">info@dr-schmidt.de</a>
                </div>
            </div>
            <div class="footer-bottom">
                <p>© 2024 Dr. Schmidt Zahnarztpraxis. Alle Rechte vorbehalten.</p>
                <div class="footer-legal">
                    <a href="#">Impressum</a>
                    <a href="#">Datenschutz</a>
                    <a href="#">AGB</a>
                </div>
            </div>
        </div>
    </footer>
    <script>
// Prevent all links from navigating away from the demo
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        // If it's an anchor link, scroll to it within the demo
        if (href && href.startsWith('#') && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

// Also prevent form submissions
document.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Dies ist nur eine Demo. In der echten Website würde das Formular funktionieren.');
});
</script>

</body>
</html>`
    },
    corporate: {
        name: 'Corporate',
        industry: 'Steuerberatung Weber & Partner',
        description: 'Seriöses, vertrauensvolles Design für professionelle Dienstleistungen',
        html: `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weber & Partner - Steuerberatung Oranienburg</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #ffffff; color: #1e293b; line-height: 1.7; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        /* Navigation */
        nav { background: #0f172a; padding: 0; position: fixed; top: 0; left: 0; right: 0; z-index: 1000; }
        .nav-top { background: #1e40af; padding: 10px 0; font-size: 0.85rem; color: rgba(255,255,255,0.9); }
        .nav-top-content { display: flex; justify-content: space-between; align-items: center; }
        .nav-top-left { display: flex; gap: 30px; }
        .nav-top-item { display: flex; align-items: center; gap: 8px; }
        .nav-main { padding: 18px 0; }
        .nav-container { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5rem; font-weight: 800; color: white; display: flex; align-items: center; gap: 12px; }
        .logo-icon { width: 45px; height: 45px; background: #1e40af; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; }
        .nav-links { display: flex; gap: 40px; list-style: none; }
        .nav-links a { text-decoration: none; color: rgba(255,255,255,0.8); font-weight: 600; font-size: 0.95rem; transition: all 0.3s; }
        .nav-links a:hover { color: white; }
        .nav-cta { background: #1e40af; color: white; padding: 14px 32px; border-radius: 8px; font-weight: 700; text-decoration: none; transition: all 0.3s; }
        .nav-cta:hover { background: #1d4ed8; transform: translateY(-2px); }
        
        /* Buttons */
        .btn { display: inline-flex; align-items: center; gap: 10px; padding: 16px 36px; background: #1e40af; color: white; border-radius: 8px; text-decoration: none; font-weight: 700; transition: all 0.3s; border: none; cursor: pointer; font-size: 1rem; }
        .btn:hover { background: #1d4ed8; transform: translateY(-3px); box-shadow: 0 15px 40px rgba(30, 64, 175, 0.3); }
        .btn-outline { background: transparent; border: 2px solid #1e40af; color: #1e40af; }
        .btn-outline:hover { background: #1e40af; color: white; }
        .btn-white { background: white; color: #1e40af; }
        .btn-white:hover { background: #f8fafc; }
        
        /* Hero */
        .hero { padding: 200px 0 120px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); position: relative; overflow: hidden; }
        .hero::before { content: ''; position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(30, 64, 175, 0.3) 0%, transparent 70%); top: -200px; right: -100px; }
        .hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 80px; align-items: center; }
        .hero-content { position: relative; z-index: 1; }
        .hero-badge { display: inline-flex; align-items: center; gap: 10px; background: rgba(30, 64, 175, 0.3); border: 1px solid rgba(30, 64, 175, 0.5); color: #60a5fa; padding: 10px 20px; border-radius: 50px; font-size: 0.9rem; font-weight: 600; margin-bottom: 28px; }
        .hero h1 { font-size: 3.5rem; font-weight: 800; line-height: 1.15; margin-bottom: 24px; color: white; }
        .hero h1 span { color: #60a5fa; }
        .hero p { font-size: 1.2rem; color: #94a3b8; margin-bottom: 40px; line-height: 1.9; }
        .hero-buttons { display: flex; gap: 16px; flex-wrap: wrap; }
        .hero-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-top: 60px; padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.1); }
        .hero-stat { text-align: center; }
        .hero-stat-number { font-size: 2.5rem; font-weight: 800; color: #60a5fa; }
        .hero-stat-label { color: #94a3b8; font-size: 0.95rem; margin-top: 5px; }
        .hero-image { position: relative; }
        .hero-image-main { width: 100%; height: 450px; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 8rem; box-shadow: 0 40px 80px rgba(0,0,0,0.3); }
        .hero-card { position: absolute; background: white; padding: 24px; border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.2); }
        .hero-card-1 { bottom: -30px; left: -30px; display: flex; align-items: center; gap: 16px; }
        .hero-card-icon { width: 55px; height: 55px; background: #1e40af; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; }
        .hero-card-text strong { display: block; font-weight: 700; color: #0f172a; font-size: 1.1rem; }
        .hero-card-text span { color: #64748b; font-size: 0.9rem; }
        
        /* Section Styles */
        section { padding: 120px 0; }
        .section-header { text-align: center; margin-bottom: 80px; }
        .section-label { display: inline-block; background: #eff6ff; color: #1e40af; padding: 10px 24px; border-radius: 50px; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; }
        .section-title { font-size: 2.8rem; font-weight: 800; color: #0f172a; margin-bottom: 20px; }
        .section-desc { font-size: 1.15rem; color: #64748b; max-width: 650px; margin: 0 auto; }
        
        /* Services */
        .services { background: #f8fafc; }
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
        .service-card { background: white; padding: 45px 35px; border-radius: 16px; transition: all 0.4s; border: 1px solid #e2e8f0; }
        .service-card:hover { transform: translateY(-10px); box-shadow: 0 25px 60px rgba(0,0,0,0.08); border-color: #1e40af; }
        .service-icon { width: 70px; height: 70px; background: #eff6ff; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 28px; transition: all 0.3s; }
        .service-card:hover .service-icon { background: #1e40af; transform: scale(1.1); }
        .service-card h3 { font-size: 1.35rem; font-weight: 700; margin-bottom: 16px; color: #0f172a; }
        .service-card p { color: #64748b; line-height: 1.8; margin-bottom: 24px; }
        .service-link { color: #1e40af; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: gap 0.3s; }
        .service-link:hover { gap: 14px; }
        
        /* About */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: center; }
        .about-image { position: relative; }
        .about-image-main { width: 100%; height: 550px; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 6rem; }
        .about-experience { position: absolute; bottom: -30px; right: -30px; background: #0f172a; color: white; padding: 35px 45px; border-radius: 16px; text-align: center; }
        .about-experience-number { font-size: 3.5rem; font-weight: 800; color: #60a5fa; }
        .about-experience-text { font-size: 1rem; opacity: 0.9; }
        .about-content h2 { font-size: 2.5rem; font-weight: 800; color: #0f172a; margin-bottom: 24px; line-height: 1.25; }
        .about-content > p { font-size: 1.1rem; color: #64748b; line-height: 1.9; margin-bottom: 20px; }
        .about-list { margin-top: 35px; display: flex; flex-direction: column; gap: 18px; }
        .about-list-item { display: flex; align-items: center; gap: 16px; }
        .about-list-icon { width: 28px; height: 28px; background: #1e40af; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem; flex-shrink: 0; }
        .about-list-item span { color: #334155; font-weight: 500; }
        
        /* Team */
        .team { background: #f8fafc; }
        .team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; }
        .team-card { background: white; border-radius: 16px; overflow: hidden; transition: all 0.4s; border: 1px solid #e2e8f0; }
        .team-card:hover { transform: translateY(-10px); box-shadow: 0 25px 60px rgba(0,0,0,0.08); }
        .team-image { width: 100%; height: 280px; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); display: flex; align-items: center; justify-content: center; font-size: 4rem; }
        .team-info { padding: 28px; text-align: center; }
        .team-info h4 { font-size: 1.15rem; font-weight: 700; color: #0f172a; margin-bottom: 6px; }
        .team-role { color: #1e40af; font-size: 0.9rem; font-weight: 600; margin-bottom: 16px; }
        .team-contact { display: flex; justify-content: center; gap: 12px; }
        .team-contact a { width: 40px; height: 40px; background: #eff6ff; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #1e40af; text-decoration: none; transition: all 0.3s; }
        .team-contact a:hover { background: #1e40af; color: white; }
        
        /* Testimonials */
        .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
        .testimonial-card { background: #f8fafc; padding: 40px; border-radius: 16px; position: relative; border: 1px solid #e2e8f0; }
        .testimonial-rating { color: #f59e0b; margin-bottom: 20px; font-size: 1.1rem; letter-spacing: 3px; }
        .testimonial-text { color: #334155; font-size: 1.05rem; line-height: 1.85; margin-bottom: 28px; }
        .testimonial-author { display: flex; align-items: center; gap: 16px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
        .testimonial-avatar { width: 55px; height: 55px; background: #1e40af; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.4rem; font-weight: 700; }
        .testimonial-info strong { display: block; color: #0f172a; font-weight: 700; }
        .testimonial-info span { color: #64748b; font-size: 0.9rem; }
        
        /* CTA */
        .cta { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 100px 0; }
        .cta-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 80px; align-items: center; }
        .cta-content h2 { font-size: 2.8rem; font-weight: 800; color: white; margin-bottom: 20px; }
        .cta-content p { font-size: 1.2rem; color: #94a3b8; margin-bottom: 35px; line-height: 1.8; }
        .cta-features { display: flex; gap: 40px; margin-top: 40px; }
        .cta-feature { display: flex; align-items: center; gap: 12px; color: white; }
        .cta-feature-icon { width: 24px; height: 24px; background: #1e40af; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; }
        .cta-form { background: white; padding: 45px; border-radius: 20px; }
        .cta-form h3 { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin-bottom: 8px; }
        .cta-form > p { color: #64748b; margin-bottom: 30px; }
        .cta-form .form-group { margin-bottom: 20px; }
        .cta-form label { display: block; font-weight: 600; color: #0f172a; margin-bottom: 8px; font-size: 0.95rem; }
        .cta-form input, .cta-form select, .cta-form textarea { width: 100%; padding: 14px 18px; border: 2px solid #e2e8f0; border-radius: 10px; font-size: 1rem; transition: all 0.3s; font-family: inherit; }
        .cta-form input:focus, .cta-form select:focus, .cta-form textarea:focus { outline: none; border-color: #1e40af; }
        .cta-form textarea { min-height: 100px; resize: vertical; }
        
        /* Contact */
        .contact { background: #f8fafc; }
        .contact-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; }
        .contact-card { background: white; padding: 40px 30px; border-radius: 16px; text-align: center; border: 1px solid #e2e8f0; transition: all 0.3s; }
        .contact-card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(0,0,0,0.06); border-color: #1e40af; }
        .contact-card-icon { width: 70px; height: 70px; background: #eff6ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 20px; }
        .contact-card h4 { font-size: 1.1rem; font-weight: 700; color: #0f172a; margin-bottom: 10px; }
        .contact-card p { color: #64748b; font-size: 0.95rem; line-height: 1.7; }
        .contact-card a { color: #1e40af; text-decoration: none; font-weight: 600; }
        
        /* Footer */
        footer { background: #0f172a; color: white; padding: 80px 0 30px; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; margin-bottom: 60px; }
        .footer-brand .logo { margin-bottom: 20px; }
        .footer-brand p { color: #94a3b8; line-height: 1.8; }
        .footer-column h4 { font-weight: 700; margin-bottom: 24px; font-size: 1.05rem; }
        .footer-column a { display: block; color: #94a3b8; text-decoration: none; padding: 8px 0; transition: all 0.3s; }
        .footer-column a:hover { color: white; padding-left: 5px; }
        .footer-bottom { border-top: 1px solid #1e293b; padding-top: 30px; display: flex; justify-content: space-between; align-items: center; color: #64748b; font-size: 0.9rem; }
        .footer-legal { display: flex; gap: 30px; }
        .footer-legal a { color: #64748b; text-decoration: none; transition: color 0.3s; }
        .footer-legal a:hover { color: white; }
        
        /* Responsive */
        @media (max-width: 1024px) {
            .hero-grid, .about-grid, .cta-grid { grid-template-columns: 1fr; gap: 60px; }
            .services-grid { grid-template-columns: repeat(2, 1fr); }
            .team-grid { grid-template-columns: repeat(2, 1fr); }
            .contact-grid { grid-template-columns: repeat(2, 1fr); }
            .footer-grid { grid-template-columns: repeat(2, 1fr); }
            .nav-top { display: none; }
        }
        @media (max-width: 768px) {
            .nav-links { display: none; }
            .hero h1 { font-size: 2.3rem; }
            .hero { padding: 140px 0 80px; }
            section { padding: 80px 0; }
            .section-title { font-size: 2rem; }
            .services-grid, .team-grid, .testimonials-grid, .contact-grid { grid-template-columns: 1fr; }
            .hero-stats { grid-template-columns: 1fr; gap: 20px; }
            .hero-card { display: none; }
            .about-experience { position: relative; bottom: 0; right: 0; margin-top: 20px; }
            .footer-grid { grid-template-columns: 1fr; }
            .footer-bottom { flex-direction: column; gap: 20px; text-align: center; }
            .cta-features { flex-direction: column; gap: 16px; }
        }
    </style>
</head>
<body>
    <nav>
        <div class="nav-top">
            <div class="container nav-top-content">
                <div class="nav-top-left">
                    <span class="nav-top-item">📞 +49 (0) 3301 456789</span>
                    <span class="nav-top-item">✉️ info@weber-partner.de</span>
                </div>
                <div>Mo-Fr: 08:00 - 18:00 Uhr</div>
            </div>
        </div>
        <div class="nav-main">
            <div class="container nav-container">
                <div class="logo"><div class="logo-icon">⚖️</div> Weber & Partner</div>
                <ul class="nav-links">
                    <li><a href="#leistungen">Leistungen</a></li>
                    <li><a href="#kanzlei">Kanzlei</a></li>
                    <li><a href="#team">Team</a></li>
                    <li><a href="#referenzen">Referenzen</a></li>
                    <li><a href="#kontakt">Kontakt</a></li>
                </ul>
                <a href="#kontakt" class="nav-cta">Beratungstermin</a>
            </div>
        </div>
    </nav>

    <section class="hero">
        <div class="container">
            <div class="hero-grid">
                <div class="hero-content">
                    <div class="hero-badge">✓ Erstberatung kostenlos</div>
                    <h1>Steuerberatung mit <span>Weitblick</span> für Ihren Erfolg</h1>
                    <p>Seit über 30 Jahren sind wir Ihr zuverlässiger Partner in allen steuerlichen Angelegenheiten. Kompetent, persönlich und zukunftsorientiert.</p>
                    <div class="hero-buttons">
                        <a href="#kontakt" class="btn">Kostenlose Erstberatung →</a>
                        <a href="#leistungen" class="btn btn-outline" style="border-color: rgba(255,255,255,0.3); color: white;">Leistungen ansehen</a>
                    </div>
                    <div class="hero-stats">
                        <div class="hero-stat"><div class="hero-stat-number">30+</div><div class="hero-stat-label">Jahre Erfahrung</div></div>
                        <div class="hero-stat"><div class="hero-stat-number">500+</div><div class="hero-stat-label">Zufriedene Mandanten</div></div>
                        <div class="hero-stat"><div class="hero-stat-number">15</div><div class="hero-stat-label">Experten im Team</div></div>
                    </div>
                </div>
                <div class="hero-image">
                    <div class="hero-image-main">📊</div>
                    <div class="hero-card hero-card-1">
                        <div class="hero-card-icon">✓</div>
                        <div class="hero-card-text"><strong>DATEV-Partner</strong><span>Zertifizierte Kanzlei</span></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="services" id="leistungen">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Leistungen</span>
                <h2 class="section-title">Umfassende Steuerberatung</h2>
                <p class="section-desc">Von der Buchhaltung bis zur strategischen Steuerplanung – wir bieten alle Leistungen aus einer Hand.</p>
            </div>
            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon">📋</div>
                    <h3>Finanzbuchhaltung</h3>
                    <p>Laufende Buchführung, Kontierung und Auswertungen für den optimalen Überblick.</p>
                    <a href="#" class="service-link">Mehr erfahren →</a>
                </div>
                <div class="service-card">
                    <div class="service-icon">📄</div>
                    <h3>Jahresabschlüsse</h3>
                    <p>Erstellung von Bilanzen, GuV und Jahresabschlüssen nach HGB.</p>
                    <a href="#" class="service-link">Mehr erfahren →</a>
                </div>
                <div class="service-card">
                    <div class="service-icon">💼</div>
                    <h3>Steuererklärungen</h3>
                    <p>Private und betriebliche Steuererklärungen für optimale Steuergestaltung.</p>
                    <a href="#" class="service-link">Mehr erfahren →</a>
                </div>
                <div class="service-card">
                    <div class="service-icon">👥</div>
                    <h3>Lohnbuchhaltung</h3>
                    <p>Komplette Lohn- und Gehaltsabrechnung mit allen Meldungen.</p>
                    <a href="#" class="service-link">Mehr erfahren →</a>
                </div>
                <div class="service-card">
                    <div class="service-icon">🏢</div>
                    <h3>Existenzgründung</h3>
                    <p>Beratung und Begleitung von der Geschäftsidee bis zum erfolgreichen Start.</p>
                    <a href="#" class="service-link">Mehr erfahren →</a>
                </div>
                <div class="service-card">
                    <div class="service-icon">🔍</div>
                    <h3>Betriebsprüfungen</h3>
                    <p>Professionelle Begleitung und Vertretung bei Finanzamtsprüfungen.</p>
                    <a href="#" class="service-link">Mehr erfahren →</a>
                </div>
            </div>
        </div>
    </section>

    <section class="about" id="kanzlei">
        <div class="container">
            <div class="about-grid">
                <div class="about-image">
                    <div class="about-image-main">🏛️</div>
                    <div class="about-experience"><div class="about-experience-number">30+</div><div class="about-experience-text">Jahre Erfahrung</div></div>
                </div>
                <div class="about-content">
                    <span class="section-label">Über uns</span>
                    <h2>Ihre Kanzlei in Oranienburg</h2>
                    <p>Die Steuerkanzlei Weber & Partner wurde 1994 gegründet und hat sich zu einer der führenden Kanzleien in der Region entwickelt. Unser Team aus erfahrenen Steuerberatern und Fachkräften betreut Mandanten aller Größenordnungen.</p>
                    <p>Wir verbinden traditionelle Werte wie Zuverlässigkeit und persönliche Betreuung mit modernsten digitalen Lösungen für eine effiziente Zusammenarbeit.</p>
                    <div class="about-list">
                        <div class="about-list-item"><div class="about-list-icon">✓</div><span>Zertifizierter DATEV-Partner</span></div>
                        <div class="about-list-item"><div class="about-list-icon">✓</div><span>Digitale Belegerfassung & Cloud-Lösungen</span></div>
                        <div class="about-list-item"><div class="about-list-icon">✓</div><span>Persönlicher Ansprechpartner für jeden Mandanten</span></div>
                        <div class="about-list-item"><div class="about-list-icon">✓</div><span>Regelmäßige Fortbildungen & Spezialisierungen</span></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="team" id="team">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Unser Team</span>
                <h2 class="section-title">Kompetenz & Erfahrung</h2>
                <p class="section-desc">Lernen Sie die Menschen kennen, die sich um Ihre Finanzen kümmern.</p>
            </div>
            <div class="team-grid">
                <div class="team-card">
                    <div class="team-image">👨‍💼</div>
                    <div class="team-info">
                        <h4>StB Thomas Weber</h4>
                        <div class="team-role">Geschäftsführender Partner</div>
                        <div class="team-contact"><a href="#">✉</a><a href="#">in</a></div>
                    </div>
                </div>
                <div class="team-card">
                    <div class="team-image">👩‍💼</div>
                    <div class="team-info">
                        <h4>StB Dr. Anna Fischer</h4>
                        <div class="team-role">Partnerin, Int. Steuerrecht</div>
                        <div class="team-contact"><a href="#">✉</a><a href="#">in</a></div>
                    </div>
                </div>
                <div class="team-card">
                    <div class="team-image">👨‍💼</div>
                    <div class="team-info">
                        <h4>StB Michael Braun</h4>
                        <div class="team-role">Partner, Unternehmensberatung</div>
                        <div class="team-contact"><a href="#">✉</a><a href="#">in</a></div>
                    </div>
                </div>
                <div class="team-card">
                    <div class="team-image">👩‍💼</div>
                    <div class="team-info">
                        <h4>Dipl.-Kffr. Lisa Schulz</h4>
                        <div class="team-role">Teamleiterin Buchhaltung</div>
                        <div class="team-contact"><a href="#">✉</a><a href="#">in</a></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="testimonials" id="referenzen">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Referenzen</span>
                <h2 class="section-title">Das sagen unsere Mandanten</h2>
                <p class="section-desc">Vertrauen entsteht durch Leistung. Erfahren Sie, was unsere Mandanten über uns sagen.</p>
            </div>
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <div class="testimonial-rating">★★★★★</div>
                    <p class="testimonial-text">Seit 15 Jahren betreut Weber & Partner unser Unternehmen. Die Beratung ist immer kompetent und proaktiv. Absolute Empfehlung!</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">MK</div>
                        <div class="testimonial-info"><strong>Martin Krüger</strong><span>Geschäftsführer, Krüger GmbH</span></div>
                    </div>
                </div>
                <div class="testimonial-card">
                    <div class="testimonial-rating">★★★★★</div>
                    <p class="testimonial-text">Die digitale Zusammenarbeit funktioniert perfekt. Belege hochladen und fertig. So stelle ich mir moderne Steuerberatung vor.</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">SH</div>
                        <div class="testimonial-info"><strong>Sandra Hoffmann</strong><span>Freiberuflerin</span></div>
                    </div>
                </div>
                <div class="testimonial-card">
                    <div class="testimonial-rating">★★★★★</div>
                    <p class="testimonial-text">Bei meiner Existenzgründung war die Unterstützung Gold wert. Von der Rechtsformwahl bis zur ersten Steuererklärung – top beraten!</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">JL</div>
                        <div class="testimonial-info"><strong>Jan Lehmann</strong><span>Gründer, TechStart UG</span></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="cta" id="kontakt">
        <div class="container">
            <div class="cta-grid">
                <div class="cta-content">
                    <h2>Lassen Sie uns über Ihre Steuern sprechen</h2>
                    <p>Vereinbaren Sie jetzt Ihre kostenlose Erstberatung und erfahren Sie, wie wir Sie optimal unterstützen können.</p>
                    <div class="cta-features">
                        <div class="cta-feature"><div class="cta-feature-icon">✓</div> Kostenlose Erstberatung</div>
                        <div class="cta-feature"><div class="cta-feature-icon">✓</div> Unverbindliches Angebot</div>
                        <div class="cta-feature"><div class="cta-feature-icon">✓</div> Termin innerhalb 48h</div>
                    </div>
                </div>
                <div class="cta-form">
                    <h3>Termin anfragen</h3>
                    <p>Füllen Sie das Formular aus – wir melden uns umgehend.</p>
                    <form>
                        <div class="form-group"><label>Name</label><input type="text" placeholder="Ihr vollständiger Name"></div>
                        <div class="form-group"><label>E-Mail</label><input type="email" placeholder="ihre@email.de"></div>
                        <div class="form-group"><label>Telefon</label><input type="tel" placeholder="+49 123 456789"></div>
                        <div class="form-group"><label>Anliegen</label>
                            <select><option>Bitte wählen...</option><option>Steuererklärung Privat</option><option>Steuererklärung Gewerbe</option><option>Buchhaltung</option><option>Existenzgründung</option><option>Sonstiges</option></select>
                        </div>
                        <button type="submit" class="btn" style="width: 100%;">Termin anfragen →</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <section class="contact">
        <div class="container">
            <div class="contact-grid">
                <div class="contact-card">
                    <div class="contact-card-icon">📍</div>
                    <h4>Adresse</h4>
                    <p>Berliner Straße 55<br>16515 Oranienburg</p>
                </div>
                <div class="contact-card">
                    <div class="contact-card-icon">📞</div>
                    <h4>Telefon</h4>
                    <p><a href="tel:+493301456789">+49 (0) 3301 456789</a></p>
                </div>
                <div class="contact-card">
                    <div class="contact-card-icon">✉️</div>
                    <h4>E-Mail</h4>
                    <p><a href="mailto:info@weber-partner.de">info@weber-partner.de</a></p>
                </div>
                <div class="contact-card">
                    <div class="contact-card-icon">🕐</div>
                    <h4>Öffnungszeiten</h4>
                    <p>Mo-Fr: 08:00 - 18:00<br>und nach Vereinbarung</p>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div class="logo"><div class="logo-icon">⚖️</div> Weber & Partner</div>
                    <p>Ihre Steuerkanzlei in Oranienburg. Kompetente Beratung seit über 30 Jahren.</p>
                </div>
                <div class="footer-column"><h4>Leistungen</h4><a href="#">Buchhaltung</a><a href="#">Steuererklärung</a><a href="#">Jahresabschluss</a><a href="#">Lohnbuchhaltung</a></div>
                <div class="footer-column"><h4>Kanzlei</h4><a href="#">Über uns</a><a href="#">Team</a><a href="#">Karriere</a><a href="#">Referenzen</a></div>
                <div class="footer-column"><h4>Kontakt</h4><a href="#">Berliner Str. 55</a><a href="#">16515 Oranienburg</a><a href="#">+49 3301 456789</a><a href="#">info@weber-partner.de</a></div>
            </div>
            <div class="footer-bottom">
                <p>© 2024 Weber & Partner Steuerberatung. Alle Rechte vorbehalten.</p>
                <div class="footer-legal"><a href="#">Impressum</a><a href="#">Datenschutz</a><a href="#">AGB</a></div>
            </div>
        </div>
    </footer>
    <script>
// Prevent all links from navigating away from the demo
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        // If it's an anchor link, scroll to it within the demo
        if (href && href.startsWith('#') && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

// Also prevent form submissions
document.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Dies ist nur eine Demo. In der echten Website würde das Formular funktionieren.');
});
</script>

</body>
</html>`
    },

    warm: {
        name: 'Warm',
        industry: 'Café Sonnenschein',
        description: 'Einladendes, gemütliches Design für Gastronomie',
        html: `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Café Sonnenschein - Oranienburg</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Lato:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Lato', sans-serif; background: #fffbf5; color: #3d2c1e; line-height: 1.7; }
        h1, h2, h3, h4 { font-family: 'Playfair Display', serif; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        /* Navigation */
        nav { background: rgba(255, 251, 245, 0.98); padding: 20px 0; position: fixed; top: 0; left: 0; right: 0; z-index: 1000; backdrop-filter: blur(10px); border-bottom: 1px solid rgba(139, 90, 43, 0.1); }
        .nav-container { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; color: #8b5a2b; display: flex; align-items: center; gap: 12px; }
        .logo-icon { font-size: 2rem; }
        .nav-links { display: flex; gap: 40px; list-style: none; }
        .nav-links a { text-decoration: none; color: #5c4033; font-weight: 600; font-size: 0.95rem; transition: all 0.3s; position: relative; }
        .nav-links a:hover { color: #8b5a2b; }
        .nav-links a::after { content: ''; position: absolute; bottom: -5px; left: 0; width: 0; height: 2px; background: #8b5a2b; transition: width 0.3s; }
        .nav-links a:hover::after { width: 100%; }
        .nav-cta { background: #8b5a2b; color: white; padding: 14px 32px; border-radius: 50px; font-weight: 700; text-decoration: none; transition: all 0.3s; }
        .nav-cta:hover { background: #6d4522; transform: translateY(-2px); box-shadow: 0 10px 30px rgba(139, 90, 43, 0.3); }
        
        /* Buttons */
        .btn { display: inline-flex; align-items: center; gap: 10px; padding: 18px 40px; background: #8b5a2b; color: white; border-radius: 50px; text-decoration: none; font-weight: 700; transition: all 0.3s; border: none; cursor: pointer; font-size: 1rem; }
        .btn:hover { background: #6d4522; transform: translateY(-3px); box-shadow: 0 15px 40px rgba(139, 90, 43, 0.3); }
        .btn-outline { background: transparent; border: 2px solid #8b5a2b; color: #8b5a2b; }
        .btn-outline:hover { background: #8b5a2b; color: white; }
        .btn-white { background: white; color: #8b5a2b; }
        
        /* Hero */
        .hero { padding: 180px 0 120px; background: linear-gradient(180deg, #fffbf5 0%, #fff8ee 100%); position: relative; overflow: hidden; }
        .hero::before { content: '☕'; position: absolute; font-size: 30rem; opacity: 0.03; top: -50px; right: -100px; transform: rotate(-15deg); }
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .hero-content { position: relative; z-index: 1; }
        .hero-badge { display: inline-flex; align-items: center; gap: 10px; background: #fef3e2; border: 1px solid #f5d5a0; color: #8b5a2b; padding: 10px 24px; border-radius: 50px; font-size: 0.9rem; font-weight: 600; margin-bottom: 24px; }
        .hero h1 { font-size: 4rem; font-weight: 700; line-height: 1.15; margin-bottom: 24px; color: #3d2c1e; }
        .hero h1 span { color: #8b5a2b; font-style: italic; }
        .hero p { font-size: 1.25rem; color: #5c4033; margin-bottom: 40px; line-height: 1.9; }
        .hero-buttons { display: flex; gap: 16px; flex-wrap: wrap; }
        .hero-features { display: flex; gap: 40px; margin-top: 50px; }
        .hero-feature { display: flex; align-items: center; gap: 12px; }
        .hero-feature-icon { width: 50px; height: 50px; background: #fef3e2; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; }
        .hero-feature-text { font-weight: 600; color: #5c4033; }
        .hero-image { position: relative; }
        .hero-image-main { width: 100%; height: 550px; background: linear-gradient(135deg, #d4a574 0%, #8b5a2b 100%); border-radius: 200px 200px 30px 30px; display: flex; align-items: center; justify-content: center; font-size: 12rem; box-shadow: 0 40px 80px rgba(139, 90, 43, 0.2); }
        .hero-floating { position: absolute; background: white; padding: 20px 28px; border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.1); }
        .hero-floating-1 { top: 60px; left: -40px; display: flex; align-items: center; gap: 14px; }
        .hero-floating-2 { bottom: 100px; right: -40px; display: flex; align-items: center; gap: 14px; }
        .hero-floating-icon { width: 50px; height: 50px; background: #fef3e2; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
        .hero-floating-text strong { display: block; font-weight: 700; color: #3d2c1e; }
        .hero-floating-text span { font-size: 0.85rem; color: #8b5a2b; }
        
        /* Section Styles */
        section { padding: 120px 0; }
        .section-header { text-align: center; margin-bottom: 80px; }
        .section-label { display: inline-block; background: #fef3e2; color: #8b5a2b; padding: 10px 28px; border-radius: 50px; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; }
        .section-title { font-size: 3rem; font-weight: 700; color: #3d2c1e; margin-bottom: 20px; }
        .section-desc { font-size: 1.15rem; color: #5c4033; max-width: 650px; margin: 0 auto; }
        
        /* Specials */
        .specials { background: #fff8ee; }
        .specials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        .special-card { background: white; border-radius: 30px; overflow: hidden; box-shadow: 0 15px 50px rgba(0,0,0,0.05); transition: all 0.4s; }
        .special-card:hover { transform: translateY(-15px); box-shadow: 0 30px 70px rgba(139, 90, 43, 0.15); }
        .special-image { height: 220px; display: flex; align-items: center; justify-content: center; font-size: 5rem; position: relative; }
        .special-card:nth-child(1) .special-image { background: linear-gradient(135deg, #fef3e2 0%, #f5d5a0 100%); }
        .special-card:nth-child(2) .special-image { background: linear-gradient(135deg, #e8d5c4 0%, #d4a574 100%); }
        .special-card:nth-child(3) .special-image { background: linear-gradient(135deg, #f5e6d3 0%, #e8c9a0 100%); }
        .special-badge { position: absolute; top: 16px; right: 16px; background: #8b5a2b; color: white; padding: 8px 18px; border-radius: 50px; font-size: 0.8rem; font-weight: 700; }
        .special-content { padding: 32px; }
        .special-content h3 { font-size: 1.5rem; font-weight: 700; color: #3d2c1e; margin-bottom: 12px; }
        .special-content p { color: #5c4033; margin-bottom: 20px; line-height: 1.8; }
        .special-price { font-size: 1.4rem; font-weight: 700; color: #8b5a2b; }
        
        /* Menu */
        .menu-categories { display: flex; justify-content: center; gap: 16px; margin-bottom: 60px; flex-wrap: wrap; }
        .menu-cat { padding: 14px 32px; background: white; border: 2px solid #e8d5c4; border-radius: 50px; font-weight: 600; color: #5c4033; cursor: pointer; transition: all 0.3s; }
        .menu-cat:hover, .menu-cat.active { background: #8b5a2b; border-color: #8b5a2b; color: white; }
        .menu-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        .menu-item { background: white; padding: 28px 32px; border-radius: 20px; display: flex; justify-content: space-between; align-items: center; transition: all 0.3s; border: 2px solid transparent; }
        .menu-item:hover { border-color: #8b5a2b; transform: translateX(10px); }
        .menu-item-left { display: flex; align-items: center; gap: 20px; }
        .menu-item-icon { font-size: 2.5rem; }
        .menu-item-info h4 { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 600; color: #3d2c1e; margin-bottom: 4px; }
        .menu-item-info p { color: #8b5a2b; font-size: 0.9rem; }
        .menu-item-price { font-size: 1.3rem; font-weight: 700; color: #8b5a2b; }
        
        /* About */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: center; }
        .about-images { position: relative; height: 600px; }
        .about-img-1 { position: absolute; width: 350px; height: 450px; background: linear-gradient(135deg, #d4a574 0%, #8b5a2b 100%); border-radius: 200px 200px 30px 30px; top: 0; left: 0; display: flex; align-items: center; justify-content: center; font-size: 6rem; box-shadow: 0 30px 60px rgba(139, 90, 43, 0.2); }
        .about-img-2 { position: absolute; width: 280px; height: 350px; background: linear-gradient(135deg, #fef3e2 0%, #f5d5a0 100%); border-radius: 30px 30px 150px 150px; bottom: 0; right: 0; display: flex; align-items: center; justify-content: center; font-size: 5rem; box-shadow: 0 30px 60px rgba(139, 90, 43, 0.15); }
        .about-badge { position: absolute; bottom: 120px; left: 50%; transform: translateX(-50%); background: white; padding: 24px 36px; border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.1); text-align: center; }
        .about-badge-number { font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 700; color: #8b5a2b; }
        .about-badge-text { color: #5c4033; font-weight: 600; }
        .about-content h2 { font-size: 2.8rem; font-weight: 700; color: #3d2c1e; margin-bottom: 24px; line-height: 1.25; }
        .about-content > p { font-size: 1.1rem; color: #5c4033; line-height: 1.9; margin-bottom: 20px; }
        .about-features { margin-top: 40px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        .about-feature { display: flex; align-items: flex-start; gap: 16px; }
        .about-feature-icon { width: 55px; height: 55px; background: #fef3e2; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0; }
        .about-feature-text strong { display: block; color: #3d2c1e; font-weight: 700; margin-bottom: 4px; }
        .about-feature-text span { color: #5c4033; font-size: 0.95rem; }
        
        /* Gallery */
        .gallery { background: #fff8ee; }
        .gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .gallery-item { height: 250px; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 4rem; cursor: pointer; transition: all 0.4s; position: relative; overflow: hidden; }
        .gallery-item:nth-child(1) { background: linear-gradient(135deg, #fef3e2 0%, #f5d5a0 100%); }
        .gallery-item:nth-child(2) { background: linear-gradient(135deg, #e8d5c4 0%, #d4a574 100%); grid-row: span 2; height: auto; }
        .gallery-item:nth-child(3) { background: linear-gradient(135deg, #d4a574 0%, #8b5a2b 100%); }
        .gallery-item:nth-child(4) { background: linear-gradient(135deg, #f5e6d3 0%, #e8c9a0 100%); }
        .gallery-item:nth-child(5) { background: linear-gradient(135deg, #8b5a2b 0%, #6d4522 100%); }
        .gallery-item:nth-child(6) { background: linear-gradient(135deg, #fef3e2 0%, #e8d5c4 100%); }
        .gallery-item:hover { transform: scale(1.05); z-index: 2; }
        .gallery-item::before { content: ''; position: absolute; inset: 0; background: rgba(139, 90, 43, 0); transition: all 0.3s; }
        .gallery-item:hover::before { background: rgba(139, 90, 43, 0.2); }
        
        /* Testimonials */
        .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        .testimonial-card { background: white; padding: 40px; border-radius: 30px; box-shadow: 0 15px 50px rgba(0,0,0,0.05); position: relative; }
        .testimonial-quote { position: absolute; top: 30px; right: 35px; font-size: 5rem; color: #fef3e2; font-family: Georgia, serif; line-height: 1; }
        .testimonial-stars { color: #f59e0b; margin-bottom: 20px; font-size: 1.2rem; letter-spacing: 3px; }
        .testimonial-text { color: #5c4033; font-size: 1.05rem; line-height: 1.9; margin-bottom: 28px; font-style: italic; position: relative; z-index: 1; }
        .testimonial-author { display: flex; align-items: center; gap: 16px; }
        .testimonial-avatar { width: 55px; height: 55px; background: linear-gradient(135deg, #d4a574 0%, #8b5a2b 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
        .testimonial-info strong { display: block; color: #3d2c1e; font-weight: 700; font-family: 'Playfair Display', serif; }
        .testimonial-info span { color: #8b5a2b; font-size: 0.9rem; }
        
        /* CTA */
        .cta { background: linear-gradient(135deg, #8b5a2b 0%, #6d4522 100%); padding: 120px 0; position: relative; overflow: hidden; }
        .cta::before { content: '☕'; position: absolute; font-size: 25rem; opacity: 0.1; bottom: -80px; right: -50px; }
        .cta-content { text-align: center; position: relative; z-index: 1; max-width: 800px; margin: 0 auto; }
        .cta h2 { font-size: 3.2rem; font-weight: 700; color: white; margin-bottom: 24px; }
        .cta p { font-size: 1.25rem; color: rgba(255,255,255,0.9); margin-bottom: 40px; }
        .cta-buttons { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
        .cta .btn-white:hover { background: #fff8ee; }
        
        /* Contact */
        .contact { background: #fff8ee; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
        .contact-info h2 { font-size: 2.5rem; font-weight: 700; color: #3d2c1e; margin-bottom: 20px; }
        .contact-info > p { color: #5c4033; font-size: 1.1rem; line-height: 1.9; margin-bottom: 40px; }
        .contact-items { display: flex; flex-direction: column; gap: 24px; }
        .contact-item { display: flex; align-items: center; gap: 20px; }
        .contact-item-icon { width: 65px; height: 65px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .contact-item-text strong { display: block; color: #3d2c1e; font-weight: 700; margin-bottom: 4px; font-family: 'Playfair Display', serif; }
        .contact-item-text span { color: #5c4033; }
        .contact-hours { margin-top: 40px; background: white; padding: 35px; border-radius: 24px; box-shadow: 0 15px 40px rgba(0,0,0,0.05); }
        .contact-hours h4 { font-size: 1.3rem; color: #3d2c1e; margin-bottom: 20px; display: flex; align-items: center; gap: 12px; }
        .contact-hours-list { display: flex; flex-direction: column; gap: 12px; }
        .contact-hours-item { display: flex; justify-content: space-between; padding-bottom: 12px; border-bottom: 1px solid #f5e6d3; }
        .contact-hours-item:last-child { border: none; padding: 0; }
        .contact-hours-day { font-weight: 600; color: #5c4033; }
        .contact-hours-time { color: #8b5a2b; font-weight: 600; }
        .contact-map { background: linear-gradient(135deg, #e8d5c4 0%, #d4a574 100%); border-radius: 30px; height: 100%; min-height: 500px; display: flex; align-items: center; justify-content: center; font-size: 8rem; }
        
        /* Footer */
        footer { background: #3d2c1e; color: white; padding: 80px 0 30px; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; margin-bottom: 60px; }
        .footer-brand .logo { color: white; margin-bottom: 20px; }
        .footer-brand p { color: rgba(255,255,255,0.7); line-height: 1.8; }
        .footer-social { display: flex; gap: 12px; margin-top: 24px; }
        .footer-social a { width: 44px; height: 44px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; transition: all 0.3s; font-size: 1.1rem; }
        .footer-social a:hover { background: #8b5a2b; transform: translateY(-5px); }
        .footer-column h4 { font-family: 'Playfair Display', serif; font-weight: 600; margin-bottom: 24px; font-size: 1.15rem; }
        .footer-column a { display: block; color: rgba(255,255,255,0.7); text-decoration: none; padding: 8px 0; transition: all 0.3s; }
        .footer-column a:hover { color: white; padding-left: 8px; }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 30px; display: flex; justify-content: space-between; align-items: center; color: rgba(255,255,255,0.6); font-size: 0.9rem; }
        .footer-legal { display: flex; gap: 30px; }
        .footer-legal a { color: rgba(255,255,255,0.6); text-decoration: none; transition: color 0.3s; }
        .footer-legal a:hover { color: white; }
        
        /* Responsive */
        @media (max-width: 1024px) {
            .hero-grid, .about-grid, .contact-grid { grid-template-columns: 1fr; gap: 60px; }
            .specials-grid { grid-template-columns: repeat(2, 1fr); }
            .menu-grid { grid-template-columns: 1fr; }
            .gallery-grid { grid-template-columns: repeat(2, 1fr); }
            .footer-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
            .nav-links { display: none; }
            .hero h1 { font-size: 2.5rem; }
            .hero { padding: 140px 0 80px; }
            section { padding: 80px 0; }
            .section-title { font-size: 2.2rem; }
            .specials-grid, .testimonials-grid { grid-template-columns: 1fr; }
            .gallery-grid { grid-template-columns: 1fr; }
            .gallery-item:nth-child(2) { grid-row: auto; height: 250px; }
            .hero-floating { display: none; }
            .about-images { height: auto; display: flex; flex-direction: column; gap: 20px; }
            .about-img-1, .about-img-2 { position: relative; width: 100%; }
            .about-badge { position: relative; left: 0; transform: none; margin-top: 20px; }
            .about-features { grid-template-columns: 1fr; }
            .hero-features { flex-direction: column; gap: 20px; }
            .footer-grid { grid-template-columns: 1fr; }
            .footer-bottom { flex-direction: column; gap: 20px; text-align: center; }
            .cta-buttons { flex-direction: column; }
            .menu-categories { gap: 10px; }
            .menu-cat { padding: 10px 20px; font-size: 0.9rem; }
        }
    </style>
</head>
<body>
    <nav>
        <div class="container nav-container">
            <div class="logo"><span class="logo-icon">☕</span> Café Sonnenschein</div>
            <ul class="nav-links">
                <li><a href="#spezialitaeten">Spezialitäten</a></li>
                <li><a href="#karte">Speisekarte</a></li>
                <li><a href="#ueber">Über uns</a></li>
                <li><a href="#galerie">Galerie</a></li>
                <li><a href="#kontakt">Kontakt</a></li>
            </ul>
            <a href="#kontakt" class="nav-cta">Tisch reservieren</a>
        </div>
    </nav>

    <section class="hero">
        <div class="container">
            <div class="hero-grid">
                <div class="hero-content">
                    <div class="hero-badge">☕ Frisch geröstet & hausgemacht</div>
                    <h1>Wo jeder Tag mit <span>Genuss</span> beginnt</h1>
                    <p>Willkommen im Café Sonnenschein – Ihrem gemütlichen Treffpunkt in Oranienburg. Genießen Sie handgebrühten Kaffee, hausgemachte Kuchen und herzliche Gastfreundschaft.</p>
                    <div class="hero-buttons">
                        <a href="#karte" class="btn">Speisekarte ansehen ☕</a>
                        <a href="#kontakt" class="btn btn-outline">Tisch reservieren</a>
                    </div>
                    <div class="hero-features">
                        <div class="hero-feature"><div class="hero-feature-icon">🌱</div><div class="hero-feature-text">Bio-Kaffee</div></div>
                        <div class="hero-feature"><div class="hero-feature-icon">🍰</div><div class="hero-feature-text">Hausgemacht</div></div>
                        <div class="hero-feature"><div class="hero-feature-icon">🌿</div><div class="hero-feature-text">Vegane Optionen</div></div>
                    </div>
                </div>
                <div class="hero-image">
                    <div class="hero-image-main">☕</div>
                    <div class="hero-floating hero-floating-1">
                        <div class="hero-floating-icon">⭐</div>
                        <div class="hero-floating-text"><strong>4.9 Sterne</strong><span>200+ Bewertungen</span></div>
                    </div>
                    <div class="hero-floating hero-floating-2">
                        <div class="hero-floating-icon">🏆</div>
                        <div class="hero-floating-text"><strong>Seit 2010</strong><span>in Oranienburg</span></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="specials" id="spezialitaeten">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Unsere Spezialitäten</span>
                <h2 class="section-title">Das schmeckt nach mehr</h2>
                <p class="section-desc">Entdecken Sie unsere beliebten Highlights – mit Liebe zubereitet, täglich frisch.</p>
            </div>
            <div class="specials-grid">
                <div class="special-card">
                    <div class="special-image">🥐<span class="special-badge">Bestseller</span></div>
                    <div class="special-content">
                        <h3>Sonnenschein-Frühstück</h3>
                        <p>Croissant, Brötchen, Butter, Marmelade, Käse, Schinken, Ei, frischer O-Saft und Kaffee.</p>
                        <div class="special-price">€12,90</div>
                    </div>
                </div>
                <div class="special-card">
                    <div class="special-image">🍰<span class="special-badge">Hausgemacht</span></div>
                    <div class="special-content">
                        <h3>Omas Käsekuchen</h3>
                        <p>Nach traditionellem Familienrezept gebacken – cremig, saftig und einfach unwiderstehlich.</p>
                        <div class="special-price">€4,50</div>
                    </div>
                </div>
                <div class="special-card">
                    <div class="special-image">☕<span class="special-badge">Signature</span></div>
                    <div class="special-content">
                        <h3>Sonnenschein Latte</h3>
                        <p>Unser Signature-Kaffee mit Karamell, Vanille und einem Hauch Zimt – pures Glück in der Tasse.</p>
                        <div class="special-price">€4,90</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="menu" id="karte">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Speisekarte</span>
                <h2 class="section-title">Für jeden Geschmack</h2>
                <p class="section-desc">Von Kaffee-Klassikern bis zu herzhaften Snacks – bei uns finden Sie Ihr Lieblingsgetränk.</p>
            </div>
            <div class="menu-categories">
                <span class="menu-cat active">☕ Kaffee</span>
                <span class="menu-cat">🍵 Tee</span>
                <span class="menu-cat">🥐 Frühstück</span>
                <span class="menu-cat">🍰 Kuchen</span>
                <span class="menu-cat">🥗 Snacks</span>
            </div>
            <div class="menu-grid">
                <div class="menu-item"><div class="menu-item-left"><span class="menu-item-icon">☕</span><div class="menu-item-info"><h4>Espresso</h4><p>Kräftig & aromatisch</p></div></div><div class="menu-item-price">€2,50</div></div>
                <div class="menu-item"><div class="menu-item-left"><span class="menu-item-icon">☕</span><div class="menu-item-info"><h4>Cappuccino</h4><p>Mit cremigem Milchschaum</p></div></div><div class="menu-item-price">€3,80</div></div>
                <div class="menu-item"><div class="menu-item-left"><span class="menu-item-icon">☕</span><div class="menu-item-info"><h4>Latte Macchiato</h4><p>Sanft & mild</p></div></div><div class="menu-item-price">€4,20</div></div>
                <div class="menu-item"><div class="menu-item-left"><span class="menu-item-icon">☕</span><div class="menu-item-info"><h4>Flat White</h4><p>Australischer Klassiker</p></div></div><div class="menu-item-price">€4,00</div></div>
                <div class="menu-item"><div class="menu-item-left"><span class="menu-item-icon">🧊</span><div class="menu-item-info"><h4>Iced Coffee</h4><p>Erfrischend kalt</p></div></div><div class="menu-item-price">€4,50</div></div>
                <div class="menu-item"><div class="menu-item-left"><span class="menu-item-icon">🍫</span><div class="menu-item-info"><h4>Heiße Schokolade</h4><p>Mit Sahnehaube</p></div></div><div class="menu-item-price">€3,90</div></div>
            </div>
        </div>
    </section>

    <section class="about" id="ueber">
        <div class="container">
            <div class="about-grid">
                <div class="about-images">
                    <div class="about-img-1">👨‍🍳</div>
                    <div class="about-img-2">🍰</div>
                    <div class="about-badge"><div class="about-badge-number">14+</div><div class="about-badge-text">Jahre Leidenschaft</div></div>
                </div>
                <div class="about-content">
                    <span class="section-label">Über uns</span>
                    <h2>Mit Herz & Leidenschaft</h2>
                    <p>Das Café Sonnenschein wurde 2010 von Maria und Thomas Becker gegründet. Was als kleiner Traum begann, ist heute ein beliebter Treffpunkt für Jung und Alt in Oranienburg.</p>
                    <p>Wir legen größten Wert auf Qualität: Unser Kaffee stammt aus fairem Handel, unsere Kuchen werden täglich frisch gebacken und unsere Zutaten kommen von regionalen Lieferanten.</p>
                    <div class="about-features">
                        <div class="about-feature"><div class="about-feature-icon">🌱</div><div class="about-feature-text"><strong>100% Bio-Kaffee</strong><span>Fair gehandelt</span></div></div>
                        <div class="about-feature"><div class="about-feature-icon">🍰</div><div class="about-feature-text"><strong>Täglich frisch</strong><span>Hausgemacht</span></div></div>
                        <div class="about-feature"><div class="about-feature-icon">🌿</div><div class="about-feature-text"><strong>Vegan & Veggie</strong><span>Große Auswahl</span></div></div>
                        <div class="about-feature"><div class="about-feature-icon">❤️</div><div class="about-feature-text"><strong>Familienbetrieb</strong><span>Seit 2010</span></div></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="gallery" id="galerie">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Galerie</span>
                <h2 class="section-title">Einblicke ins Café</h2>
                <p class="section-desc">Entdecken Sie die gemütliche Atmosphäre unseres Cafés.</p>
            </div>
            <div class="gallery-grid">
                <div class="gallery-item">☕</div>
                <div class="gallery-item">🏠</div>
                <div class="gallery-item">🍰</div>
                <div class="gallery-item">🥐</div>
                <div class="gallery-item">🌻</div>
                <div class="gallery-item">☕</div>
            </div>
        </div>
    </section>

    <section class="testimonials">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Bewertungen</span>
                <h2 class="section-title">Das sagen unsere Gäste</h2>
                <p class="section-desc">Über 200 zufriedene Gäste empfehlen uns weiter.</p>
            </div>
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <div class="testimonial-quote">"</div>
                    <div class="testimonial-stars">★★★★★</div>
                    <p class="testimonial-text">Der beste Kaffee in Oranienburg! Die Atmosphäre ist so gemütlich und der Käsekuchen ist einfach himmlisch.</p>
                    <div class="testimonial-author"><div class="testimonial-avatar">👩</div><div class="testimonial-info"><strong>Petra S.</strong><span>Stammgast</span></div></div>
                </div>
                <div class="testimonial-card">
                    <div class="testimonial-quote">"</div>
                    <div class="testimonial-stars">★★★★★</div>
                    <p class="testimonial-text">Wir kommen jeden Sonntag zum Frühstück. Die Qualität ist immer top und das Personal ist einfach herzlich!</p>
                    <div class="testimonial-author"><div class="testimonial-avatar">👨</div><div class="testimonial-info"><strong>Familie Müller</strong><span>Seit 5 Jahren</span></div></div>
                </div>
                <div class="testimonial-card">
                    <div class="testimonial-quote">"</div>
                    <div class="testimonial-stars">★★★★★</div>
                    <p class="testimonial-text">Als Veganer finde ich hier immer tolle Optionen. Der vegane Cappuccino mit Hafermilch ist mein Favorit!</p>
                    <div class="testimonial-author"><div class="testimonial-avatar">👩</div><div class="testimonial-info"><strong>Julia K.</strong><span>Stammgast</span></div></div>
                </div>
            </div>
        </div>
    </section>

    <section class="cta">
        <div class="container">
            <div class="cta-content">
                <h2>Reservieren Sie Ihren Lieblingsplatz</h2>
                <p>Für größere Gruppen oder besondere Anlässe empfehlen wir eine Reservierung. Wir freuen uns auf Sie!</p>
                <div class="cta-buttons">
                    <a href="tel:+493301123456" class="btn btn-white">📞 Jetzt anrufen</a>
                    <a href="#kontakt" class="btn btn-outline" style="border-color: white; color: white;">Kontakt aufnehmen</a>
                </div>
            </div>
        </div>
    </section>

    <section class="contact" id="kontakt">
        <div class="container">
            <div class="contact-grid">
                <div class="contact-info">
                    <span class="section-label">Kontakt</span>
                    <h2>Besuchen Sie uns</h2>
                    <p>Wir freuen uns auf Ihren Besuch! Bei Fragen oder Reservierungen erreichen Sie uns telefonisch oder per E-Mail.</p>
                    <div class="contact-items">
                        <div class="contact-item"><div class="contact-item-icon">📍</div><div class="contact-item-text"><strong>Adresse</strong><span>Schlossplatz 12, 16515 Oranienburg</span></div></div>
                        <div class="contact-item"><div class="contact-item-icon">📞</div><div class="contact-item-text"><strong>Telefon</strong><span>+49 (0) 3301 123456</span></div></div>
                        <div class="contact-item"><div class="contact-item-icon">✉️</div><div class="contact-item-text"><strong>E-Mail</strong><span>hallo@cafe-sonnenschein.de</span></div></div>
                    </div>
                    <div class="contact-hours">
                        <h4>🕐 Öffnungszeiten</h4>
                        <div class="contact-hours-list">
                            <div class="contact-hours-item"><span class="contact-hours-day">Montag - Freitag</span><span class="contact-hours-time">08:00 - 18:00</span></div>
                            <div class="contact-hours-item"><span class="contact-hours-day">Samstag</span><span class="contact-hours-time">09:00 - 18:00</span></div>
                            <div class="contact-hours-item"><span class="contact-hours-day">Sonntag</span><span class="contact-hours-time">10:00 - 17:00</span></div>
                        </div>
                    </div>
                </div>
                <div class="contact-map">📍</div>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div class="logo"><span class="logo-icon">☕</span> Café Sonnenschein</div>
                    <p>Ihr gemütliches Café in Oranienburg. Seit 2010 servieren wir Ihnen Kaffee und Kuchen mit Herz.</p>
                    <div class="footer-social"><a href="#">📘</a><a href="#">📸</a><a href="#">📍</a></div>
                </div>
                <div class="footer-column"><h4>Speisekarte</h4><a href="#">Kaffee</a><a href="#">Frühstück</a><a href="#">Kuchen</a><a href="#">Snacks</a></div>
                <div class="footer-column"><h4>Über uns</h4><a href="#">Unsere Geschichte</a><a href="#">Team</a><a href="#">Galerie</a><a href="#">Jobs</a></div>
                <div class="footer-column"><h4>Kontakt</h4><a href="#">Schlossplatz 12</a><a href="#">16515 Oranienburg</a><a href="#">+49 3301 123456</a><a href="#">hallo@cafe-sonnenschein.de</a></div>
            </div>
            <div class="footer-bottom">
                <p>© 2024 Café Sonnenschein. Mit ☕ gemacht in Oranienburg.</p>
                <div class="footer-legal"><a href="#">Impressum</a><a href="#">Datenschutz</a></div>
            </div>
        </div>
    </footer>
    <script>
// Prevent all links from navigating away from the demo
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        // If it's an anchor link, scroll to it within the demo
        if (href && href.startsWith('#') && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

// Also prevent form submissions
document.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Dies ist nur eine Demo. In der echten Website würde das Formular funktionieren.');
});
</script>
</body>
</html>`
    }
};

// ============================================
// Template Selection and Rendering Functions
// ============================================

/**
 * Initialize the template selection system
 */
function initTemplateSystem() {
    const templateGrid = document.getElementById('templateGrid');
    const previewContainer = document.getElementById('previewContainer');
    const downloadBtn = document.getElementById('downloadBtn');
    const backBtn = document.getElementById('backBtn');

    if (!templateGrid) return;

    // Render template cards
    renderTemplateCards(templateGrid);

    // Setup event listeners
    setupEventListeners(templateGrid, previewContainer, downloadBtn, backBtn);
}

/**
 * Render template selection cards
 */
function renderTemplateCards(container) {
    container.innerHTML = '';

    Object.entries(templates).forEach(([key, template]) => {
        const card = document.createElement('div');
        card.className = 'template-card';
        card.dataset.template = key;

        card.innerHTML = `
            <div class="template-preview">
                <iframe srcdoc="${escapeHtml(template.html)}" title="${template.name}"></iframe>
            </div>
            <div class="template-info">
                <h3>${template.name}</h3>
                <p class="template-industry">${template.industry}</p>
                <p class="template-description">${template.description}</p>
            </div>
            <div class="template-actions">
                <button class="btn-preview" data-template="${key}">Vorschau</button>
                <button class="btn-select" data-template="${key}">Auswählen</button>
            </div>
        `;

        container.appendChild(card);
    });
}

/**
 * Escape HTML for safe insertion
 */
function escapeHtml(html) {
    return html
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Setup event listeners for template selection
 */
function setupEventListeners(templateGrid, previewContainer, downloadBtn, backBtn) {
    // Template card click handlers
    templateGrid.addEventListener('click', (e) => {
        const previewBtn = e.target.closest('.btn-preview');
        const selectBtn = e.target.closest('.btn-select');

        if (previewBtn) {
            const templateKey = previewBtn.dataset.template;
            showPreview(templateKey, previewContainer, templateGrid);
        }

        if (selectBtn) {
            const templateKey = selectBtn.dataset.template;
            selectTemplate(templateKey);
        }
    });

    // Back button
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            hidePreview(previewContainer, templateGrid);
        });
    }

    // Download button
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const templateKey = downloadBtn.dataset.currentTemplate;
            if (templateKey) {
                downloadTemplate(templateKey);
            }
        });
    }
}

/**
 * Show template preview
 */
function showPreview(templateKey, previewContainer, templateGrid) {
    const template = templates[templateKey];
    if (!template) return;

    const previewFrame = previewContainer.querySelector('.preview-frame');
    const downloadBtn = document.getElementById('downloadBtn');

    if (previewFrame) {
        previewFrame.srcdoc = template.html;
    }

    if (downloadBtn) {
        downloadBtn.dataset.currentTemplate = templateKey;
    }

    templateGrid.style.display = 'none';
    previewContainer.style.display = 'block';
}

/**
 * Hide template preview
 */
function hidePreview(previewContainer, templateGrid) {
    previewContainer.style.display = 'none';
    templateGrid.style.display = 'grid';
}

/**
 * Select a template and proceed to customization
 */
function selectTemplate(templateKey) {
    const template = templates[templateKey];
    if (!template) return;

    // Store selected template
    localStorage.setItem('selectedTemplate', templateKey);
    localStorage.setItem('templateHtml', template.html);

    // Redirect to customization page or show customization modal
    window.location.href = `customize.html?template=${templateKey}`;
}

/**
 * Download template as HTML file
 */
function downloadTemplate(templateKey) {
    const template = templates[templateKey];
    if (!template) return;

    const blob = new Blob([template.html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}-template.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ============================================
// Customization Functions
// ============================================

/**
 * Replace placeholder content in template
 */
function customizeTemplate(templateHtml, customizations) {
    let html = templateHtml;

    // Replace business name
    if (customizations.businessName) {
        html = html.replace(/Café Sonnenschein|Gärtnerei Grünblatt|CyberDev Solutions?/g, customizations.businessName);
    }

    // Replace address
    if (customizations.address) {
        html = html.replace(/Schlossplatz 12|Gartenweg 15|Innovationspark 7/g, customizations.address);
    }

    // Replace phone
    if (customizations.phone) {
        html = html.replace(/\+49 \(0\) 3301 \d+/g, customizations.phone);
    }

    // Replace email
    if (customizations.email) {
        html = html.replace(/[\w.-]+@[\w.-]+\.\w+/g, customizations.email);
    }

    // Replace colors (primary)
    if (customizations.primaryColor) {
        html = html.replace(/#8b5a2b|#228b22|#06b6d4/g, customizations.primaryColor);
    }

    return html;
}

// ============================================
// Initialize on DOM Load
// ============================================

document.addEventListener('DOMContentLoaded', initTemplateSystem);

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { templates, customizeTemplate, downloadTemplate };
}
// ========================================
// STYLE DEMO FUNKTIONEN
// ========================================

// Event-Listener für alle Style-Cards
document.addEventListener('DOMContentLoaded', function() {
    const styleCards = document.querySelectorAll('.style-card');

    styleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const styleKey = this.dataset.style;
            if (styleKey && styleDemos[styleKey]) {
                showStyleDemo(styleKey);
            } else {
                console.error('Style nicht gefunden:', styleKey);
            }
        });

        // Cursor ändern
        card.style.cursor = 'pointer';
    });
});

// Aktuell geöffneter Demo-Style (für Sprachswitch)
let currentDemoKey = null;

// Demo öffnen
function showStyleDemo(styleKey) {
    const style = styleDemos[styleKey];
    if (!style) {
        console.error('Style nicht gefunden:', styleKey);
        return;
    }

    currentDemoKey = styleKey;

    const overlay = document.getElementById('styleDemoOverlay');
    const iframe = document.getElementById('styleDemoFrame');
    const info = document.querySelector('.style-demo-info');

    // Info aktualisieren
    if (info) {
        info.innerHTML = `<strong>${style.name}</strong> <span style="opacity: 0.7; margin-left: 10px;">${style.industry}</span>`;
    }

    // HTML in iframe laden
    iframe.srcdoc = style.html;

    // Nach Laden des iframes die aktuelle Sprache anwenden
    iframe.onload = function() {
        if (typeof currentLang !== 'undefined' && currentLang === 'en' && typeof translateDemoIframe === 'function') {
            translateDemoIframe(iframe, styleKey, 'en');
        }
    };

    // Overlay anzeigen
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Demo schließen
function closeStyleDemo() {
    const overlay = document.getElementById('styleDemoOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    currentDemoKey = null;
}


document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Leistungen auslesen
        const selectedServices = [...document.querySelectorAll('input[name="service[]"]:checked')]
            .map(cb => {
                const label = cb.closest(".service-btn");
                const title = label.querySelector("span").textContent.trim();
                const price = label.querySelector("small").textContent.trim();
                return `${title} – ${price}`;
            })
            .join("\n");

        // Hidden Feld füllen
        document.getElementById("services_combined").value = selectedServices;

        // Debug
        console.log("Services werden gesendet:", selectedServices);

        // Button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.textContent = "Wird gesendet...";
        submitBtn.disabled = true;

        // EmailJS senden
        emailjs.sendForm("service_b6nweer", "template_wojbfmi", contactForm)
            .then(() => {
                showToast("Nachricht wurde erfolgreich gesendet!");
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = "Nachricht senden →";
            })
            .catch((err) => {
                console.error("EmailJS Fehler:", err);
                showToast("Fehler beim Senden – bitte erneut versuchen.");
                submitBtn.disabled = false;
                submitBtn.textContent = "Nachricht senden →";
            });
    });

});

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.querySelector(".toast-message").textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}


