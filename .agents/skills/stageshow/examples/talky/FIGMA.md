# Figma → stageshow (Talky hero)

## Źródło prawdy

Pliki i tokeny: **`/cursor/stores/bot/talky-designs/`** (README + PNG @2x).

Do czasu dopasowania 1:1 UI w `TalkyHero` / `talky.css` jest **prowizoryczne** i nie odzwierciedla aktualnego Figma.

## Beats (logic — gotowe)

1. Kursor klika **pływającą pigułkę Talky** (nie menu bar).
2. Otwiera się **panel** → klik **Listen**.
3. **Meeting pill**, transkrypt z mówcami, Stop, **Summary**, banner `~/Documents/Talky/Meetings`.
4. Pętla wraca do stanu z pigułką idle.

## Po przyjściu designów

1. `node talky-demo/scripts/sync-figma-designs.mjs`
2. Zaktualizuj `talky-tokens.css` z README w store.
3. Dopasuj `TalkyPill` / `TalkyPanel` (wymiary, tła, orb SVG/PNG).
4. `npm run build` w `talky-demo`, podbij `?v=` w `index.html`, `film.mjs` + `capture-loop.mjs`.
5. **Jeden commit** wyglądu dopiero po wizualnym QA względem PNG.

## Odtwarzanie na Pages

Host: `.talky-stage-host` + `data-ss-fill` — nie ustawiaj `height: auto` na `.ss-fit` / `.ss-stage` w `site.css`.