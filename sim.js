/* Treiber der Simulationen (GingR und Rezeptbuch).

   Das Skript tut absichtlich wenig: Es rechnet für jede Simulation aus der
   Scrollposition eine Zahl zwischen 0 und 1, schreibt sie als --p an die
   Section, schaltet Klassen und zählt bei GingR zwei Uhren. Alles Sichtbare
   macht CSS. Gründe:
   - Es gibt keinen zweiten Zustand, der mit dem Scrollen auseinanderlaufen kann:
     Zurückscrollen spult zurück, weil alles aus p folgt.
   - Kein Timer. Die Pause zählt am Scrollweg herunter, nicht an einer Uhr —
     sonst liefe sie weiter, während man sie gar nicht sieht.
   - Keine Texte. Beide Sprachen stehen fertig im HTML, samt Endzustand im
     Telefon. Das Skript nimmt nur Klassen für frühere Schritte WEG; fehlt es
     oder ist Bewegung reduziert, steht deshalb das fertige Bild da.

   Welche Simulation welchen Ablauf hat, sagt data-sim an der Section
   („gingr“ oder „rezept“). Der Scroll-Zuhörer setzt nur eine Markierung und
   bestellt höchstens einen Bildwechsel; gerechnet wird dort. */
(function () {
  'use strict';

  var wurzel = document.documentElement;
  wurzel.classList.remove('no-js');

  /** 90 → „1:30", 1122 → „18:42" (formatDuration/formatClock der App unter einer Stunde). */
  function uhr(s) {
    return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2);
  }

  var ABLAEUFE = {
    /* GingR. Ab welchem p die fünf Takte links dran sind. */
    gingr: {
      takte: [0, 0.12, 0.38, 0.52, 0.74],

      /* Was im Telefon passiert, in der Reihenfolge der App (keypad.tsx,
         exercise-card.tsx, rest-timer-bar.tsx). Eine Klasse gilt von … bis unter …;
         die Bedeutung jeder Klasse steht in sim.css unter „Zustände".
         Takt 02 tippt „7" und „5", jede Taste leuchtet kurz; Takt 04 schließt das
         Keypad und hakt dann die Zeile ab. Das Goldlicht läuft ab 0,62 über 0,09
         (sim.css, .app-licht) — beide Stellen zusammen ändern. */
      schritte: [
        ['sim-offen', 0.12, 2],
        ['sim-7', 0.19, 2],
        ['sim-druck-7', 0.19, 0.22],
        ['sim-5', 0.27, 2],
        ['sim-druck-5', 0.27, 0.30],
        ['sim-uebernommen', 0.53, 2],
        ['sim-druck-haken', 0.60, 0.62],
        ['sim-bestaetigt', 0.62, 2],
        ['sim-pause', 0.74, 2]
      ],

      /* Die Pause beginnt bei 90 s (REST_SECONDS_DEFAULT) und bleibt am Ende der
         Strecke bei 1:12 stehen: ein Standbild mit 0:00 läse sich wie abgelaufen.
         Die Laufzeit oben zählt dieselben 18 Sekunden mit, von 18:42 bis 19:00. */
      einrichten: function (sim) {
        var pauseZeit = sim.querySelector('.app-pause-zeit');
        var laufZeit = sim.querySelector('.app-lauf-zeit');
        var PAUSE_AB = 0.74;
        var PAUSE_S = 90;
        var GELAUFEN_S = 18;
        var LAUF_START_S = 18 * 60 + 42;
        var letzteSekunde = -1;
        return function (p) {
          var anteil = p <= PAUSE_AB ? 0 : (p - PAUSE_AB) / (1 - PAUSE_AB);
          var sekunde = Math.min(GELAUFEN_S, Math.floor(anteil * GELAUFEN_S));
          if (sekunde === letzteSekunde) return;
          letzteSekunde = sekunde;
          if (pauseZeit) pauseZeit.textContent = uhr(PAUSE_S - sekunde);
          if (laufZeit) laufZeit.textContent = uhr(LAUF_START_S + sekunde);
        };
      }
    },

    /* Rezeptbuch, im Browserfenster. Die Bedeutung jeder Klasse steht in
       rezept.css unter „Zustände“; die Reihenfolge ist die der App: Import mit
       Diktat (import-form.tsx, dictate-button.tsx), Rezeptseite mit Portionen
       (page.tsx, ingredient-list.tsx), Kochmodus (cook-mode.tsx). */
    rezept: {
      takte: [0, 0.22, 0.42, 0.63, 0.88],
      schritte: [
        /* 01 „Dictate“: die App hört zu, die Zeilen erscheinen nacheinander.
           Portionen und Zeiten stehen im Diktat, weil die KI sie nur übernimmt,
           wenn der Text sie nennt (translate.ts). */
        ['rz-hoert', 0.02, 0.2],
        ['rz-z1', 0.04, 2],
        ['rz-z2', 0.056, 2],
        ['rz-z3', 0.072, 2],
        ['rz-z4', 0.088, 2],
        ['rz-z5', 0.104, 2],
        ['rz-z6', 0.12, 2],
        ['rz-z7', 0.136, 2],
        ['rz-z8', 0.152, 2],
        ['rz-z9', 0.168, 2],
        ['rz-z10', 0.184, 2],
        /* 02 Zum Knopf gerollt, „Save as draft“, dann die Meldungen des Formulars. */
        ['rz-bereit', 0.2, 2],
        ['rz-druck-speichern', 0.24, 0.26],
        ['rz-speichert', 0.24, 0.28],
        ['rz-strukturiert', 0.28, 0.36],
        /* Die Rezeptseite des Entwurfs; ab 0,42 bei den Zutaten. */
        ['rz-rezept', 0.36, 2],
        ['rz-runter', 0.42, 2],
        /* 03 Zweimal „+“: 2 → 3 → 4 Portionen. */
        ['rz-druck-plus-1', 0.48, 0.5],
        ['rz-s3', 0.48, 2],
        ['rz-druck-plus-2', 0.54, 0.56],
        ['rz-s4', 0.54, 2],
        /* 04 „Cook“, dann „Next“ bis Schritt 5. */
        ['rz-druck-kochen', 0.6, 0.63],
        ['rz-kochen', 0.63, 2],
        ['rz-k2', 0.68, 2],
        ['rz-k3', 0.73, 2],
        ['rz-k4', 0.78, 2],
        ['rz-k5', 0.83, 2],
        /* 05 „Finish“ → „Enjoy your meal.“ */
        ['rz-druck-weiter', 0.86, 0.88],
        ['rz-fertig', 0.88, 2]
      ]
    }
  };

  /* Maßstab des Rezeptbuch-Fensters: Fensterbreite durch App-Breite (960).
     Steht in rezept.css schon als CSS, aber Safari rechnet die Formel dort
     falsch und das Fenster bliebe leer. Läuft auch bei reduzierter Bewegung,
     weil der Endzustand genauso skaliert werden muss. */
  [].forEach.call(document.querySelectorAll('.rb-fenster'), function (fenster) {
    var innen = fenster.querySelector('.rb-innen');
    if (!innen) return;
    function skalieren() {
      /* Berechnete Breite statt clientWidth: die rundet auf ganze Pixel. */
      var breite = parseFloat(getComputedStyle(fenster).width);
      if (breite && innen.offsetWidth) {
        innen.style.transform = 'scale(' + breite / innen.offsetWidth + ')';
      }
    }
    skalieren();
    if (window.ResizeObserver) new ResizeObserver(skalieren).observe(fenster);
    else window.addEventListener('resize', skalieren, { passive: true });
  });

  var sims = [];
  [].forEach.call(document.querySelectorAll('[data-sim]'), function (sim) {
    var ablauf = ABLAEUFE[sim.getAttribute('data-sim')];
    var strecke = sim.querySelector('.sim-strecke');
    var buehne = sim.querySelector('.sim-buehne');
    var schirm = sim.querySelector('.app-schirm, .rb-schirm');
    if (!ablauf || !strecke || !buehne || !schirm) return;
    sims.push({
      sim: sim,
      ablauf: ablauf,
      strecke: strecke,
      buehne: buehne,
      schirm: schirm,
      takte: [].slice.call(sim.querySelectorAll('.sim-takte li')),
      extra: ablauf.einrichten ? ablauf.einrichten(sim) : null,
      letzterTakt: -1,
      letzterStand: ''
    });
  });
  if (!sims.length) return;

  /* Schaltet jemand die Bewegung während des Besuchs um, lädt die Seite neu:
     ein halb gespulter Zustand ohne Bewegung wäre schlechter als ein Neustart. */
  var ruhig = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (ruhig.addEventListener) {
    ruhig.addEventListener('change', function () { location.reload(); });
  }
  /* CSS zeigt dann den Endzustand; ebenso in der ruhigen Fassung bei wenig
     Höhe (Klasse im Kopf der Seite). */
  if (ruhig.matches || !wurzel.classList.contains('bewegt')) return;

  var schmutzig = false;
  var bestellt = false;

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
    for (var i = 0; i < sims.length; i++) stellen(sims[i]);
  }

  /* Liegt das nächste Kapitel mit negativem Rand über dem Ende der Strecke
     (styles.css „Decken“), gehört dieses Stück nicht mehr zum Ablauf: Die
     Simulation ist fertig, bevor sie überdeckt wird. */
  function deckung(sim) {
    var n = sim.nextElementSibling;
    if (!n) return 0;
    var m = parseFloat(getComputedStyle(n).marginTop);
    return m < 0 ? -m : 0;
  }

  function stellen(s) {
    var kasten = s.strecke.getBoundingClientRect();
    var fahrweg = kasten.height - s.buehne.offsetHeight - deckung(s.sim);
    var p = fahrweg > 0 ? -kasten.top / fahrweg : 1;
    if (p < 0) p = 0;
    if (p > 1) p = 1;

    s.sim.style.setProperty('--p', p.toFixed(4));

    /* Welcher Takt ist dran? Der letzte, dessen Schwelle überschritten ist. */
    var takte = s.ablauf.takte;
    var takt = 0;
    for (var i = 0; i < takte.length; i++) {
      if (p >= takte[i]) takt = i;
    }
    if (takt !== s.letzterTakt) {
      s.letzterTakt = takt;
      for (var j = 0; j < s.takte.length; j++) {
        s.takte[j].classList.toggle('ist-da', j === takt);
      }
    }

    /* Klassen im Telefon nur anfassen, wenn sich wirklich ein Schritt ändert. */
    var schritte = s.ablauf.schritte;
    var stand = '';
    for (var k = 0; k < schritte.length; k++) {
      stand += p >= schritte[k][1] && p < schritte[k][2] ? '1' : '0';
    }
    if (stand !== s.letzterStand) {
      s.letzterStand = stand;
      for (var m = 0; m < schritte.length; m++) {
        s.schirm.classList.toggle(schritte[m][0], stand.charAt(m) === '1');
      }
    }

    if (s.extra) s.extra(p);
  }

  /* Einmal sofort, damit vor dem ersten Scrollen nicht kurz der Endzustand steht. */
  schmutzig = true;
  rechnen();
})();
