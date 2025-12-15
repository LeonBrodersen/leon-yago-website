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
    colorful: {
        name: 'Colorful',
        industry: 'Kinder-Sprachschule PlayLingo',
        description: 'Lebendiges, verspieltes Design für Bildungseinrichtungen',
        html: `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PlayLingo - Sprachen spielend lernen</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Nunito', sans-serif; background: #ffffff; color: #1a1a2e; line-height: 1.7; overflow-x: hidden; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        /* Navigation */
        nav { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 18px 0; position: fixed; top: 0; left: 0; right: 0; z-index: 1000; box-shadow: 0 4px 30px rgba(102, 126, 234, 0.3); }
        .nav-container { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.8rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 12px; }
        .logo-emoji { font-size: 2rem; animation: bounce 2s infinite; }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .nav-links { display: flex; gap: 36px; list-style: none; }
        .nav-links a { text-decoration: none; color: rgba(255,255,255,0.9); font-weight: 700; font-size: 0.95rem; transition: all 0.3s; }
        .nav-links a:hover { color: #ffd700; transform: scale(1.05); }
        .nav-cta { background: white; color: #667eea; padding: 12px 28px; border-radius: 50px; font-weight: 800; text-decoration: none; transition: all 0.3s; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .nav-cta:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 8px 25px rgba(0,0,0,0.2); }
        
        /* Buttons */
        .btn { display: inline-flex; align-items: center; gap: 10px; padding: 18px 40px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 50px; text-decoration: none; font-weight: 800; font-size: 1.05rem; transition: all 0.3s; border: none; cursor: pointer; box-shadow: 0 10px 30px rgba(245, 87, 108, 0.4); }
        .btn:hover { transform: translateY(-5px) scale(1.02); box-shadow: 0 20px 50px rgba(245, 87, 108, 0.5); }
        .btn-secondary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4); }
        .btn-outline { background: transparent; border: 3px solid white; box-shadow: none; }
        .btn-outline:hover { background: white; color: #667eea; }
        
        /* Hero */
        .hero { padding: 180px 0 120px; background: linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%); position: relative; overflow: hidden; }
        .hero::before { content: ''; position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%); top: -200px; right: -100px; animation: float 6s ease-in-out infinite; }
        .hero::after { content: ''; position: absolute; width: 400px; height: 400px; background: radial-gradient(circle, rgba(240, 147, 251, 0.1) 0%, transparent 70%); bottom: -100px; left: -100px; animation: float 8s ease-in-out infinite reverse; }
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-30px) rotate(5deg); } }
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; position: relative; z-index: 1; }
        .hero-badge { display: inline-flex; align-items: center; gap: 10px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 24px; border-radius: 50px; font-size: 0.9rem; font-weight: 700; margin-bottom: 24px; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4); } 50% { box-shadow: 0 0 0 15px rgba(102, 126, 234, 0); } }
        .hero h1 { font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f5576c 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero p { font-size: 1.25rem; color: #6b7280; margin-bottom: 40px; line-height: 1.9; }
        .hero-buttons { display: flex; gap: 20px; flex-wrap: wrap; }
        .hero-image { position: relative; }
        .hero-image-main { width: 100%; height: 480px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 30px; display: flex; align-items: center; justify-content: center; font-size: 10rem; box-shadow: 0 40px 80px rgba(102, 126, 234, 0.3); position: relative; overflow: hidden; }
        .hero-image-main::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%); animation: shine 3s infinite; }
        @keyframes shine { 0% { transform: translateX(-100%) rotate(45deg); } 100% { transform: translateX(100%) rotate(45deg); } }
        .hero-floating { position: absolute; background: white; padding: 16px 24px; border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 12px; animation: floatCard 3s ease-in-out infinite; }
        .hero-floating-1 { top: 20px; left: -30px; animation-delay: 0s; }
        .hero-floating-2 { bottom: 60px; right: -30px; animation-delay: 1s; }
        .hero-floating-3 { top: 50%; left: -50px; animation-delay: 0.5s; }
        @keyframes floatCard { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .hero-floating-icon { width: 50px; height: 50px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
        .hero-floating-text strong { display: block; font-weight: 800; color: #1a1a2e; }
        .hero-floating-text span { font-size: 0.85rem; color: #6b7280; }
        
        /* Section Styles */
        section { padding: 120px 0; }
        .section-header { text-align: center; margin-bottom: 80px; }
        .section-label { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 28px; border-radius: 50px; font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; }
        .section-title { font-size: 3.2rem; font-weight: 900; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 20px; }
        .section-desc { font-size: 1.2rem; color: #6b7280; max-width: 650px; margin: 0 auto; }
        
        /* Courses */
        .courses { background: linear-gradient(180deg, #ffffff 0%, #f8f9ff 100%); }
        .courses-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        .course-card { background: white; border-radius: 30px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.08); transition: all 0.4s; border: 3px solid transparent; }
        .course-card:hover { transform: translateY(-15px) scale(1.02); border-color: #667eea; box-shadow: 0 30px 80px rgba(102, 126, 234, 0.2); }
        .course-image { height: 200px; display: flex; align-items: center; justify-content: center; font-size: 5rem; position: relative; }
        .course-card:nth-child(1) .course-image { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .course-card:nth-child(2) .course-image { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
        .course-card:nth-child(3) .course-image { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
        .course-badge { position: absolute; top: 16px; right: 16px; background: white; color: #667eea; padding: 6px 16px; border-radius: 50px; font-size: 0.8rem; font-weight: 800; }
        .course-content { padding: 32px; }
        .course-content h3 { font-size: 1.5rem; font-weight: 800; color: #1a1a2e; margin-bottom: 12px; }
        .course-content p { color: #6b7280; margin-bottom: 24px; line-height: 1.8; }
        .course-meta { display: flex; justify-content: space-between; align-items: center; padding-top: 20px; border-top: 2px solid #f3f4f6; }
        .course-age { display: flex; align-items: center; gap: 8px; color: #667eea; font-weight: 700; }
        .course-price { font-size: 1.3rem; font-weight: 900; color: #1a1a2e; }
        
        /* Languages */
        .languages { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
        .languages .section-title { color: white; -webkit-text-fill-color: white; }
        .languages .section-desc { color: rgba(255,255,255,0.8); }
        .languages-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .language-card { background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 40px 30px; border-radius: 24px; text-align: center; transition: all 0.4s; border: 2px solid rgba(255,255,255,0.2); cursor: pointer; }
        .language-card:hover { background: white; transform: translateY(-10px) scale(1.05); }
        .language-card:hover .language-flag { transform: scale(1.2); }
        .language-card:hover .language-name { color: #667eea; }
        .language-flag { font-size: 4rem; margin-bottom: 16px; transition: transform 0.3s; display: block; }
        .language-name { font-size: 1.2rem; font-weight: 800; transition: color 0.3s; }
        .language-level { font-size: 0.9rem; opacity: 0.8; margin-top: 8px; }
        
        /* Stats */
        .stats { background: #f8f9ff; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
        .stat-card { background: white; padding: 50px 40px; border-radius: 30px; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.06); transition: all 0.4s; }
        .stat-card:hover { transform: translateY(-10px); box-shadow: 0 30px 80px rgba(102, 126, 234, 0.15); }
        .stat-icon { font-size: 3.5rem; margin-bottom: 16px; }
        .stat-number { font-size: 3.5rem; font-weight: 900; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 8px; }
        .stat-label { font-size: 1.1rem; color: #6b7280; font-weight: 600; }
        
        /* Features */
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        .feature-card { background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%); padding: 50px 40px; border-radius: 30px; text-align: center; border: 3px solid transparent; transition: all 0.4s; }
        .feature-card:hover { border-color: #667eea; transform: translateY(-10px); background: white; box-shadow: 0 30px 80px rgba(102, 126, 234, 0.15); }
        .feature-icon { width: 90px; height: 90px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto 28px; transition: transform 0.3s; }
        .feature-card:hover .feature-icon { transform: scale(1.1) rotate(10deg); }
        .feature-card h3 { font-size: 1.4rem; font-weight: 800; color: #1a1a2e; margin-bottom: 16px; }
        .feature-card p { color: #6b7280; line-height: 1.8; }
        
        /* Testimonials */
        .testimonials { background: linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%); }
        .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        .testimonial-card { background: white; padding: 40px; border-radius: 30px; box-shadow: 0 20px 60px rgba(0,0,0,0.06); position: relative; transition: all 0.4s; }
        .testimonial-card:hover { transform: translateY(-10px); box-shadow: 0 30px 80px rgba(102, 126, 234, 0.15); }
        .testimonial-quote { font-size: 5rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; position: absolute; top: 20px; right: 30px; font-family: Georgia, serif; opacity: 0.3; }
        .testimonial-stars { margin-bottom: 20px; }
        .testimonial-stars span { color: #fbbf24; font-size: 1.3rem; }
        .testimonial-text { color: #374151; font-size: 1.1rem; line-height: 1.9; margin-bottom: 28px; font-style: italic; }
        .testimonial-author { display: flex; align-items: center; gap: 16px; }
        .testimonial-avatar { width: 60px; height: 60px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; }
        .testimonial-info strong { display: block; font-weight: 800; color: #1a1a2e; font-size: 1.1rem; }
        .testimonial-info span { color: #6b7280; font-size: 0.95rem; }
        
        /* CTA */
        .cta { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 120px 0; position: relative; overflow: hidden; }
        .cta::before { content: '🎓'; position: absolute; font-size: 20rem; opacity: 0.1; top: -50px; right: -50px; }
        .cta-content { text-align: center; position: relative; z-index: 1; max-width: 800px; margin: 0 auto; }
        .cta h2 { font-size: 3.5rem; font-weight: 900; color: white; margin-bottom: 24px; }
        .cta p { font-size: 1.3rem; color: rgba(255,255,255,0.9); margin-bottom: 40px; }
        .cta-buttons { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
        .cta .btn { background: white; color: #667eea; box-shadow: 0 10px 40px rgba(0,0,0,0.2); }
        .cta .btn:hover { transform: translateY(-5px) scale(1.05); }
        
        /* Footer */
        footer { background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%); color: white; padding: 80px 0 30px; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; margin-bottom: 60px; }
        .footer-brand .logo { margin-bottom: 20px; }
        .footer-brand p { color: rgba(255,255,255,0.7); line-height: 1.8; }
        .footer-column h4 { font-weight: 800; margin-bottom: 24px; font-size: 1.1rem; }
        .footer-column a { display: block; color: rgba(255,255,255,0.7); text-decoration: none; padding: 10px 0; transition: all 0.3s; }
        .footer-column a:hover { color: #f093fb; padding-left: 8px; }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 30px; display: flex; justify-content: space-between; align-items: center; color: rgba(255,255,255,0.6); font-size: 0.9rem; }
        .footer-social { display: flex; gap: 16px; }
        .footer-social a { width: 44px; height: 44px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; transition: all 0.3s; font-size: 1.2rem; }
        .footer-social a:hover { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); transform: translateY(-5px); }
        
        /* Responsive */
        @media (max-width: 1024px) {
            .hero-grid { grid-template-columns: 1fr; text-align: center; }
            .hero-buttons { justify-content: center; }
            .hero-image { order: -1; }
            .courses-grid { grid-template-columns: repeat(2, 1fr); }
            .languages-grid { grid-template-columns: repeat(2, 1fr); }
            .stats-grid { grid-template-columns: repeat(2, 1fr); }
            .footer-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
            .nav-links { display: none; }
            .hero h1 { font-size: 2.5rem; }
            .hero { padding: 140px 0 80px; }
            section { padding: 80px 0; }
            .section-title { font-size: 2.2rem; }
            .courses-grid, .features-grid, .testimonials-grid { grid-template-columns: 1fr; }
            .languages-grid { grid-template-columns: repeat(2, 1fr); }
            .stats-grid { grid-template-columns: 1fr; }
            .hero-floating { display: none; }
            .footer-grid { grid-template-columns: 1fr; }
            .footer-bottom { flex-direction: column; gap: 20px; text-align: center; }
            .cta h2 { font-size: 2.2rem; }
            .cta-buttons { flex-direction: column; align-items: center; }
        }
    </style>
</head>
<body>
    <nav>
        <div class="container nav-container">
            <div class="logo"><span class="logo-emoji">🎓</span> PlayLingo</div>
            <ul class="nav-links">
                <li><a href="#kurse">Kurse</a></li>
                <li><a href="#sprachen">Sprachen</a></li>
                <li><a href="#vorteile">Vorteile</a></li>
                <li><a href="#bewertungen">Bewertungen</a></li>
            </ul>
            <a href="#kontakt" class="nav-cta">Kostenlos testen!</a>
        </div>
    </nav>

    <section class="hero">
        <div class="container">
            <div class="hero-grid">
                <div class="hero-content">
                    <div class="hero-badge">🎉 Jetzt 30 Tage kostenlos testen!</div>
                    <h1>Sprachen lernen macht Kindern Spaß!</h1>
                    <p>Mit PlayLingo entdecken Kinder spielerisch neue Sprachen. Interaktive Spiele, lustige Charaktere und echte Lernerfolge!</p>
                    <div class="hero-buttons">
                        <a href="#kurse" class="btn">Kurse entdecken 🚀</a>
                        <a href="#" class="btn btn-secondary">So funktioniert's ▶</a>
                    </div>
                </div>
                <div class="hero-image">
                    <div class="hero-image-main">🌍</div>
                    <div class="hero-floating hero-floating-1">
                        <div class="hero-floating-icon">⭐</div>
                        <div class="hero-floating-text"><strong>4.9 Sterne</strong><span>500+ Bewertungen</span></div>
                    </div>
                    <div class="hero-floating hero-floating-2">
                        <div class="hero-floating-icon">🎮</div>
                        <div class="hero-floating-text"><strong>Spielend lernen</strong><span>Über 200 Spiele</span></div>
                    </div>
                    <div class="hero-floating hero-floating-3">
                        <div class="hero-floating-icon">👨‍👩‍👧</div>
                        <div class="hero-floating-text"><strong>Für Familien</strong><span>Kinder 4-14 Jahre</span></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="courses" id="kurse">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Unsere Kurse</span>
                <h2 class="section-title">Lerne in deinem Tempo</h2>
                <p class="section-desc">Für jedes Alter und jedes Level haben wir den passenden Kurs.</p>
            </div>
            <div class="courses-grid">
                <div class="course-card">
                    <div class="course-image">🐣<span class="course-badge">Für Anfänger</span></div>
                    <div class="course-content">
                        <h3>Mini-Entdecker</h3>
                        <p>Erste Wörter und einfache Sätze für die Kleinsten. Mit lustigen Liedern und bunten Bildern.</p>
                        <div class="course-meta">
                            <div class="course-age">👶 4-6 Jahre</div>
                            <div class="course-price">€29/Monat</div>
                        </div>
                    </div>
                </div>
                <div class="course-card">
                    <div class="course-image">🚀<span class="course-badge">Beliebtester Kurs</span></div>
                    <div class="course-content">
                        <h3>Sprach-Abenteurer</h3>
                        <p>Interaktive Geschichten, Spiele und Konversationsübungen für echte Fortschritte.</p>
                        <div class="course-meta">
                            <div class="course-age">🧒 7-10 Jahre</div>
                            <div class="course-price">€39/Monat</div>
                        </div>
                    </div>
                </div>
                <div class="course-card">
                    <div class="course-image">🏆<span class="course-badge">Intensiv</span></div>
                    <div class="course-content">
                        <h3>Sprach-Champions</h3>
                        <p>Prüfungsvorbereitung, freies Sprechen und kulturelles Wissen für Fortgeschrittene.</p>
                        <div class="course-meta">
                            <div class="course-age">🧑 11-14 Jahre</div>
                            <div class="course-price">€49/Monat</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="languages" id="sprachen">
        <div class="container">
            <div class="section-header">
                <span class="section-label" style="background: white; color: #667eea;">Sprachen</span>
                <h2 class="section-title">8 Sprachen zur Auswahl</h2>
                <p class="section-desc">Von Englisch bis Chinesisch – entdecke die Welt mit PlayLingo!</p>
            </div>
            <div class="languages-grid">
                <div class="language-card"><span class="language-flag">🇬🇧</span><div class="language-name">Englisch</div><div class="language-level">Alle Level</div></div>
                <div class="language-card"><span class="language-flag">🇫🇷</span><div class="language-name">Französisch</div><div class="language-level">Alle Level</div></div>
                <div class="language-card"><span class="language-flag">🇪🇸</span><div class="language-name">Spanisch</div><div class="language-level">Alle Level</div></div>
                <div class="language-card"><span class="language-flag">🇮🇹</span><div class="language-name">Italienisch</div><div class="language-level">Anfänger-Mittel</div></div>
                <div class="language-card"><span class="language-flag">🇩🇪</span><div class="language-name">Deutsch</div><div class="language-level">Für Nicht-Muttersprachler</div></div>
                <div class="language-card"><span class="language-flag">🇯🇵</span><div class="language-name">Japanisch</div><div class="language-level">Anfänger</div></div>
                <div class="language-card"><span class="language-flag">🇨🇳</span><div class="language-name">Chinesisch</div><div class="language-level">Anfänger</div></div>
                <div class="language-card"><span class="language-flag">🇵🇹</span><div class="language-name">Portugiesisch</div><div class="language-level">Anfänger-Mittel</div></div>
            </div>
        </div>
    </section>

    <section class="stats">
        <div class="container">
            <div class="stats-grid">
                <div class="stat-card"><div class="stat-icon">👨‍👩‍👧‍👦</div><div class="stat-number">50.000+</div><div class="stat-label">Aktive Familien</div></div>
                <div class="stat-card"><div class="stat-icon">🎮</div><div class="stat-number">200+</div><div class="stat-label">Lernspiele</div></div>
                <div class="stat-card"><div class="stat-icon">📚</div><div class="stat-number">1.500+</div><div class="stat-label">Lektionen</div></div>
                <div class="stat-card"><div class="stat-icon">🏆</div><div class="stat-number">97%</div><div class="stat-label">Weiterempfehlung</div></div>
            </div>
        </div>
    </section>

    <section class="features" id="vorteile">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Warum PlayLingo?</span>
                <h2 class="section-title">So macht Lernen Spaß!</h2>
                <p class="section-desc">Entdecke, was PlayLingo so besonders macht.</p>
            </div>
            <div class="features-grid">
                <div class="feature-card"><div class="feature-icon">🎮</div><h3>Spielerisches Lernen</h3><p>Über 200 interaktive Spiele machen das Vokabellernen zum Abenteuer.</p></div>
                <div class="feature-card"><div class="feature-icon">🎯</div><h3>Personalisierter Lernpfad</h3><p>KI-gestützte Anpassung an das Lerntempo jedes Kindes.</p></div>
                <div class="feature-card"><div class="feature-icon">👨‍👩‍👧</div><h3>Eltern-Dashboard</h3><p>Verfolge den Fortschritt deines Kindes und feiere gemeinsam die Erfolge!</p></div>
                <div class="feature-card"><div class="feature-icon">🎤</div><h3>Echte Aussprache</h3><p>Spracherkennung hilft bei der perfekten Aussprache.</p></div>
                <div class="feature-card"><div class="feature-icon">🏅</div><h3>Belohnungssystem</h3><p>Sammle Sterne, schalte neue Level frei und verdiene coole Abzeichen!</p></div>
                <div class="feature-card"><div class="feature-icon">📱</div><h3>Überall lernen</h3><p>Offline-Modus auf Tablet und Smartphone. Perfekt für unterwegs!</p></div>
            </div>
        </div>
    </section>

    <section class="testimonials" id="bewertungen">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Erfahrungen</span>
                <h2 class="section-title">Das sagen unsere Familien</h2>
                <p class="section-desc">Über 50.000 Familien vertrauen bereits auf PlayLingo.</p>
            </div>
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <div class="testimonial-quote">"</div>
                    <div class="testimonial-stars"><span>★★★★★</span></div>
                    <p class="testimonial-text">Mein Sohn (7) liebt PlayLingo! Er fragt jeden Tag danach und spricht schon erste englische Sätze.</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">👩</div>
                        <div class="testimonial-info"><strong>Sabine M.</strong><span>Mama von Leon, 7</span></div>
                    </div>
                </div>
                <div class="testimonial-card">
                    <div class="testimonial-quote">"</div>
                    <div class="testimonial-stars"><span>★★★★★</span></div>
                    <p class="testimonial-text">Endlich eine Sprachlern-App, die wirklich für Kinder gemacht ist. Die Spiele sind toll!</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">👨</div>
                        <div class="testimonial-info"><strong>Michael K.</strong><span>Papa von Emma, 9</span></div>
                    </div>
                </div>
                <div class="testimonial-card">
                    <div class="testimonial-quote">"</div>
                    <div class="testimonial-stars"><span>★★★★★</span></div>
                    <p class="testimonial-text">Wir nutzen PlayLingo als Familie. Meine Kinder lernen Spanisch und haben riesigen Spaß dabei.</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">👩</div>
                        <div class="testimonial-info"><strong>Julia F.</strong><span>Mama von Max & Mia</span></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="cta" id="kontakt">
        <div class="container">
            <div class="cta-content">
                <h2>Bereit für das Sprachabenteuer?</h2>
                <p>Starte jetzt mit 30 Tagen kostenlosem Zugang zu allen Kursen und Sprachen!</p>
                <div class="cta-buttons">
                    <a href="#" class="btn">🎉 Kostenlos starten</a>
                    <a href="#" class="btn btn-outline">Kontakt aufnehmen</a>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div class="logo"><span class="logo-emoji">🎓</span> PlayLingo</div>
                    <p>Die spielerische Sprachlern-App für Kinder von 4-14 Jahren.</p>
                </div>
                <div class="footer-column"><h4>Kurse</h4><a href="#">Mini-Entdecker</a><a href="#">Sprach-Abenteurer</a><a href="#">Sprach-Champions</a></div>
                <div class="footer-column"><h4>Sprachen</h4><a href="#">Englisch</a><a href="#">Französisch</a><a href="#">Spanisch</a></div>
                <div class="footer-column"><h4>Kontakt</h4><a href="#">Sprachschule 12</a><a href="#">16515 Oranienburg</a><a href="#">+49 3301 987654</a></div>
            </div>
            <div class="footer-bottom">
                <p>© 2024 PlayLingo. Mit ❤️ für kleine Sprachtalente.</p>
                <div class="footer-social"><a href="#">📘</a><a href="#">📸</a><a href="#">🐦</a></div>
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
    },
    nature: {
        name: 'Nature',
        industry: 'Gärtnerei Grünblatt',
        description: 'Natürliches, frisches Design für Garten- und Umweltbranchen',
        html: `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gärtnerei Grünblatt - Oranienburg</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Nunito', sans-serif; background: #fafdf7; color: #1a2e1a; line-height: 1.7; }
        h1, h2, h3, h4 { font-family: 'Playfair Display', serif; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        /* Navigation */
        nav { background: rgba(250, 253, 247, 0.98); padding: 18px 0; position: fixed; top: 0; left: 0; right: 0; z-index: 1000; backdrop-filter: blur(10px); border-bottom: 1px solid rgba(34, 139, 34, 0.1); }
        .nav-container { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-family: 'Playfair Display', serif; font-size: 1.7rem; font-weight: 700; color: #228b22; display: flex; align-items: center; gap: 12px; }
        .logo-icon { font-size: 2rem; }
        .nav-links { display: flex; gap: 40px; list-style: none; }
        .nav-links a { text-decoration: none; color: #2d5a2d; font-weight: 600; font-size: 0.95rem; transition: all 0.3s; position: relative; }
        .nav-links a:hover { color: #228b22; }
        .nav-links a::after { content: ''; position: absolute; bottom: -5px; left: 0; width: 0; height: 2px; background: #228b22; transition: width 0.3s; }
        .nav-links a:hover::after { width: 100%; }
        .nav-cta { background: #228b22; color: white; padding: 14px 32px; border-radius: 50px; font-weight: 700; text-decoration: none; transition: all 0.3s; }
        .nav-cta:hover { background: #1e7b1e; transform: translateY(-2px); box-shadow: 0 10px 30px rgba(34, 139, 34, 0.3); }
        
        /* Buttons */
        .btn { display: inline-flex; align-items: center; gap: 10px; padding: 18px 40px; background: #228b22; color: white; border-radius: 50px; text-decoration: none; font-weight: 700; transition: all 0.3s; border: none; cursor: pointer; font-size: 1rem; }
        .btn:hover { background: #1e7b1e; transform: translateY(-3px); box-shadow: 0 15px 40px rgba(34, 139, 34, 0.3); }
        .btn-outline { background: transparent; border: 2px solid #228b22; color: #228b22; }
        .btn-outline:hover { background: #228b22; color: white; }
        .btn-white { background: white; color: #228b22; }
        .btn-white:hover { background: #f0fff0; }
        
        /* Hero */
        .hero { padding: 180px 0 120px; background: linear-gradient(180deg, #f0fff0 0%, #fafdf7 100%); position: relative; overflow: hidden; }
        .hero::before { content: '🌿'; position: absolute; font-size: 35rem; opacity: 0.05; top: -100px; right: -150px; transform: rotate(15deg); }
        .hero::after { content: '🌱'; position: absolute; font-size: 20rem; opacity: 0.05; bottom: -50px; left: -100px; transform: rotate(-15deg); }
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; position: relative; z-index: 1; }
        .hero-content { position: relative; }
        .hero-badge { display: inline-flex; align-items: center; gap: 10px; background: rgba(34, 139, 34, 0.1); border: 1px solid rgba(34, 139, 34, 0.2); color: #228b22; padding: 10px 24px; border-radius: 50px; font-size: 0.9rem; font-weight: 600; margin-bottom: 24px; }
        .hero h1 { font-size: 3.8rem; font-weight: 700; line-height: 1.15; margin-bottom: 24px; color: #1a2e1a; }
        .hero h1 span { color: #228b22; }
        .hero p { font-size: 1.2rem; color: #3d5a3d; margin-bottom: 40px; line-height: 1.9; }
        .hero-buttons { display: flex; gap: 16px; flex-wrap: wrap; }
        .hero-features { display: flex; gap: 50px; margin-top: 50px; }
        .hero-feature { text-align: center; }
        .hero-feature-icon { font-size: 2.5rem; margin-bottom: 10px; }
        .hero-feature-text { font-weight: 700; color: #228b22; font-size: 0.95rem; }
        .hero-image { position: relative; }
        .hero-image-main { width: 100%; height: 550px; background: linear-gradient(135deg, #90EE90 0%, #228b22 100%); border-radius: 30px 150px 30px 150px; display: flex; align-items: center; justify-content: center; font-size: 12rem; box-shadow: 0 40px 80px rgba(34, 139, 34, 0.2); position: relative; overflow: hidden; }
        .hero-image-main::before { content: ''; position: absolute; inset: 0; background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L35 15 L30 12 L25 15 Z' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E"); }
        .hero-floating { position: absolute; background: white; padding: 20px 28px; border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 14px; }
        .hero-floating-1 { top: 40px; left: -50px; }
        .hero-floating-2 { bottom: 80px; right: -40px; }
        .hero-floating-icon { width: 55px; height: 55px; background: linear-gradient(135deg, #90EE90 0%, #228b22 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
        .hero-floating-text strong { display: block; font-weight: 700; color: #1a2e1a; }
        .hero-floating-text span { font-size: 0.85rem; color: #228b22; }
        
        /* Section Styles */
        section { padding: 120px 0; }
        .section-header { text-align: center; margin-bottom: 80px; }
        .section-label { display: inline-block; background: rgba(34, 139, 34, 0.1); color: #228b22; padding: 10px 28px; border-radius: 50px; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; }
        .section-title { font-size: 3rem; font-weight: 700; color: #1a2e1a; margin-bottom: 20px; }
        .section-desc { font-size: 1.15rem; color: #3d5a3d; max-width: 650px; margin: 0 auto; }
        
        /* Products */
        .products { background: #f0fff0; }
        .products-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; }
        .product-card { background: white; border-radius: 24px; overflow: hidden; box-shadow: 0 15px 50px rgba(0,0,0,0.05); transition: all 0.4s; }
        .product-card:hover { transform: translateY(-15px); box-shadow: 0 30px 70px rgba(34, 139, 34, 0.15); }
        .product-image { height: 200px; display: flex; align-items: center; justify-content: center; font-size: 5rem; position: relative; }
        .product-card:nth-child(1) .product-image { background: linear-gradient(135deg, #f0fff0 0%, #90EE90 100%); }
        .product-card:nth-child(2) .product-image { background: linear-gradient(135deg, #e8f5e9 0%, #81c784 100%); }
        .product-card:nth-child(3) .product-image { background: linear-gradient(135deg, #f1f8e9 0%, #aed581 100%); }
        .product-card:nth-child(4) .product-image { background: linear-gradient(135deg, #e0f2f1 0%, #80cbc4 100%); }
        .product-card:nth-child(5) .product-image { background: linear-gradient(135deg, #fff8e1 0%, #ffcc80 100%); }
        .product-card:nth-child(6) .product-image { background: linear-gradient(135deg, #fce4ec 0%, #f48fb1 100%); }
        .product-card:nth-child(7) .product-image { background: linear-gradient(135deg, #e8eaf6 0%, #9fa8da 100%); }
        .product-card:nth-child(8) .product-image { background: linear-gradient(135deg, #efebe9 0%, #bcaaa4 100%); }
        .product-badge { position: absolute; top: 14px; right: 14px; background: #228b22; color: white; padding: 6px 14px; border-radius: 50px; font-size: 0.75rem; font-weight: 700; }
        .product-content { padding: 24px; }
        .product-content h3 { font-size: 1.2rem; font-weight: 600; color: #1a2e1a; margin-bottom: 8px; }
        .product-content p { color: #3d5a3d; font-size: 0.9rem; margin-bottom: 16px; }
        .product-footer { display: flex; justify-content: space-between; align-items: center; }
        .product-price { font-size: 1.2rem; font-weight: 700; color: #228b22; }
        .product-btn { width: 40px; height: 40px; background: rgba(34, 139, 34, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #228b22; cursor: pointer; transition: all 0.3s; border: none; font-size: 1.2rem; }
        .product-btn:hover { background: #228b22; color: white; }
        
        /* Services */
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        .service-card { background: white; padding: 45px 35px; border-radius: 24px; text-align: center; transition: all 0.4s; border: 2px solid transparent; box-shadow: 0 15px 50px rgba(0,0,0,0.04); }
        .service-card:hover { border-color: #228b22; transform: translateY(-10px); box-shadow: 0 25px 70px rgba(34, 139, 34, 0.12); }
        .service-icon { width: 90px; height: 90px; background: linear-gradient(135deg, #f0fff0 0%, #90EE90 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto 28px; transition: all 0.3s; }
        .service-card:hover .service-icon { transform: scale(1.1) rotate(10deg); background: linear-gradient(135deg, #90EE90 0%, #228b22 100%); }
        .service-card h3 { font-size: 1.4rem; font-weight: 700; color: #1a2e1a; margin-bottom: 16px; }
        .service-card p { color: #3d5a3d; line-height: 1.8; }
        
        /* About */
        .about { background: #f0fff0; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: center; }
        .about-images { position: relative; height: 600px; }
        .about-img-1 { position: absolute; width: 380px; height: 480px; background: linear-gradient(135deg, #90EE90 0%, #228b22 100%); border-radius: 30px 100px 30px 100px; top: 0; left: 0; display: flex; align-items: center; justify-content: center; font-size: 7rem; box-shadow: 0 30px 60px rgba(34, 139, 34, 0.25); z-index: 2; }
        .about-img-2 { position: absolute; width: 280px; height: 350px; background: linear-gradient(135deg, #f0fff0 0%, #90EE90 100%); border-radius: 100px 30px 100px 30px; bottom: 0; right: 0; display: flex; align-items: center; justify-content: center; font-size: 5rem; box-shadow: 0 30px 60px rgba(34, 139, 34, 0.15); }
        .about-experience { position: absolute; bottom: 150px; left: 50%; transform: translateX(-50%); background: white; padding: 28px 40px; border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.1); text-align: center; z-index: 3; }
        .about-experience-number { font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #228b22; }
        .about-experience-text { color: #3d5a3d; font-weight: 600; }
        .about-content h2 { font-size: 2.8rem; font-weight: 700; color: #1a2e1a; margin-bottom: 24px; line-height: 1.25; }
        .about-content > p { font-size: 1.1rem; color: #3d5a3d; line-height: 1.9; margin-bottom: 20px; }
        .about-list { margin-top: 35px; display: flex; flex-direction: column; gap: 18px; }
        .about-list-item { display: flex; align-items: center; gap: 16px; }
        .about-list-icon { width: 30px; height: 30px; background: #228b22; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.9rem; flex-shrink: 0; }
        .about-list-item span { color: #2d5a2d; font-weight: 600; }
        
        /* Seasons */
        .seasons-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .season-card { background: white; padding: 40px 30px; border-radius: 24px; text-align: center; transition: all 0.4s; box-shadow: 0 15px 50px rgba(0,0,0,0.04); cursor: pointer; }
        .season-card:hover { transform: translateY(-10px); box-shadow: 0 25px 70px rgba(34, 139, 34, 0.12); }
        .season-icon { font-size: 4rem; margin-bottom: 20px; display: block; }
        .season-card h4 { font-size: 1.3rem; font-weight: 700; color: #1a2e1a; margin-bottom: 12px; }
        .season-card p { color: #3d5a3d; font-size: 0.95rem; line-height: 1.7; }
        .season-card:nth-child(1):hover { background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); }
        .season-card:nth-child(2):hover { background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%); }
        .season-card:nth-child(3):hover { background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); }
        .season-card:nth-child(4):hover { background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); }
        
        /* Testimonials */
        .testimonials { background: #f0fff0; }
        .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        .testimonial-card { background: white; padding: 40px; border-radius: 24px; box-shadow: 0 15px 50px rgba(0,0,0,0.05); position: relative; }
        .testimonial-quote { position: absolute; top: 25px; right: 30px; font-size: 5rem; color: #e8f5e9; font-family: Georgia, serif; line-height: 1; }
        .testimonial-stars { color: #f59e0b; margin-bottom: 20px; font-size: 1.2rem; letter-spacing: 3px; }
        .testimonial-text { color: #3d5a3d; font-size: 1.05rem; line-height: 1.9; margin-bottom: 28px; font-style: italic; position: relative; z-index: 1; }
        .testimonial-author { display: flex; align-items: center; gap: 16px; }
        .testimonial-avatar { width: 55px; height: 55px; background: linear-gradient(135deg, #90EE90 0%, #228b22 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
        .testimonial-info strong { display: block; color: #1a2e1a; font-weight: 700; font-family: 'Playfair Display', serif; }
        .testimonial-info span { color: #228b22; font-size: 0.9rem; }
        
        /* CTA */
        .cta { background: linear-gradient(135deg, #228b22 0%, #1e7b1e 100%); padding: 120px 0; position: relative; overflow: hidden; }
        .cta::before { content: '🌻'; position: absolute; font-size: 25rem; opacity: 0.1; bottom: -100px; right: -80px; }
        .cta::after { content: '🌿'; position: absolute; font-size: 18rem; opacity: 0.1; top: -80px; left: -60px; }
        .cta-content { text-align: center; position: relative; z-index: 1; max-width: 800px; margin: 0 auto; }
        .cta h2 { font-size: 3.2rem; font-weight: 700; color: white; margin-bottom: 24px; }
        .cta p { font-size: 1.25rem; color: rgba(255,255,255,0.9); margin-bottom: 40px; }
        .cta-buttons { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
        
        /* Contact */
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
        .contact-info h2 { font-size: 2.5rem; font-weight: 700; color: #1a2e1a; margin-bottom: 20px; }
        .contact-info > p { color: #3d5a3d; font-size: 1.1rem; line-height: 1.9; margin-bottom: 40px; }
        .contact-items { display: flex; flex-direction: column; gap: 24px; }
        .contact-item { display: flex; align-items: center; gap: 20px; }
        .contact-item-icon { width: 65px; height: 65px; background: #f0fff0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; }
        .contact-item-text strong { display: block; color: #1a2e1a; font-weight: 700; margin-bottom: 4px; font-family: 'Playfair Display', serif; }
        .contact-item-text span { color: #3d5a3d; }
        .contact-hours { margin-top: 40px; background: #f0fff0; padding: 35px; border-radius: 24px; }
        .contact-hours h4 { font-size: 1.3rem; color: #1a2e1a; margin-bottom: 20px; display: flex; align-items: center; gap: 12px; }
        .contact-hours-list { display: flex; flex-direction: column; gap: 12px; }
        .contact-hours-item { display: flex; justify-content: space-between; padding-bottom: 12px; border-bottom: 1px solid rgba(34, 139, 34, 0.1); }
        .contact-hours-item:last-child { border: none; padding: 0; }
        .contact-hours-day { font-weight: 600; color: #3d5a3d; }
        .contact-hours-time { color: #228b22; font-weight: 600; }
        .contact-form { background: white; padding: 50px; border-radius: 30px; box-shadow: 0 25px 70px rgba(0,0,0,0.06); }
        .contact-form h3 { font-size: 1.6rem; font-weight: 700; color: #1a2e1a; margin-bottom: 8px; }
        .contact-form > p { color: #3d5a3d; margin-bottom: 30px; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; font-weight: 600; color: #1a2e1a; margin-bottom: 8px; font-size: 0.95rem; }
        .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 16px 20px; border: 2px solid #e8f5e9; border-radius: 12px; font-size: 1rem; transition: all 0.3s; font-family: inherit; background: #fafdf7; }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: #228b22; background: white; }
        .form-group textarea { min-height: 120px; resize: vertical; }
        
        /* Footer */
        footer { background: #1a2e1a; color: white; padding: 80px 0 30px; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; margin-bottom: 60px; }
        .footer-brand .logo { color: white; margin-bottom: 20px; }
        .footer-brand p { color: rgba(255,255,255,0.7); line-height: 1.8; }
        .footer-social { display: flex; gap: 12px; margin-top: 24px; }
        .footer-social a { width: 44px; height: 44px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; transition: all 0.3s; font-size: 1.1rem; }
        .footer-social a:hover { background: #228b22; transform: translateY(-5px); }
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
            .products-grid { grid-template-columns: repeat(2, 1fr); }
            .services-grid { grid-template-columns: repeat(2, 1fr); }
            .seasons-grid { grid-template-columns: repeat(2, 1fr); }
            .footer-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
            .nav-links { display: none; }
            .hero h1 { font-size: 2.5rem; }
            .hero { padding: 140px 0 80px; }
            section { padding: 80px 0; }
            .section-title { font-size: 2.2rem; }
            .products-grid, .services-grid, .testimonials-grid, .seasons-grid { grid-template-columns: 1fr; }
            .hero-floating { display: none; }
            .hero-features { flex-direction: column; gap: 20px; align-items: flex-start; }
            .about-images { height: auto; display: flex; flex-direction: column; gap: 20px; }
            .about-img-1, .about-img-2 { position: relative; width: 100%; }
            .about-experience { position: relative; left: 0; transform: none; margin-top: 20px; }
            .footer-grid { grid-template-columns: 1fr; }
            .footer-bottom { flex-direction: column; gap: 20px; text-align: center; }
            .cta-buttons { flex-direction: column; }
        }
    </style>
</head>
<body>
    <nav>
        <div class="container nav-container">
            <div class="logo"><span class="logo-icon">🌿</span> Gärtnerei Grünblatt</div>
            <ul class="nav-links">
                <li><a href="#sortiment">Sortiment</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#ueber">Über uns</a></li>
                <li><a href="#saison">Saisonales</a></li>
                <li><a href="#kontakt">Kontakt</a></li>
            </ul>
            <a href="#kontakt" class="nav-cta">Beratung anfragen</a>
        </div>
    </nav>

    <section class="hero">
        <div class="container">
            <div class="hero-grid">
                <div class="hero-content">
                    <div class="hero-badge">🌱 Nachhaltig & Regional seit 1985</div>
                    <h1>Wo Ihr Garten zum <span>Paradies</span> wird</h1>
                    <p>Entdecken Sie bei uns eine große Auswahl an Pflanzen, Blumen und allem, was Ihren Garten zum Blühen bringt. Fachkundige Beratung inklusive!</p>
                    <div class="hero-buttons">
                        <a href="#sortiment" class="btn">Sortiment entdecken 🌻</a>
                        <a href="#kontakt" class="btn btn-outline">Beratung anfragen</a>
                    </div>
                    <div class="hero-features">
                        <div class="hero-feature"><div class="hero-feature-icon">🌱</div><div class="hero-feature-text">Bio-Qualität</div></div>
                        <div class="hero-feature"><div class="hero-feature-icon">🏡</div><div class="hero-feature-text">Regionale Zucht</div></div>
                        <div class="hero-feature"><div class="hero-feature-icon">💚</div><div class="hero-feature-text">Fachberatung</div></div>
                    </div>
                </div>
                <div class="hero-image">
                    <div class="hero-image-main">🌻</div>
                    <div class="hero-floating hero-floating-1">
                        <div class="hero-floating-icon">🌿</div>
                        <div class="hero-floating-text"><strong>5000+ Pflanzen</strong><span>Große Auswahl</span></div>
                    </div>
                    <div class="hero-floating hero-floating-2">
                        <div class="hero-floating-icon">⭐</div>
                        <div class="hero-floating-text"><strong>Seit 1985</strong><span>Familientradition</span></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="products" id="sortiment">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Unser Sortiment</span>
                <h2 class="section-title">Für jeden Garten das Richtige</h2>
                <p class="section-desc">Von Balkonpflanzen bis Obstbäume – bei uns finden Sie alles für Ihren grünen Daumen.</p>
            </div>
            <div class="products-grid">
                <div class="product-card">
                    <div class="product-image">🌸<span class="product-badge">Beliebt</span></div>
                    <div class="product-content">
                        <h3>Blühpflanzen</h3>
                        <p>Farbenfroh & duftend</p>
                        <div class="product-footer"><span class="product-price">ab €3,99</span><button class="product-btn">→</button></div>
                    </div>
                </div>
                <div class="product-card">
                    <div class="product-image">🌳</div>
                    <div class="product-content">
                        <h3>Bäume & Sträucher</h3>
                        <p>Für den großen Garten</p>
                        <div class="product-footer"><span class="product-price">ab €19,99</span><button class="product-btn">→</button></div>
                    </div>
                </div>
                <div class="product-card">
                    <div class="product-image">🌿</div>
                    <div class="product-content">
                        <h3>Kräuter</h3>
                        <p>Frisch aus der Region</p>
                        <div class="product-footer"><span class="product-price">ab €2,49</span><button class="product-btn">→</button></div>
                    </div>
                </div>
                <div class="product-card">
                    <div class="product-image">🍅<span class="product-badge">Saison</span></div>
                    <div class="product-content">
                        <h3>Gemüsepflanzen</h3>
                        <p>Für den Nutzgarten</p>
                        <div class="product-footer"><span class="product-price">ab €1,99</span><button class="product-btn">→</button></div>
                    </div>
                </div>
                <div class="product-card">
                    <div class="product-image">🌵</div>
                    <div class="product-content">
                        <h3>Zimmerpflanzen</h3>
                        <p>Grün für drinnen</p>
                        <div class="product-footer"><span class="product-price">ab €8,99</span><button class="product-btn">→</button></div>
                    </div>
                </div>
                <div class="product-card">
                    <div class="product-image">🌹</div>
                    <div class="product-content">
                        <h3>Rosen</h3>
                        <p>Klassische Schönheit</p>
                        <div class="product-footer"><span class="product-price">ab €12,99</span><button class="product-btn">→</button></div>
                    </div>
                </div>
                <div class="product-card">
                    <div class="product-image">🫐</div>
                    <div class="product-content">
                        <h3>Obstgehölze</h3>
                        <p>Früchte aus dem Garten</p>
                        <div class="product-footer"><span class="product-price">ab €24,99</span><button class="product-btn">→</button></div>
                    </div>
                </div>
                <div class="product-card">
                    <div class="product-image">🪴</div>
                    <div class="product-content">
                        <h3>Erden & Dünger</h3>
                        <p>Beste Grundlage</p>
                        <div class="product-footer"><span class="product-price">ab €5,99</span><button class="product-btn">→</button></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="services" id="services">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Unsere Services</span>
                <h2 class="section-title">Mehr als nur Pflanzen</h2>
                <p class="section-desc">Wir unterstützen Sie bei allen Fragen rund um Ihren Garten.</p>
            </div>
            <div class="services-grid">
                <div class="service-card"><div class="service-icon">🎯</div><h3>Gartenplanung</h3><p>Wir helfen Ihnen, Ihren Traumgarten zu gestalten – von der Idee bis zur Umsetzung.</p></div>
                <div class="service-card"><div class="service-icon">🌱</div><h3>Pflanzberatung</h3><p>Welche Pflanze passt zu welchem Standort? Wir beraten Sie fachkundig und individuell.</p></div>
                <div class="service-card"><div class="service-icon">🚚</div><h3>Lieferservice</h3><p>Große Bestellungen liefern wir bequem zu Ihnen nach Hause – im Raum Oranienburg.</p></div>
                <div class="service-card"><div class="service-icon">✂️</div><h3>Pflanzenpflege</h3><p>Tipps und Tricks zur richtigen Pflege – damit Ihre Pflanzen lange leben.</p></div>
                <div class="service-card"><div class="service-icon">🎁</div><h3>Geschenkservice</h3><p>Verschenken Sie Grün! Wir stellen liebevolle Pflanzenpräsente zusammen.</p></div>
                <div class="service-card"><div class="service-icon">📚</div><h3>Workshops</h3><p>Lernen Sie in unseren Kursen alles über Gärtnern, Pflege und Gestaltung.</p></div>
            </div>
        </div>
    </section>

    <section class="about" id="ueber">
        <div class="container">
            <div class="about-grid">
                <div class="about-images">
                    <div class="about-img-1">👨‍🌾</div>
                    <div class="about-img-2">🌷</div>
                    <div class="about-experience"><div class="about-experience-number">38+</div><div class="about-experience-text">Jahre Erfahrung</div></div>
                </div>
                <div class="about-content">
                    <span class="section-label">Über uns</span>
                    <h2>Familientradition seit 1985</h2>
                    <p>Die Gärtnerei Grünblatt wurde vor fast 40 Jahren von Familie Grünblatt gegründet und wird heute in zweiter Generation geführt. Was als kleine Gärtnerei begann, ist heute ein beliebtes Ziel für Gartenliebhaber aus der ganzen Region.</p>
                    <p>Wir legen großen Wert auf nachhaltige Produktion, regionale Herkunft und persönliche Beratung. Bei uns kaufen Sie keine Massenware, sondern Pflanzen mit Charakter.</p>
                    <div class="about-list">
                        <div class="about-list-item"><div class="about-list-icon">✓</div><span>Eigene Aufzucht in unseren Gewächshäusern</span></div>
                        <div class="about-list-item"><div class="about-list-icon">✓</div><span>Nachhaltige & torffreie Erden</span></div>
                        <div class="about-list-item"><div class="about-list-icon">✓</div><span>Regionale Partnerbetriebe</span></div>
                        <div class="about-list-item"><div class="about-list-icon">✓</div><span>Fachkundiges Team mit Leidenschaft</span></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="seasons" id="saison">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Saisonales</span>
                <h2 class="section-title">Für jede Jahreszeit</h2>
                <p class="section-desc">Entdecken Sie unsere saisonalen Highlights und Aktionen.</p>
            </div>
            <div class="seasons-grid">
                <div class="season-card"><span class="season-icon">🌸</span><h4>Frühling</h4><p>Primeln, Tulpen, Narzissen und alles für die Aussaat.</p></div>
                <div class="season-card"><span class="season-icon">☀️</span><h4>Sommer</h4><p>Balkonpflanzen, Stauden und mediterrane Kräuter.</p></div>
                <div class="season-card"><span class="season-icon">🍂</span><h4>Herbst</h4><p>Chrysanthemen, Heidepflanzen und Kürbisse.</p></div>
                <div class="season-card"><span class="season-icon">❄️</span><h4>Winter</h4><p>Christrosen, Amaryllis und Weihnachtssterne.</p></div>
            </div>
        </div>
    </section>

    <section class="testimonials">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Kundenstimmen</span>
                <h2 class="section-title">Das sagen unsere Kunden</h2>
                <p class="section-desc">Überzeugen Sie sich selbst von unserer Qualität.</p>
            </div>
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <div class="testimonial-quote">"</div>
                    <div class="testimonial-stars">★★★★★</div>
                    <p class="testimonial-text">Die beste Gärtnerei in der Umgebung! Die Pflanzen sind gesund und die Beratung ist immer top.</p>
                    <div class="testimonial-author"><div class="testimonial-avatar">👩</div><div class="testimonial-info"><strong>Monika W.</strong><span>Hobbygärtnerin</span></div></div>
                </div>
                <div class="testimonial-card">
                    <div class="testimonial-quote">"</div>
                    <div class="testimonial-stars">★★★★★</div>
                    <p class="testimonial-text">Mein Garten ist dank Grünblatt ein echtes Paradies geworden. Danke für die tolle Gartenplanung!</p>
                    <div class="testimonial-author"><div class="testimonial-avatar">👨</div><div class="testimonial-info"><strong>Klaus B.</strong><span>Stammkunde</span></div></div>
                </div>
                <div class="testimonial-card">
                    <div class="testimonial-quote">"</div>
                    <div class="testimonial-stars">★★★★★</div>
                    <p class="testimonial-text">Faire Preise, riesige Auswahl und immer freundlich. Hier kaufe ich seit Jahren meine Pflanzen.</p>
                    <div class="testimonial-author"><div class="testimonial-avatar">👩</div><div class="testimonial-info"><strong>Ingrid M.</strong><span>Gartenliebhaberin</span></div></div>
                </div>
            </div>
        </div>
    </section>

    <section class="cta">
        <div class="container">
            <div class="cta-content">
                <h2>Besuchen Sie uns in Oranienburg!</h2>
                <p>Überzeugen Sie sich selbst von unserer Qualität und lassen Sie sich inspirieren. Wir freuen uns auf Ihren Besuch!</p>
                <div class="cta-buttons">
                    <a href="#kontakt" class="btn btn-white">📍 Anfahrt & Öffnungszeiten</a>
                    <a href="tel:+493301987654" class="btn btn-outline" style="border-color: white; color: white;">📞 Jetzt anrufen</a>
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
                    <p>Wir sind für Sie da! Bei Fragen rund um Pflanzen, Garten oder unsere Services erreichen Sie uns jederzeit.</p>
                    <div class="contact-items">
                        <div class="contact-item"><div class="contact-item-icon">📍</div><div class="contact-item-text"><strong>Adresse</strong><span>Gartenweg 15, 16515 Oranienburg</span></div></div>
                        <div class="contact-item"><div class="contact-item-icon">📞</div><div class="contact-item-text"><strong>Telefon</strong><span>+49 (0) 3301 987654</span></div></div>
                        <div class="contact-item"><div class="contact-item-icon">✉️</div><div class="contact-item-text"><strong>E-Mail</strong><span>info@gaertnerei-gruenblatt.de</span></div></div>
                    </div>
                    <div class="contact-hours">
                        <h4>🕐 Öffnungszeiten</h4>
                        <div class="contact-hours-list">
                                                    <div class="contact-hours-item"><span class="contact-hours-day">Montag - Freitag</span><span class="contact-hours-time">08:00 - 18:00</span></div>
                            <div class="contact-hours-item"><span class="contact-hours-day">Samstag</span><span class="contact-hours-time">08:00 - 16:00</span></div>
                            <div class="contact-hours-item"><span class="contact-hours-day">Sonntag</span><span class="contact-hours-time">10:00 - 14:00</span></div>
                        </div>
                    </div>
                </div>
                <div class="contact-form">
                    <h3>Schreiben Sie uns</h3>
                    <p>Wir melden uns schnellstmöglich bei Ihnen.</p>
                    <form>
                        <div class="form-group"><label>Name</label><input type="text" placeholder="Ihr Name"></div>
                        <div class="form-group"><label>E-Mail</label><input type="email" placeholder="ihre@email.de"></div>
                        <div class="form-group"><label>Betreff</label>
                            <select><option>Bitte wählen...</option><option>Allgemeine Anfrage</option><option>Gartenplanung</option><option>Lieferservice</option><option>Workshop-Anmeldung</option></select>
                        </div>
                        <div class="form-group"><label>Nachricht</label><textarea placeholder="Ihre Nachricht..."></textarea></div>
                        <button type="submit" class="btn" style="width: 100%;">Nachricht senden 🌿</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div class="logo"><span class="logo-icon">🌿</span> Gärtnerei Grünblatt</div>
                    <p>Ihre Gärtnerei in Oranienburg. Seit 1985 bringen wir Ihren Garten zum Blühen.</p>
                    <div class="footer-social"><a href="#">📘</a><a href="#">📸</a><a href="#">📍</a></div>
                </div>
                <div class="footer-column"><h4>Sortiment</h4><a href="#">Blühpflanzen</a><a href="#">Bäume & Sträucher</a><a href="#">Kräuter</a><a href="#">Zimmerpflanzen</a></div>
                <div class="footer-column"><h4>Services</h4><a href="#">Gartenplanung</a><a href="#">Pflanzberatung</a><a href="#">Lieferservice</a><a href="#">Workshops</a></div>
                <div class="footer-column"><h4>Kontakt</h4><a href="#">Gartenweg 15</a><a href="#">16515 Oranienburg</a><a href="#">+49 3301 987654</a><a href="#">info@gruenblatt.de</a></div>
            </div>
            <div class="footer-bottom">
                <p>© 2024 Gärtnerei Grünblatt. Mit 💚 gewachsen in Oranienburg.</p>
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
    },

    darkTech: {
        name: 'Dark Tech',
        industry: 'CyberDev Solutions',
        description: 'Modernes, dunkles Design für Tech- und IT-Unternehmen',
        html: `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CyberDev Solutions - Innovative Software aus Oranienburg</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; background: #0a0a0b; color: #e4e4e7; line-height: 1.7; }
        code, .mono { font-family: 'JetBrains Mono', monospace; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        /* Glow Effects */
        .glow-cyan { box-shadow: 0 0 40px rgba(6, 182, 212, 0.3); }
        .glow-purple { box-shadow: 0 0 40px rgba(168, 85, 247, 0.3); }
        .text-gradient { background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        
        /* Navigation */
        nav { background: rgba(10, 10, 11, 0.9); padding: 18px 0; position: fixed; top: 0; left: 0; right: 0; z-index: 1000; backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .nav-container { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5rem; font-weight: 800; color: white; display: flex; align-items: center; gap: 12px; }
        .logo-icon { width: 40px; height: 40px; background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
        .nav-links { display: flex; gap: 40px; list-style: none; }
        .nav-links a { text-decoration: none; color: #a1a1aa; font-weight: 500; font-size: 0.95rem; transition: all 0.3s; }
        .nav-links a:hover { color: #06b6d4; }
        .nav-cta { background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%); color: white; padding: 12px 28px; border-radius: 8px; font-weight: 600; text-decoration: none; transition: all 0.3s; }
        .nav-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 40px rgba(6, 182, 212, 0.4); }
        
        /* Buttons */
        .btn { display: inline-flex; align-items: center; gap: 10px; padding: 16px 36px; background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%); color: white; border-radius: 10px; text-decoration: none; font-weight: 700; transition: all 0.3s; border: none; cursor: pointer; font-size: 1rem; }
        .btn:hover { transform: translateY(-3px); box-shadow: 0 20px 50px rgba(6, 182, 212, 0.4); }
        .btn-outline { background: transparent; border: 2px solid rgba(255,255,255,0.2); color: white; }
        .btn-outline:hover { border-color: #06b6d4; background: rgba(6, 182, 212, 0.1); box-shadow: none; }
        .btn-dark { background: rgba(255,255,255,0.1); }
        .btn-dark:hover { background: rgba(255,255,255,0.15); box-shadow: none; }
        
        /* Hero */
        .hero { padding: 200px 0 150px; position: relative; overflow: hidden; }
        .hero::before { content: ''; position: absolute; width: 800px; height: 800px; background: radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%); top: -300px; right: -200px; }
        .hero::after { content: ''; position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%); bottom: -200px; left: -100px; }
        .hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 80px; align-items: center; position: relative; z-index: 1; }
        .hero-content { position: relative; }
        .hero-badge { display: inline-flex; align-items: center; gap: 10px; background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.3); color: #06b6d4; padding: 10px 20px; border-radius: 50px; font-size: 0.85rem; font-weight: 600; margin-bottom: 28px; font-family: 'JetBrains Mono', monospace; }
        .hero-badge::before { content: ''; width: 8px; height: 8px; background: #06b6d4; border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .hero h1 { font-size: 4rem; font-weight: 900; line-height: 1.1; margin-bottom: 24px; color: white; letter-spacing: -2px; }
        .hero p { font-size: 1.2rem; color: #a1a1aa; margin-bottom: 40px; line-height: 1.9; }
        .hero-buttons { display: flex; gap: 16px; flex-wrap: wrap; }
        .hero-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-top: 60px; padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.1); }
        .hero-stat { text-align: center; }
        .hero-stat-number { font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-stat-label { color: #71717a; font-size: 0.9rem; margin-top: 5px; }
        .hero-visual { position: relative; }
        .hero-code { background: #18181b; border-radius: 16px; padding: 30px; border: 1px solid rgba(255,255,255,0.1); font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; box-shadow: 0 40px 80px rgba(0,0,0,0.5); }
        .hero-code-header { display: flex; gap: 8px; margin-bottom: 20px; }
        .hero-code-dot { width: 12px; height: 12px; border-radius: 50%; }
        .hero-code-dot:nth-child(1) { background: #ef4444; }
        .hero-code-dot:nth-child(2) { background: #eab308; }
        .hero-code-dot:nth-child(3) { background: #22c55e; }
        .hero-code-content { line-height: 2; }
        .code-comment { color: #6b7280; }
        .code-keyword { color: #a855f7; }
        .code-function { color: #06b6d4; }
        .code-string { color: #22c55e; }
        .code-variable { color: #f472b6; }
        .hero-floating { position: absolute; background: #18181b; padding: 16px 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; gap: 12px; }
        .hero-floating-1 { top: -20px; right: -20px; }
        .hero-floating-2 { bottom: -20px; left: -20px; }
        .hero-floating-icon { width: 40px; height: 40px; background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; }
        .hero-floating-text { font-size: 0.85rem; }
        .hero-floating-text strong { display: block; color: white; font-weight: 600; }
        .hero-floating-text span { color: #71717a; }
        
        /* Section Styles */
        section { padding: 120px 0; }
        .section-header { text-align: center; margin-bottom: 80px; }
        .section-label { display: inline-block; background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.3); color: #06b6d4; padding: 8px 20px; border-radius: 50px; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; font-family: 'JetBrains Mono', monospace; }
        .section-title { font-size: 3rem; font-weight: 800; color: white; margin-bottom: 20px; letter-spacing: -1px; }
        .section-desc { font-size: 1.15rem; color: #a1a1aa; max-width: 650px; margin: 0 auto; }
        
        /* Services */
        .services { background: linear-gradient(180deg, #0a0a0b 0%, #18181b 100%); }
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        .service-card { background: rgba(255,255,255,0.02); padding: 40px 32px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); transition: all 0.4s; position: relative; overflow: hidden; }
        .service-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #06b6d4, #a855f7, transparent); opacity: 0; transition: opacity 0.3s; }
        .service-card:hover { border-color: rgba(6, 182, 212, 0.3); transform: translateY(-10px); background: rgba(255,255,255,0.03); }
        .service-card:hover::before { opacity: 1; }
        .service-icon { width: 70px; height: 70px; background: linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 28px; }
        .service-card h3 { font-size: 1.35rem; font-weight: 700; margin-bottom: 16px; color: white; }
        .service-card p { color: #a1a1aa; line-height: 1.8; margin-bottom: 24px; }
        .service-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .service-tag { background: rgba(255,255,255,0.05); padding: 6px 14px; border-radius: 6px; font-size: 0.8rem; color: #71717a; font-family: 'JetBrains Mono', monospace; }
        
        /* Technologies */
        .tech { background: #0a0a0b; }
        .tech-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 20px; }
        .tech-item { background: rgba(255,255,255,0.02); padding: 30px; border-radius: 16px; text-align: center; border: 1px solid rgba(255,255,255,0.05); transition: all 0.3s; cursor: pointer; }
        .tech-item:hover { border-color: rgba(6, 182, 212, 0.3); background: rgba(255,255,255,0.04); transform: translateY(-5px); }
        .tech-item-icon { font-size: 3rem; margin-bottom: 16px; display: block; }
        .tech-item-name { font-weight: 600; color: white; font-size: 0.95rem; }
        
        /* Process */
        .process { background: linear-gradient(180deg, #0a0a0b 0%, #18181b 100%); }
        .process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .process-card { background: rgba(255,255,255,0.02); padding: 40px 30px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); text-align: center; position: relative; transition: all 0.3s; }
        .process-card:hover { border-color: rgba(6, 182, 212, 0.3); }
        .process-number { position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 45px; height: 45px; background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.2rem; color: white; }
        .process-icon { font-size: 3rem; margin: 20px 0; display: block; }
        .process-card h4 { font-size: 1.2rem; font-weight: 700; color: white; margin-bottom: 12px; }
        .process-card p { color: #a1a1aa; font-size: 0.95rem; line-height: 1.7; }
        
        /* Projects */
        .projects { background: #0a0a0b; }
        .projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
        .project-card { background: rgba(255,255,255,0.02); border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); transition: all 0.4s; }
        .project-card:hover { border-color: rgba(6, 182, 212, 0.3); transform: translateY(-10px); }
        .project-image { height: 250px; display: flex; align-items: center; justify-content: center; font-size: 5rem; position: relative; }
        .project-card:nth-child(1) .project-image { background: linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%); }
        .project-card:nth-child(2) .project-image { background: linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%); }
        .project-card:nth-child(3) .project-image { background: linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%); }
        .project-card:nth-child(4) .project-image { background: linear-gradient(135deg, rgba(234, 179, 8, 0.2) 0%, rgba(239, 68, 68, 0.2) 100%); }
        .project-content { padding: 32px; }
        .project-tags { display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }
        .project-tag { background: rgba(6, 182, 212, 0.1); color: #06b6d4; padding: 6px 14px; border-radius: 6px; font-size: 0.8rem; font-family: 'JetBrains Mono', monospace; }
        .project-content h3 { font-size: 1.5rem; font-weight: 700; color: white; margin-bottom: 12px; }
        .project-content p { color: #a1a1aa; line-height: 1.8; margin-bottom: 20px; }
        .project-link { color: #06b6d4; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; transition: gap 0.3s; }
        .project-link:hover { gap: 14px; }
        
        /* Testimonials */
        .testimonials { background: linear-gradient(180deg, #0a0a0b 0%, #18181b 100%); }
        .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        .testimonial-card { background: rgba(255,255,255,0.02); padding: 36px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); position: relative; }
        .testimonial-quote { position: absolute; top: 30px; right: 30px; font-size: 4rem; background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; opacity: 0.3; line-height: 1; }
        .testimonial-stars { color: #eab308; margin-bottom: 20px; font-size: 1rem; letter-spacing: 3px; }
        .testimonial-text { color: #a1a1aa; font-size: 1rem; line-height: 1.9; margin-bottom: 28px; position: relative; z-index: 1; }
        .testimonial-author { display: flex; align-items: center; gap: 16px; }
        .testimonial-avatar { width: 50px; height: 50px; background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; }
        .testimonial-info strong { display: block; color: white; font-weight: 600; }
        .testimonial-info span { color: #71717a; font-size: 0.9rem; }
        
        /* CTA */
        .cta { background: #0a0a0b; padding: 120px 0; position: relative; overflow: hidden; }
        .cta::before { content: ''; position: absolute; width: 100%; height: 100%; background: radial-gradient(ellipse at center, rgba(6, 182, 212, 0.1) 0%, transparent 60%); }
        .cta-content { text-align: center; position: relative; z-index: 1; max-width: 800px; margin: 0 auto; }
        .cta-content h2 { font-size: 3.5rem; font-weight: 900; color: white; margin-bottom: 24px; letter-spacing: -1px; }
        .cta-content p { font-size: 1.25rem; color: #a1a1aa; margin-bottom: 40px; }
        .cta-buttons { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
        .cta-terminal { background: #18181b; border-radius: 16px; padding: 24px 32px; margin-top: 60px; display: inline-flex; align-items: center; gap: 16px; border: 1px solid rgba(255,255,255,0.1); font-family: 'JetBrains Mono', monospace; }
        .cta-terminal-prompt { color: #22c55e; }
        .cta-terminal-command { color: #e4e4e7; }
        .cta-terminal-cursor { display: inline-block; width: 10px; height: 20px; background: #06b6d4; animation: blink 1s infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        
        /* Contact */
        .contact { background: linear-gradient(180deg, #0a0a0b 0%, #18181b 100%); }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
        .contact-info h2 { font-size: 2.5rem; font-weight: 800; color: white; margin-bottom: 20px; }
        .contact-info > p { color: #a1a1aa; font-size: 1.1rem; line-height: 1.9; margin-bottom: 40px; }
        .contact-items { display: flex; flex-direction: column; gap: 24px; }
        .contact-item { display: flex; align-items: center; gap: 20px; }
        .contact-item-icon { width: 60px; height: 60px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
        .contact-item-text strong { display: block; color: white; font-weight: 600; margin-bottom: 4px; }
        .contact-item-text span { color: #a1a1aa; }
        .contact-item-text a { color: #06b6d4; text-decoration: none; }
        .contact-form { background: rgba(255,255,255,0.02); padding: 45px; border-radius: 24px; border: 1px solid rgba(255,255,255,0.05); }
        .contact-form h3 { font-size: 1.5rem; font-weight: 700; color: white; margin-bottom: 8px; }
        .contact-form > p { color: #71717a; margin-bottom: 30px; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; font-weight: 600; color: #e4e4e7; margin-bottom: 8px; font-size: 0.9rem; }
        .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 16px 20px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; font-size: 1rem; color: white; transition: all 0.3s; font-family: inherit; }
        .form-group input::placeholder, .form-group textarea::placeholder { color: #52525b; }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: #06b6d4; background: rgba(6, 182, 212, 0.05); }
        .form-group textarea { min-height: 120px; resize: vertical; }
        .form-group select { appearance: none; cursor: pointer; }
        
        /* Footer */
        footer { background: #0a0a0b; color: white; padding: 80px 0 30px; border-top: 1px solid rgba(255,255,255,0.05); }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; margin-bottom: 60px; }
        .footer-brand .logo { margin-bottom: 20px; }
        .footer-brand p { color: #71717a; line-height: 1.8; }
        .footer-social { display: flex; gap: 12px; margin-top: 24px; }
        .footer-social a { width: 44px; height: 44px; background: rgba(255,255,255,0.05); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #a1a1aa; text-decoration: none; transition: all 0.3s; }
        .footer-social a:hover { background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%); color: white; transform: translateY(-5px); }
        .footer-column h4 { font-weight: 700; margin-bottom: 24px; font-size: 1rem; color: white; }
        .footer-column a { display: block; color: #71717a; text-decoration: none; padding: 8px 0; transition: all 0.3s; }
        .footer-column a:hover { color: #06b6d4; padding-left: 5px; }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.05); padding-top: 30px; display: flex; justify-content: space-between; align-items: center; color: #52525b; font-size: 0.9rem; }
        .footer-legal { display: flex; gap: 30px; }
        .footer-legal a { color: #52525b; text-decoration: none; transition: color 0.3s; }
        .footer-legal a:hover { color: #06b6d4; }
        
        /* Responsive */
        @media (max-width: 1024px) {
            .hero-grid, .contact-grid { grid-template-columns: 1fr; gap: 60px; }
            .services-grid { grid-template-columns: repeat(2, 1fr); }
            .tech-grid { grid-template-columns: repeat(3, 1fr); }
            .process-grid { grid-template-columns: repeat(2, 1fr); }
            .projects-grid { grid-template-columns: 1fr; }
            .footer-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
            .nav-links { display: none; }
            .hero h1 { font-size: 2.5rem; }
            .hero { padding: 140px 0 80px; }
            section { padding: 80px 0; }
            .section-title { font-size: 2.2rem; }
            .services-grid, .testimonials-grid, .process-grid { grid-template-columns: 1fr; }
            .tech-grid { grid-template-columns: repeat(2, 1fr); }
            .hero-stats { grid-template-columns: 1fr; gap: 20px; }
            .hero-floating { display: none; }
            .footer-grid { grid-template-columns: 1fr; }
            .footer-bottom { flex-direction: column; gap: 20px; text-align: center; }
            .cta-content h2 { font-size: 2.2rem; }
            .cta-terminal { flex-direction: column; text-align: center; }
        }
    </style>
</head>
<body>
    <nav>
        <div class="container nav-container">
            <div class="logo"><div class="logo-icon">⚡</div> CyberDev</div>
            <ul class="nav-links">
                <li><a href="#services">Services</a></li>
                <li><a href="#tech">Technologien</a></li>
                <li><a href="#projekte">Projekte</a></li>
                <li><a href="#prozess">Prozess</a></li>
                <li><a href="#kontakt">Kontakt</a></li>
            </ul>
            <a href="#kontakt" class="nav-cta">Projekt starten</a>
        </div>
    </nav>

    <section class="hero">
        <div class="container">
            <div class="hero-grid">
                <div class="hero-content">
                    <div class="hero-badge"><span></span> v2.0 jetzt verfügbar</div>
                    <h1>Wir bauen die <span class="text-gradient">Software</span> von morgen</h1>
                    <p>Von der ersten Idee bis zum fertigen Produkt – wir entwickeln maßgeschneiderte Softwarelösungen, die Ihr Business voranbringen.</p>
                    <div class="hero-buttons">
                        <a href="#kontakt" class="btn">Projekt besprechen →</a>
                        <a href="#projekte" class="btn btn-outline">Referenzen ansehen</a>
                    </div>
                    <div class="hero-stats">
                        <div class="hero-stat"><div class="hero-stat-number">150+</div><div class="hero-stat-label">Projekte</div></div>
                        <div class="hero-stat"><div class="hero-stat-number">99%</div><div class="hero-stat-label">Zufriedenheit</div></div>
                        <div class="hero-stat"><div class="hero-stat-number">24/7</div><div class="hero-stat-label">Support</div></div>
                    </div>
                </div>
                <div class="hero-visual">
                    <div class="hero-code">
                        <div class="hero-code-header"><div class="hero-code-dot"></div><div class="hero-code-dot"></div><div class="hero-code-dot"></div></div>
                        <div class="hero-code-content">
                            <div><span class="code-comment">// Ihre Vision, unser Code</span></div>
                            <div><span class="code-keyword">const</span> <span class="code-variable">projekt</span> = <span class="code-keyword">await</span> <span class="code-function">cyberdev</span>.<span class="code-function">create</span>({</div>
                            <div>&nbsp;&nbsp;name: <span class="code-string">"Ihr Projekt"</span>,</div>
                            <div>&nbsp;&nbsp;tech: [<span class="code-string">"React"</span>, <span class="code-string">"Node"</span>],</div>
                            <div>&nbsp;&nbsp;quality: <span class="code-string">"enterprise"</span></div>
                            <div>});</div>
                            <div>&nbsp;</div>
                            <div><span class="code-comment">// 🚀 Bereit zum Start!</span></div>
                        </div>
                    </div>
                    <div class="hero-floating hero-floating-1">
                        <div class="hero-floating-icon">✓</div>
                        <div class="hero-floating-text"><strong>Build erfolgreich</strong><span>0 Fehler</span></div>
                    </div>
                    <div class="hero-floating hero-floating-2">
                        <div class="hero-floating-icon">🔒</div>
                        <div class="hero-floating-text"><strong>100% sicher</strong><span>SSL encrypted</span></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="services" id="services">
        <div class="container">
            <div class="section-header">
                <span class="section-label">// Services</span>
                <h2 class="section-title">Was wir für Sie tun</h2>
                <p class="section-desc">Fullstack-Entwicklung, Cloud-Lösungen und digitale Transformation aus einer Hand.</p>
            </div>
            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon">💻</div>
                    <h3>Web-Entwicklung</h3>
                    <p>Moderne Webanwendungen mit React, Vue oder Angular. Schnell, responsiv und benutzerfreundlich.</p>
                    <div class="service-tags"><span class="service-tag">React</span><span class="service-tag">Next.js</span><span class="service-tag">TypeScript</span></div>
                </div>
                <div class="service-card">
                    <div class="service-icon">📱</div>
                    <h3>Mobile Apps</h3>
                    <p>Native und Cross-Platform Apps für iOS und Android. Performant und intuitiv.</p>
                    <div class="service-tags"><span class="service-tag">React Native</span><span class="service-tag">Flutter</span><span class="service-tag">Swift</span></div>
                </div>
                <div class="service-card">
                    <div class="service-icon">☁️</div>
                    <h3>Cloud & DevOps</h3>
                    <p>Skalierbare Cloud-Infrastruktur und automatisierte CI/CD Pipelines.</p>
                    <div class="service-tags"><span class="service-tag">AWS</span><span class="service-tag">Docker</span><span class="service-tag">Kubernetes</span></div>
                </div>
                <div class="service-card">
                    <div class="service-icon">🔗</div>
                    <h3>API-Entwicklung</h3>
                    <p>RESTful und GraphQL APIs für nahtlose Integration Ihrer Systeme.</p>
                    <div class="service-tags"><span class="service-tag">Node.js</span><span class="service-tag">GraphQL</span><span class="service-tag">REST</span></div>
                </div>
                <div class="service-card">
                    <div class="service-icon">🤖</div>
                    <h3>KI & Automation</h3>
                    <p>Machine Learning und intelligente Automatisierung für Ihr Business.</p>
                    <div class="service-tags"><span class="service-tag">Python</span><span class="service-tag">TensorFlow</span><span class="service-tag">OpenAI</span></div>
                </div>
                <div class="service-card">
                    <div class="service-icon">🛡️</div>
                    <h3>Security</h3>
                    <p>Penetration Testing, Code Audits und sichere Architektur für Ihre Anwendungen.</p>
                    <div class="service-tags"><span class="service-tag">OWASP</span><span class="service-tag">Audit</span><span class="service-tag">Encryption</span></div>
                </div>
            </div>
        </div>
    </section>

    <section class="tech" id="tech">
        <div class="container">
            <div class="section-header">
                <span class="section-label">// Tech Stack</span>
                <h2 class="section-title">Unsere Technologien</h2>
                <p class="section-desc">Wir arbeiten mit den modernsten Technologien für optimale Ergebnisse.</p>
            </div>
            <div class="tech-grid">
                <div class="tech-item"><span class="tech-item-icon">⚛️</span><span class="tech-item-name">React</span></div>
                <div class="tech-item"><span class="tech-item-icon">🟢</span><span class="tech-item-name">Node.js</span></div>
                <div class="tech-item"><span class="tech-item-icon">🔷</span><span class="tech-item-name">TypeScript</span></div>
                <div class="tech-item"><span class="tech-item-icon">🐍</span><span class="tech-item-name">Python</span></div>
                <div class="tech-item"><span class="tech-item-icon">☁️</span><span class="tech-item-name">AWS</span></div>
                <div class="tech-item"><span class="tech-item-icon">🐳</span><span class="tech-item-name">Docker</span></div>
                <div class="tech-item"><span class="tech-item-icon">🔶</span><span class="tech-item-name">Firebase</span></div>
                <div class="tech-item"><span class="tech-item-icon">🐘</span><span class="tech-item-name">PostgreSQL</span></div>
                <div class="tech-item"><span class="tech-item-icon">🍃</span><span class="tech-item-name">MongoDB</span></div>
                <div class="tech-item"><span class="tech-item-icon">⚡</span><span class="tech-item-name">GraphQL</span></div>
                <div class="tech-item"><span class="tech-item-icon">🔺</span><span class="tech-item-name">Vercel</span></div>
                <div class="tech-item"><span class="tech-item-icon">🎨</span><span class="tech-item-name">Figma</span></div>
            </div>
        </div>
    </section>

    <section class="process" id="prozess">
        <div class="container">
            <div class="section-header">
                <span class="section-label">// Workflow</span>
                <h2 class="section-title">Unser Entwicklungsprozess</h2>
                <p class="section-desc">Agile Methoden für schnelle und transparente Projektentwicklung.</p>
            </div>
            <div class="process-grid">
                <div class="process-card"><div class="process-number">1</div><span class="process-icon">💡</span><h4>Discovery</h4><p>Analyse Ihrer Anforderungen und Definition der Projektziele.</p></div>
                <div class="process-card"><div class="process-number">2</div><span class="process-icon">✏️</span><h4>Design</h4><p>UX/UI Design und technische Architektur Ihrer Lösung.</p></div>
                <div class="process-card"><div class="process-number">3</div><span class="process-icon">⚙️</span><h4>Development</h4><p>Agile Entwicklung mit regelmäßigen Sprints und Reviews.</p></div>
                <div class="process-card"><div class="process-number">4</div><span class="process-icon">🚀</span><h4>Launch</h4><p>Testing, Deployment und kontinuierlicher Support.</p></div>
            </div>
        </div>
    </section>

    <section class="projects" id="projekte">
        <div class="container">
            <div class="section-header">
                <span class="section-label">// Portfolio</span>
                <h2 class="section-title">Ausgewählte Projekte</h2>
                <p class="section-desc">Einige unserer erfolgreich umgesetzten Kundenprojekte.</p>
            </div>
            <div class="projects-grid">
                <div class="project-card">
                    <div class="project-image">📊</div>
                    <div class="project-content">
                        <div class="project-tags"><span class="project-tag">React</span><span class="project-tag">Node.js</span><span class="project-tag">AWS</span></div>
                        <h3>FinanceHub Dashboard</h3>
                        <p>Echtzeit-Finanzdashboard für einen großen Vermögensverwalter mit über 10.000 aktiven Nutzern.</p>
                        <a href="#" class="project-link">Case Study ansehen →</a>
                    </div>
                </div>
                <div class="project-card">
                    <div class="project-image">🛒</div>
                    <div class="project-content">
                        <div class="project-tags"><span class="project-tag">Next.js</span><span class="project-tag">Shopify</span><span class="project-tag">GraphQL</span></div>
                        <h3>StyleStore E-Commerce</h3>
                        <p>Headless E-Commerce Plattform mit 300% Steigerung der Conversion Rate.</p>
                        <a href="#" class="project-link">Case Study ansehen →</a>
                    </div>
                </div>
                <div class="project-card">
                    <div class="project-image">🏥</div>
                    <div class="project-content">
                        <div class="project-tags"><span class="project-tag">React Native</span><span class="project-tag">Firebase</span><span class="project-tag">HL7</span></div>
                        <h3>MediConnect App</h3>
                        <p>Telemedizin-App für eine Klinikgruppe mit Videokonferenz und Terminbuchung.</p>
                        <a href="#" class="project-link">Case Study ansehen →</a>
                    </div>
                </div>
                <div class="project-card">
                    <div class="project-image">🏭</div>
                    <div class="project-content">
                        <div class="project-tags"><span class="project-tag">Python</span><span class="project-tag">TensorFlow</span><span class="project-tag">IoT</span></div>
                        <h3>SmartFactory AI</h3>
                        <p>KI-basierte Qualitätskontrolle für einen Automobilzulieferer mit 98% Genauigkeit.</p>
                                                <a href="#" class="project-link">Case Study ansehen →</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="testimonials">
        <div class="container">
            <div class="section-header">
                <span class="section-label">// Feedback</span>
                <h2 class="section-title">Was unsere Kunden sagen</h2>
                <p class="section-desc">Erfolgsgeschichten aus der Zusammenarbeit mit unseren Partnern.</p>
            </div>
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <div class="testimonial-quote">"</div>
                    <div class="testimonial-stars">★★★★★</div>
                    <p class="testimonial-text">CyberDev hat unsere Vision perfekt umgesetzt. Die Zusammenarbeit war professionell und das Ergebnis übertrifft unsere Erwartungen.</p>
                    <div class="testimonial-author"><div class="testimonial-avatar">👨‍💼</div><div class="testimonial-info"><strong>Thomas M.</strong><span>CEO, FinTech Startup</span></div></div>
                </div>
                <div class="testimonial-card">
                    <div class="testimonial-quote">"</div>
                    <div class="testimonial-stars">★★★★★</div>
                    <p class="testimonial-text">Schnelle Umsetzung, sauberer Code und exzellente Kommunikation. Unser Go-to Partner für alle Entwicklungsprojekte.</p>
                    <div class="testimonial-author"><div class="testimonial-avatar">👩‍💼</div><div class="testimonial-info"><strong>Sarah K.</strong><span>CTO, E-Commerce GmbH</span></div></div>
                </div>
                <div class="testimonial-card">
                    <div class="testimonial-quote">"</div>
                    <div class="testimonial-stars">★★★★★</div>
                    <p class="testimonial-text">Die KI-Lösung von CyberDev hat unsere Produktionseffizienz um 40% gesteigert. Absolute Empfehlung!</p>
                    <div class="testimonial-author"><div class="testimonial-avatar">👨‍🔬</div><div class="testimonial-info"><strong>Dr. Michael B.</strong><span>Leiter Digitalisierung</span></div></div>
                </div>
            </div>
        </div>
    </section>

    <section class="cta">
        <div class="container">
            <div class="cta-content">
                <h2>Bereit für Ihr nächstes <span class="text-gradient">Projekt</span>?</h2>
                <p>Lassen Sie uns gemeinsam Ihre Idee in Code verwandeln. Kostenlose Erstberatung innerhalb von 24 Stunden.</p>
                <div class="cta-buttons">
                    <a href="#kontakt" class="btn">Projekt starten →</a>
                    <a href="tel:+493301456789" class="btn btn-outline">📞 Direkt anrufen</a>
                </div>
                <div class="cta-terminal">
                    <span class="cta-terminal-prompt">$</span>
                    <span class="cta-terminal-command">npx create-cyberdev-project</span>
                    <span class="cta-terminal-cursor"></span>
                </div>
            </div>
        </div>
    </section>

    <section class="contact" id="kontakt">
        <div class="container">
            <div class="contact-grid">
                <div class="contact-info">
                    <span class="section-label">// Kontakt</span>
                    <h2>Let's build something great</h2>
                    <p>Erzählen Sie uns von Ihrem Projekt. Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
                    <div class="contact-items">
                        <div class="contact-item"><div class="contact-item-icon">📍</div><div class="contact-item-text"><strong>Standort</strong><span>Innovationspark 7, 16515 Oranienburg</span></div></div>
                        <div class="contact-item"><div class="contact-item-icon">📞</div><div class="contact-item-text"><strong>Telefon</strong><span>+49 (0) 3301 456789</span></div></div>
                        <div class="contact-item"><div class="contact-item-icon">✉️</div><div class="contact-item-text"><strong>E-Mail</strong><a href="mailto:hello@cyberdev.de">hello@cyberdev.de</a></div></div>
                        <div class="contact-item"><div class="contact-item-icon">💬</div><div class="contact-item-text"><strong>Discord</strong><a href="#">discord.gg/cyberdev</a></div></div>
                    </div>
                </div>
                <div class="contact-form">
                    <h3>Projektanfrage</h3>
                    <p>Füllen Sie das Formular aus und wir melden uns bei Ihnen.</p>
                    <form>
                        <div class="form-group"><label>Name</label><input type="text" placeholder="Ihr Name"></div>
                        <div class="form-group"><label>E-Mail</label><input type="email" placeholder="ihre@email.de"></div>
                        <div class="form-group"><label>Projektart</label>
                            <select>
                                <option>Bitte wählen...</option>
                                <option>Web-Entwicklung</option>
                                <option>Mobile App</option>
                                <option>Cloud & DevOps</option>
                                <option>KI & Automation</option>
                                <option>Sonstiges</option>
                            </select>
                        </div>
                        <div class="form-group"><label>Budget</label>
                            <select>
                                <option>Bitte wählen...</option>
                                <option>< 10.000 €</option>
                                <option>10.000 - 50.000 €</option>
                                <option>50.000 - 100.000 €</option>
                                <option>> 100.000 €</option>
                            </select>
                        </div>
                        <div class="form-group"><label>Projektbeschreibung</label><textarea placeholder="Erzählen Sie uns von Ihrem Projekt..."></textarea></div>
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
                    <div class="logo"><div class="logo-icon">⚡</div> CyberDev</div>
                    <p>Innovative Softwareentwicklung aus Oranienburg. Wir transformieren Ideen in digitale Realität.</p>
                    <div class="footer-social"><a href="#">💼</a><a href="#">🐙</a><a href="#">💬</a><a href="#">🐦</a></div>
                </div>
                <div class="footer-column"><h4>Services</h4><a href="#">Web-Entwicklung</a><a href="#">Mobile Apps</a><a href="#">Cloud & DevOps</a><a href="#">KI & Automation</a></div>
                <div class="footer-column"><h4>Unternehmen</h4><a href="#">Über uns</a><a href="#">Team</a><a href="#">Karriere</a><a href="#">Blog</a></div>
                <div class="footer-column"><h4>Ressourcen</h4><a href="#">Dokumentation</a><a href="#">GitHub</a><a href="#">Status</a><a href="#">Support</a></div>
            </div>
            <div class="footer-bottom">
                <p>© 2024 CyberDev Solutions. Built with ❤️ in Oranienburg.</p>
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

// Demo öffnen
function showStyleDemo(styleKey) {
    const style = styleDemos[styleKey];
    if (!style) {
        console.error('Style nicht gefunden:', styleKey);
        return;
    }

    const overlay = document.getElementById('styleDemoOverlay');
    const iframe = document.getElementById('styleDemoFrame');
    const info = document.querySelector('.style-demo-info');

    // Info aktualisieren
    if (info) {
        info.innerHTML = `<strong>${style.name}</strong> <span style="opacity: 0.7; margin-left: 10px;">${style.industry}</span>`;
    }

    // HTML in iframe laden
    iframe.srcdoc = style.html;

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


