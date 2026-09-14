# ly-webstudio.de

Die Website der ly-webstudio UG (haftungsbeschränkt). Statisches HTML, **kein Build, kein Framework,
keine Abhängigkeiten**. Wer eine Datei ändert und pusht, hat die Änderung online.

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
| `styles.css` | das Blatt für beide Startseiten; die Farben stehen als Variablen in `:root`, mit gemessenen Kontrasten im Kommentar darüber |
| `script.js` | Klappmenü und Kontaktformular. Sonst nichts. Die Seite ist ohne JavaScript vollständig lesbar |
| `beispiel-zahnarzt/` | erfundene Beispiel-Website, in sich geschlossen, `noindex` |
| `impressum.html`, `datenschutz.html`, `agb.html`, `widerruf.html` | Rechtstexte, eigenes Blatt `legal.css`, ohne JavaScript |
| `404.html` | Fehlerseite, benutzt ebenfalls `legal.css` |
| `og-vorlage.html` | Quelle des Teilen-Bildes `og-image.jpg`, `noindex`, nirgends verlinkt |
| `fonts/` | Inter als woff2, selbst ausgeliefert. **Keine Schriften von fremden Servern** |
| `assets/img/` | Porträt und Bildschirmfotos als webp |
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
Telefonnummer nennt. Die Meldungstexte stehen als `data-sending`, `data-success` und `data-error` am
Element `#form-status` im HTML, deshalb trägt dieselbe Skriptdatei die deutsche und die englische Seite.

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
HTML, altes Stylesheet). Darum hängt an jedem Verweis auf `styles.css`, `sim.css`, `sim.js`,
`script.js` und `legal.css` ein `?v=JJJJMMTT`. **Wer eine dieser Dateien ändert, setzt das Datum in
allen HTML-Dateien neu** — sonst kommt derselbe Fehler wieder:

```bash
grep -rl '?v=' --include='*.html' . | xargs sed -i '' 's/?v=[0-9]*/?v=JJJJMMTT/g'
```

## Gemessene Zahlen im Text

Die Startseite nennt ihr eigenes Gewicht („12 Dateien, 233 KB beim ersten Aufruf“) und das der
Beispielseite. **Diese Zahlen sind gemessen, nicht geschätzt.** Wer Bilder, Schriften oder Abschnitte
ändert, muss sie neu messen und den Satz anpassen, sonst steht eine Unwahrheit auf der Seite.

## Bilder und Symbole neu erzeugen

* **Teilen-Bild:** `og-vorlage.html` bei 1200 × 630 px aufnehmen, auf 1200 × 630 herunterrechnen, als
  JPEG mit Qualität 86 speichern, nach `og-image.jpg`.
* **Symbole:** `favicon/favicon.svg` ist die Quelle. Daraus entstehen `favicon-96x96.png` und
  `apple-touch-icon.png`; die beiden `web-app-manifest-*.png` kommen aus einer randlosen Fassung ohne
  abgerundete Ecken, weil sie im Manifest als `maskable` eingetragen sind.

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
