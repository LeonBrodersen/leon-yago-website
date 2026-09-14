/* Das Kontaktformular — das einzige, was diese Seite außer der Simulation an
   JavaScript braucht. Ein Klappmenü gibt es nicht mehr: die Seite hat zwei
   weiterführende Links, und dafür ist ein Menüknopf Beiwerk.

   Versand über die REST-Schnittstelle von EmailJS, ohne deren SDK von einem
   Fremd-CDN. Der Formular-Endpunkt erwartet multipart/form-data mit service_id,
   template_id und user_id (dem öffentlichen Schlüssel).
   Doku: https://www.emailjs.com/docs/rest-api/send-form/ */

// Früherer Cookie-Hinweis: dessen Eintrag bei wiederkehrenden Besuchern löschen.
try { localStorage.removeItem('cookiesAccepted'); } catch (e) {}

document.documentElement.classList.remove('no-js');

(function () {
  'use strict';

  var ENDPUNKT = 'https://api.emailjs.com/api/v1.0/email/send-form';
  var DIENST = 'service_b6nweer';
  var VORLAGE = 'template_wojbfmi';
  var SCHLUESSEL = 'Z57gOiO7JF_9Z8kpq';

  var form = document.getElementById('form');
  var stand = document.getElementById('form-stand');
  var senden = document.getElementById('form-submit');
  if (!form || !stand || !senden) return;

  /* Der Knopf liegt im HTML gesperrt aus. Erst hier, wo der Versand wirklich
     möglich ist, wird er frei — und der Ausweichhinweis verschwindet. */
  senden.disabled = false;
  var aus = document.getElementById('form-aus');
  if (aus) aus.hidden = true;

  /* Die Meldungen stehen als Attribute im HTML, damit die englische Seite
     dasselbe Skript mit ihren eigenen Texten benutzt. */
  function text(name) { return stand.getAttribute('data-' + name) || ''; }
  var knopfText = senden.textContent;
  var laeuft = false;

  function zeigen(inhalt, art) {
    stand.textContent = inhalt;
    stand.className = 'form-stand' + (art ? ' ist-' + art : '');
  }

  function sendend(an) {
    laeuft = an;
    senden.disabled = an;
    senden.setAttribute('aria-busy', an ? 'true' : 'false');
    senden.textContent = an ? text('sendet') : knopfText;
  }

  function wert(name) {
    var el = form.elements[name];
    return el && el.value ? el.value.trim() : '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (laeuft) return;

    /* Roboter-Falle: Ist das unsichtbare Feld gefüllt, war kein Mensch am Werk.
       Dann sieht die Bestätigung normal aus, gesendet wird nichts. */
    var falle = form.elements.website;
    if (falle && falle.value.trim() !== '') {
      form.reset();
      zeigen(text('gut'), 'gut');
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var daten = new FormData();
    daten.append('service_id', DIENST);
    daten.append('template_id', VORLAGE);
    daten.append('user_id', SCHLUESSEL);
    daten.append('name', wert('name'));
    daten.append('email', wert('email'));
    daten.append('message', wert('message'));

    sendend(true);
    zeigen(text('sendet'), '');

    // Kein Content-Type setzen: Den Rand der multipart-Daten bestimmt der Browser.
    fetch(ENDPUNKT, { method: 'POST', body: daten })
      .then(function (res) {
        if (!res.ok) throw new Error('EmailJS antwortete mit ' + res.status);
        sendend(false);
        form.reset();
        zeigen(text('gut'), 'gut');
      })
      .catch(function (err) {
        console.error('Kontaktformular:', err);
        sendend(false);
        zeigen(text('schlecht'), 'schlecht');
      });
  });
})();
