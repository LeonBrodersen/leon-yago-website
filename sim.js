/* Treiber der Simulation.

   Das Skript tut absichtlich sehr wenig: Es rechnet aus der Scrollposition eine
   Zahl zwischen 0 und 1, schreibt sie als --p an die Bühne und schaltet sechs
   Klassen. Alles Sichtbare macht CSS. Gründe:
   - Nur transform und opacity ändern sich, das läuft auf dem Compositor.
   - Es gibt keinen zweiten Zustand, der mit dem Scrollen auseinanderlaufen kann:
     Zurückscrollen spult zurück, weil alles aus --p folgt.
   - Kein Timer. Der Pausenring hängt am Fortschritt, nicht an einer Uhr — sonst
     würde er weiterlaufen, während man ihn gar nicht sieht.

   Der Scroll-Zuhörer setzt nur eine Markierung; gerechnet wird einmal pro
   Bildwechsel in requestAnimationFrame. */
(function () {
  'use strict';

  var wurzel = document.documentElement;
  wurzel.classList.remove('no-js');

  var sim = document.querySelector('[data-sim]');
  if (!sim) return;

  var strecke = sim.querySelector('.sim-strecke');
  var buehne = sim.querySelector('.sim-buehne');
  var takte = [].slice.call(sim.querySelectorAll('.sim-takte li'));
  var felder = [].slice.call(sim.querySelectorAll('.app-feld'));
  var haken = sim.querySelector('.app-haken');
  var scheiben = sim.querySelector('.app-scheiben');
  var pause = sim.querySelector('.app-pause');
  var zeit = sim.querySelector('.app-pause .zeit');
  if (!strecke || !buehne) return;

  var ruhig = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (ruhig.matches) return; // CSS zeigt dann den Endzustand.

  /* Die Takte und ihre Schwellen. Der erste Takt steht schon am Anfang da,
     damit die Seite im Ruhezustand nicht leer wirkt. */
  var SCHWELLEN = [0, 0.16, 0.3, 0.45, 0.6, 0.78];
  var PAUSE_S = 90; // REST_SECONDS_DEFAULT der App

  var schmutzig = true;
  var letzterTakt = -1;

  function anmelden() { schmutzig = true; }

  window.addEventListener('scroll', anmelden, { passive: true });
  window.addEventListener('resize', anmelden, { passive: true });

  function rechnen() {
    if (!schmutzig) { requestAnimationFrame(rechnen); return; }
    schmutzig = false;

    var kasten = strecke.getBoundingClientRect();
    var fahrweg = kasten.height - buehne.offsetHeight;
    if (fahrweg <= 0) { requestAnimationFrame(rechnen); return; }

    var p = (-kasten.top) / fahrweg;
    if (p < 0) p = 0;
    if (p > 1) p = 1;

    sim.style.setProperty('--p', p.toFixed(4));

    /* Welcher Takt ist dran? Der letzte, dessen Schwelle überschritten ist.
       Ohne Trick: eine Hysterese hatte hier die Takte zu früh ausgelöst, und an
       der Kante zu flackern kostet nichts — die Klassen wechseln nur, wenn sich
       der Takt wirklich ändert, und der Übergang dauert 260 ms. */
    var takt = 0;
    for (var i = 0; i < SCHWELLEN.length; i++) {
      if (p >= SCHWELLEN[i]) takt = i;
    }

    if (takt !== letzterTakt) {
      letzterTakt = takt;
      for (var j = 0; j < takte.length; j++) {
        takte[j].classList.toggle('ist-da', j === takt);
      }
      /* Takt 1 trägt das Gewicht ein, Takt 2 die Wiederholungen. Die Felder
         füllen sich in derselben Reihenfolge, in der man sie antippt. */
      if (felder[0]) felder[0].classList.toggle('ist-gefuellt', takt >= 1);
      if (scheiben) scheiben.classList.toggle('ist-da', takt >= 2);
      if (felder[1]) felder[1].classList.toggle('ist-gefuellt', takt >= 3);
      if (haken) haken.classList.toggle('ist-gesetzt', takt >= 4);
      if (pause) pause.classList.toggle('ist-da', takt >= 5);
    }

    /* Gewicht und Wiederholungen erscheinen ziffernweise, sobald ihr Takt läuft
       — das liest sich wie Eintippen und nicht wie ein Einblenden. */
    if (felder[0]) felder[0].textContent = ziffern('75', p, 0.16, 0.26);
    if (felder[1]) felder[1].textContent = ziffern('11', p, 0.45, 0.55);

    /* Der Ring läuft zwischen Takt 4 und dem Ende der Strecke. Die Restzeit
       zählt dieselbe Strecke herunter, damit Ring und Zahl zusammenpassen. */
    /* Der Ring entleert sich, so wie in der App, und bleibt am Ende der Strecke
       bei einem Rest stehen: ein Standbild mit 0:00 läse sich wie abgelaufen. */
    var gelaufen = 0;
    if (p > 0.78) gelaufen = Math.min(1, (p - 0.78) / 0.22) * 0.8;
    sim.style.setProperty('--ring', (1 - gelaufen).toFixed(4));
    if (zeit) {
      var rest = Math.max(0, Math.round(PAUSE_S * (1 - gelaufen)));
      zeit.textContent = Math.floor(rest / 60) + ':' + ('0' + (rest % 60)).slice(-2);
    }

    requestAnimationFrame(rechnen);
  }

  /** Gibt die ersten Zeichen von wert zurück, je weiter p zwischen von und bis liegt. */
  function ziffern(wert, p, von, bis) {
    if (p <= von) return '';
    var anteil = (p - von) / (bis - von);
    if (anteil >= 1) return wert;
    var n = Math.max(1, Math.ceil(anteil * wert.length));
    return wert.slice(0, n);
  }

  requestAnimationFrame(rechnen);

  /* Schaltet jemand die Bewegung mitten im Besuch aus, hört das Skript auf und
     CSS übernimmt den Endzustand. */
  if (ruhig.addEventListener) {
    ruhig.addEventListener('change', function (e) {
      if (e.matches) location.reload();
    });
  }
})();
