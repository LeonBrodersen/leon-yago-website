/* buehne.js — die Bewegung der Startseite (Fassung „Bühne“, 27.09.2026).

   Was hier passiert, in der Reihenfolge der Seite:
     Auftakt     Beim ersten Besuch einer Sitzung startet das kleine Fenster in
                 der Überschrift bildschirmfüllend und schrumpft in die Zeile.
     Pille       Darin wechseln danach die eigenen Arbeiten.
     Band        Drei Zeilen großer Schrift laufen beim Scrollen gegeneinander.
     Werk        Die Bühne mit den Beispiel-Websites: wachsen, durchscrollen,
                 die nächste schiebt sich darüber.
     Aufziehen   Grüne und dunkle Fläche beginnen als Karte und ziehen auf.
     Leiste      Farbe nach dem Abschnitt darunter; weicht beim Runterscrollen aus.
     Zeiger      Über den Arbeiten eine Blase mit „Ansehen“.
     Magnet      Knöpfe folgen der Maus ein Stück.
     Wortmarke   Die Marke im Fuß füllt die Breite, Buchstaben steigen einzeln.

   Regeln, an denen die Ruhe hängt:
   - Bewegt wird nur über transform, opacity und clip-path. Nichts davon ändert
     das Layout; gemessen wird deshalb nur beim Laden und bei Größenänderung,
     beim Scrollen wird nur gerechnet und geschrieben.
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
  function wortmarkeEinpassen() {
    if (!wortmarke) return;
    var stil = getComputedStyle(wortmarke);
    var platz = wortmarke.clientWidth - parseFloat(stil.paddingLeft) - parseFloat(stil.paddingRight);
    wortmarke.style.fontSize = '';
    var probe = document.createElement('span');
    probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font:inherit;letter-spacing:inherit';
    probe.textContent = wortmarke.textContent;
    wortmarke.appendChild(probe);
    var breite = probe.getBoundingClientRect().width;
    wortmarke.removeChild(probe);
    if (breite > 0 && platz > 0) {
      wortmarke.style.fontSize = (parseFloat(stil.fontSize) * platz / breite * 0.995) + 'px';
    }
  }
  if (wortmarke && bewegt) {
    /* Buchstaben einzeln, damit sie nacheinander steigen. Der Text bleibt für
       die Einpassung derselbe; vorgelesen wird die Marke ohnehin nicht. */
    var zeichen = wortmarke.textContent;
    wortmarke.textContent = '';
    for (var zi = 0; zi < zeichen.length; zi++) {
      var sp = document.createElement('span');
      sp.textContent = zeichen.charAt(zi);
      sp.style.transitionDelay = (zi * 0.035) + 's';
      wortmarke.appendChild(sp);
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
    var erstesBild = pille.querySelector('.pille-bild img');
    var huelle = document.createElement('div');
    huelle.className = 'auftakt';
    huelle.setAttribute('aria-hidden', 'true');
    var bild = document.createElement('img');
    bild.alt = '';
    bild.src = erstesBild.currentSrc || erstesBild.src;
    huelle.appendChild(bild);
    wurzel.classList.add('auftakt-laeuft');
    document.body.appendChild(huelle);

    var fertig = false;
    function ende() {
      if (fertig) return;
      fertig = true;
      wurzel.classList.remove('auftakt-laeuft');
      if (huelle.parentNode) huelle.parentNode.removeChild(huelle);
      window.removeEventListener('scroll', abbrechen);
      pilleStarten();
    }
    var lauf = null;
    function abbrechen() { if (lauf) lauf.finish(); else ende(); kopfZeigen(0); }
    window.addEventListener('scroll', abbrechen, { passive: true });

    /* Erst wenn Schrift und Bild da sind, steht die Zeile an ihrem Platz. */
    var warten = [];
    if (document.fonts && document.fonts.ready) warten.push(document.fonts.ready);
    if (bild.decode) warten.push(bild.decode().catch(function () {}));
    var zeitlimit = new Promise(function (r) { setTimeout(r, 900); });
    Promise.race([Promise.all(warten), zeitlimit]).then(function () {
      if (fertig) return;
      var r = pille.getBoundingClientRect();
      var rund = getComputedStyle(pille).borderTopLeftRadius;
      lauf = huelle.animate([
        { top: '0px', left: '0px', width: window.innerWidth + 'px', height: window.innerHeight + 'px', borderRadius: '0px' },
        { top: r.top + 'px', left: r.left + 'px', width: r.width + 'px', height: r.height + 'px', borderRadius: rund }
      ], { duration: 1250, delay: 280, easing: 'cubic-bezier(0.76, 0, 0.24, 1)', fill: 'forwards' });
      lauf.onfinish = ende;
      kopfZeigen(280 + 650);
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
        heldTitel.style.transform = t > 0 ? 'translate3d(0,' + (y * 0.32).toFixed(1) + 'px,0)' : '';
        heldTitel.style.opacity = t > 0 ? (1 - t * 0.85).toFixed(3) : '';
      }
    });
  }

  /* ------------------------------------------------------------------ Band */
  var band = document.querySelector('.band');
  if (band) {
    var spuren = [].map.call(band.querySelectorAll('.band-zeile'), function (z) {
      return { spur: z.querySelector('.band-spur'), richtung: parseFloat(z.getAttribute('data-richtung')) || 1, gruppe: 0 };
    });
    var bandOben = 0, bandHoehe = 0;
    teile.push({
      messen: function () {
        bandOben = obenVon(band);
        bandHoehe = band.offsetHeight;
        spuren.forEach(function (s) { s.gruppe = s.spur.scrollWidth / 3; });
      },
      stellen: function (y, h) {
        var p = (y + h - bandOben) / (h + bandHoehe);
        if (p < -0.1 || p > 1.1) return;
        var weg = Math.min(breiteFenster * 0.5, 720);
        spuren.forEach(function (s) {
          var x = -s.gruppe * 0.5 + s.richtung * (p - 0.5) * weg;
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

    karten.forEach(function (k) { if (k.bild) k.bild.addEventListener('load', neuMessen); });

    teile.push({
      messen: function () {
        streckeOben = obenVon(strecke);
        buehneHoehe = buehne.offsetHeight;
        fahrweg = Math.max(1, strecke.offsetHeight - buehneHoehe);
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
          titel.style.opacity = (1 - anteil(p, 0.1, 0.2)).toFixed(3);
          titel.style.transform = 'translate3d(0,' + (-p * h * 0.25).toFixed(1) + 'px,0)';
        }
        var neuAktiv = p < 0.12 ? -1 : (p < 0.53 ? 0 : 1);
        if (neuAktiv !== aktiv) {
          aktiv = neuAktiv;
          karten.forEach(function (k, i) { k.text.classList.toggle('ist-da', i === aktiv); });
        }
      }
    });
  }

  /* ------------------------------------------------------------- Aufziehen */
  [].forEach.call(document.querySelectorAll('.werk, .kontakt'), function (flaeche) {
    var oben = 0;
    var letzter = -1;
    teile.push({
      messen: function () { oben = obenVon(flaeche); },
      stellen: function (y, h) {
        var t = klemmen((y + h - oben) / (h * 0.75), 0, 1);
        var auf = (1 - aus(t)).toFixed(3);
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
  teile.push({
    messen: function () {
      abschnitte.forEach(function (a) {
        a.oben = obenVon(a.el);
        a.unten = a.oben + a.el.offsetHeight;
        a.grund = getComputedStyle(a.el).backgroundColor;
        if (a.grund === 'rgba(0, 0, 0, 0)' || a.grund === 'transparent') a.grund = getComputedStyle(document.body).backgroundColor;
      });
    },
    stellen: function (y) {
      var mitte = y + 28;
      var treffer = null;
      for (var i = 0; i < abschnitte.length; i++) {
        if (mitte >= abschnitte[i].oben && mitte < abschnitte[i].unten) { treffer = abschnitte[i]; break; }
      }
      if (treffer && treffer !== tonJetzt) {
        tonJetzt = treffer;
        wurzel.classList.toggle('leiste-dunkel', treffer.dunkel);
        if (farbe && treffer.grund) farbe.setAttribute('content', treffer.grund);
      }
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
