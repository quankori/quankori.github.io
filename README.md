# Travels — Quan Kori

A quiet personal travel photo archive. Metro masonry grid on the home page, lightbox galleries per trip. Built with React + Vite.

Live at **https://quankori.github.io**

---

## Adding a trip

Edit [`src/data/trips.json`](src/data/trips.json) and append a new object. A trip is **a place**, and a place can hold several dated **visits** — handy when you go back to the same spot. The gallery splits each visit into its own dated section.

```json
{
  "id": "phan-thiet",
  "name": "Phan Thiết",
  "country": "Vietnam",
  "date": "2026",
  "coords": [10.93, 108.1],
  "visits": [
    {
      "date": "2026",
      "photos": [
        {
          "thumb": "https://live.staticflickr.com/65535/PHOTOID_SECRET_c.jpg",
          "full":  "https://live.staticflickr.com/65535/PHOTOID_KSECRET_k.jpg",
          "description": "",
          "exif": {
            "camera": "Fujifilm X-T4",
            "lens": "XF 16-55mm f/2.8",
            "f": "8",
            "ss": "1/500",
            "iso": "160",
            "focal": "23mm"
          }
        }
      ]
    },
    {
      "date": "2025",
      "photos": [ ]
    }
  ]
}
```

The `id` becomes the URL slug: `/#/trip/phan-thiet`. Keep it lowercase, hyphen-separated, unique.

| Field | Required | Notes |
|-------|----------|-------|
| `id` | yes | URL slug, unique |
| `name` | yes | Place name (tile + hero) |
| `country` | no | Shown as overline label; also counted in the "X countries" stat |
| `date` | no | `YYYY-MM` or just `YYYY` — used for the tile label / hero meta |
| `coords` | recommended | `[lat, lng]` — pin on the home map **and** the zoomed map used as the detail-page hero. |
| `visits[]` | yes | One entry per trip to the place: `{ date, photos[] }` |
| `visits[].date` | yes | `YYYY-MM` or `YYYY` — shown as the section divider ("March 2026" / "2026") |
| `photos[]` | yes | `thumb` / `full` / optional `description` / optional `exif` |

**No `cover` field.** The home tile uses the trip's **first photo**, and the detail-page hero is a **zoomed-in map** of `coords` (dark map with a pin). If a trip has no `coords`, the hero falls back to the first photo. So you never need a dedicated cover image.

**One visit?** Just use a single entry in `visits`. (The old flat shape — `date` + `photos[]` at the top level, no `visits` — is still supported for backward compatibility, but `visits[]` is preferred.)

### Photo camera settings (EXIF)

Each photo can carry an optional `exif` object. When present it shows in the lightbox as a Flickr-style strip — `ƒ/8 · 1/500s · ISO 160 · 23mm` plus the camera/lens. All fields are optional; only the ones you fill in are shown.

| `exif` field | Example | Shown as |
|--------------|---------|----------|
| `f` | `"8"` | ƒ/8 |
| `ss` | `"1/500"` | 1/500s |
| `iso` | `"160"` | ISO 160 |
| `focal` | `"23mm"` | 23mm |
| `camera` | `"Fujifilm X-T4"` | device line |
| `lens` | `"XF 16-55mm f/2.8"` | device line |

> Why typed by hand instead of read from the image? Flickr (and most web resizers) **strip EXIF from the downscaled `_b`/`_k` versions**, so reading it from the displayed image is unreliable. Storing it in JSON always works. Copy the values from Flickr's photo page or your editor. (If you'd rather auto-extract from originals that still keep EXIF, that can be wired up with the `exifr` library — ask.)

### The home map

The home page shows a [Leaflet](https://leafletjs.com) map with a green pin per trip (nearby trips cluster into a numbered bubble). It uses free CARTO + OpenStreetMap tiles — **no API key or billing required**, unlike Google Maps, which is why it suits a static GitHub Pages site. Just add `coords: [lat, lng]` to a trip and the pin appears; clicking it opens that trip. Look up coordinates on Google Maps (right-click a spot → the lat/lng is the first menu item).

The map opens **centred on Vietnam** and you can **scroll-zoom** in/out. To re-centre, edit `VIETNAM_CENTER` / `INITIAL_ZOOM` at the top of [`src/components/TravelMap.jsx`](src/components/TravelMap.jsx).

### Pages

- `/` — home: map + metro grid of all places
- `/about` — short bio ([`src/pages/About.jsx`](src/pages/About.jsx))
- `/trip/:id` — a place's gallery, split by visit, with an EXIF lightbox

---

## Flickr URL size suffixes

A Flickr static URL is `https://live.staticflickr.com/{server}/{id}_{secret}_{size}.jpg`. Swap the `{size}` letter for a different size:

| Suffix | Max width | Used for |
|--------|-----------|----------|
| `_n`   | 320 px    | thumb (smaller) |
| `_z`   | 640 px    | thumb |
| `_c`   | 800 px    | **`thumb`** (what this project uses) |
| `_b`   | 1024 px   | full (smaller) |
| `_k`   | 2048 px   | **`full`** (what this project uses) |
| `_h`   | 1600 px   | full (alternative) |

> ⚠️ **Secret gotcha:** sizes up to `_b` (1024) share one `{secret}`, but `_h`, `_k`, and `_o` each use a **different `{secret}`**. So `thumb` (`_c`) and `full` (`_k`) of the same photo have *different* secrets — don't just swap the suffix for the large sizes. Grab each size's exact URL from the photo page (right-click → copy image address, or the "Download / View all sizes" menu).

Example (same photo, note the differing secrets):
- Thumb → `…/55296927544_36292fe918_c.jpg`
- Full  → `…/55296927544_934765d9d8_k.jpg`

---

## Deploy

Push to `main` or `master` → GitHub Actions runs automatically:

1. `npm ci` — install deps
2. `npm run build` — Vite builds to `dist/`
3. Artifact uploaded and deployed to GitHub Pages

**First-time setup:** go to **Settings → Pages → Source → GitHub Actions** in the repo settings and save.

---

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the build locally
```

---

## Stack

- **React 18** + **Vite 5**
- **React Router v6** with `HashRouter` — F5/refresh works on any deep URL
- **Leaflet** + **react-leaflet-cluster** — home map with clustered pins (free tiles, no key)
- **Framer Motion** — staggered tile entrance, page transitions, lightbox
- **Plain CSS Modules** — light palette, Playfair Display + Jost, liquid-glass touches
