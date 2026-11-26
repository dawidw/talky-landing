# Talky landing

Static marketing site for [Talky](https://talky.dawidw.pl/). No build step.

## Local preview

From this directory:

```bash
python3 -m http.server 8080
```

Open [http://localhost:8080/](http://localhost:8080/).

## Structure

- `index.html`: main landing
- `privacy.html`, `terms.html`: legal
- `changelog/`: changelog page and `CHANGELOG.md` source
- `thanks/`: post-checkout page
- `site.css`, `site.js`: shared styles and mobile nav

See `PLACEHOLDERS.md` for values to fill before launch.
