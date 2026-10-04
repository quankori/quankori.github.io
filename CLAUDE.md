# quankori.github.io

Personal notebook site: Ant Design layout with a menu on the left and the page on the right.
Vite + React 19 + antd 6 + react-router 7. Deployed to GitHub Pages on push to `master`.

## Adding a page (the common task)

1. Create `src/content/<category>/<Name>.jsx` (default export, no required props) and,
   if it needs styles, `<Name>.module.css` next to it.
2. Register it in `src/content/registry.js` under its category's `pages`
   (`slug`, `title`, `description`, `load: () => import('./<category>/<Name>.jsx')`, optional `wide: true`,
   optional `group` to list it under a sub-heading in the menu, e.g. English → Basics / Verbs / Clauses).
   A new category is a new object in `CATEGORIES`; its `icon` name maps to an icon in `src/components/icons.jsx`.
3. Check it compiles: `node scripts/check-page.mjs src/content/<category>/<Name>.jsx`, then `npm run build`.

Conventions for pages:
- The shell (`src/components/ArticleView.jsx`) already renders breadcrumb, title and description; the menu is the navigation (no prev/next links).
  Do not render another H1.
- Every page should have its own visual identity and a "signature" interactive or visual element
  (timeline, gauge, flashcards, simulator, tree…) so it is memorable. Do not reuse one template.
- Use antd v6 components (`items` props, `variant` not `bordered`) plus CSS Modules and inline SVG.
  Avoid new npm dependencies unless the page truly needs one; pages are lazy-loaded, so a page-only
  dependency does not slow down the rest of the site.
- Responsive down to 360px with no horizontal page scroll. Keyboard accessible.
- Keep a page's content in constant arrays at the top of its file so it is easy to edit.
- No quizzes, exercises or score-keeping sections: pages explain and illustrate, they do not test.
- Never use ad-blocker trigger words in file names or CSS class names (`ad`, `ads`, `banner`, `sponsor`,
  `promo`, `track`, `pageview`, `popup`): the dev server serves files by name, and a blocked file blanks the site.
- English grammar pages: terms, formulas and examples in English, explanations in Vietnamese.
  Do not use Georgia for Vietnamese text (it breaks the diacritics); prefer 'Palatino Linotype', 'Times New Roman' or the system sans.
  Technology and travel pages: English.

## Data

- `src/data/profile.js`: About page (profile + experience timeline).
- `src/data/trips.json`: travel places; each trip automatically becomes a menu item under Travel.
- `src/data/randomPhotos.json`: the Travel → Random page.
