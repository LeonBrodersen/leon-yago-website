// ========================================
// INTERNATIONALIZATION (i18n)
// ========================================

/**
 * Lesen und Schreiben in einer Hülle: Browser, die Website-Speicher blockieren,
 * werfen beim Zugriff einen Fehler. Ohne try/catch bricht dann das ganze Skript ab.
 */
function readStoredLang() {
    try {
        return localStorage.getItem('lang');
    } catch (e) {
        return null;
    }
}

function storeLang(lang) {
    try {
        localStorage.setItem('lang', lang);
    } catch (e) {
        // Speicher gesperrt: Die Sprache gilt dann nur für diesen Besuch.
    }
}

let currentLang = readStoredLang() === 'en' ? 'en' : 'de';

const translations = {
    de: {
        // Navigation
        'nav.start': { text: 'Start', html: false },
        'nav.about': { text: 'Über mich', html: false },
        'nav.benefits': { text: 'Vorteile', html: false },
        'nav.process': { text: 'Ablauf', html: false },
        'nav.examples': { text: 'Beispiele', html: false },
        'nav.pricing': { text: 'Preise', html: false },
        'nav.contact': { text: 'Kontakt', html: false },

        // Hero
        'hero.title': { text: 'Website erstellen lassen – <span class="highlight">zum Festpreis</span>, fertig in 1–2 Wochen', html: true },
        'hero.text': { text: 'Sie brauchen eine Website, wollen sich aber nicht mit Technik beschäftigen? Ich baue sie: Entwurf, Umsetzung, Veröffentlichung. Abgestimmt wird per Videocall oder Telefon, egal wo Sie sitzen. Texte, Fotos und Logo kommen von Ihnen, alles Technische von mir.', html: false },
        'hero.cta': { text: 'Jetzt kostenlos beraten lassen <span>→</span>', html: true },
        'hero.cta2': { text: 'So funktioniert\'s', html: false },

        // About
        'about.label': { text: 'Über mich', html: false },
        'about.title': { text: 'Wer Ihre Website baut', html: false },
        'about.subtitle': { text: 'Sie sprechen mit der Person, die den Code schreibt. Kein Callcenter, keine Weitergabe an Dritte.', html: false },
        'about.role': { text: 'Webdesign & Entwicklung', html: false },
        'about.why': { text: 'Warum ich das mache', html: false },
        'about.text': { text: 'Viele kleine Unternehmen haben keine Website – oder eine, die nicht mehr zeitgemäß ist. Ich finde: Das muss nicht teuer sein. Ich studiere Informatik und mache alles selbst, von der Technik bis zum Design. Texte, Fotos und Logo kommen von Ihnen, um den Rest kümmere ich mich.', html: false },
        'about.f1': { text: 'Sie sprechen direkt mit mir', html: false },
        'about.f2': { text: 'Faire Preise, keine Überraschungen', html: false },
        'about.f3': { text: 'Ihre Website in 1–2 Wochen fertig', html: false },
        'about.f4': { text: 'Ich erkläre alles ohne Fachchinesisch', html: false },

        // Why Us
        'why.label': { text: 'Warum ich', html: false },
        'why.title': { text: 'Was Sie bei mir erwartet', html: false },
        'why.subtitle': { text: 'Kein Fachchinesisch, keine Überraschungen – einfach eine gute Website', html: false },
        'why.t1': { text: 'Festpreis, bevor es losgeht', html: false },
        'why.p1': { text: 'Nach dem Erstgespräch nenne ich Ihnen einen Festpreis. Der gilt, auch wenn ich mich verschätzt habe.', html: false },
        'why.t2': { text: 'Ohne Fachchinesisch', html: false },
        'why.p2': { text: 'Sie müssen nichts über Hosting, Domains oder SEO wissen. Ich erkläre jeden Schritt in normalem Deutsch.', html: false },
        'why.t3': { text: 'Persönlich erreichbar', html: false },
        'why.p3': { text: 'Sie rufen an oder schreiben, und ich antworte selbst – werktags innerhalb von 24 Stunden.', html: false },
        'why.t4': { text: 'Videocall statt Anfahrt', html: false },
        'why.p4': { text: 'Wir besprechen alles per Videocall oder Telefon. Das ist schneller als ein Termin vor Ort und funktioniert, egal wo Sie sind.', html: false },
        'why.t5': { text: 'Funktioniert auf jedem Gerät', html: false },
        'why.p5': { text: 'Egal ob Handy, Tablet oder Computer – Ihre Website sieht überall gut aus und lädt schnell.', html: false },
        'why.t6': { text: 'In 1–2 Wochen online', html: false },
        'why.p6': { text: 'Keine monatelange Wartezeit. Ab dem Tag, an dem Ihre Inhalte da sind, dauert es ein bis zwei Wochen.', html: false },

        // How it Works
        'how.label': { text: 'So funktioniert\'s', html: false },
        'how.title': { text: 'In 4 einfachen Schritten zu Ihrer Website', html: false },
        'how.subtitle': { text: 'Ihr Anteil: ein Gespräch, Ihre Inhalte und zwei Rückmeldungen', html: false },
        'how.t1': { text: 'Kostenloses Erstgespräch', html: false },
        'how.p1': { text: 'Wir lernen uns per Telefon oder Videocall kennen und klären, was Ihre Website können soll. Danach bekommen Sie den Festpreis.', html: false },
        'how.t2': { text: 'Entwurf & Design', html: false },
        'how.p2': { text: 'Ich baue einen ersten Entwurf. Dafür brauche ich Ihre Texte, Fotos und Ihr Logo. Sie schauen alles in Ruhe an und sagen mir, was anders soll.', html: false },
        'how.t3': { text: 'Ihre Feedback-Runde', html: false },
        'how.p3': { text: 'Sie geben Rückmeldung, ich passe es an. Zwei Korrekturrunden sind im Preis enthalten.', html: false },
        'how.t4': { text: 'Ihre Website geht online', html: false },
        'how.p4': { text: 'Ich veröffentliche die Website und zeige Ihnen, wo alles liegt. Spätere Änderungen übernehme ich auf Wunsch, siehe Pflege & Support.', html: false },

        // Styles/Examples
        'styles.label': { text: 'Beispiele', html: false },
        'styles.title': { text: 'So könnte Ihre Website aussehen', html: false },
        'styles.subtitle': { text: 'Klicken Sie auf einen Stil, um eine vollständige Demo-Seite zu sehen', html: false },
        'styles.notice': { text: '<strong>Hinweis:</strong> Die gezeigten Unternehmen sind <strong>frei erfunden</strong>. Alle Namen, Adressen und Kontaktdaten dienen ausschließlich zur Demonstration und haben keinen Bezug zu realen Unternehmen.', html: true },
        'styles.s1.title': { text: 'Zahnarztpraxis', html: false },
        'styles.s1.desc': { text: 'Klar, sauber und vertrauenswürdig. So könnte die Website einer Praxis oder eines Arztes aussehen.', html: false },
        'styles.s1.f1': { text: '<span aria-hidden="true">✓</span> Seriös', html: true },
        'styles.s1.f2': { text: '<span aria-hidden="true">✓</span> Übersichtlich', html: true },
        'styles.s1.f3': { text: '<span aria-hidden="true">✓</span> Vertrauensvoll', html: true },
        'styles.s2.title': { text: 'Steuerberatung', html: false },
        'styles.s2.desc': { text: 'Professionell und seriös. Ideal für Berater, Anwälte oder Finanzdienstleister.', html: false },
        'styles.s2.f1': { text: '<span aria-hidden="true">✓</span> Professionell', html: true },
        'styles.s2.f2': { text: '<span aria-hidden="true">✓</span> Vertrauensvoll', html: true },
        'styles.s2.f3': { text: '<span aria-hidden="true">✓</span> Klassisch', html: true },
        'styles.s3.title': { text: 'Café & Restaurant', html: false },
        'styles.s3.desc': { text: 'Warm und einladend. So könnte die Website eines Cafés, Restaurants oder Hotels aussehen.', html: false },
        'styles.s3.f1': { text: '<span aria-hidden="true">✓</span> Einladend', html: true },
        'styles.s3.f2': { text: '<span aria-hidden="true">✓</span> Appetitlich', html: true },
        'styles.s3.f3': { text: '<span aria-hidden="true">✓</span> Gemütlich', html: true },
        'styles.s1.cta': { text: 'Demo ansehen <span class="arrow" aria-hidden="true">→</span>', html: true },
        'styles.s2.cta': { text: 'Demo ansehen <span class="arrow" aria-hidden="true">→</span>', html: true },
        'styles.s3.cta': { text: 'Demo ansehen <span class="arrow" aria-hidden="true">→</span>', html: true },
        'styles.demo.hint': { text: 'Frei erfundenes Beispiel', html: false },
        'styles.demo.close': { text: 'Schließen', html: false },

        // Pricing
        'pricing.label': { text: 'Preise', html: false },
        'pricing.title': { text: 'Website erstellen lassen – was kostet das?', html: false },
        'pricing.subtitle': { text: 'Den genauen Festpreis nenne ich nach dem Erstgespräch, bevor die Arbeit beginnt', html: false },
        'pricing.intro': { text: 'Die Preise unten sind <strong>Einführungspreise für meine ersten fünf Projekte</strong>. Dafür darf ich die fertige Website als Referenz zeigen. Danach gilt der Normalpreis, der bei jedem Paket mit dabeisteht.', html: true },
        'pricing.starter.normal': { text: 'Normalpreis 300 – 500 €', html: false },
        'pricing.komplett.normal': { text: 'Normalpreis 600 – 1.000 €', html: false },
        'pricing.support.normal': { text: 'Normalpreis 40 €/Std.', html: false },
        'pricing.starter.title': { text: 'Starter-Paket', html: false },
        'pricing.starter.sub': { text: 'Ihr professioneller Online-Auftritt', html: false },
        'pricing.starter.f1': { text: '1–3 Seiten (z.B. Start, Über mich, Kontakt)', html: false },
        'pricing.starter.f2': { text: 'Sieht auf Handy & Computer gut aus', html: false },
        'pricing.starter.f3': { text: 'Kontaktformular für Kundenanfragen', html: false },
        'pricing.starter.f4': { text: 'Auffindbar bei Google (SEO)', html: false },
        'pricing.starter.f5': { text: 'Fertig in ca. 1 Woche', html: false },
        'pricing.starter.btn': { text: 'Unverbindlich anfragen', html: false },
        'pricing.komplett.title': { text: 'Komplett-Paket', html: false },
        'pricing.komplett.sub': { text: 'Mehr Seiten, eigenes Design, Social-Media-Einbindung', html: false },
        'pricing.komplett.f1': { text: '4–7 Seiten mit individuellem Design', html: false },
        'pricing.komplett.f2': { text: 'Optimiert für Google-Suche (SEO)', html: false },
        'pricing.komplett.f3': { text: 'Einbindung Ihrer Social-Media-Kanäle', html: false },
        'pricing.komplett.f4': { text: 'Bildergalerie, Teamseite o.Ä.', html: false },
        'pricing.komplett.f5': { text: 'Fertig in 1–2 Wochen', html: false },
        'pricing.komplett.btn': { text: 'Unverbindlich anfragen', html: false },
        'pricing.support.title': { text: 'Pflege & Support', html: false },
        'pricing.support.sub': { text: 'Nach dem Start: Änderungen und Pflege', html: false },
        'pricing.support.f1': { text: 'Texte und Bilder aktualisieren', html: false },
        'pricing.support.f2': { text: 'Technische Pflege & Updates', html: false },
        'pricing.support.f3': { text: 'Kleine Anpassungen & Erweiterungen', html: false },
        'pricing.support.f4': { text: 'Erreichbar per Telefon & E-Mail', html: false },
        'pricing.support.f5': { text: 'Schnelle Reaktion, keine Wartezeit', html: false },
        'pricing.support.btn': { text: 'Unverbindlich anfragen', html: false },

        // Extras
        'extras.title': { text: 'Extras, falls Sie mehr brauchen', html: false },
        'extras.e1.label': { text: 'Weitere Unterseite', html: false },
        'extras.e2.label': { text: 'Einfaches Logo-Design', html: false },
        'extras.e3.label': { text: 'Blog / Neuigkeiten-Bereich', html: false },
        'extras.e4.label': { text: 'Website in mehreren Sprachen', html: false },
        'extras.running.title': { text: 'Laufende Kosten, die nicht bei mir anfallen', html: false },
        'extras.r1.label': { text: 'Ihre Internetadresse (.de)', html: false },
        'extras.r2.label': { text: 'Speicherplatz (Hosting)', html: false },
        'extras.r3.label': { text: 'Sicherheitszertifikat (SSL)', html: false },
        'extras.r3.price': { text: 'oft kostenlos', html: false },
        'extras.note': { text: '* Diese Kosten zahlen Sie direkt an Ihren Hosting-Anbieter. Bei der Einrichtung helfe ich.', html: false },

        // Contact
        'contact.label': { text: 'Kontakt', html: false },
        'contact.title': { text: 'Haben Sie Fragen? Melden Sie sich einfach', html: false },
        'contact.subtitle': { text: 'Das Erstgespräch ist kostenlos und unverbindlich', html: false },
        'contact.reach': { text: 'So erreichen Sie mich', html: false },
        'contact.reachtext': { text: 'Egal ob Sie schon konkrete Vorstellungen haben oder erst einmal nur Fragen: Schreiben Sie mir. Ich antworte werktags innerhalb von 24 Stunden.', html: false },
        'contact.email.label': { text: 'E-Mail', html: false },
        'contact.phone.label': { text: 'Telefon', html: false },
        'contact.location.label': { text: 'Zusammenarbeit', html: false },
        'contact.location.value': { text: 'Ortsunabhängig, per Videocall oder Telefon', html: false },
        'contact.availability.label': { text: 'Erreichbarkeit', html: false },
        'contact.availability.value': { text: 'Antwort werktags innerhalb von 24 Stunden', html: false },
        'contact.form.title': { text: 'Nachricht schreiben', html: false },
        'contact.form.name': { text: 'Name *', html: false },
        'contact.form.email': { text: 'E-Mail *', html: false },
        'contact.form.phone': { text: 'Telefon (optional)', html: false },
        'contact.form.services': { text: 'Worum geht es? (optional)', html: false },
        'contact.form.s1': { text: 'Neue Website, bis 3 Seiten', html: false },
        'contact.form.s2': { text: 'Neue Website, 4 bis 7 Seiten', html: false },
        'contact.form.s3': { text: 'Ich habe schon eine Website und will sie ersetzen', html: false },
        'contact.form.s4': { text: 'Pflege einer bestehenden Seite', html: false },
        'contact.form.s5': { text: 'Weiß ich noch nicht', html: false },
        'contact.form.message': { text: 'Ihre Nachricht *', html: false },
        'contact.widerruf': { text: 'Als Privatperson haben Sie ein 14-tägiges Widerrufsrecht. Die Einzelheiten stehen in der <a href="widerruf.html">Widerrufsbelehrung</a>.', html: true },
        'contact.form.privacy': { text: 'Ihre Angaben werden über EmailJS (Server in den USA) an mich übermittelt und nur für Ihre Anfrage genutzt. Mehr dazu in der <a href="datenschutz.html">Datenschutzerklärung</a>.', html: true },
        'contact.form.submit': { text: 'Nachricht senden <span>→</span>', html: true },
        'contact.form.sending': { text: 'Wird gesendet …', html: false },
        'contact.form.success': { text: 'Danke, Ihre Nachricht ist angekommen. Ich melde mich werktags innerhalb von 24 Stunden per E-Mail bei Ihnen.', html: false },
        'contact.form.error': { text: 'Das Senden hat nicht geklappt. Schreiben Sie mir bitte direkt an <a href="mailto:kontaktleonyago@gmail.com">kontaktleonyago@gmail.com</a> oder rufen Sie an: <a href="tel:+491794904546">+49 179 4904546</a>.', html: true },
        'contact.form.fallback': { text: 'Das Formular lädt gerade nicht. Schreiben Sie mir an <a href="mailto:kontaktleonyago@gmail.com">kontaktleonyago@gmail.com</a> oder rufen Sie an: <a href="tel:+491794904546">+49 179 4904546</a>.', html: true },

        // Beschriftungen, die nur Screenreader vorlesen
        'a11y.skip': { text: 'Zum Inhalt springen', html: false },
        'a11y.menu.open': { text: 'Menü öffnen', html: false },
        'a11y.menu.close': { text: 'Menü schließen', html: false },

        // Footer
        'footer.desc': { text: 'Websites für kleine Unternehmen und Selbstständige. Ortsunabhängig, zum Festpreis, gebaut von einer Person.', html: false },
        'footer.nav': { text: 'Navigation', html: false },
        'footer.nav.start': { text: 'Start', html: false },
        'footer.nav.about': { text: 'Über mich', html: false },
        'footer.nav.process': { text: 'Ablauf', html: false },
        'footer.nav.examples': { text: 'Beispiele', html: false },
        'footer.nav.pricing': { text: 'Preise', html: false },
        'footer.services': { text: 'Leistungen', html: false },
        'footer.s1': { text: 'Starter-Paket', html: false },
        'footer.s2': { text: 'Komplett-Paket', html: false },
        'footer.s3': { text: 'Pflege & Support', html: false },
        'footer.s4': { text: 'Beratung', html: false },
        'footer.contact': { text: 'Kontakt', html: false },
        'footer.contactform': { text: 'Kontaktformular', html: false },
        'footer.copyright': { text: '© 2026 ly-webstudio UG (haftungsbeschränkt)', html: false },
        'footer.impressum': { text: 'Impressum', html: false },
        'footer.datenschutz': { text: 'Datenschutz', html: false },
        'footer.agb': { text: 'AGB', html: false },
        'footer.widerruf': { text: 'Widerruf', html: false },
    },
    en: {
        // Navigation
        'nav.start': { text: 'Home', html: false },
        'nav.about': { text: 'About me', html: false },
        'nav.benefits': { text: 'Benefits', html: false },
        'nav.process': { text: 'Process', html: false },
        'nav.examples': { text: 'Examples', html: false },
        'nav.pricing': { text: 'Pricing', html: false },
        'nav.contact': { text: 'Contact', html: false },

        // Hero
        'hero.title': { text: 'Get a website – <span class="highlight">at a fixed price</span>, ready in 1–2 weeks', html: true },
        'hero.text': { text: 'You need a website but you would rather not deal with the technical side? I build it: draft, development, launch. We coordinate by video call or phone, wherever you are. Texts, photos and logo come from you, everything technical from me.', html: false },
        'hero.cta': { text: 'Get a free consultation <span>→</span>', html: true },
        'hero.cta2': { text: 'How it works', html: false },

        // About
        'about.label': { text: 'About me', html: false },
        'about.title': { text: 'Who builds your website', html: false },
        'about.subtitle': { text: 'You talk to the person who writes the code. No call centre, no handing your project to someone else.', html: false },
        'about.role': { text: 'Web Design & Development', html: false },
        'about.why': { text: 'Why I do this', html: false },
        'about.text': { text: 'Many small businesses have no website, or one that looks dated. I do not think that has to be expensive. I study computer science and do everything myself, from the code to the design. Texts, photos and logo come from you, I take care of the rest.', html: false },
        'about.f1': { text: 'You talk directly to me', html: false },
        'about.f2': { text: 'Fair prices, no surprises', html: false },
        'about.f3': { text: 'Your website ready in 1–2 weeks', html: false },
        'about.f4': { text: 'I explain everything without jargon', html: false },

        // Why Us
        'why.label': { text: 'Why me', html: false },
        'why.title': { text: 'What you can expect from me', html: false },
        'why.subtitle': { text: 'No jargon, no surprises – just a great website', html: false },
        'why.t1': { text: 'Fixed price before we start', html: false },
        'why.p1': { text: 'After the first conversation I give you a fixed price. It holds, even if I underestimated the work.', html: false },
        'why.t2': { text: 'No jargon', html: false },
        'why.p2': { text: 'You do not need to know anything about hosting, domains or SEO. I explain every step in plain language.', html: false },
        'why.t3': { text: 'Personally available', html: false },
        'why.p3': { text: 'You call or write, and I answer myself, on working days within 24 hours.', html: false },
        'why.t4': { text: 'Video call instead of travel', html: false },
        'why.p4': { text: 'We discuss everything by video call or phone. That is quicker than an on-site meeting and works wherever you are.', html: false },
        'why.t5': { text: 'Works on every device', html: false },
        'why.p5': { text: 'Whether phone, tablet, or computer – your website looks great everywhere and loads fast.', html: false },
        'why.t6': { text: 'Online in 1–2 weeks', html: false },
        'why.p6': { text: 'No waiting for months. From the day your content arrives it takes one to two weeks.', html: false },

        // How it Works
        'how.label': { text: 'How it works', html: false },
        'how.title': { text: 'Your website in 4 simple steps', html: false },
        'how.subtitle': { text: 'Your part: one conversation, your content and two rounds of feedback', html: false },
        'how.t1': { text: 'Free initial consultation', html: false },
        'how.p1': { text: 'We get to know each other by phone or video call and work out what your website needs to do. After that you get the fixed price.', html: false },
        'how.t2': { text: 'Draft & Design', html: false },
        'how.p2': { text: 'I build a first draft. For that I need your texts, photos and logo. You look at everything calmly and tell me what should change.', html: false },
        'how.t3': { text: 'Your feedback round', html: false },
        'how.p3': { text: 'You give feedback, I adjust it. Two rounds of corrections are included in the price.', html: false },
        'how.t4': { text: 'Your website goes live', html: false },
        'how.p4': { text: 'I publish the website and show you where everything lives. I take care of later changes on request, see Maintenance & Support.', html: false },

        // Styles/Examples
        'styles.label': { text: 'Examples', html: false },
        'styles.title': { text: 'This is what your website could look like', html: false },
        'styles.subtitle': { text: 'Click on a style to see a full demo page', html: false },
        'styles.notice': { text: '<strong>Note:</strong> The shown businesses are <strong>entirely fictional</strong>. All names, addresses, and contact details are for demonstration purposes only and have no connection to real businesses.', html: true },
        'styles.s1.title': { text: 'Dental Practice', html: false },
        'styles.s1.desc': { text: 'Clean, clear, and trustworthy. This is what a practice or doctor\'s website could look like.', html: false },
        'styles.s1.f1': { text: '<span aria-hidden="true">✓</span> Professional', html: true },
        'styles.s1.f2': { text: '<span aria-hidden="true">✓</span> Clear', html: true },
        'styles.s1.f3': { text: '<span aria-hidden="true">✓</span> Trustworthy', html: true },
        'styles.s2.title': { text: 'Tax Advisory', html: false },
        'styles.s2.desc': { text: 'Professional and serious. Ideal for consultants, lawyers, or financial service providers.', html: false },
        'styles.s2.f1': { text: '<span aria-hidden="true">✓</span> Professional', html: true },
        'styles.s2.f2': { text: '<span aria-hidden="true">✓</span> Trustworthy', html: true },
        'styles.s2.f3': { text: '<span aria-hidden="true">✓</span> Classic', html: true },
        'styles.s3.title': { text: 'Café & Restaurant', html: false },
        'styles.s3.desc': { text: 'Warm and inviting. This is what a café, restaurant, or hotel website could look like.', html: false },
        'styles.s3.f1': { text: '<span aria-hidden="true">✓</span> Inviting', html: true },
        'styles.s3.f2': { text: '<span aria-hidden="true">✓</span> Appetizing', html: true },
        'styles.s3.f3': { text: '<span aria-hidden="true">✓</span> Cozy', html: true },
        'styles.s1.cta': { text: 'View demo <span class="arrow" aria-hidden="true">→</span>', html: true },
        'styles.s2.cta': { text: 'View demo <span class="arrow" aria-hidden="true">→</span>', html: true },
        'styles.s3.cta': { text: 'View demo <span class="arrow" aria-hidden="true">→</span>', html: true },
        'styles.demo.hint': { text: 'Fictional example in German', html: false },
        'styles.demo.close': { text: 'Close', html: false },

        // Pricing
        'pricing.label': { text: 'Pricing', html: false },
        'pricing.title': { text: 'Get a website – what does it cost?', html: false },
        'pricing.subtitle': { text: 'I give you the exact fixed price after the first conversation, before the work starts', html: false },
        'pricing.intro': { text: 'The prices below are <strong>introductory prices for my first five projects</strong>. In return I may show the finished website as a reference. After that the regular price applies, shown with every package.', html: true },
        'pricing.starter.normal': { text: 'Regular price 300 – 500 €', html: false },
        'pricing.komplett.normal': { text: 'Regular price 600 – 1,000 €', html: false },
        'pricing.support.normal': { text: 'Regular price 40 €/hour', html: false },
        'pricing.starter.title': { text: 'Starter Package', html: false },
        'pricing.starter.sub': { text: 'Your professional online presence', html: false },
        'pricing.starter.f1': { text: '1–3 pages (e.g. Home, About, Contact)', html: false },
        'pricing.starter.f2': { text: 'Looks great on mobile & desktop', html: false },
        'pricing.starter.f3': { text: 'Contact form for customer inquiries', html: false },
        'pricing.starter.f4': { text: 'Findable on Google (SEO)', html: false },
        'pricing.starter.f5': { text: 'Ready in approx. 1 week', html: false },
        'pricing.starter.btn': { text: 'Inquire without obligation', html: false },
        'pricing.komplett.title': { text: 'Complete Package', html: false },
        'pricing.komplett.sub': { text: 'More pages, custom design, social media integration', html: false },
        'pricing.komplett.f1': { text: '4–7 pages with custom design', html: false },
        'pricing.komplett.f2': { text: 'Optimized for Google search (SEO)', html: false },
        'pricing.komplett.f3': { text: 'Social media integration', html: false },
        'pricing.komplett.f4': { text: 'Photo gallery, team page, etc.', html: false },
        'pricing.komplett.f5': { text: 'Ready in 1–2 weeks', html: false },
        'pricing.komplett.btn': { text: 'Inquire without obligation', html: false },
        'pricing.support.title': { text: 'Maintenance & Support', html: false },
        'pricing.support.sub': { text: 'After launch: changes and maintenance', html: false },
        'pricing.support.f1': { text: 'Update texts and images', html: false },
        'pricing.support.f2': { text: 'Technical maintenance & updates', html: false },
        'pricing.support.f3': { text: 'Small adjustments & extensions', html: false },
        'pricing.support.f4': { text: 'Reachable by phone & email', html: false },
        'pricing.support.f5': { text: 'Fast response, no waiting time', html: false },
        'pricing.support.btn': { text: 'Inquire without obligation', html: false },

        // Extras
        'extras.title': { text: 'Extras, if you need more', html: false },
        'extras.e1.label': { text: 'Additional subpage', html: false },
        'extras.e2.label': { text: 'Simple logo design', html: false },
        'extras.e3.label': { text: 'Blog / news section', html: false },
        'extras.e4.label': { text: 'Multi-language website', html: false },
        'extras.running.title': { text: 'Running costs that do not go to me', html: false },
        'extras.r1.label': { text: 'Your domain name (.de)', html: false },
        'extras.r2.label': { text: 'Storage (Hosting)', html: false },
        'extras.r3.label': { text: 'Security certificate (SSL)', html: false },
        'extras.r3.price': { text: 'often free', html: false },
        'extras.note': { text: '* You pay these costs directly to your hosting provider. I help with the setup.', html: false },

        // Contact
        'contact.label': { text: 'Contact', html: false },
        'contact.title': { text: 'Have questions? Just get in touch', html: false },
        'contact.subtitle': { text: 'The first conversation is free and without obligation', html: false },
        'contact.reach': { text: 'How to reach me', html: false },
        'contact.reachtext': { text: 'Whether you already have a clear idea or only questions: write to me. I answer on working days within 24 hours.', html: false },
        'contact.email.label': { text: 'Email', html: false },
        'contact.phone.label': { text: 'Phone', html: false },
        'contact.location.label': { text: 'How we work', html: false },
        'contact.location.value': { text: 'Location-independent, by video call or phone', html: false },
        'contact.availability.label': { text: 'Availability', html: false },
        'contact.availability.value': { text: 'Reply within 24 hours on working days', html: false },
        'contact.form.title': { text: 'Write a message', html: false },
        'contact.form.name': { text: 'Name *', html: false },
        'contact.form.email': { text: 'Email *', html: false },
        'contact.form.phone': { text: 'Phone (optional)', html: false },
        'contact.form.services': { text: 'What is it about? (optional)', html: false },
        'contact.form.s1': { text: 'New website, up to 3 pages', html: false },
        'contact.form.s2': { text: 'New website, 4 to 7 pages', html: false },
        'contact.form.s3': { text: 'I already have a website and want to replace it', html: false },
        'contact.form.s4': { text: 'Maintenance for an existing site', html: false },
        'contact.form.s5': { text: 'I don\'t know yet', html: false },
        'contact.form.message': { text: 'Your message *', html: false },
        'contact.widerruf': { text: 'As a private customer you have a 14-day right of withdrawal. The details are in the <a href="widerruf.html" hreflang="de">withdrawal notice</a> (in German).', html: true },
        'contact.form.privacy': { text: 'Your details are sent to me via EmailJS (servers in the USA) and used only to handle your request. More in the <a href="datenschutz.html" hreflang="de">privacy policy</a> (in German).', html: true },
        'contact.form.submit': { text: 'Send message <span>→</span>', html: true },
        'contact.form.sending': { text: 'Sending …', html: false },
        'contact.form.success': { text: 'Thank you, your message has arrived. I will reply by email within 24 hours on working days.', html: false },
        'contact.form.error': { text: 'Sending did not work. Please write to me directly at <a href="mailto:kontaktleonyago@gmail.com">kontaktleonyago@gmail.com</a> or call: <a href="tel:+491794904546">+49 179 4904546</a>.', html: true },
        'contact.form.fallback': { text: 'The form is not loading right now. Please write to me at <a href="mailto:kontaktleonyago@gmail.com">kontaktleonyago@gmail.com</a> or call: <a href="tel:+491794904546">+49 179 4904546</a>.', html: true },

        // Labels only screen readers announce
        'a11y.skip': { text: 'Skip to content', html: false },
        'a11y.menu.open': { text: 'Open menu', html: false },
        'a11y.menu.close': { text: 'Close menu', html: false },

        // Footer
        'footer.desc': { text: 'Websites for small businesses and self-employed people. Location-independent, at a fixed price, built by one person.', html: false },
        'footer.nav': { text: 'Navigation', html: false },
        'footer.nav.start': { text: 'Home', html: false },
        'footer.nav.about': { text: 'About me', html: false },
        'footer.nav.process': { text: 'Process', html: false },
        'footer.nav.examples': { text: 'Examples', html: false },
        'footer.nav.pricing': { text: 'Pricing', html: false },
        'footer.services': { text: 'Services', html: false },
        'footer.s1': { text: 'Starter Package', html: false },
        'footer.s2': { text: 'Complete Package', html: false },
        'footer.s3': { text: 'Maintenance & Support', html: false },
        'footer.s4': { text: 'Consultation', html: false },
        'footer.contact': { text: 'Contact', html: false },
        'footer.contactform': { text: 'Contact form', html: false },
        'footer.copyright': { text: '© 2026 ly-webstudio UG (haftungsbeschränkt)', html: false },
        'footer.impressum': { text: 'Legal Notice', html: false },
        'footer.datenschutz': { text: 'Privacy Policy', html: false },
        'footer.agb': { text: 'Terms & Conditions', html: false },
        'footer.widerruf': { text: 'Right of withdrawal', html: false },
    }
};

// Platzhalter der Formularfelder. Achtung: Sie stehen NICHT in den Wörterbüchern oben,
// sondern nur hier. data-i18n-ph greift ausschließlich auf dieses Objekt zu.
const placeholderTranslations = {
    de: {
        'contact.form.name.ph': 'Ihr Name',
        'contact.form.email.ph': 'ihre@email.de',
        'contact.form.message.ph': 'Erzählen Sie mir von Ihrem Projekt',
    },
    en: {
        'contact.form.name.ph': 'Your name',
        'contact.form.email.ph': 'your@email.com',
        'contact.form.message.ph': 'Tell me about your project',
    }
};

/**
 * Apply translations to the DOM based on current language
 * @param {string} lang - Language code: 'de' or 'en'
 */
function applyLanguage(lang) {
    currentLang = lang;

    // Update document language attribute
    document.documentElement.lang = lang;

    // Update page title
    document.title = lang === 'en'
        ? 'Get a website from 150 € | ly-webstudio'
        : 'Website erstellen lassen ab 150 € | ly-webstudio';

    // Get translations for current language
    const trans = translations[lang];

    // Apply text/innerHTML translations
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const t = trans[key];
        if (!t) return;

        if (t.html) {
            el.innerHTML = t.text;
        } else {
            el.textContent = t.text;
        }
    });

    // Apply placeholder translations
    const ph = placeholderTranslations[lang];
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        if (ph && ph[key]) {
            el.placeholder = ph[key];
        }
    });

    // Apply aria-label translations (Beschriftungen nur für Screenreader)
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const key = el.getAttribute('data-i18n-aria');
        const a = trans[key];
        if (a) {
            el.setAttribute('aria-label', a.text);
        }
    });

    // Sprachschalter: gedrückter Zustand für Screenreader und Farbe für alle anderen
    document.querySelectorAll('.lang-option').forEach(opt => {
        const active = opt.getAttribute('data-lang') === lang;
        opt.classList.toggle('active', active);
        opt.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    // Position des Schiebers
    const toggle = document.getElementById('langToggle');
    if (toggle) {
        toggle.classList.toggle('lang-en', lang === 'en');
    }

    // Bei gespeichertem Englisch hat das Inline-Skript im <head> den Inhalt kurz
    // verborgen. Jetzt steht die richtige Sprache, der Inhalt darf erscheinen.
    document.documentElement.classList.remove('lang-pending');
}

/**
 * Sprache umstellen und die Wahl merken. Gespeichert wird nur nach einem Klick:
 * Einen Standardwert zu hinterlegen ist technisch nicht erforderlich.
 * @param {string} lang - Language code: 'de' or 'en'
 */
function setLanguage(lang) {
    applyLanguage(lang);
    storeLang(lang);
}

/**
 * Initialize i18n
 */
function initI18n() {
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', function () {
            setLanguage(this.getAttribute('data-lang') === 'en' ? 'en' : 'de');
        });
    });

    // Always apply language to ensure correct toggle state on load
    applyLanguage(currentLang);
}

// Das Skript wird mit defer geladen, der Aufbau der Seite ist hier also fertig.
// Die Abfrage bleibt als Sicherung, falls es jemand ohne defer einbindet.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
} else {
    initI18n();
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        applyLanguage,
        setLanguage,
        currentLang: () => currentLang,
        translations,
        placeholderTranslations
    };
}
