# ly-webstudio.de

Die Website der ly-webstudio UG (haftungsbeschränkt). Statisches HTML, **kein Build, kein Framework,
keine Abhängigkeiten von außen** (die eine Bibliothek, Lenis, liegt als Datei im Repo). Wer eine Datei
ändert und pusht, hat die Änderung online.

```bash
# Ansehen: irgendein Dateiserver auf dem Repo-Ordner
python3 -m http.server 8000
# dann http://localhost:8000/ öffnen
```

## Wie es online geht

GitHub Pages liefert den Inhalt von `main` aus (klassischer Pages-Build, kein Actions-Workflow), die
Domain steht in `CNAME`. **Ein Push auf `main` ist nach etwa 30 Sekunden live**, es gibt keine CI und
keinen Schutz davor. Deshalb: arbeiten auf einem Zweig, per Pull Request mergen.

## Was wo liegt

| Datei / Ordner | Inhalt |
| --- | --- |
| `index.html` | die deutsche Startseite, alles auf einer Seite |
| `en/index.html` | die englische Fassung als eigene Datei (kein Sprachumschalter im Browser) |
| `styles.css` | das Blatt für beide Startseiten („Bühne“, seit 26.09.2026); die Farben stehen als Variablen in `:root`, mit gerechneten Kontrasten im Kommentar darüber |
| `buehne.js` | die Bewegung der Startseite: Auftakt, Fenster in der Überschrift, Schriftband, Website-Bühne, Decken und Aufziehen zwischen den Kapiteln, Leiste, Zeiger. Ohne JavaScript und bei „Bewegung reduzieren“ steht alles fertig da |
| `assets/vendor/lenis.min.js` | [Lenis](https://github.com/darkroomengineering/lenis) 1.3.26 (weiches Scrollen, nur mit Maus), MIT, Lizenztext in `assets/vendor/LICENSE-lenis.txt` |
| `script.js` | das Kontaktformular. Die Seite ist ohne JavaScript vollständig lesbar |
| `sim.js` | treibt beide Scroll-Simulationen: rechnet aus der Scrollposition eine Zahl `--p` und schaltet Klassen. Welcher Ablauf, sagt `data-sim` an der Section (`gingr`, `rezept`) |
| `sim.css` | GingR im Telefon, in den Farben und Maßen der App (Stand: ihr Neudesign vom 04.10.2026); dazu das gemeinsame Gerüst beider Simulationen. Siehe unten „Das GingR-Telefon“ |
| `rezept.css` | das Rezeptbuch (ourkitchenbook.com) im Browserfenster auf Stein, Inhalt in App-Pixeln gebaut und auf die Fensterbreite skaliert, „Kamera“ je Schritt |
| `beispiel-zahnarzt/`, `beispiel-cafe/` | erfundene Beispiel-Websites, in sich geschlossen, `noindex`. Die englischen Fassungen für `/en/` liegen unter `en/example-dentist/` und `en/example-cafe/`, mit demselben CSS; wer eine Fassung ändert, ändert die andere mit und nimmt die Bilder neu auf |
| `impressum.html`, `datenschutz.html`, `agb.html`, `widerruf.html` | Rechtstexte, eigenes Blatt `legal.css`, ohne JavaScript |
| `404.html` | Fehlerseite, benutzt ebenfalls `legal.css` |
| `og-vorlage.html` | Quelle des Teilen-Bildes `og-image.jpg`, `noindex`, nirgends verlinkt |
| `fonts/` | Inter als woff2, selbst ausgeliefert, dazu Inter Display 700 (der Schnitt für große Größen) für alle Titel, dazu Geist und Newsreader für das Rezeptbuch (aus dessen Build, auf Latein und die benutzten Gewichte gekürzt, je 13 KB). **Keine Schriften von fremden Servern** |
| `assets/img/` | `gingr-*.svg` (die Körperfiguren der GingR-Telefone, siehe unten), dazu Porträt und Bildschirmfotos als webp: `pille-*` für das Fenster in der Überschrift (Computer 1320 × 400, Handy 1040 × 650), `beispiel-*-lang-1344/2688` für die Website-Bühne (einfache und doppelte Pixeldichte), `beispiel-*-handy-lang` fürs Handy; die Bilder mit `-en-` im Namen zeigen die englischen Beispielseiten und stehen nur in `en/index.html` |
| `favicon/` | Symbole und `site.webmanifest` |

## Zwei Regeln, die die Seite überall einhält

1. **Keine Anfrage an Dritte beim Laden.** Keine Schriften von Google, kein CDN, keine eingebettete
   Karte, keine Analyse. Das behauptet die Datenschutzerklärung in Abschnitt 7, also muss es stimmen.
   Prüfbar mit `weigh.mjs` (siehe unten): `fremdeHosts` muss `[]` sein.
2. **Keine Emoji als Symbole.** Die drei alten Beispielseiten unter `demos/` sind im September 2026
   gelöscht worden, weil sie zusammen 85 Emoji enthielten und dadurch nach Bausatz aussahen.

## Kontaktformular

Der Versand läuft über die REST-Schnittstelle von [EmailJS](https://www.emailjs.com/docs/rest-api/send-form/),
ohne deren Skript von einem Fremd-CDN. Dienst-, Vorlagen- und öffentlicher Schlüssel stehen offen in
`script.js` — das ist bei EmailJS so vorgesehen. Wohin die Nachricht zugestellt wird, steht nur im
EmailJS-Dashboard im Feld „To Email“ der Vorlage.

Der Sendeknopf liegt im HTML **gesperrt** aus und wird erst von `script.js` freigegeben. Läuft das
Skript nicht, bleibt der Knopf gesperrt und der Hinweis daneben sichtbar, der E-Mail-Adresse und
Telefonnummer nennt. Die Meldungstexte stehen als `data-sendet`, `data-gut` und `data-schlecht` am
Element `#form-stand` im HTML, deshalb trägt dieselbe Skriptdatei die deutsche und die englische Seite.

Im Formular steckt ein unsichtbares Feld namens `website`. Ist es gefüllt, war ein Roboter am Werk:
die Bestätigung sieht dann normal aus, gesendet wird nichts.

## Zwei Sprachen

Deutsch liegt auf `/`, Englisch auf `/en/`. Beide Seiten verweisen mit `hreflang` gegenseitig
aufeinander und auf sich selbst als `canonical`, und beide stehen mit `xhtml:link`-Blöcken in
`sitemap.xml`. Wer eine Aussage auf einer Seite ändert, muss sie auf der anderen mitändern — es gibt
kein gemeinsames Wörterbuch mehr, das das erzwingt.

## Nach jeder Änderung an CSS oder JavaScript: Versionsnummer hochsetzen

GitHub Pages schickt jede Datei mit `Cache-Control: max-age=600`. Wer die Seite in den zehn Minuten vor
einem Update besucht hat, bekommt danach das neue HTML, aber sein Browser nimmt `styles.css` ungefragt
aus dem Cache. Am 14.09.2026 stand die neue Startseite deshalb bei Leon ohne Gestaltung da (neues
HTML, altes Stylesheet). Darum hängt an jedem Verweis auf `styles.css`, `sim.css`, `rezept.css`, `buehne.js`, `sim.js`,
`script.js`, `assets/vendor/lenis.min.js` und `legal.css` ein `?v=JJJJMMTT`. **Wer eine dieser Dateien
ändert, setzt das Datum in allen HTML-Dateien neu**, sonst kommt derselbe Fehler wieder. Zwei
Änderungen am selben Tag: `-2`, `-3` anhängen (`?v=20260926-2`).

```bash
grep -rl '?v=' --include='*.html' . | xargs sed -i '' -E 's/\?v=[0-9]+(-[0-9]+)?/?v=JJJJMMTT/g'
```

## Gemessene Zahlen im Code

Kommentare nennen gemessene oder gerechnete Werte (Kontraste in `styles.css`, Größen). **Wer Farben,
Schriften oder Abschnitte ändert, rechnet sie neu**, sonst steht dort eine Unwahrheit.

## Das GingR-Telefon

Das Telefon im Abschnitt `#gingr` ist kein Bildschirmfoto, sondern die App, von Hand nachgebaut: Markup
in `index.html` und `en/index.html`, Maße und Farben in `sim.css`, Ablauf in `sim.js`. **Ändert sich die
App, stimmt es nicht mehr und muss nachgezogen werden.** Stand ist das Neudesign der App vom 04.10.2026.

Es sind **drei Telefone**, eines je Ort in der App: Home („Heute“), das laufende Workout, Analyse. Bewegt
liegen sie deckungsgleich übereinander, zu sehen ist das, in dem die Geschichte gerade spielt. Ohne
JavaScript, mit „Bewegung reduzieren“ und in der ruhigen Fassung stehen alle drei nebeneinander.

* **Quelle** ist das Repo GymApp. Home: `src/app/(tabs)/index.tsx` und `src/components/home/`. Workout:
  `src/app/workout/active.tsx` und `src/components/workout/`. Analyse: `src/app/(tabs)/analytics.tsx`,
  `src/components/analytics/`, `src/components/charts/radar-chart.tsx`. Leiste und Tab-Leiste:
  `src/components/workout/active-workout-bar.tsx`, `src/app/(tabs)/_layout.tsx`. Zeichen:
  `src/components/ui/icon.tsx` und `glyph.tsx`. Farben und Größen: `src/theme/tokens.ts`. Gegengemessen
  an den Store-Bildern `assets/store/screenshots-de-2026-10/01-workout.png`, `02-home.png` und
  `04-analyse.png` (3,28 px je Punkt).
* **Jedes Maß in `sim.css` ist ein Punktwert der App**, gerechnet über `--app-pt`. Wer etwas ändert, ändert
  die Zahl, nicht das Verhältnis.
* **Die Texte im Telefon stehen wörtlich in der App:** `src/i18n/locales/de/common.json` und
  `en/common.json`, die Übungsnamen in `exercises.json`, der Fakt in `src/domain/facts/facts.json`.
  Beide Sprachfassungen haben dasselbe Markup, nur die Wörter, das Datum und die Zahlzeichen unterscheiden
  sich.
* **Die Zahlen auf Home und Analyse sind die der Store-Bilder** (Beispieldaten, keine echte Person).
  Angenommen sind nur zwei Dinge, die kein Bild zeigt: die Balken der Wochen 36 und 38 im Fortschritt
  (im Store-Bild von der Tab-Leiste verdeckt) und die Wärme der Figur in der Muskel-Heatmap (so gewählt,
  dass sie zu den gemessenen Ecken des Netzes passt).
* **Was sich bewegt und woher:** Tippen, Zählen der Uhren, das Goldlicht und das Rollen im Telefon gibt
  es so in der App. **Das Aufleben ist eine Zugabe dieser Seite:** In der App stehen Home und Analyse
  still. Zahlen, die hochzählen, und eine Figur, die aufleuchtet, kennt die App vom Abschluss-Screen
  (900 ms, easeOutCubic); dass Balken hereinfahren und das Netz aus der Mitte wächst, gibt es in der App
  nicht. Hier läuft alles mit der Kurve des Abschluss-Screens am Scrollweg.
* **Der Endzustand steht fest im HTML**, `sim.js` nimmt für frühere Schritte Klassen an der Figur
  (`.sim-stand`) weg. Die Schwellen stehen an mehreren Stellen und gehören zusammen: `takte`, `schritte`
  und `einrichten` in `sim.js`; in `sim.css` das Goldlicht (`.app-licht`), die Spur der Pause
  (`.app-pause-rest`) und die Fenster fürs Rollen und Aufleben (bei „Zustände“, an `.sim-stand`); im
  HTML die Fenster der Zähler (`data-ab`, `data-ueber` an `.app-zaehl`). Die Länge der Strecke steht in
  `styles.css` (`#gingr .sim-strecke`): 190 vh Fahrweg, davon 100 vh für das Workout.
* **Das Markup der drei Telefone ist erzeugt**, nicht getippt: eine Vorlage je Screen und zwei
  Wortlisten (`bauen.py` mit `heim.py`, `training.py`, `analyse.py`), die Figuren mit `figur.mjs`. Die
  Skripte liegen wie die Prüfwerkzeuge nicht im Repo, sondern im Arbeitsordner der Sitzung vom
  04.10.2026. Wer von Hand ändert, ändert beide Sprachfassungen gleich.
* **Die Körperfiguren** sind das Artwork der App aus `src/components/charts/body-paths.ts` (männliche
  Figur), verkleinert und auf ganze Zahlen gerundet, gefärbt mit `heatColor()` aus `heat-scale.ts`:
  `gingr-figur.svg` (die zwei kleinen in der Leiste des Workouts), `gingr-koerper-vorn.svg` und
  `-hinten.svg` (alle Muskeln in Ruhe), darüber als zweite Schicht nur die trainierten Muskeln:
  `gingr-woche-vorn.svg` und `-hinten.svg` (Home, Sätze der Woche durch 14) und `gingr-90-tage-vorn.svg`
  (Analyse). Zusammen 51 KB, übertragen rund 22 KB (gzip, sechs Dateien einzeln). Das Artwork stammt aus react-native-body-highlighter
  (MIT), der Vermerk steht in jeder Datei.

## Bilder und Symbole neu erzeugen

* **Teilen-Bild:** `og-vorlage.html` bei 1200 × 630 px mit doppelter Pixeldichte aufnehmen, auf
  1200 × 630 herunterrechnen, als JPEG speichern, nach `og-image.jpg`.
* **Symbole:** `favicon/favicon.svg` ist die Quelle. Daraus entstehen `favicon-96x96.png` und
  `apple-touch-icon.png`; die beiden `web-app-manifest-*.png` kommen aus einer randlosen Fassung ohne
  abgerundete Ecken, weil sie im Manifest als `maskable` eingetragen sind.
* **Bildschirmfotos der Beispielseiten** (kopfloses Chrome, WebP mit `cwebp -q 75 -m 6 -metadata icc`):
  * Website-Bühne: Fenster 1344 × 900, die oberen 3000 px mit Pixeldichte 1, 1,5 und 2
    (`-lang-1344/2016/2688`); Handy 390 breit, Dichte 2, die oberen 2600 px (`-handy-lang`, 780 × 5200).
  * Kopffenster: Grund in der Markenfarbe der Seite (Praxis `#0B5561`, Café `#7A2A14`), darauf der
    obere Teil der Seite am Computer und am Handy, unten angeschnitten, oben runde Ecken (8 px am
    Computer, 44 px am Handy, in Seitenpixeln, mitverkleinert). `pille-*-geraete` ist 1320 × 400:
    Computer bei (46, 46) 980 px breit, Handy bei (1070, 46) 206 px breit. `pille-*-geraete-handy` ist
    1040 × 650: Computer bei (40, 40) 676 breit, Handy bei (756, 40) 244 breit. Aufgenommen mit diesen
    Fensterbreiten (aus den ersten Bildern zurückgerechnet): Praxis 1430 und 395, am Handy-Bild 1212
    und 388; Café 1270 und 392, am Handy-Bild 1430 und 391.

## Werkzeuge zum Prüfen

Sie liegen nicht im Repo, sondern im Arbeitsordner der Sitzung, in der sie entstanden sind
(`scratchpad/`). Alle steuern ein kopfloses Chrome über das DevTools-Protokoll:

| Werkzeug | Zweck |
| --- | --- |
| `weigh.mjs <url> <breite> <höhe> [mobil]` | Dateien, Bytes, fremde Hosts, Doppel-IDs, Querlauf, Tippziele unter 44 px |
| `probe.mjs <url>` | Formular in vier Zuständen, Klappmenü, Tastaturreihenfolge und Fokus |
| `shot.mjs` | Render-Kacheln der ganzen Seite plus LCP, CLS und Konsolenfehler |
| `viewshot.mjs`, `scrollshot.mjs` | ein einzelnes Bildschirmfoto, oben oder an einem Auswahltreffer |
| `stage-preview.sh` | Kopie mit relativen Pfaden für eine Vorschau-Veröffentlichung |
