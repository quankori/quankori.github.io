# The Climb · Quan Nguyen

A scroll-driven 3D landing page: my CV told as a climb up an endless spiral staircase.
Each landing is a year or milestone. Between landings there are thorns and bad weather,
and the climber collects scratches on the way. At each landing they pick up an item and new
skills (orbs that circle them). There is no summit: the stairs keep going into the night sky.

Live at **https://quankori.github.io**

## Stack

- [Vite](https://vite.dev) + vanilla JS
- [three.js](https://threejs.org): everything is procedural, with no 3D model files
- [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling

## Develop

```bash
npm install
npm run dev
```

## Editing the story

All content (English only) is in [`src/data/journey.js`](src/data/journey.js). UI strings live in `UI` in the same file.

| field     | what it does                                                       |
|-----------|--------------------------------------------------------------------|
| `thorns`  | hardships shown on the card                                        |
| `gains`   | achievements shown on the card                                     |
| `skills`  | chips on the card; each one becomes an orb around the climber      |
| `scars`   | thorn clusters (and scratches) on the climb **up to** this landing |
| `item`    | what the climber picks up here (see `ITEMS`)                       |
| `weather` | `calm` · `wind` · `rain` · `storm` · `snow` for the climb up here  |
| `quote`   | the speech bubble shown when the visitor stops scrolling here      |

Adding a milestone automatically adds a landing, a monument and a step on the altimeter.

## Code map

- `src/path.js`: helix geometry, landings, scar points and the scroll timeline
- `src/scene/world.js`: sky, spire, stairs, thorns, clouds, weather, campfire
- `src/scene/climber.js`: the character, wear & tear, inventory and skill orbs
- `src/ui/hud.js`: cards, stats HUD, altimeter, floaters, toasts
- `src/main.js`: render loop, camera rig and events

Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `master`.
