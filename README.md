# Quan Kori · Notebook

My personal site at **https://quankori.github.io**: an Ant Design style layout with a menu on the left and
the page on the right.

- **About me**: the home page
- **English**: grammar made visual, from sentence structure and tenses to clauses, inversion and punctuation
- **Travel**: one gallery per place, plus random frames
- **Technology**: interactive explainers for X3DH and MLS

Every page is its own lazy-loaded React component with its own design.

## Develop

```bash
npm install
npm run dev
```

## Add a page

1. Write `src/content/<category>/<Name>.jsx` (+ optional `<Name>.module.css`).
2. Register it in [`src/content/registry.js`](src/content/registry.js).
3. `node scripts/check-page.mjs src/content/<category>/<Name>.jsx`

See [`CLAUDE.md`](CLAUDE.md) for the page conventions.

Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `master`.
