// ========================================
// INTERNATIONALIZATION (i18n)
// ========================================

let currentLang = localStorage.getItem('lang') || 'de';

const translations = {
    de: {
        // Cookie Banner
        'cookie.text': { text: 'Wir verwenden keine Tracking-Cookies. Diese Website nutzt ausschließlich technisch notwendige Funktionen. Weitere Informationen finden Sie in unserer <a href="#" onclick="openModal(\'datenschutz-modal\'); return false;">Datenschutzerklärung</a>.', html: true },
        'cookie.btn': { text: 'Verstanden', html: false },

        // Navigation
        'nav.start': { text: 'Start', html: false },
        'nav.about': { text: 'Über mich', html: false },
        'nav.benefits': { text: 'Vorteile', html: false },
        'nav.process': { text: 'Ablauf', html: false },
        'nav.examples': { text: 'Beispiele', html: false },
        'nav.pricing': { text: 'Preise', html: false },
        'nav.contact': { text: 'Kontakt', html: false },

        // Hero
        'hero.title': { text: 'Website erstellen lassen – <span class="highlight">professionell</span> und bezahlbar', html: true },
        'hero.text': { text: 'Sie brauchen eine professionelle Website, wollen sich aber nicht mit Technik beschäftigen? Genau dafür bin ich da. Ich kümmere mich um alles – vom Design bis zur Veröffentlichung. Persönlich, zuverlässig und zu fairen Preisen.', html: false },
        'hero.cta': { text: 'Jetzt kostenlos beraten lassen <span>→</span>', html: true },
        'hero.cta2': { text: 'So funktioniert\'s', html: false },

        // About
        'about.label': { text: 'Über mich', html: false },
        'about.title': { text: 'Ihr Webdesigner in Berlin – der Mensch hinter Ihrer Website', html: false },
        'about.subtitle': { text: 'Bei mir sprechen Sie direkt mit dem Macher – nicht mit einem Callcenter', html: false },
        'about.role': { text: 'Webdesign & Entwicklung', html: false },
        'about.why': { text: 'Warum ich das mache', html: false },
        'about.text': { text: 'Viele kleine Unternehmen haben keine Website – oder eine, die nicht mehr zeitgemäß ist. Ich finde: Das muss nicht teuer sein. Ich studiere Informatik und kümmere mich um alles – von der Technik bis zum Design. So sorge ich dafür, dass Ihre Website professionell aussieht und Kunden anspricht – ohne dass Sie sich um irgendetwas kümmern müssen.', html: false },
        'about.f1': { text: 'Sie sprechen direkt mit mir', html: false },
        'about.f2': { text: 'Faire Preise, keine Überraschungen', html: false },
        'about.f3': { text: 'Ihre Website in 1–2 Wochen fertig', html: false },
        'about.f4': { text: 'Wir erklären alles verständlich', html: false },

        // Why Us
        'why.label': { text: 'Warum wir?', html: false },
        'why.title': { text: 'Was Sie bei uns erwartet', html: false },
        'why.subtitle': { text: 'Kein Fachchinesisch, keine Überraschungen – einfach eine gute Website', html: false },
        'why.t1': { text: 'Festpreis statt Kostenexplosion', html: false },
        'why.p1': { text: 'Sie wissen vorher genau, was Ihre Website kostet. Keine versteckten Gebühren, keine bösen Überraschungen auf der Rechnung.', html: false },
        'why.t2': { text: 'Wir erklären alles verständlich', html: false },
        'why.p2': { text: 'Sie müssen kein Technik-Experte sein. Wir erklären jeden Schritt so, dass Sie ihn nachvollziehen können.', html: false },
        'why.t3': { text: 'Persönlich erreichbar', html: false },
        'why.p3': { text: 'Bei uns landen Sie nicht in einer Warteschleife. Sie rufen an, schreiben uns – und wir antworten persönlich.', html: false },
        'why.t4': { text: 'Treffen oder Videocall', html: false },
        'why.p4': { text: 'Wir kommen gerne zu Ihnen vorbei oder besprechen alles per Videocall – ganz wie es Ihnen lieber ist.', html: false },
        'why.t5': { text: 'Funktioniert auf jedem Gerät', html: false },
        'why.p5': { text: 'Egal ob Handy, Tablet oder Computer – Ihre Website sieht überall gut aus und lädt schnell.', html: false },
        'why.t6': { text: 'In 1–2 Wochen online', html: false },
        'why.p6': { text: 'Keine monatelange Wartezeit. In ein bis zwei Wochen ist Ihre neue Website fertig und online.', html: false },

        // How it Works
        'how.label': { text: 'So funktioniert\'s', html: false },
        'how.title': { text: 'In 4 einfachen Schritten zu Ihrer Website', html: false },
        'how.subtitle': { text: 'Kein Aufwand für Sie – wir kümmern uns um alles', html: false },
        'how.t1': { text: 'Kostenloses Erstgespräch', html: false },
        'how.p1': { text: 'Wir lernen uns kennen und besprechen, was Sie sich für Ihre Website wünschen. Telefonisch, per Videocall oder persönlich – ganz wie Sie möchten.', html: false },
        'how.t2': { text: 'Entwurf & Design', html: false },
        'how.p2': { text: 'Wir erstellen einen ersten Entwurf Ihrer Website. Sie schauen sich alles in Ruhe an und sagen uns, was Ihnen gefällt und was wir ändern sollen.', html: false },
        'how.t3': { text: 'Ihre Feedback-Runde', html: false },
        'how.p3': { text: 'Sie geben uns Rückmeldung und wir passen alles nach Ihren Wünschen an. Zwei Korrekturschleifen sind immer inklusive.', html: false },
        'how.t4': { text: 'Ihre Website geht online', html: false },
        'how.p4': { text: 'Wir veröffentlichen Ihre fertige Website und zeigen Ihnen, wie Sie kleine Änderungen selbst vornehmen können. Fertig!', html: false },

        // Styles/Examples
        'styles.label': { text: 'Beispiele', html: false },
        'styles.title': { text: 'So könnte Ihre Website aussehen', html: false },
        'styles.subtitle': { text: 'Klicken Sie auf einen Stil, um eine vollständige Demo-Seite zu sehen', html: false },
        'styles.notice': { text: '<strong>Hinweis:</strong> Die gezeigten Unternehmen sind <strong>frei erfunden</strong>. Alle Namen, Adressen und Kontaktdaten dienen ausschließlich zur Demonstration und haben keinen Bezug zu realen Unternehmen.', html: true },
        'styles.s1.title': { text: 'Zahnarztpraxis', html: false },
        'styles.s1.desc': { text: 'Klar, sauber und vertrauenswürdig. So könnte die Website einer Praxis oder eines Arztes aussehen.', html: false },
        'styles.s1.f1': { text: '✓ Seriös', html: false },
        'styles.s1.f2': { text: '✓ Übersichtlich', html: false },
        'styles.s1.f3': { text: '✓ Vertrauensvoll', html: false },
        'styles.s2.title': { text: 'Steuerberatung', html: false },
        'styles.s2.desc': { text: 'Professionell und seriös. Ideal für Berater, Anwälte oder Finanzdienstleister.', html: false },
        'styles.s2.f1': { text: '✓ Professionell', html: false },
        'styles.s2.f2': { text: '✓ Vertrauensvoll', html: false },
        'styles.s2.f3': { text: '✓ Klassisch', html: false },
        'styles.s3.title': { text: 'Café & Restaurant', html: false },
        'styles.s3.desc': { text: 'Warm und einladend. So könnte die Website eines Cafés, Restaurants oder Hotels aussehen.', html: false },
        'styles.s3.f1': { text: '✓ Einladend', html: false },
        'styles.s3.f2': { text: '✓ Appetitlich', html: false },
        'styles.s3.f3': { text: '✓ Gemütlich', html: false },
        'styles.s1.cta': { text: 'Demo ansehen <span class="arrow">→</span>', html: true },
        'styles.s2.cta': { text: 'Demo ansehen <span class="arrow">→</span>', html: true },
        'styles.s3.cta': { text: 'Demo ansehen <span class="arrow">→</span>', html: true },

        // Pricing
        'pricing.label': { text: 'Preise', html: false },
        'pricing.title': { text: 'Website erstellen lassen – was kostet das?', html: false },
        'pricing.subtitle': { text: 'Klare Preise, keine Überraschungen – Sie wissen vorher genau, was Sie bezahlen', html: false },
        'pricing.badge': { text: 'Empfohlen', html: false },
        'pricing.starter.title': { text: 'Starter-Paket', html: false },
        'pricing.starter.sub': { text: 'Ihr professioneller Online-Auftritt', html: false },
        'pricing.starter.f1': { text: '1–3 Seiten (z.B. Start, Über mich, Kontakt)', html: false },
        'pricing.starter.f2': { text: 'Sieht auf Handy & Computer gut aus', html: false },
        'pricing.starter.f3': { text: 'Kontaktformular für Kundenanfragen', html: false },
        'pricing.starter.f4': { text: 'Auffindbar bei Google (SEO)', html: false },
        'pricing.starter.f5': { text: 'Fertig in ca. 1 Woche', html: false },
        'pricing.starter.btn': { text: 'Unverbindlich anfragen', html: false },
        'pricing.komplett.title': { text: 'Komplett-Paket', html: false },
        'pricing.komplett.sub': { text: 'Alles, was Ihr Unternehmen braucht', html: false },
        'pricing.komplett.f1': { text: '4–7 Seiten mit individuellem Design', html: false },
        'pricing.komplett.f2': { text: 'Optimiert für Google-Suche (SEO)', html: false },
        'pricing.komplett.f3': { text: 'Einbindung Ihrer Social-Media-Kanäle', html: false },
        'pricing.komplett.f4': { text: 'Bildergalerie, Teamseite o.Ä.', html: false },
        'pricing.komplett.f5': { text: 'Fertig in 1–2 Wochen', html: false },
        'pricing.komplett.btn': { text: 'Unverbindlich anfragen', html: false },
        'pricing.support.title': { text: 'Pflege & Support', html: false },
        'pricing.support.sub': { text: 'Wir bleiben an Ihrer Seite', html: false },
        'pricing.support.f1': { text: 'Texte und Bilder aktualisieren', html: false },
        'pricing.support.f2': { text: 'Technische Pflege & Updates', html: false },
        'pricing.support.f3': { text: 'Kleine Anpassungen & Erweiterungen', html: false },
        'pricing.support.f4': { text: 'Erreichbar per Telefon & E-Mail', html: false },
        'pricing.support.f5': { text: 'Schnelle Reaktion, keine Wartezeit', html: false },
        'pricing.support.btn': { text: 'Unverbindlich anfragen', html: false },

        // Extras
        'extras.title': { text: '📦 Extras, falls Sie mehr brauchen', html: false },
        'extras.e1.label': { text: 'Weitere Unterseite', html: false },
        'extras.e2.label': { text: 'Einfaches Logo-Design', html: false },
        'extras.e3.label': { text: 'Blog / Neuigkeiten-Bereich', html: false },
        'extras.e4.label': { text: 'Website in mehreren Sprachen', html: false },
        'extras.running.title': { text: '🔄 Laufende Kosten (nicht bei uns)', html: false },
        'extras.r1.label': { text: 'Ihre Internetadresse (.de)', html: false },
        'extras.r2.label': { text: 'Speicherplatz (Hosting)', html: false },
        'extras.r3.label': { text: 'Sicherheitszertifikat (SSL)', html: false },
        'extras.r3.price': { text: 'oft kostenlos', html: false },
        'extras.note': { text: '* Diese Kosten fallen bei Ihrem Hosting-Anbieter an. Wir helfen Ihnen bei der Einrichtung.', html: false },

        // Contact
        'contact.label': { text: 'Kontakt', html: false },
        'contact.title': { text: 'Haben Sie Fragen? Melden Sie sich einfach', html: false },
        'contact.subtitle': { text: 'Das Erstgespräch ist kostenlos und unverbindlich – versprochen', html: false },
        'contact.reach': { text: 'So erreichen Sie uns', html: false },
        'contact.reachtext': { text: 'Egal ob Sie schon konkrete Vorstellungen haben oder erst mal nur Fragen – schreiben Sie uns einfach. Wir melden uns innerhalb von 24 Stunden bei Ihnen.', html: false },
        'contact.email.label': { text: 'E-Mail', html: false },
        'contact.phone.label': { text: 'Telefon', html: false },
        'contact.location.label': { text: 'Standort', html: false },
        'contact.availability.label': { text: 'Erreichbarkeit', html: false },
        'contact.availability.value': { text: 'Flexibel nach Vereinbarung', html: false },
        'contact.form.title': { text: 'Nachricht schreiben', html: false },
        'contact.form.name': { text: 'Name *', html: false },
        'contact.form.email': { text: 'E-Mail *', html: false },
        'contact.form.phone': { text: 'Telefon (optional)', html: false },
        'contact.form.services': { text: 'Gewünschte Leistung(en) *', html: false },
        'contact.form.s1': { text: '💻 Starter-Paket', html: false },
        'contact.form.s2': { text: '🚀 Komplett-Paket', html: false },
        'contact.form.s3': { text: '🔧 Pflege & Support', html: false },
        'contact.form.s4': { text: '💬 Erstberatung', html: false },
        'contact.form.s4.price': { text: 'Kostenlos', html: false },
        'contact.form.s5': { text: '📋 Sonstiges', html: false },
        'contact.form.s5.price': { text: 'Auf Anfrage', html: false },
        'contact.form.message': { text: 'Ihre Nachricht *', html: false },
        'contact.form.submit': { text: 'Nachricht senden <span>→</span>', html: true },

        // Footer
        'footer.desc': { text: 'Professionelle Webseiten für kleine Unternehmen in Berlin und Brandenburg. Persönlich, zuverlässig und zu fairen Preisen.', html: false },
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
        'footer.copyright': { text: '© 2026 ly-webstudio – Webdesigner Berlin. Alle Rechte vorbehalten.', html: false },
        'footer.impressum': { text: 'Impressum', html: false },
        'footer.datenschutz': { text: 'Datenschutz', html: false },
        'footer.agb': { text: 'AGB', html: false },
    },
    en: {
        // Cookie Banner
        'cookie.text': { text: 'We do not use tracking cookies. This website only uses technically necessary functions. For more information, see our <a href="#" onclick="openModal(\'datenschutz-modal\'); return false;">Privacy Policy</a>.', html: true },
        'cookie.btn': { text: 'Got it', html: false },

        // Navigation
        'nav.start': { text: 'Home', html: false },
        'nav.about': { text: 'About me', html: false },
        'nav.benefits': { text: 'Benefits', html: false },
        'nav.process': { text: 'Process', html: false },
        'nav.examples': { text: 'Examples', html: false },
        'nav.pricing': { text: 'Pricing', html: false },
        'nav.contact': { text: 'Contact', html: false },

        // Hero
        'hero.title': { text: 'Get a professional website – <span class="highlight">quality</span> you can afford', html: true },
        'hero.text': { text: 'You need a professional website but don\'t want to deal with the technical side? That\'s exactly what I\'m here for. I take care of everything – from design to launch. Personal, reliable, and at fair prices.', html: false },
        'hero.cta': { text: 'Get a free consultation <span>→</span>', html: true },
        'hero.cta2': { text: 'How it works', html: false },

        // About
        'about.label': { text: 'About me', html: false },
        'about.title': { text: 'Your web designer in Berlin – the person behind your website', html: false },
        'about.subtitle': { text: 'With me, you talk directly to the maker – not a call center', html: false },
        'about.role': { text: 'Web Design & Development', html: false },
        'about.why': { text: 'Why I do this', html: false },
        'about.text': { text: 'Many small businesses don\'t have a website – or have one that\'s outdated. I believe it doesn\'t have to be expensive. I study computer science and take care of everything – from the technical side to the design. This way, I make sure your website looks professional and attracts customers – without you having to worry about anything.', html: false },
        'about.f1': { text: 'You talk directly to me', html: false },
        'about.f2': { text: 'Fair prices, no surprises', html: false },
        'about.f3': { text: 'Your website ready in 1–2 weeks', html: false },
        'about.f4': { text: 'Everything explained clearly', html: false },

        // Why Us
        'why.label': { text: 'Why us?', html: false },
        'why.title': { text: 'What you can expect', html: false },
        'why.subtitle': { text: 'No jargon, no surprises – just a great website', html: false },
        'why.t1': { text: 'Fixed price, no cost explosion', html: false },
        'why.p1': { text: 'You know exactly what your website will cost upfront. No hidden fees, no nasty surprises on the invoice.', html: false },
        'why.t2': { text: 'Everything explained clearly', html: false },
        'why.p2': { text: 'You don\'t need to be a tech expert. I explain every step so you can follow along.', html: false },
        'why.t3': { text: 'Personally available', html: false },
        'why.p3': { text: 'You won\'t end up in a queue. You call or write – and I respond personally.', html: false },
        'why.t4': { text: 'Meeting or video call', html: false },
        'why.p4': { text: 'I\'m happy to visit you in person or discuss everything via video call – whatever you prefer.', html: false },
        'why.t5': { text: 'Works on every device', html: false },
        'why.p5': { text: 'Whether phone, tablet, or computer – your website looks great everywhere and loads fast.', html: false },
        'why.t6': { text: 'Online in 1–2 weeks', html: false },
        'why.p6': { text: 'No months of waiting. Your new website is ready and online in one to two weeks.', html: false },

        // How it Works
        'how.label': { text: 'How it works', html: false },
        'how.title': { text: 'Your website in 4 simple steps', html: false },
        'how.subtitle': { text: 'No effort on your part – I take care of everything', html: false },
        'how.t1': { text: 'Free initial consultation', html: false },
        'how.p1': { text: 'We get to know each other and discuss what you want for your website. By phone, video call, or in person – whatever you prefer.', html: false },
        'how.t2': { text: 'Draft & Design', html: false },
        'how.p2': { text: 'I create a first draft of your website. You take your time to look at everything and tell me what you like and what should be changed.', html: false },
        'how.t3': { text: 'Your feedback round', html: false },
        'how.p3': { text: 'You give your feedback and I adjust everything to your wishes. Two revision rounds are always included.', html: false },
        'how.t4': { text: 'Your website goes live', html: false },
        'how.p4': { text: 'I publish your finished website and show you how to make small changes yourself. Done!', html: false },

        // Styles/Examples
        'styles.label': { text: 'Examples', html: false },
        'styles.title': { text: 'This is what your website could look like', html: false },
        'styles.subtitle': { text: 'Click on a style to see a full demo page', html: false },
        'styles.notice': { text: '<strong>Note:</strong> The shown businesses are <strong>entirely fictional</strong>. All names, addresses, and contact details are for demonstration purposes only and have no connection to real businesses.', html: true },
        'styles.s1.title': { text: 'Dental Practice', html: false },
        'styles.s1.desc': { text: 'Clean, clear, and trustworthy. This is what a practice or doctor\'s website could look like.', html: false },
        'styles.s1.f1': { text: '✓ Professional', html: false },
        'styles.s1.f2': { text: '✓ Clear', html: false },
        'styles.s1.f3': { text: '✓ Trustworthy', html: false },
        'styles.s2.title': { text: 'Tax Advisory', html: false },
        'styles.s2.desc': { text: 'Professional and serious. Ideal for consultants, lawyers, or financial service providers.', html: false },
        'styles.s2.f1': { text: '✓ Professional', html: false },
        'styles.s2.f2': { text: '✓ Trustworthy', html: false },
        'styles.s2.f3': { text: '✓ Classic', html: false },
        'styles.s3.title': { text: 'Café & Restaurant', html: false },
        'styles.s3.desc': { text: 'Warm and inviting. This is what a café, restaurant, or hotel website could look like.', html: false },
        'styles.s3.f1': { text: '✓ Inviting', html: false },
        'styles.s3.f2': { text: '✓ Appetizing', html: false },
        'styles.s3.f3': { text: '✓ Cozy', html: false },
        'styles.s1.cta': { text: 'View demo <span class="arrow">→</span>', html: true },
        'styles.s2.cta': { text: 'View demo <span class="arrow">→</span>', html: true },
        'styles.s3.cta': { text: 'View demo <span class="arrow">→</span>', html: true },

        // Pricing
        'pricing.label': { text: 'Pricing', html: false },
        'pricing.title': { text: 'Get a website – what does it cost?', html: false },
        'pricing.subtitle': { text: 'Clear prices, no surprises – you know exactly what you\'ll pay', html: false },
        'pricing.badge': { text: 'Recommended', html: false },
        'pricing.starter.title': { text: 'Starter Package', html: false },
        'pricing.starter.sub': { text: 'Your professional online presence', html: false },
        'pricing.starter.f1': { text: '1–3 pages (e.g. Home, About, Contact)', html: false },
        'pricing.starter.f2': { text: 'Looks great on mobile & desktop', html: false },
        'pricing.starter.f3': { text: 'Contact form for customer inquiries', html: false },
        'pricing.starter.f4': { text: 'Findable on Google (SEO)', html: false },
        'pricing.starter.f5': { text: 'Ready in approx. 1 week', html: false },
        'pricing.starter.btn': { text: 'Inquire without obligation', html: false },
        'pricing.komplett.title': { text: 'Complete Package', html: false },
        'pricing.komplett.sub': { text: 'Everything your business needs', html: false },
        'pricing.komplett.f1': { text: '4–7 pages with custom design', html: false },
        'pricing.komplett.f2': { text: 'Optimized for Google search (SEO)', html: false },
        'pricing.komplett.f3': { text: 'Social media integration', html: false },
        'pricing.komplett.f4': { text: 'Photo gallery, team page, etc.', html: false },
        'pricing.komplett.f5': { text: 'Ready in 1–2 weeks', html: false },
        'pricing.komplett.btn': { text: 'Inquire without obligation', html: false },
        'pricing.support.title': { text: 'Maintenance & Support', html: false },
        'pricing.support.sub': { text: 'I stay by your side', html: false },
        'pricing.support.f1': { text: 'Update texts and images', html: false },
        'pricing.support.f2': { text: 'Technical maintenance & updates', html: false },
        'pricing.support.f3': { text: 'Small adjustments & extensions', html: false },
        'pricing.support.f4': { text: 'Reachable by phone & email', html: false },
        'pricing.support.f5': { text: 'Fast response, no waiting time', html: false },
        'pricing.support.btn': { text: 'Inquire without obligation', html: false },

        // Extras
        'extras.title': { text: '📦 Extras, if you need more', html: false },
        'extras.e1.label': { text: 'Additional subpage', html: false },
        'extras.e2.label': { text: 'Simple logo design', html: false },
        'extras.e3.label': { text: 'Blog / news section', html: false },
        'extras.e4.label': { text: 'Multi-language website', html: false },
        'extras.running.title': { text: '🔄 Running costs (not from us)', html: false },
        'extras.r1.label': { text: 'Your domain name (.de)', html: false },
        'extras.r2.label': { text: 'Storage (Hosting)', html: false },
        'extras.r3.label': { text: 'Security certificate (SSL)', html: false },
        'extras.r3.price': { text: 'often free', html: false },
        'extras.note': { text: '* These costs are charged by your hosting provider. I help you with the setup.', html: false },

        // Contact
        'contact.label': { text: 'Contact', html: false },
        'contact.title': { text: 'Have questions? Just get in touch', html: false },
        'contact.subtitle': { text: 'The first consultation is free and non-binding – promised', html: false },
        'contact.reach': { text: 'How to reach me', html: false },
        'contact.reachtext': { text: 'Whether you already have concrete ideas or just questions – simply write to me. I\'ll get back to you within 24 hours.', html: false },
        'contact.email.label': { text: 'Email', html: false },
        'contact.phone.label': { text: 'Phone', html: false },
        'contact.location.label': { text: 'Location', html: false },
        'contact.availability.label': { text: 'Availability', html: false },
        'contact.availability.value': { text: 'Flexible by appointment', html: false },
        'contact.form.title': { text: 'Write a message', html: false },
        'contact.form.name': { text: 'Name *', html: false },
        'contact.form.email': { text: 'Email *', html: false },
        'contact.form.phone': { text: 'Phone (optional)', html: false },
        'contact.form.services': { text: 'Desired service(s) *', html: false },
        'contact.form.s1': { text: '💻 Starter Package', html: false },
        'contact.form.s2': { text: '🚀 Complete Package', html: false },
        'contact.form.s3': { text: '🔧 Maintenance & Support', html: false },
        'contact.form.s4': { text: '💬 Initial Consultation', html: false },
        'contact.form.s4.price': { text: 'Free', html: false },
        'contact.form.s5': { text: '📋 Other', html: false },
        'contact.form.s5.price': { text: 'On request', html: false },
        'contact.form.message': { text: 'Your message *', html: false },
        'contact.form.submit': { text: 'Send message <span>→</span>', html: true },

        // Footer
        'footer.desc': { text: 'Professional websites for small businesses in Berlin and Brandenburg. Personal, reliable, and at fair prices.', html: false },
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
        'footer.copyright': { text: '© 2026 ly-webstudio – Web Designer Berlin. All rights reserved.', html: false },
        'footer.impressum': { text: 'Legal Notice', html: false },
        'footer.datenschutz': { text: 'Privacy Policy', html: false },
        'footer.agb': { text: 'Terms & Conditions', html: false },
    }
};

// Placeholder translations for form inputs
const placeholderTranslations = {
    de: {
        'contact.form.name.ph': 'Ihr Name',
        'contact.form.email.ph': 'ihre@email.de',
        'contact.form.message.ph': 'Erzählen Sie uns von Ihrem Projekt...',
    },
    en: {
        'contact.form.name.ph': 'Your name',
        'contact.form.email.ph': 'your@email.com',
        'contact.form.message.ph': 'Tell me about your project...',
    }
};

// Demo translations: German text → English text for each demo style
const demoTextMap = {
    minimalist: [
        // Nav
        ['Leistungen', 'Services'],
        ['Über uns', 'About Us'],
        ['Bewertungen', 'Reviews'],
        ['Kontakt', 'Contact'],
        ['Termin buchen', 'Book Appointment'],
        // Hero
        ['Jetzt Termine verfügbar', 'Appointments available now'],
        ['Moderne Zahnmedizin für Ihre Gesundheit', 'Modern Dentistry for Your Health'],
        ['Willkommen in unserer Praxis in Oranienburg. Mit modernster Technologie und einfühlsamer Betreuung sorgen wir für Ihr strahlendes Lächeln.', 'Welcome to our practice in Oranienburg. With cutting-edge technology and compassionate care, we ensure your radiant smile.'],
        ['Termin vereinbaren', 'Book Appointment'],
        ['Unsere Leistungen', 'Our Services'],
        ['Bewertungen', 'Reviews'],
        ['Erfahrung', 'Experience'],
        ['Jahre Erfahrung', 'Years Experience'],
        ['Behandlungen', 'Treatments'],
        ['Zufriedenheit', 'Satisfaction'],
        // Services
        ['Zahnmedizin auf höchstem Niveau', 'Dentistry at the Highest Level'],
        ['Von der Prophylaxe bis zur Implantologie – wir bieten das volle Spektrum moderner Zahnmedizin.', 'From prophylaxis to implantology – we offer the full spectrum of modern dentistry.'],
        ['Prophylaxe & Vorsorge', 'Prophylaxis & Prevention'],
        ['Regelmäßige Kontrollen und professionelle Zahnreinigung für langfristige Zahngesundheit.', 'Regular check-ups and professional teeth cleaning for long-term dental health.'],
        ['Ästhetische Zahnmedizin', 'Cosmetic Dentistry'],
        ['Bleaching, Veneers und unsichtbare Zahnkorrekturen für Ihr perfektes Lächeln.', 'Bleaching, veneers and invisible dental corrections for your perfect smile.'],
        ['Implantologie', 'Implantology'],
        ['Hochwertige Zahnimplantate für natürliche Ästhetik und volle Funktionalität.', 'High-quality dental implants for natural aesthetics and full functionality.'],
        ['Kinderzahnheilkunde', 'Pediatric Dentistry'],
        ['Einfühlsame Behandlung der kleinen Patienten in entspannter Atmosphäre.', 'Compassionate treatment of young patients in a relaxed atmosphere.'],
        ['Parodontologie', 'Periodontics'],
        ['Behandlung von Zahnfleischerkrankungen für den Erhalt Ihrer natürlichen Zähne.', 'Treatment of gum diseases to preserve your natural teeth.'],
        ['Behandlung im Schlaf', 'Treatment Under Sedation'],
        ['Angstfreie Behandlung unter Sedierung für entspannte Zahnarztbesuche.', 'Anxiety-free treatment under sedation for relaxed dental visits.'],
        ['Mehr erfahren', 'Learn more'],
        // About
        ['Ihre Zahngesundheit liegt uns am Herzen', 'Your Dental Health is Our Priority'],
        ['Flexible Termine', 'Flexible Appointments'],
        ['Modernste Technik', 'Latest Technology'],
        ['Alle Kassen', 'All Insurances'],
        // Team
        ['Unser Team', 'Our Team'],
        ['Zahnarzt & Praxisinhaber', 'Dentist & Practice Owner'],
        ['Zahnärztin', 'Dentist'],
        ['Kieferorthopädie', 'Orthodontics'],
        ['Dentalhygienikerin', 'Dental Hygienist'],
        // Contact
        ['Telefon', 'Phone'],
        ['E-Mail', 'Email'],
        ['Adresse', 'Address'],
        ['Schreiben Sie uns', 'Write to Us'],
        ['Ihr Name', 'Your Name'],
        ['Ihre E-Mail', 'Your Email'],
        ['Ihre Nachricht', 'Your Message'],
        ['Nachricht senden', 'Send Message'],
        ['Dies ist nur eine Demo. In der echten Website würde das Formular funktionieren.', 'This is just a demo. In the real website, the form would work.'],
    ],
    corporate: [
        // Nav
        ['Leistungen', 'Services'],
        ['Kanzlei', 'Firm'],
        ['Referenzen', 'References'],
        ['Kontakt', 'Contact'],
        ['Beratungstermin', 'Consultation'],
        ['Mo-Fr: 08:00 - 18:00 Uhr', 'Mon-Fri: 8:00 AM - 6:00 PM'],
        // Hero
        ['Erstberatung kostenlos', 'Free initial consultation'],
        ['Steuerberatung mit', 'Tax advisory with'],
        ['Weitblick', 'Foresight'],
        ['für Ihren Erfolg', 'for your success'],
        ['Seit über 30 Jahren sind wir Ihr zuverlässiger Partner in allen steuerlichen Angelegenheiten. Kompetent, persönlich und zukunftsorientiert.', 'For over 30 years, we have been your reliable partner in all tax matters. Competent, personal, and future-oriented.'],
        ['Kostenlose Erstberatung', 'Free Initial Consultation'],
        ['Leistungen ansehen', 'View Services'],
        ['Jahre Erfahrung', 'Years Experience'],
        ['Zufriedene Mandanten', 'Satisfied Clients'],
        ['Experten im Team', 'Team Experts'],
        ['Zertifizierte Kanzlei', 'Certified Firm'],
        // Services
        ['Umfassende Steuerberatung', 'Comprehensive Tax Advisory'],
        ['Von der Buchhaltung bis zur strategischen Steuerplanung – wir bieten alle Leistungen aus einer Hand.', 'From accounting to strategic tax planning – we offer all services from one source.'],
        ['Finanzbuchhaltung', 'Financial Accounting'],
        ['Laufende Buchführung, Kontierung und Auswertungen für den optimalen Überblick.', 'Ongoing bookkeeping, account coding and reports for optimal overview.'],
        ['Jahresabschlüsse', 'Annual Financial Statements'],
        ['Erstellung von Bilanzen, GuV und Jahresabschlüssen nach HGB.', 'Preparation of balance sheets, P&L and annual financial statements according to HGB.'],
        ['Steuererklärungen', 'Tax Returns'],
        ['Private und betriebliche Steuererklärungen für optimale Steuergestaltung.', 'Private and business tax returns for optimal tax planning.'],
        ['Lohnbuchhaltung', 'Payroll Accounting'],
        ['Unternehmensberatung', 'Business Consulting'],
        ['Rechtsformwahl', 'Legal Form Advisory'],
        ['Steueroptimierung', 'Tax Optimization'],
        ['Mehr erfahren', 'Learn more'],
        // About / Team / Contact
        ['Über uns', 'About Us'],
        ['Ihr Name', 'Your Name'],
        ['Ihre E-Mail', 'Your Email'],
        ['Ihre Nachricht', 'Your Message'],
        ['Nachricht senden', 'Send Message'],
        ['Schreiben Sie uns', 'Write to Us'],
        ['Telefon', 'Phone'],
        ['E-Mail', 'Email'],
        ['Adresse', 'Address'],
        ['Dies ist nur eine Demo. In der echten Website würde das Formular funktionieren.', 'This is just a demo. In the real website, the form would work.'],
    ],
    warm: [
        // Nav
        ['Café Sonnenschein', 'Café Sunshine'],
        ['Spezialitäten', 'Specialties'],
        ['Speisekarte', 'Menu'],
        ['Über uns', 'About Us'],
        ['Galerie', 'Gallery'],
        ['Kontakt', 'Contact'],
        ['Tisch reservieren', 'Reserve a Table'],
        // Hero
        ['Frisch geröstet & hausgemacht', 'Freshly roasted & homemade'],
        ['Wo jeder Tag mit', 'Where every day starts with'],
        ['Genuss', 'Pleasure'],
        ['beginnt', 'begins'],
        ['Willkommen im Café Sonnenschein – Ihrem gemütlichen Treffpunkt in Oranienburg. Genießen Sie handgebrühten Kaffee, hausgemachte Kuchen und herzliche Gastfreundschaft.', 'Welcome to Café Sunshine – your cozy meeting place in Oranienburg. Enjoy hand-brewed coffee, homemade cakes, and warm hospitality.'],
        ['Speisekarte ansehen', 'View Menu'],
        ['Bio-Kaffee', 'Organic Coffee'],
        ['Hausgemacht', 'Homemade'],
        ['Vegane Optionen', 'Vegan Options'],
        ['Sterne', 'Stars'],
        ['Bewertungen', 'Reviews'],
        ['in Oranienburg', 'in Oranienburg'],
        // Specials
        ['Unsere Spezialitäten', 'Our Specialties'],
        ['Das schmeckt nach mehr', 'Taste the difference'],
        ['Entdecken Sie unsere beliebten Highlights – mit Liebe zubereitet, täglich frisch.', 'Discover our popular highlights – prepared with love, fresh daily.'],
        ['Bestseller', 'Bestseller'],
        ['Sonnenschein-Frühstück', 'Sunshine Breakfast'],
        ['Croissant, Brötchen, Butter, Marmelade, Käse, Schinken, Ei, frischer O-Saft und Kaffee.', 'Croissant, rolls, butter, jam, cheese, ham, egg, fresh orange juice and coffee.'],
        ['Omas Käsekuchen', 'Grandma\'s Cheesecake'],
        ['Nach traditionellem Familienrezept gebacken – cremig, saftig und einfach unwiderstehlich.', 'Baked from a traditional family recipe – creamy, moist, and simply irresistible.'],
        ['Sonnenschein Latte', 'Sunshine Latte'],
        ['Unser Signature-Kaffee mit Karamell, Vanille und einem Hauch Zimt – pures Glück in der Tasse.', 'Our signature coffee with caramel, vanilla and a hint of cinnamon – pure happiness in a cup.'],
        // Menu
        ['Für jeden Geschmack', 'For Every Taste'],
        ['Von Kaffee-Klassikern bis zu herzhaften Snacks – bei uns finden Sie Ihr Lieblingsgetränk.', 'From coffee classics to savory snacks – find your favorite drink with us.'],
        ['Kaffee', 'Coffee'],
        ['Tee', 'Tea'],
        ['Frühstück', 'Breakfast'],
        ['Kuchen', 'Cake'],
        ['Snacks', 'Snacks'],
        ['Kräftig & aromatisch', 'Strong & aromatic'],
        ['Mit cremigem Milchschaum', 'With creamy milk foam'],
        ['Sanft & mild', 'Smooth & mild'],
        ['Australischer Klassiker', 'Australian classic'],
        ['Erfrischend kalt', 'Refreshingly cold'],
        ['Heiße Schokolade', 'Hot Chocolate'],
        ['Mit Sahnehaube', 'With whipped cream'],
        // About
        ['Mit Herz & Leidenschaft', 'With Heart & Passion'],
        ['Jahre Leidenschaft', 'Years of Passion'],
        ['Fair gehandelt', 'Fair trade'],
        ['Täglich frisch', 'Fresh daily'],
        ['Alles hausgemacht', 'All homemade'],
        ['Jeden Tag frisch gebacken', 'Freshly baked every day'],
        ['Regionale Zutaten', 'Local Ingredients'],
        ['Von Bauern aus der Region', 'From local farmers'],
        // Contact
        ['Besuchen Sie uns', 'Visit Us'],
        ['Öffnungszeiten', 'Opening Hours'],
        ['Montag – Freitag', 'Monday – Friday'],
        ['Samstag', 'Saturday'],
        ['Sonntag', 'Sunday'],
        ['Schreiben Sie uns', 'Write to Us'],
        ['Ihr Name', 'Your Name'],
        ['Ihre E-Mail', 'Your Email'],
        ['Ihre Nachricht', 'Your Message'],
        ['Nachricht senden', 'Send Message'],
        ['Telefon', 'Phone'],
        ['E-Mail', 'Email'],
        ['Adresse', 'Address'],
        ['Dies ist nur eine Demo. In der echten Website würde das Formular funktionieren.', 'This is just a demo. In the real website, the form would work.'],
    ]
};

/**
 * Apply translations to the DOM based on current language
 * @param {string} lang - Language code: 'de' or 'en'
 */
function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    // Update document language attribute
    document.documentElement.lang = lang;

    // Update page title
    document.title = lang === 'en'
        ? 'Get a professional website in Berlin | ly-webstudio – from €150'
        : 'Website erstellen lassen in Berlin | ly-webstudio – ab 150€';

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

    // Update language toggle button styling
    document.querySelectorAll('.lang-option').forEach(opt => {
        const optLang = opt.getAttribute('data-lang');
        if (optLang === lang) {
            opt.classList.add('active');
        } else {
            opt.classList.remove('active');
        }
    });

    // Update toggle button title/tooltip + slide class
    const toggle = document.getElementById('langToggle');
    if (toggle) {
        toggle.title = lang === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln';
        if (lang === 'en') {
            toggle.classList.add('lang-en');
        } else {
            toggle.classList.remove('lang-en');
        }
    }

    // Re-translate open demo if one exists
    translateOpenDemo(lang);
}

/**
 * Toggle between German and English
 */
function toggleLanguage() {
    applyLanguage(currentLang === 'de' ? 'en' : 'de');
}

/**
 * Translate text in an open demo iframe
 * @param {string} lang - Language code: 'de' or 'en'
 */
function translateOpenDemo(lang) {
    const overlay = document.getElementById('styleDemoOverlay');
    if (!overlay || !overlay.classList.contains('active')) return;

    const iframe = document.getElementById('styleDemoFrame');
    if (!iframe || !iframe.contentDocument || !iframe.contentDocument.body) return;

    // Use currentDemoKey from script.js if available
    const demoKey = (typeof currentDemoKey !== 'undefined' && currentDemoKey) ? currentDemoKey : detectDemoKey(iframe);
    if (!demoKey) return;

    translateDemoIframe(iframe, demoKey, lang);
}

/**
 * Detect which demo is open by content
 */
function detectDemoKey(iframe) {
    try {
        const html = iframe.contentDocument.body.innerHTML.toLowerCase();
        if (html.includes('zahnarzt') || html.includes('dental')) return 'minimalist';
        if (html.includes('steuer') || html.includes('tax')) return 'corporate';
        if (html.includes('café') || html.includes('cafe') || html.includes('sunshine')) return 'warm';
    } catch(e) {}
    return null;
}

/**
 * Translate a specific demo iframe
 * @param {HTMLIFrameElement} iframe
 * @param {string} demoKey - 'minimalist', 'corporate', or 'warm'
 * @param {string} lang - 'de' or 'en'
 */
function translateDemoIframe(iframe, demoKey, lang) {
    if (!demoTextMap[demoKey]) return;
    try {
        const iframeBody = iframe.contentDocument.body;
        if (!iframeBody) return;

        const textMap = demoTextMap[demoKey];

        if (lang === 'en') {
            textMap.forEach(([de, en]) => replaceTextInNode(iframeBody, de, en));
        } else {
            textMap.forEach(([de, en]) => replaceTextInNode(iframeBody, en, de));
        }

        // Also translate the demo alert message
        const scripts = iframe.contentDocument.querySelectorAll('script');
        // Update form submit alert text isn't easily done after load,
        // but the visible text content is what matters most
    } catch(e) {
        console.log('Demo translation error:', e);
    }
}

/**
 * Helper function to replace text in DOM nodes
 * @param {HTMLElement} node - Root node to search
 * @param {string} searchText - Text to find
 * @param {string} replaceText - Text to replace with
 */
function replaceTextInNode(node, searchText, replaceText) {
    const ownerDoc = node.ownerDocument || document;
    const walker = ownerDoc.createTreeWalker(
        node,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    const nodesToUpdate = [];
    let currentNode;

    while (currentNode = walker.nextNode()) {
        if (currentNode.nodeValue.includes(searchText)) {
            nodesToUpdate.push(currentNode);
        }
    }

    nodesToUpdate.forEach(textNode => {
        textNode.nodeValue = textNode.nodeValue.replace(searchText, replaceText);
    });
}

/**
 * Initialize i18n on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    // Set up language toggle click handler
    const toggle = document.getElementById('langToggle');
    if (toggle) {
        toggle.addEventListener('click', toggleLanguage);
    }

    // Always apply language to ensure correct toggle state on load
    applyLanguage(currentLang);
});

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        applyLanguage,
        toggleLanguage,
        translateOpenDemo,
        currentLang: () => currentLang,
        translations,
        placeholderTranslations,
        demoTextMap
    };
}
