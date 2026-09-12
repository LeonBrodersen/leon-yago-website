// Früherer Cookie-Hinweis: dessen Eintrag bei wiederkehrenden Besuchern
// löschen. Diese Zeile kann nach einigen Monaten entfallen.
try { localStorage.removeItem('cookiesAccepted'); } catch (e) {}

// Zeigt an, dass dieses Skript wirklich läuft. Solange die Klasse fehlt, bleibt der
// Ausweich-Hinweis am Formular sichtbar (siehe .form-fallback in styles.css).
document.documentElement.classList.add('js-ready');

/**
 * Text aus dem Wörterbuch von i18n.js holen.
 * Liefert einen leeren Text, wenn i18n.js nicht geladen ist.
 */
function t(key) {
    try {
        const dict = translations[currentLang] || translations.de;
        return dict && dict[key] ? dict[key].text : '';
    } catch (e) {
        return '';
    }
}

// ========================================
// MOBILE MENU
// ========================================

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

function isMenuOpen() {
    return !!navLinks && navLinks.classList.contains('active');
}

function setMenu(open) {
    if (!mobileMenuBtn || !navLinks) return;
    navLinks.classList.toggle('active', open);
    mobileMenuBtn.classList.toggle('active', open);
    mobileMenuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');

    // Die Beschriftung wechselt mit dem Zustand und wird beim Sprachwechsel mitgezogen.
    const key = open ? 'a11y.menu.close' : 'a11y.menu.open';
    mobileMenuBtn.setAttribute('data-i18n-aria', key);
    const label = t(key);
    if (label) mobileMenuBtn.setAttribute('aria-label', label);
}

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function () {
        setMenu(!isMenuOpen());
    });

    // Nach dem Tippen auf einen Link soll der Abschnitt zu sehen sein, nicht das Menü.
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () { setMenu(false); });
    });

    // Tipp neben das Menü schließt es ebenfalls.
    document.addEventListener('click', function (e) {
        if (!isMenuOpen()) return;
        if (navLinks.contains(e.target) || mobileMenuBtn.contains(e.target)) return;
        setMenu(false);
    });
}

// ========================================
// ESCAPE KEY
// ========================================

document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;

    if (isMenuOpen()) {
        setMenu(false);
        if (mobileMenuBtn) mobileMenuBtn.focus();
        return;
    }

    closeStyleDemo();
});

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

// ========================================
// KONTAKTFORMULAR
// ========================================

// Versand über die REST-Schnittstelle von EmailJS, ohne deren SDK von einem
// Fremd-CDN. Der Endpunkt für Formulare erwartet multipart/form-data mit
// service_id, template_id und user_id (dem öffentlichen Schlüssel).
// Doku: https://www.emailjs.com/docs/rest-api/send-form/
const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send-form';
const EMAILJS_SERVICE_ID = 'service_b6nweer';
const EMAILJS_TEMPLATE_ID = 'template_wojbfmi';
const EMAILJS_PUBLIC_KEY = 'Z57gOiO7JF_9Z8kpq';

const contactForm = document.getElementById('contactForm');
const formSubmit = document.getElementById('formSubmit');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

// Der Knopf wird im HTML gesperrt ausgeliefert und erst hier freigegeben. Läuft dieses
// Skript nicht, kann niemand absenden und der Ausweich-Hinweis bleibt stehen.
if (formSubmit) formSubmit.disabled = false;

let sending = false;

/**
 * Eine der beiden stehenden Meldungen zeigen. Der Text wird beim Einblenden neu
 * gesetzt, damit role="status" bzw. role="alert" ihn auch ansagen.
 */
function showFormFeedback(box, key) {
    if (!box) return;
    box.hidden = false;

    const target = box.querySelector('[data-i18n]');
    if (!target) return;

    let entry = null;
    try {
        entry = translations[currentLang][key];
    } catch (e) {
        return; // Ohne Wörterbuch bleibt der im HTML hinterlegte Text stehen.
    }
    if (!entry) return;

    if (entry.html) {
        target.innerHTML = entry.text;
    } else {
        target.textContent = entry.text;
    }
}

function setSending(active) {
    sending = active;
    if (!formSubmit) return;

    formSubmit.disabled = active;
    formSubmit.setAttribute('aria-busy', active ? 'true' : 'false');
    formSubmit.innerHTML = active
        ? (t('contact.form.sending') || 'Wird gesendet …')
        : (t('contact.form.submit') || 'Nachricht senden <span>→</span>');
}

/**
 * Erfolg: Das Formular verschwindet, an seiner Stelle steht eine Bestätigung,
 * die nicht von allein wieder weggeht.
 */
function showFormSuccess() {
    setSending(false);
    if (formError) formError.hidden = true;
    if (contactForm) {
        contactForm.reset();
        contactForm.hidden = true;
    }
    showFormFeedback(formSuccess, 'contact.form.success');
    if (formSuccess) formSuccess.focus();
}

function fieldValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
}

/** Gewählte Leistungen als Klartext, in der Sprache, die der Besucher sieht. */
function selectedServices() {
    if (!contactForm) return '';
    return [...contactForm.querySelectorAll('.service-btn input:checked')]
        .map(cb => {
            const label = cb.closest('.service-btn');
            const text = label ? label.querySelector('[data-i18n]') : null;
            return text ? text.textContent.trim() : '';
        })
        .filter(Boolean)
        .join(', ');
}

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (sending) return;

        // Roboter-Falle: Ist das unsichtbare Feld gefüllt, war kein Mensch am Werk.
        // Dann sieht die Bestätigung normal aus, gesendet wird nichts.
        const honeypot = contactForm.querySelector('input[name="website"]');
        if (honeypot && honeypot.value.trim() !== '') {
            showFormSuccess();
            return;
        }

        const data = new FormData();
        data.append('service_id', EMAILJS_SERVICE_ID);
        data.append('template_id', EMAILJS_TEMPLATE_ID);
        data.append('user_id', EMAILJS_PUBLIC_KEY);
        data.append('name', fieldValue('name'));
        data.append('email', fieldValue('email'));
        data.append('phone', fieldValue('phone'));
        data.append('message', fieldValue('message'));
        data.append('services_combined', selectedServices());

        if (formError) formError.hidden = true;
        setSending(true);

        // Kein Content-Type setzen: Den Rand der multipart-Daten bestimmt der Browser.
        fetch(EMAILJS_ENDPOINT, { method: 'POST', body: data })
            .then(res => {
                if (!res.ok) throw new Error('EmailJS antwortete mit ' + res.status);
                showFormSuccess();
            })
            .catch(err => {
                console.error('Kontaktformular:', err);
                setSending(false);
                showFormFeedback(formError, 'contact.form.error');
            });
    });
}
