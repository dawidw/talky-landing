# Talky landing

Static marketing site for [Talky](https://talky.dawidw.pl/). No build step.

## Local preview

From this directory:

```bash
python3 -m http.server 8080
```

Open [http://localhost:8080/](http://localhost:8080/).

## Production (GitHub Pages)

The live site at [talky.dawidw.pl](https://talky.dawidw.pl/) is **not** built from this folder on `dawoz/talky` `main`. GitHub Pages serves the public repo [dawidw/talky-landing](https://github.com/dawidw/talky-landing).

After you change files here, publish:

```bash
./scripts/deploy_landing_pages.sh "Your commit message"
```

## Structure

- `index.html`: main landing
- `privacy.html`, `terms.html`: legal
- `changelog/`: changelog page and `CHANGELOG.md` source
- `thanks/`: post-checkout page
- `site.css`, `site.js`: shared styles and mobile nav

See `PLACEHOLDERS.md` for values to fill before launch.
