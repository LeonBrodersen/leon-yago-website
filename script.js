// Früherer Cookie-Hinweis: dessen Eintrag bei wiederkehrenden Besuchern
// löschen. Diese Zeile kann nach einigen Monaten entfallen.
try { localStorage.removeItem('cookiesAccepted'); } catch (e) {}

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
// ESCAPE KEY
// ========================================

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeStyleDemo();
        document.body.style.overflow = '';
    }
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

// Die drei Beispielseiten liegen als eigene Dateien unter demos/
// und werden erst geladen, wenn jemand eine Karte öffnet.
const styleDemos = {
    minimalist: 'demos/zahnarztpraxis.html',
    corporate: 'demos/steuerberatung.html',
    warm: 'demos/cafe.html'
};

let styleDemoTrigger = null;

function getStyleDemoElements() {
    return {
        overlay: document.getElementById('styleDemoOverlay'),
        frame: document.getElementById('styleDemoFrame'),
        title: document.getElementById('styleDemoTitle'),
        hint: document.getElementById('styleDemoHint'),
        closeBtn: document.getElementById('styleDemoClose')
    };
}

// location.replace statt iframe.src: So entsteht kein Eintrag im Browserverlauf,
// und der Zurück-Knopf des Browsers bleibt für die Hauptseite zuständig.
function loadStyleDemoFrame(frame, url) {
    try {
        frame.contentWindow.location.replace(url);
    } catch (err) {
        frame.src = url;
    }
}

// Demo öffnen
function showStyleDemo(styleKey) {
    const src = styleDemos[styleKey];
    const { overlay, frame, title, hint, closeBtn } = getStyleDemoElements();
    if (!src || !overlay || !frame) return;

    const card = document.querySelector(`.style-card[data-style="${styleKey}"]`);
    const heading = card ? card.querySelector('h3') : null;
    styleDemoTrigger = card ? card.querySelector('.style-cta') : null;

    if (title && heading) {
        title.textContent = heading.textContent.trim();
        // So übersetzt i18n.js den Titel beim Sprachwechsel mit.
        title.setAttribute('data-i18n', heading.getAttribute('data-i18n'));
    }
    if (title) {
        frame.title = hint ? `${title.textContent} – ${hint.textContent.trim()}` : title.textContent;
    }

    loadStyleDemoFrame(frame, new URL(src, document.baseURI).href);

    overlay.classList.add('active');
    document.documentElement.classList.add('demo-open');
    if (closeBtn) closeBtn.focus();
}

// Demo schließen
function closeStyleDemo() {
    const { overlay, frame } = getStyleDemoElements();
    if (!overlay || !overlay.classList.contains('active')) return;

    overlay.classList.remove('active');
    document.documentElement.classList.remove('demo-open');
    if (frame) loadStyleDemoFrame(frame, 'about:blank');

    const trigger = styleDemoTrigger;
    styleDemoTrigger = null;
    if (trigger && document.contains(trigger)) trigger.focus();
}

document.addEventListener('DOMContentLoaded', function () {
    const { overlay, frame, closeBtn } = getStyleDemoElements();

    // Klick auf die Karte oder auf „Demo ansehen“ (Enter und Leertaste lösen am Button ebenfalls einen Klick aus)
    document.querySelectorAll('.style-card').forEach(card => {
        card.addEventListener('click', function () {
            showStyleDemo(this.dataset.style);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeStyleDemo);

    // Escape schließt auch, wenn der Fokus in der Demo liegt (gleiche Herkunft, daher erreichbar)
    if (frame) {
        frame.addEventListener('load', function () {
            let doc = null;
            try {
                doc = frame.contentDocument;
            } catch (err) {
                return;
            }
            if (!doc || doc.URL === 'about:blank') return;
            doc.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') closeStyleDemo();
            });
        });
    }

    // Solange die Demo offen ist, bleibt der Tastaturfokus im Dialog
    document.addEventListener('focusin', function (e) {
        if (!overlay || !overlay.classList.contains('active') || overlay.contains(e.target)) return;
        if (closeBtn) closeBtn.focus();
    });
});


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


