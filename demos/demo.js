// Gemeinsames Skript der Beispielseiten: Mobilmenü, Sprungmarken,
// Hinweis beim Formular und die Reiter der Café-Speisekarte.
(function () {
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mobilmenü
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.getElementById('nav-links');

    function setMenu(open) {
        if (!toggle || !navLinks) return;
        navLinks.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    if (toggle && navLinks) {
        toggle.addEventListener('click', function () {
            setMenu(!navLinks.classList.contains('open'));
        });
    }

    // Speisekarte (nur Café)
    const categoryButtons = document.querySelectorAll('.menu-cat[data-cat]');

    function showCategory(cat) {
        categoryButtons.forEach(function (btn) {
            const active = btn.getAttribute('data-cat') === cat;
            btn.classList.toggle('active', active);
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
        document.querySelectorAll('.menu-item[data-cat]').forEach(function (item) {
            item.hidden = item.getAttribute('data-cat') !== cat;
        });
    }

    categoryButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            showCategory(btn.getAttribute('data-cat'));
        });
    });

    // Sprungmarken scrollen innerhalb der Seite. Ohne Eintrag im Browserverlauf,
    // damit der Zurück-Knopf nicht erst durch die Abschnitte der Demo springt.
    document.addEventListener('click', function (e) {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        const target = document.getElementById(link.getAttribute('href').slice(1));
        if (!target) return;
        e.preventDefault();
        setMenu(false);
        const cat = link.getAttribute('data-menu-cat');
        if (cat) showCategory(cat);
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
    });

    // Formulare verschicken nichts
    document.querySelectorAll('form').forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const note = form.querySelector('.demo-form-note');
            if (note) note.textContent = 'Nur ein Beispiel: Diese Anfrage wird nicht verschickt.';
        });
    });
})();
