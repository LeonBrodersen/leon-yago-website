/* Treiber der Simulationen (GingR und Rezeptbuch).

   Das Skript tut absichtlich wenig: Es rechnet für jede Simulation aus der
   Scrollposition eine Zahl zwischen 0 und 1, schreibt sie als --p an die
   Section, schaltet Klassen und zählt bei GingR zwei Uhren und ein paar Zahlen.
   Alles Sichtbare macht CSS. Gründe:
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

  /** 1350 → „1.350" oder „1,350": das Tausenderzeichen der Sprache steht im HTML. */
  function gruppiert(n, zeichen) {
    return String(n).replace(/\B(?=(\d{3})+$)/g, zeichen);
  }

  /** 3275 → „54 h 35 min", 45 → „45 min", 120 → „2 h" (formatSessionLength der App). */
  function dauerText(minuten) {
    var h = Math.floor(minuten / 60);
    var m = minuten % 60;
    if (h === 0) return m + ' min';
    return m === 0 ? h + ' h' : h + ' h ' + m + ' min';
  }

  var ABLAEUFE = {
    /* GingR. Drei Akte in drei Telefonen, die deckungsgleich übereinanderliegen:
       Home („Heute“), das laufende Workout, Analyse. Ab welchem p die sieben
       Takte links dran sind. */
    gingr: {
      /* Die Klassen hängen an der Figur um die drei Telefone, nicht an einem Bildschirm. */
      ziel: '.sim-stand',
      /* Die Woche auf Home lebt auf, während das Telefon hereinkommt (--a). */
      anfahrt: true,
      takte: [0, 0.19, 0.254, 0.391, 0.466, 0.582, 0.76],

      /* Was im Telefon passiert, in der Reihenfolge der App. Eine Klasse gilt von …
         bis unter …; die Bedeutung jeder Klasse steht in sim.css unter „Zustände".
           davor         Home. Die Woche lebt auf, während das Telefon hereinkommt
                         (sim.css rechnet das aus --a).
           0 bis 0,19    Der Screen rollt im Telefon bis zum Fortschritt (sim.css,
                         aus --p); dann ein Tipp auf die Leiste „Workout“ über
                         der Tab-Leiste.
           0,19 bis 0,72 Das laufende Workout (keypad.tsx, exercise-card.tsx,
                         rest-timer-bar.tsx): Keypad auf, „7" und „5", jede Taste
                         leuchtet kurz, übernehmen, Zeile abhaken, Pause.
           ab 0,72       Zurück: wieder Home, jetzt mit der Pause in der Leiste.
           ab 0,76       Der Tab Analyse: das Netz, dann rollt der Screen bis zur
                         Muskel-Heatmap.
         Das Goldlicht läuft ab 0,519 über 0,048 (sim.css, .app-licht) — beide
         Stellen zusammen ändern. */
      schritte: [
        ['sim-druck-leiste', 0.165, 0.19],
        ['sim-training', 0.19, 2],
        ['sim-offen', 0.254, 2],
        ['sim-7', 0.291, 2],
        ['sim-druck-7', 0.291, 0.307],
        ['sim-5', 0.333, 2],
        ['sim-druck-5', 0.333, 0.349],
        ['sim-uebernommen', 0.471, 2],
        ['sim-druck-haken', 0.508, 0.519],
        ['sim-bestaetigt', 0.519, 2],
        ['sim-pause', 0.582, 2],
        ['sim-druck-zurueck', 0.7, 0.72],
        ['sim-zurueck', 0.72, 2],
        ['sim-analyse', 0.76, 2]
      ],

      /* Die Pause beginnt bei 90 s (REST_SECONDS_DEFAULT) und läuft weiter, auch
         nachdem das Workout verlassen ist: die Leiste über der Tab-Leiste zeigt
         sie in Home und Analyse. Am Ende der Strecke steht sie bei 1:00; ein
         Standbild mit 0:00 läse sich wie abgelaufen. Die Dauer zählt dieselben
         30 Sekunden mit, von 18:42 bis 19:12. Beide Uhren stehen in allen drei
         Telefonen. Die Spur über der Pausenkarte rechnet sim.css aus denselben
         Zahlen (.app-pause-rest) — beide Stellen zusammen ändern.

         Zahlen, die hochzählen, tragen die Klasse .app-zaehl und ihre Angaben am
         Element: data-von, data-bis, data-ab und data-ueber (Fenster auf p),
         data-achse="a" (Fenster auf der Anfahrt statt auf p),
         data-tausender (das Zeichen der Sprache), data-form="dauer" für Minuten
         als „54 h 35 min“ (formatSessionLength der App, in beiden Sprachen
         gleich). Kurve wie in der App (easeOutCubic). So zählt das Volumen der
         Leiste mit dem Zeilen-Haken von 600 kg (Satz 1: 60 × 10) auf 1.350 kg
         (dazu Satz 2: 75 × 10). In der App zählen Zahlen auf dem
         Abschluss-Screen (900 ms) und in der Leiste des laufenden Workouts
         (400 ms) hoch; auf Home und Analyse ist das eine Zugabe dieser Seite,
         mit derselben Kurve. */
      einrichten: function (sim) {
        var pausen = [].slice.call(sim.querySelectorAll('.app-pause-zeit'));
        var dauern = [].slice.call(sim.querySelectorAll('.app-dauer'));
        var zaehler = [].map.call(sim.querySelectorAll('.app-zaehl'), function (el) {
          return {
            el: el,
            von: +el.getAttribute('data-von') || 0,
            bis: +el.getAttribute('data-bis') || 0,
            ab: +el.getAttribute('data-ab') || 0,
            ueber: +el.getAttribute('data-ueber') || 0.01,
            zeichen: el.getAttribute('data-tausender') || '',
            dauer: el.getAttribute('data-form') === 'dauer',
            anfahrt: el.getAttribute('data-achse') === 'a',
            letzter: null
          };
        });
        var PAUSE_AB = 0.582;
        var PAUSE_S = 90;
        var GELAUFEN_S = 30;
        var DAUER_START_S = 18 * 60 + 42;
        var letzteSekunde = -1;
        return function (p, a) {
          for (var i = 0; i < zaehler.length; i++) {
            var z = zaehler[i];
            var t = ((z.anfahrt ? a : p) - z.ab) / z.ueber;
            if (t < 0) t = 0;
            if (t > 1) t = 1;
            var wert = Math.round(z.von + (z.bis - z.von) * (1 - Math.pow(1 - t, 3)));
            if (wert !== z.letzter) {
              z.letzter = wert;
              z.el.textContent = z.dauer ? dauerText(wert) : gruppiert(wert, z.zeichen);
            }
          }

          var anteil = p <= PAUSE_AB ? 0 : (p - PAUSE_AB) / (1 - PAUSE_AB);
          var sekunde = Math.min(GELAUFEN_S, Math.floor(anteil * GELAUFEN_S));
          if (sekunde === letzteSekunde) return;
          letzteSekunde = sekunde;
          var rest = uhr(PAUSE_S - sekunde);
          var lauf = uhr(DAUER_START_S + sekunde);
          for (var j = 0; j < pausen.length; j++) pausen[j].textContent = rest;
          for (var k = 0; k < dauern.length; k++) dauern[k].textContent = lauf;
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
    if (!ablauf) return;
    var schirm = sim.querySelector(ablauf.ziel || '.rb-schirm');
    if (!strecke || !buehne || !schirm) return;
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

    /* Die Anfahrt: 0, wenn die Bühne unten in den Bildschirm kommt, 1, wenn sie
       steht. Was sich daran hängt, ist fertig, bevor der Ablauf beginnt. */
    var a = 1;
    if (s.ablauf.anfahrt) {
      a = 1 - kasten.top / window.innerHeight;
      if (a < 0) a = 0;
      if (a > 1) a = 1;
      s.sim.style.setProperty('--a', a.toFixed(4));
    }

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

    if (s.extra) s.extra(p, a);
  }

  /* Einmal sofort, damit vor dem ersten Scrollen nicht kurz der Endzustand steht. */
  schmutzig = true;
  rechnen();
})();
