// Alles, was diese Seite an JavaScript braucht: das Menü auf dem Handy und das
// Kontaktformular. Ohne dieses Skript bleibt die Seite vollständig lesbar; nur
// der Sendeknopf ist gesperrt und der Hinweis daneben sichtbar.

// Früherer Cookie-Hinweis: dessen Eintrag bei wiederkehrenden Besuchern löschen.
try { localStorage.removeItem('cookiesAccepted'); } catch (e) {}

document.documentElement.classList.add('js-ready');

// ---------------------------------------------------------------- Menü (Handy)
(function () {
  var btn = document.getElementById('menu-btn');
  var menu = document.getElementById('menu');
  if (!btn || !menu) return;

  function setOpen(open) {
    btn.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  }

  btn.addEventListener('click', function () {
    setOpen(btn.getAttribute('aria-expanded') !== 'true');
  });

  // Nach dem Tippen auf einen Abschnitt soll der Abschnitt zu sehen sein, nicht das Menü.
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  document.addEventListener('click', function (e) {
    if (btn.getAttribute('aria-expanded') !== 'true') return;
    if (menu.contains(e.target) || btn.contains(e.target)) return;
    setOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || btn.getAttribute('aria-expanded') !== 'true') return;
    setOpen(false);
    btn.focus();
  });
})();

// ------------------------------------------------------------ Kontaktformular
// Versand über die REST-Schnittstelle von EmailJS, ohne deren SDK von einem
// Fremd-CDN. Der Formular-Endpunkt erwartet multipart/form-data mit service_id,
// template_id und user_id (dem öffentlichen Schlüssel).
// Doku: https://www.emailjs.com/docs/rest-api/send-form/
(function () {
  var ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send-form';
  var SERVICE_ID = 'service_b6nweer';
  var TEMPLATE_ID = 'template_wojbfmi';
  var PUBLIC_KEY = 'Z57gOiO7JF_9Z8kpq';

  var form = document.getElementById('form');
  var status = document.getElementById('form-status');
  var submit = document.getElementById('form-submit');
  if (!form || !status || !submit) return;

  // Der Knopf liegt im HTML gesperrt. Erst hier, wo der Versand wirklich
  // möglich ist, wird er freigegeben.
  submit.disabled = false;
  var fallback = document.getElementById('form-fallback');
  if (fallback) fallback.hidden = true;

  // Die Meldungen stehen als Attribute im HTML, damit die englische Seite
  // dasselbe Skript mit ihren eigenen Texten benutzt.
  function msg(name) { return status.getAttribute('data-' + name) || ''; }
  var sendLabel = submit.textContent;
  var sending = false;

  function setStatus(text, kind) {
    status.textContent = text;
    status.className = 'form-status' + (kind ? ' is-' + kind : '');
  }

  function setSending(active) {
    sending = active;
    submit.disabled = active;
    submit.setAttribute('aria-busy', active ? 'true' : 'false');
    submit.textContent = active ? msg('sending') : sendLabel;
  }

  function value(name) {
    var el = form.elements[name];
    return el && el.value ? el.value.trim() : '';
  }

  /** Die angekreuzten Themen als Klartext, in der Sprache der Seite. */
  function topics() {
    return Array.prototype.slice.call(form.querySelectorAll('.choice input:checked'))
      .map(function (cb) {
        var label = cb.closest('label');
        return label ? label.textContent.trim() : '';
      })
      .filter(Boolean)
      .join(', ');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (sending) return;

    // Roboter-Falle: Ist das unsichtbare Feld gefüllt, war kein Mensch am Werk.
    // Dann sieht die Bestätigung normal aus, gesendet wird nichts.
    var trap = form.elements.website;
    if (trap && trap.value.trim() !== '') {
      form.reset();
      setStatus(msg('success'), 'ok');
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var data = new FormData();
    data.append('service_id', SERVICE_ID);
    data.append('template_id', TEMPLATE_ID);
    data.append('user_id', PUBLIC_KEY);
    data.append('name', value('name'));
    data.append('email', value('email'));
    data.append('phone', value('phone'));
    data.append('message', value('message'));
    data.append('services_combined', topics());

    setSending(true);
    setStatus(msg('sending'), '');

    // Kein Content-Type setzen: Den Rand der multipart-Daten bestimmt der Browser.
    fetch(ENDPOINT, { method: 'POST', body: data })
      .then(function (res) {
        if (!res.ok) throw new Error('EmailJS antwortete mit ' + res.status);
        setSending(false);
        form.reset();
        setStatus(msg('success'), 'ok');
      })
      .catch(function (err) {
        console.error('Kontaktformular:', err);
        setSending(false);
        setStatus(msg('error'), 'bad');
      });
  });
})();
