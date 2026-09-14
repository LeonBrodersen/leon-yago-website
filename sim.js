/* Treiber der Simulation.

   Das Skript tut absichtlich wenig: Es rechnet aus der Scrollposition eine Zahl
   zwischen 0 und 1, schreibt sie als --p an die Section, schaltet Klassen und
   zählt zwei Uhren. Alles Sichtbare macht CSS. Gründe:
   - Es gibt keinen zweiten Zustand, der mit dem Scrollen auseinanderlaufen kann:
     Zurückscrollen spult zurück, weil alles aus p folgt.
   - Kein Timer. Die Pause zählt am Scrollweg herunter, nicht an einer Uhr —
     sonst liefe sie weiter, während man sie gar nicht sieht.
   - Keine Texte. Beide Sprachen stehen fertig im HTML, samt Endzustand im
     Telefon. Das Skript nimmt nur Klassen für frühere Schritte WEG; fehlt es
     oder ist Bewegung reduziert, steht deshalb das fertige Bild da.

   Der Scroll-Zuhörer setzt nur eine Markierung und bestellt höchstens einen
   Bildwechsel; gerechnet wird dort. */
(function () {
  'use strict';

  var wurzel = document.documentElement;
  wurzel.classList.remove('no-js');

  var sim = document.querySelector('[data-sim]');
  if (!sim) return;

  var strecke = sim.querySelector('.sim-strecke');
  var buehne = sim.querySelector('.sim-buehne');
  var schirm = sim.querySelector('.app-schirm');
  var takte = [].slice.call(sim.querySelectorAll('.sim-takte li'));
  var pauseZeit = sim.querySelector('.app-pause-zeit');
  var laufZeit = sim.querySelector('.app-lauf-zeit');
  if (!strecke || !buehne || !schirm) return;

  /* Schaltet jemand die Bewegung während des Besuchs um, lädt die Seite neu:
     ein halb gespulter Zustand ohne Bewegung wäre schlechter als ein Neustart. */
  var ruhig = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (ruhig.addEventListener) {
    ruhig.addEventListener('change', function () { location.reload(); });
  }
  if (ruhig.matches) return; // CSS zeigt dann den Endzustand.

  /* Ab welchem p die fünf Takte links dran sind. */
  var TAKTE = [0, 0.12, 0.38, 0.52, 0.74];

  /* Was im Telefon passiert, in der Reihenfolge der App (keypad.tsx,
     exercise-card.tsx, rest-timer-bar.tsx). Eine Klasse gilt von … bis unter …;
     die Bedeutung jeder Klasse steht in sim.css unter „Zustände".
     Takt 02 tippt „7" und „5", jede Taste leuchtet kurz; Takt 04 schließt das
     Keypad und hakt dann die Zeile ab. Das Goldlicht läuft ab 0,62 über 0,09
     (sim.css, .app-licht) — beide Stellen zusammen ändern. */
  var SCHRITTE = [
    ['sim-offen', 0.12, 2],
    ['sim-7', 0.19, 2],
    ['sim-druck-7', 0.19, 0.22],
    ['sim-5', 0.27, 2],
    ['sim-druck-5', 0.27, 0.30],
    ['sim-uebernommen', 0.53, 2],
    ['sim-druck-haken', 0.60, 0.62],
    ['sim-bestaetigt', 0.62, 2],
    ['sim-pause', 0.74, 2]
  ];

  /* Die Pause beginnt bei 90 s (REST_SECONDS_DEFAULT) und bleibt am Ende der
     Strecke bei 1:12 stehen: ein Standbild mit 0:00 läse sich wie abgelaufen.
     Die Laufzeit oben zählt dieselben 18 Sekunden mit, von 18:42 bis 19:00. */
  var PAUSE_AB = 0.74;
  var PAUSE_S = 90;
  var GELAUFEN_S = 18;
  var LAUF_START_S = 18 * 60 + 42;

  var schmutzig = false;
  var bestellt = false;
  var letzterTakt = -1;
  var letzterStand = '';
  var letzteSekunde = -1;

  function anmelden() {
    schmutzig = true;
    if (!bestellt) {
      bestellt = true;
      requestAnimationFrame(rechnen);
    }
  }

  window.addEventListener('scroll', anmelden, { passive: true });
  window.addEventListener('resize', anmelden, { passive: true });

  function rechnen() {
    bestellt = false;
    if (!schmutzig) return;
    schmutzig = false;

    var kasten = strecke.getBoundingClientRect();
    var fahrweg = kasten.height - buehne.offsetHeight;
    var p = fahrweg > 0 ? -kasten.top / fahrweg : 1;
    if (p < 0) p = 0;
    if (p > 1) p = 1;

    sim.style.setProperty('--p', p.toFixed(4));

    /* Welcher Takt ist dran? Der letzte, dessen Schwelle überschritten ist. */
    var takt = 0;
    for (var i = 0; i < TAKTE.length; i++) {
      if (p >= TAKTE[i]) takt = i;
    }
    if (takt !== letzterTakt) {
      letzterTakt = takt;
      for (var j = 0; j < takte.length; j++) {
        takte[j].classList.toggle('ist-da', j === takt);
      }
    }

    /* Klassen im Telefon nur anfassen, wenn sich wirklich ein Schritt ändert. */
    var stand = '';
    for (var k = 0; k < SCHRITTE.length; k++) {
      stand += p >= SCHRITTE[k][1] && p < SCHRITTE[k][2] ? '1' : '0';
    }
    if (stand !== letzterStand) {
      letzterStand = stand;
      for (var m = 0; m < SCHRITTE.length; m++) {
        schirm.classList.toggle(SCHRITTE[m][0], stand.charAt(m) === '1');
      }
    }

    var anteil = p <= PAUSE_AB ? 0 : (p - PAUSE_AB) / (1 - PAUSE_AB);
    var sekunde = Math.min(GELAUFEN_S, Math.floor(anteil * GELAUFEN_S));
    if (sekunde !== letzteSekunde) {
      letzteSekunde = sekunde;
      if (pauseZeit) pauseZeit.textContent = uhr(PAUSE_S - sekunde);
      if (laufZeit) laufZeit.textContent = uhr(LAUF_START_S + sekunde);
    }
  }

  /** 90 → „1:30", 1122 → „18:42" (formatDuration/formatClock der App unter einer Stunde). */
  function uhr(s) {
    return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2);
  }

  /* Einmal sofort, damit vor dem ersten Scrollen nicht kurz der Endzustand steht. */
  schmutzig = true;
  rechnen();
})();
