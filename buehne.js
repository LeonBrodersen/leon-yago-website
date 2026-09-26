/* buehne.js — die Bewegung der Startseite (Fassung „Bühne“, 26.09.2026).

   Was hier passiert, in der Reihenfolge der Seite:
     Auftakt     Wer von außen kommt, sieht eine dunkle Fläche, die in das
                 kleine Fenster der Überschrift schrumpft; dann blendet das
                 erste Bild darin auf.
     Pille       Darin wechseln danach drei Web-Arbeiten.
     Band        Drei Zeilen großer Schrift laufen beim Scrollen gegeneinander;
                 jede zeigt eine ganze Aussage, von Anfang bis Ende.
     Werk        Die Bühne mit den Beispiel-Websites: wachsen, durchscrollen,
                 die nächste schiebt sich darüber.
     Decken      Das nächste Kapitel schiebt sich über die stehende Bühne des
                 vorigen, das dabei kleiner und dunkler wird.
     Aufziehen   Grüne und dunkle Fläche beginnen als Karte und ziehen auf.
     Leiste      Farbe nach dem Abschnitt darunter; weicht beim Runterscrollen
                 aus. Der Knopf „Erstgespräch“ bleibt am Computer stehen.
     Zeiger      Über den Arbeiten eine Blase mit „Ansehen“.
     Magnet      Knöpfe folgen der Maus ein Stück.
     Wortmarke   Die Marke im Fuß füllt die Breite, Buchstaben steigen einzeln.

   Regeln, an denen die Ruhe hängt:
   - Bewegt wird nur über transform, opacity und clip-path. Nichts davon ändert
     das Layout; gemessen wird deshalb nur beim Laden und bei Größenänderung,
     beim Scrollen wird nur gerechnet und geschrieben. Ausnahme ist der
     Auftakt: ein festes Element über allem, das Lage und Größe animiert.
   - Ein Takt pro Bild. Mit Lenis (weiches Scrollen, nur mit Maus) hängt er an
     dessen Scroll-Ereignis, sonst am nativen Scrollen per requestAnimationFrame.
   - Ohne „bewegt“ (reduzierte Bewegung) tut das Skript fast nichts: Die Seite
     steht fertig da, nur die Wortmarke wird eingepasst. */
(function () {
  'use strict';

  var wurzel = document.documentElement;
  var bewegt = wurzel.classList.contains('bewegt');
  var maus = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function klemmen(w, a, b) { return w < a ? a : w > b ? b : w; }
  function anteil(p, a, b) { return klemmen((p - a) / (b - a), 0, 1); }
  function mischen(a, b, t) { return a + (b - a) * t; }
  function inAus(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function aus(t) { return 1 - Math.pow(1 - t, 3); }
  function weich(t) { return -(Math.cos(Math.PI * t) - 1) / 2; }

  /* ------------------------------------------------------------ Wortmarke */
  /* Läuft immer, auch ohne Bewegung: Die Schrift soll die Breite füllen. */
  var wortmarke = document.querySelector('.wortmarke');
  var wortmarkeInnen = null;
  if (wortmarke) {
    /* Ein innerer Kasten trägt den Text; gemessen wird er selbst, nicht eine
       Probe daneben: Einzeln gesetzte Buchstaben verlieren ihre Unterschneidung
       und werden breiter als der Probetext. */
    wortmarkeInnen = document.createElement('span');
    wortmarkeInnen.className = 'wortmarke-innen';
    while (wortmarke.firstChild) wortmarkeInnen.appendChild(wortmarke.firstChild);
    wortmarke.appendChild(wortmarkeInnen);
  }
  function wortmarkeEinpassen() {
    if (!wortmarke) return;
    var stil = getComputedStyle(wortmarke);
    var platz = wortmarke.clientWidth - parseFloat(stil.paddingLeft) - parseFloat(stil.paddingRight);
    for (var runde = 0; runde < 2; runde++) {
      var breite = wortmarkeInnen.getBoundingClientRect().width;
      if (!(breite > 0 && platz > 0)) return;
      var groesse = parseFloat(getComputedStyle(wortmarke).fontSize);
      wortmarke.style.fontSize = (groesse * platz / breite * 0.998).toFixed(2) + 'px';
    }
  }
  if (wortmarke && bewegt) {
    /* Buchstaben einzeln, damit sie nacheinander steigen. Der Text bleibt für
       die Einpassung derselbe; vorgelesen wird die Marke ohnehin nicht. */
    var zeichen = wortmarkeInnen.textContent;
    wortmarkeInnen.textContent = '';
    for (var zi = 0; zi < zeichen.length; zi++) {
      var sp = document.createElement('span');
      sp.textContent = zeichen.charAt(zi);
      sp.style.transitionDelay = (zi * 0.035) + 's';
      wortmarkeInnen.appendChild(sp);
    }
  }
  wortmarkeEinpassen();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(wortmarkeEinpassen);

  if (!bewegt) {
    window.addEventListener('resize', wortmarkeEinpassen, { passive: true });
    return;
  }

  /* ---------------------------------------------------------------- Lenis */
  var lenis = null;
  if (maus && window.Lenis) {
    try {
      lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 0.95, autoRaf: true });
    } catch (e) { lenis = null; }
  }

  /* Sprünge innerhalb der Seite laufen mit Lenis weich. Danach bekommt das
     Ziel den Fokus, wie beim normalen Sprung, damit Tab dort weitergeht. */
  if (lenis) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || a.classList.contains('skip') || e.defaultPrevented) return;
      var ziel = a.getAttribute('href');
      if (ziel.length < 2) return;
      var el = document.getElementById(ziel.slice(1));
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, {
        duration: 1.5,
        easing: function (t) { return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2; },
        onComplete: function () {
          if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
          el.focus({ preventScroll: true });
        }
      });
      if (history.pushState) history.pushState(null, '', ziel);
    });
  }

  /* ----------------------------------------------------- Takt und Messen */
  var teile = [];     // { messen(), stellen(y, h) }
  var hoehe = window.innerHeight;
  var breiteFenster = window.innerWidth;

  function obenVon(el) { return el.getBoundingClientRect().top + window.scrollY; }
  /* Wie weit das folgende Kapitel die Strecke davor überdeckt (negativer Rand). */
  function deckungVon(el) {
    if (!el) return 0;
    var m = parseFloat(getComputedStyle(el).marginTop);
    return m < 0 ? -m : 0;
  }

  function allesMessen() {
    hoehe = window.innerHeight;
    breiteFenster = window.innerWidth;
    for (var i = 0; i < teile.length; i++) if (teile[i].messen) teile[i].messen();
  }
  function takt() {
    var y = window.scrollY;
    for (var i = 0; i < teile.length; i++) teile[i].stellen(y, hoehe);
  }
  var bestellt = false;
  function bestellen() {
    if (bestellt) return;
    bestellt = true;
    requestAnimationFrame(function () { bestellt = false; takt(); });
  }
  var neuMessenBestellt = false;
  function neuMessen() {
    if (neuMessenBestellt) return;
    neuMessenBestellt = true;
    requestAnimationFrame(function () {
      neuMessenBestellt = false;
      wortmarkeEinpassen();
      allesMessen();
      takt();
    });
  }

  /* ------------------------------------------------------------ Enthüllen */
  var sichtbar = null;
  if ('IntersectionObserver' in window) {
    sichtbar = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('ist-da');
          sichtbar.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
  }
  function beobachten(el) {
    if (sichtbar) sichtbar.observe(el);
    else el.classList.add('ist-da');
  }
  [].forEach.call(document.querySelectorAll('[data-enthuellen], [data-auftauchen], .wortmarke'), function (el) {
    if (el.closest('.held')) return; // Der Kopf startet über den Auftakt.
    beobachten(el);
  });

  /* Wer mit der Tastatur hinspringt, soll nicht auf ein noch verborgenes
     Element blicken: beim Fokus sofort zeigen. */
  document.addEventListener('focusin', function (e) {
    var el = e.target.closest && e.target.closest('[data-auftauchen], [data-enthuellen]');
    if (el) el.classList.add('ist-da');
  });

  /* ------------------------------------------------------ Auftakt und Pille */
  var heldTitel = document.querySelector('.held-titel');
  var heldFuss = document.querySelector('.held-fuss');
  var pille = document.querySelector('.pille');

  function kopfZeigen(verzoegerung) {
    setTimeout(function () {
      if (heldTitel) heldTitel.classList.add('ist-da');
      wurzel.classList.add('ist-gestartet');
    }, verzoegerung);
    setTimeout(function () { if (heldFuss) heldFuss.classList.add('ist-da'); }, verzoegerung + 260);
  }

  var pillenLauf = null;
  function pilleStarten() {
    if (!pille || pillenLauf) return;
    var bilder = pille.querySelectorAll('.pille-bild');
    if (bilder.length < 2) return;
    var jetzt = 0;
    var imBild = true;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { imBild = e[0].isIntersecting; }).observe(pille);
    }
    pillenLauf = setInterval(function () {
      if (!imBild || document.hidden) return;
      var alt = bilder[jetzt];
      jetzt = (jetzt + 1) % bilder.length;
      var neu = bilder[jetzt];
      neu.classList.add('kommt', 'vorher');
      void neu.offsetWidth; // Startlage übernehmen, bevor der Übergang läuft.
      neu.classList.remove('vorher');
      setTimeout(function () {
        alt.classList.remove('ist-da');
        neu.classList.add('ist-da');
        neu.classList.remove('kommt');
      }, 1150);
    }, 2800);
  }

  function auftakt() {
    /* Eine Fläche in Tinte, kein Bild: Der erste Eindruck soll die eigene
       Schrift sein, nicht die Seite einer erfundenen Praxis. */
    var huelle = document.createElement('div');
    huelle.className = 'auftakt';
    huelle.setAttribute('aria-hidden', 'true');
    wurzel.classList.add('auftakt-laeuft');
    document.body.appendChild(huelle);

    var fertig = false;
    function ende() {
      if (fertig) return;
      fertig = true;
      wurzel.classList.remove('auftakt-laeuft');
      if (huelle.parentNode) huelle.parentNode.removeChild(huelle);
      window.removeEventListener('scroll', abbrechen);
      pille.classList.add('blendet-ein');
      setTimeout(pilleStarten, 900);
    }
    var lauf = null;
    function abbrechen() { if (lauf) lauf.finish(); else ende(); kopfZeigen(0); }
    window.addEventListener('scroll', abbrechen, { passive: true });

    /* Erst wenn die Schrift da ist, steht die Zeile an ihrem Platz. */
    var warten = [];
    if (document.fonts && document.fonts.ready) warten.push(document.fonts.ready);
    var zeitlimit = new Promise(function (r) { setTimeout(r, 700); });
    Promise.race([Promise.all(warten), zeitlimit]).then(function () {
      if (fertig) return;
      var r = pille.getBoundingClientRect();
      var rund = getComputedStyle(pille).borderTopLeftRadius;
      lauf = huelle.animate([
        { top: '0px', left: '0px', width: window.innerWidth + 'px', height: window.innerHeight + 'px', borderRadius: '0px' },
        { top: r.top + 'px', left: r.left + 'px', width: r.width + 'px', height: r.height + 'px', borderRadius: rund }
      ], { duration: 1200, delay: 120, easing: 'cubic-bezier(0.76, 0, 0.24, 1)', fill: 'forwards' });
      lauf.onfinish = ende;
      kopfZeigen(120 + 600);
    });
  }

  /* Der Auftakt läuft nur, wenn man von außen kommt: nicht beim Neuladen,
     nicht beim Zurückblättern, nicht beim Weg von einer eigenen Unterseite.
     Gemerkt wird dafür nichts; die Seite speichert nichts auf dem Gerät. */
  var ersterBesuch = true;
  try {
    var nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
    if (nav && nav.type && nav.type !== 'navigate') ersterBesuch = false;
    if (document.referrer && new URL(document.referrer).origin === location.origin) ersterBesuch = false;
  } catch (e) {}
  var ganzOben = window.scrollY < 30 && !location.hash;
  if (pille && ersterBesuch && ganzOben && Element.prototype.animate) {
    auftakt();
  } else {
    kopfZeigen(60);
    setTimeout(pilleStarten, 1400);
  }

  /* ------------------------------------------------------ Kopf beim Gehen */
  /* Beim Wegscrollen bleibt die Überschrift ein wenig zurück und wird leiser:
     Tiefe ohne Bild. Nur solange der Kopf zu sehen ist. */
  var held = document.querySelector('.held');
  if (held && heldTitel) {
    var heldHoehe = 1;
    teile.push({
      messen: function () { heldHoehe = held.offsetHeight || 1; },
      stellen: function (y) {
        if (y > heldHoehe * 1.2) return;
        var t = klemmen(y / heldHoehe, 0, 1);
        /* Am Handy steht das Fenster unter der Zeile; verschoben läge es über
           dem Absatz darunter (gemessen bis 134 px). Dort nur ausblenden. */
        var schieben = breiteFenster > 700 && t > 0;
        heldTitel.style.transform = schieben ? 'translate3d(0,' + (y * 0.32).toFixed(1) + 'px,0)' : '';
        heldTitel.style.opacity = t > 0 ? (1 - t * (schieben ? 0.85 : 0.6)).toFixed(3) : '';
      }
    });
  }

  /* ------------------------------------------------------------------ Band */
  var band = document.querySelector('.band');
  if (band) {
    var spuren = [].map.call(band.querySelectorAll('.band-zeile'), function (z) {
      return { spur: z.querySelector('.band-spur'), richtung: parseFloat(z.getAttribute('data-richtung')) || 1, gruppe: 0 };
    });
    var bandOben = 0, bandHoehe = 0, rand = 0;
    teile.push({
      messen: function () {
        bandOben = obenVon(band);
        bandHoehe = band.offsetHeight;
        var probe = document.createElement('div');
        probe.style.cssText = 'position:absolute;visibility:hidden;width:var(--pad)';
        document.body.appendChild(probe);
        rand = probe.offsetWidth;
        document.body.removeChild(probe);
        spuren.forEach(function (s) {
          s.gruppe = s.spur.scrollWidth / 3;
          /* So weit, dass die Aussage einmal ganz durchläuft, mindestens aber
             ein halber Bildschirm Bewegung. */
          s.weg = Math.max(breiteFenster * 0.5, s.gruppe - breiteFenster + 2 * rand);
        });
      },
      stellen: function (y, h) {
        var roh = (y + h - bandOben) / (h + bandHoehe);
        if (roh < -0.1 || roh > 1.1) return;
        var p = anteil(roh, 0.12, 0.88);
        spuren.forEach(function (s) {
          /* Die zweite Kopie steht zu Beginn am linken Rand; nach links laufende
             Zeilen zeigen am Anfang den Anfang der Aussage, die andere das Ende. */
          var t = s.richtung < 0 ? p : 1 - p;
          var x = rand - s.gruppe - s.weg * t;
          s.spur.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0)';
        });
      }
    });
  }

  /* ------------------------------------------------------------------ Werk */
  var werk = document.querySelector('.werk');
  if (werk) {
    var strecke = werk.querySelector('.werk-strecke');
    var buehne = werk.querySelector('.werk-buehne');
    var titel = werk.querySelector('.werk-titel');
    var karten = [].map.call(werk.querySelectorAll('.werk-karte'), function (k) {
      return {
        fenster: k.querySelector('.fenster'),
        bildRahmen: k.querySelector('.fenster-bild'),
        bild: k.querySelector('.fenster-bild img'),
        text: k.querySelector('.werk-text'),
        weg: 0
      };
    });
    var streckeOben = 0, fahrweg = 1, buehneHoehe = 1;
    var aktiv = -1;
    var naechstes = werk.nextElementSibling;

    karten.forEach(function (k) { if (k.bild) k.bild.addEventListener('load', neuMessen); });

    teile.push({
      messen: function () {
        streckeOben = obenVon(strecke);
        buehneHoehe = buehne.offsetHeight;
        fahrweg = Math.max(1, strecke.offsetHeight - buehneHoehe - deckungVon(naechstes));
        karten.forEach(function (k) {
          k.weg = Math.max(0, (k.bild ? k.bild.offsetHeight : 0) - k.bildRahmen.clientHeight);
        });
      },
      stellen: function (y, h) {
        var p = (y - streckeOben) / fahrweg;
        if (p < -0.6 || p > 1.3) return;
        p = klemmen(p, 0, 1);
        /* Beim Hineinscrollen (vor p = 0) wächst das erste Fenster schon ein
           Stück, damit die Bühne nicht leer ankommt: der Anfang zählt ab dem
           Moment, in dem die grüne Fläche den halben Bildschirm füllt. */
        var vorlauf = klemmen(1 + (y - streckeOben) / (h * 0.5), 0, 1);

        var a = karten[0], b = karten[1];
        var wachsen = inAus(anteil(p, 0, 0.2));
        var rollenA = weich(anteil(p, 0.2, 0.46));
        var drueber = inAus(anteil(p, 0.46, 0.6));
        var rollenB = weich(anteil(p, 0.6, 0.9));

        if (a) {
          var s = mischen(0.5, 1, wachsen) * mischen(0.9, 1, vorlauf);
          var ty = mischen(h * 0.16, 0, wachsen) - drueber * h * 0.03;
          s *= mischen(1, 0.92, drueber);
          a.fenster.style.transform = 'translate3d(0,' + ty.toFixed(1) + 'px,0) scale(' + s.toFixed(4) + ')';
          a.fenster.style.setProperty('--dunkel', (drueber * 0.5).toFixed(3));
          a.bild.style.transform = 'translate3d(0,' + (-a.weg * rollenA).toFixed(1) + 'px,0)';
        }
        if (b) {
          b.fenster.style.transform = 'translate3d(0,' + (mischen(h, 0, drueber)).toFixed(1) + 'px,0)';
          b.bild.style.transform = 'translate3d(0,' + (-b.weg * rollenB).toFixed(1) + 'px,0)';
        }
        if (titel) {
          titel.style.opacity = (1 - anteil(p, 0, 0.08)).toFixed(3);
          titel.style.transform = 'translate3d(0,' + (-p * h * 0.25).toFixed(1) + 'px,0)';
        }
        /* Beschriftung erst, wenn das Fenster ausgewachsen ist; vorher läge sie
           unter seiner Kante. */
        var neuAktiv = p < 0.2 ? -1 : (p < 0.53 ? 0 : 1);
        if (neuAktiv !== aktiv) {
          aktiv = neuAktiv;
          karten.forEach(function (k, i) { k.text.classList.toggle('ist-da', i === aktiv); });
        }
      }
    });
  }

  /* ---------------------------------------------------------------- Decken */
  /* Die Bühne davor steht noch, während das nächste Kapitel (mit negativem
     Rand, styles.css „Decken“) darübergleitet: Sie wird bis 94 % kleiner und
     dunkelt flach ab, die runden Ecken des neuen Kapitels werden gerade. */
  [['.werk', '.werk-strecke', '.werk-buehne'], ['#gingr', '.sim-strecke', '.sim-buehne'], ['#rezeptbuch', '.sim-strecke', '.sim-buehne']].forEach(function (d) {
    var vorher = document.querySelector(d[0]);
    if (!vorher) return;
    var dStrecke = vorher.querySelector(d[1]);
    var dBuehne = vorher.querySelector(d[2]);
    var danach = vorher.nextElementSibling;
    if (!dStrecke || !dBuehne || !danach) return;
    var ab = 0, lang = 0, letzterT = -1;
    teile.push({
      messen: function () {
        lang = deckungVon(danach);
        ab = obenVon(dStrecke) + dStrecke.offsetHeight - dBuehne.offsetHeight - lang;
      },
      stellen: function (y) {
        if (!lang) return;
        var t = klemmen((y - ab) / lang, 0, 1);
        var gerundet = Math.round(t * 1000) / 1000;
        if (gerundet === letzterT) return;
        letzterT = gerundet;
        var e = inAus(t);
        dBuehne.style.transform = t > 0 ? 'scale(' + mischen(1, 0.94, e).toFixed(4) + ')' : '';
        vorher.style.setProperty('--decke', (0.45 * t).toFixed(3));
        danach.style.setProperty('--rund', mischen(28, 0, e).toFixed(1) + 'px');
      }
    });
  });

  /* ------------------------------------------------------------- Aufziehen */
  /* Die Karte bleibt sichtbar rund, bis ihre Kante das obere Drittel erreicht. */
  [].forEach.call(document.querySelectorAll('.werk, .kontakt'), function (flaeche) {
    var oben = 0;
    var letzter = -1;
    teile.push({
      messen: function () { oben = obenVon(flaeche); },
      stellen: function (y, h) {
        var t = klemmen((y + h - oben) / h, 0, 1);
        var auf = (1 - weich(t)).toFixed(3);
        if (auf === letzter) return;
        letzter = auf;
        flaeche.style.setProperty('--auf', auf);
      }
    });
  });

  /* ---------------------------------------------------------------- Leiste */
  var farbe = document.querySelector('meta[name="theme-color"]');
  var abschnitte = [].map.call(document.querySelectorAll('[data-ton]'), function (el) {
    return { el: el, dunkel: el.getAttribute('data-ton') === 'dunkel', oben: 0, unten: 0, grund: '' };
  });
  var letzteY = window.scrollY;
  var tonJetzt = null;
  var knopfJetzt = null, knopfAb = 0, kontaktOben = 0;
  var kontakt = document.querySelector('.kontakt');
  teile.push({
    messen: function () {
      var kopf = document.querySelector('.held');
      knopfAb = -1;
      kontaktOben = kontakt ? obenVon(kontakt) : 0;
      abschnitte.forEach(function (a) {
        a.oben = obenVon(a.el);
        a.unten = a.oben + a.el.offsetHeight;
        a.grund = getComputedStyle(a.el).backgroundColor;
        if (a.grund === 'rgba(0, 0, 0, 0)' || a.grund === 'transparent') a.grund = getComputedStyle(document.body).backgroundColor;
      });
    },
    stellen: function (y, h) {
      var mitte = y + 28;
      var treffer = null;
      /* Kapitel überlappen sich beim Decken; oben liegt das spätere. */
      for (var i = 0; i < abschnitte.length; i++) {
        if (mitte >= abschnitte[i].oben && mitte < abschnitte[i].unten) treffer = abschnitte[i];
      }
      if (treffer && treffer !== tonJetzt) {
        tonJetzt = treffer;
        wurzel.classList.toggle('leiste-dunkel', treffer.dunkel);
        if (farbe && treffer.grund) farbe.setAttribute('content', treffer.grund);
      }
      var knopfAn = y > knopfAb && !(kontaktOben && y + h * 0.5 > kontaktOben);
      if (knopfAn !== knopfJetzt) { knopfJetzt = knopfAn; wurzel.classList.toggle('knopf-an', knopfAn); }
      var d = y - letzteY;
      if (y < 160 || d < -6) wurzel.classList.remove('leiste-weg');
      else if (d > 6) wurzel.classList.add('leiste-weg');
      if (Math.abs(d) > 6 || y < 160) letzteY = y;
    }
  });

  /* ---------------------------------------------------------------- Zeiger */
  var zeiger = null, zeigerText = null;
  var mx = -1, my = -1, zx = 0, zy = 0, folgtGerade = false, zeigerZiel = null;
  function zeigerPruefen(ziel) {
    var z = ziel && ziel.closest ? ziel.closest('[data-zeiger]') : null;
    if (z === zeigerZiel) return;
    zeigerZiel = z;
    zeiger.classList.toggle('ist-gross', !!z);
    if (z) zeigerText.textContent = z.getAttribute('data-zeiger');
  }
  function folgen() {
    zx += (mx - zx) * 0.2;
    zy += (my - zy) * 0.2;
    zeiger.style.transform = 'translate3d(' + zx.toFixed(1) + 'px,' + zy.toFixed(1) + 'px,0)';
    if (Math.abs(mx - zx) + Math.abs(my - zy) > 0.2) requestAnimationFrame(folgen);
    else folgtGerade = false;
  }
  if (maus) {
    zeiger = document.createElement('div');
    zeiger.className = 'zeiger';
    zeiger.setAttribute('aria-hidden', 'true');
    zeiger.innerHTML = '<div class="zeiger-kreis"><span></span></div>';
    zeigerText = zeiger.querySelector('span');
    document.body.appendChild(zeiger);
    document.addEventListener('pointermove', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      if (mx < 0) { zx = e.clientX; zy = e.clientY; }
      mx = e.clientX; my = e.clientY;
      zeiger.classList.add('ist-an');
      zeigerPruefen(e.target);
      if (!folgtGerade) { folgtGerade = true; requestAnimationFrame(folgen); }
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', function () { zeiger.classList.remove('ist-an'); });
    /* Beim Scrollen wandert die Seite unter der ruhenden Maus: neu nachsehen. */
    teile.push({
      stellen: function () {
        if (mx < 0) return;
        zeigerPruefen(document.elementFromPoint(mx, my));
      }
    });
  }

  /* ---------------------------------------------------------------- Magnet */
  if (maus) {
    [].forEach.call(document.querySelectorAll('[data-magnet]'), function (el) {
      el.addEventListener('pointermove', function (e) {
        if (el.disabled) return;
        var r = el.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2);
        var dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = 'translate3d(' + (dx * 0.2).toFixed(1) + 'px,' + (dy * 0.32).toFixed(1) + 'px,0)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  /* ------------------------------------------------------------ Anwerfen */
  if (lenis) lenis.on('scroll', takt);
  else window.addEventListener('scroll', bestellen, { passive: true });
  window.addEventListener('resize', neuMessen, { passive: true });
  window.addEventListener('load', neuMessen);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(neuMessen);
  if (window.ResizeObserver) new ResizeObserver(neuMessen).observe(document.body);
  allesMessen();
  takt();
})();
