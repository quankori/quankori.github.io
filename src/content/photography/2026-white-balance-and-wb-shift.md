---
title: "White Balance, Demystified: A Field Guide to WB and WB Shift"
date: "2026-04-22"
year: "2026"
summary: "A field guide to Kelvin, tint, Auto and Custom WB, and the often-overlooked WB Shift grid—including mixed light, RAW versus JPEG, skin-tone calibration, repeatable recipes, and the cases a global white-balance adjustment cannot solve."
tags: ["photography", "white-balance", "color", "technique"]
---

You've probably seen it happen: a photo taken under indoor lights comes out looking like it was dipped in orange juice, or a shot in open shade comes back faintly blue, even though the scene looked perfectly normal to your eyes. That's white balance — or rather, your camera's best guess at it, occasionally getting it wrong.

This post is a practical tour of what white balance actually corrects, why "Auto" sometimes fails, and a feature most people never touch: **WB Shift**, a small two-axis grid that gives you fine, repeatable control over color far beyond the handful of presets in your camera's menu.

## Light has a color, even when it looks "white"

Every light source emits a slightly different color, measured on the **Kelvin (K)** scale. Lower numbers mean warmer, more orange light; higher numbers mean cooler, bluer light — which feels backwards until you remember the scale describes the *temperature of a glowing object*, not how "warm" or "cool" the light feels to us.

| Light source | Approx. color temperature | Cast if left uncorrected |
|---|---|---|
| Candlelight | ~1,900 K | Strong orange |
| Incandescent / tungsten bulb | 2,700–3,000 K | Orange / amber |
| Sunrise or sunset | 3,000–4,000 K | Warm amber |
| Midday daylight | 5,200–5,600 K | Neutral (the reference point) |
| Overcast sky | 6,000–7,500 K | Slightly cool / blue |
| Open shade on a sunny day | 7,000–9,000 K | Blue |

Your eyes and brain compensate for all of this automatically — a white shirt looks white to you whether you're standing in a candlelit room or under a midday sun. Camera sensors don't have that luxury; they record the light exactly as it is, cast and all. White balance is the camera's attempt to undo that cast so whites render as white and colors stay true.

There are two temperatures in the conversation, and confusing them causes most Kelvin mistakes:

- **The light’s color temperature** describes the source. Tungsten light is physically low-K and orange; open shade is high-K and blue.
- **The camera’s WB setting** describes what source it should neutralize. Setting a higher Kelvin value makes the rendered image warmer because the camera assumes bluer light and applies more amber correction. Setting a lower value makes it cooler.

So if the photograph itself looks too orange, lower the camera’s Kelvin setting. If it looks too blue, raise it. The menu value and the visible correction move in apparently opposite directions because the camera is applying the complement of the assumed light.

## How "Auto" makes its guess

Auto White Balance (AWB) scans the scene, estimates which light source is most likely illuminating it, and applies a correction in the opposite direction — if the light looks warm (low Kelvin, orange-leaning), the camera pushes the image cooler to cancel it out, and vice versa.

This works nicely when a scene has one dominant, "normal" light source. It tends to fall apart in two common situations:

- **Mixed lighting** — a room lit by both window daylight and tungsten lamps gives the camera two different casts to reconcile, and it can only pick one
- **Scenes with a dominant color** — a sunset, a forest canopy, or a wall of red brick can fool AWB into thinking *the light itself* is that color, so it "corrects" away the very thing that made the shot worth taking

AWB can also vary from frame to frame as composition changes. A red coat enters the edge, the camera revises its guess, and an otherwise consistent sequence suddenly alternates between warm and cool. That is why fixed Kelvin, a preset, or Custom WB is often better for interviews, product sets, panoramas, time-lapses, and any gallery meant to grade as one body of work.

Modern cameras may offer AWB priorities such as **White priority**, which tries harder to neutralize warm light, and **Ambience priority**, which preserves some of it. Neither is more correct. A candlelit dinner usually benefits from ambience; a catalog photograph of a white product may require neutrality.

## The hidden second axis: green and magenta

Kelvin only describes one axis of color: blue on one end, amber/red on the other. But plenty of real-world light sources — fluorescent tubes, many LED panels, some sodium-vapor street lights — also push images toward **green**, a cast that no amount of Kelvin adjustment can fix. Counteracting it requires shifting the opposite way, toward **magenta**.

This is exactly what **WB Shift** (sometimes called "WB fine-tuning" or "WB correction") is for: a small two-dimensional grid layered on top of your chosen white balance setting, letting you nudge the image along *both* axes independently:

- **Axis 1 — Blue ↔ Amber**: the same axis Kelvin describes, just exposed as fine adjustment steps
- **Axis 2 — Green ↔ Magenta**: the axis Kelvin can't touch, for casts from artificial lighting

Most cameras expose this as a small grid — commonly something like ±9 steps in each direction — that you can nudge with a joystick or dial while reviewing a live preview.

Manufacturers label the axes differently: `A–B` and `G–M`, `Amber–Blue` and `Green–Magenta`, or a pair such as `A3 M2`. The direction and step size are camera-specific. A Fujifilm recipe cannot be copied numerically to a Sony or Canon body with the expectation of identical color, even when both menus show the number `+3`.

The shift is **added on top of the selected WB mode**. `5500 K, A+2, M+1` is not a separate temperature; it means “start with the correction for 5500 K, then bias it two steps amber and one step magenta.” This layering is useful because the base setting handles the large blue–amber error and the shift handles small tint or creative bias.

## A numbers-only way to picture it

Here's the same idea using nothing more than two dials with numbers on them — no color theory required.

Imagine every photo's color cast can be described with two numbers, each ranging from **-9 to +9**:

- **First number — Blue ↔ Amber dial**: negative values push the image toward blue; positive values push it toward amber/orange
- **Second number — Green ↔ Magenta dial**: negative values push toward green; positive values push toward magenta

Selecting "Daylight, 5500K" on your camera is like saying *"assume the light looks like midday sun, and start both dials at (0, 0)."* From there, WB Shift just lets you nudge those two numbers:

- Notice your indoor shots under fluorescent office lighting look slightly green? Try **(0, +4)** — four clicks toward magenta — to cancel that cast without touching how warm or cool the image feels overall.
- Shooting during golden hour and the camera keeps trying to "correct away" that gorgeous warm glow? Set Daylight white balance and shift **(+3, 0)** — three clicks toward amber — so the camera stops fighting the light you're actually trying to capture.

That's the entire trick: two independent numbers, each nudging the image along one axis, combining to cancel out (or deliberately exaggerate) whatever cast is actually present.

```recipe
Name: Cancel an Office Fluorescent Cast
Base White Balance: Auto (camera estimates ≈ 4200K)
Shift — Blue / Amber: 0
Shift — Green / Magenta: +4 (toward magenta)
Result: Neutral whites despite green-leaning fluorescent light
```

```recipe
Name: Preserve a Golden-Hour Glow
Base White Balance: Daylight (5500K)
Shift — Blue / Amber: +3 (toward amber)
Shift — Green / Magenta: 0
Result: Camera stops neutralizing the warm light you wanted to keep
```

## Setting it yourself, step by step

1. **Find a neutral reference** — a white sheet of paper or a gray card, held in the same light as your subject.
2. **Use your camera's Custom / Preset white balance mode** and photograph that reference. Fill the indicated metering area with the card under the same light that reaches the subject. The camera measures the cast and stores the correction it needs, so every subsequent photo in that light starts from the same neutral point.
3. **Or shoot RAW and keep the decision reversible.** A RAW file stores minimally processed sensor values and records the chosen white balance mainly as metadata. A RAW editor can reinterpret it later without the destructive channel remapping of an already-rendered JPEG. This freedom is not infinite: a severely overexposed color channel can clip at capture, and the camera’s WB still affects the preview and histogram you used in the field.
4. **Treat WB Shift as a creative dial, not just a corrective one.** Just as you might bracket exposure, try bracketing white balance — shoot the same scene with the dials nudged a few clicks in either direction and compare.

A neutral gray card is usually more reliable than ordinary white paper. Paper can contain optical brighteners that react to ultraviolet light and may not be spectrally neutral. A color target goes further: it helps build a camera profile for how the sensor and lens render many colors, while white balance establishes only the neutral axes.

## A repeatable correction workflow

When a frame looks wrong, do not move both axes randomly. Use a fixed order:

1. **Choose the reference area.** Skin, a gray card, white fabric, or a known neutral wall must actually be under the light you want to correct.
2. **Fix blue versus amber first.** Adjust Kelvin or the base preset until the image no longer feels globally too cool or warm.
3. **Fix green versus magenta second.** Use Tint/WB Shift to remove fluorescent green or excessive magenta.
4. **Recheck important colors.** Neutral gray can be mathematically correct while skin looks unhealthy because the light’s spectrum is poor.
5. **Save or record the setting.** Consistency across the set matters more than chasing a perfect number frame by frame.

In a RAW editor, temporarily increasing saturation can make a faint cast easier to see. Return saturation to normal before judging the final result.

## Mixed light: the problem one slider cannot solve

Imagine a person standing near a blue daylight window while a 2800 K lamp lights the other side of the face. A global WB setting can neutralize the window or the lamp, or compromise between them. It cannot make both sides neutral because two different spectra occupy different pixels.

Practical options are:

- turn off one source;
- move the subject so one source dominates;
- gel a flash or lamp to match the ambient light;
- embrace the contrast as an intentional warm/cool design;
- use local masks in post-production for separate regions.

The same limitation appears under stages with colored LEDs, neon streets, aquariums, and rooms containing several types of bulb. White balance is a global interpretation, not a reconstruction of missing wavelengths.

## Why LED and fluorescent light can still look bad after neutral WB

Kelvin and tint describe color along two useful axes, but real light has a full **spectral power distribution**. Daylight contains a broad spread of wavelengths. A cheap LED or fluorescent tube may have narrow spikes and gaps. The camera can make a gray card neutral by balancing red, green, and blue channels, yet skin, fabrics, and paint can remain strange because some spectral information was weak or absent at capture.

This is metamerism: two surfaces may match under one light and diverge under another. No WB Shift value can recreate a wavelength that never illuminated the subject. For color-critical work, use high-quality, well-characterized lighting and a color target rather than relying only on a Kelvin number printed on the lamp.

## Exposure and white balance interact

White balance multiplies color channels differently. Under tungsten light, neutral rendering needs a strong boost to the blue channel, which received relatively little light. That boost also raises blue-channel noise. Under deeply blue light, the red channel faces the opposite problem.

This produces two useful habits:

- expose RAW files generously without clipping important channels, rather than severely underexposing and expecting WB correction to be free;
- inspect RGB histograms when photographing saturated concerts, neon, flowers, or sunset clouds, because one channel can clip before the combined luminance histogram looks alarming.

## Special cases

### Skin tones

Neutralize using light falling on the face, not a white object across the room under a different source. Then judge skin. A small warm bias is often pleasant; green contamination rarely is. Consistency between adjacent portraits matters more than a textbook Kelvin value.

### Golden hour and blue hour

AWB may erase the atmosphere that defines the time of day. Daylight WB around 5200–5600 K provides a stable baseline and lets the natural light remain warm at sunset or blue after it.

### Snow and fog

These scenes provide large near-neutral areas, but reflected sky can make them legitimately blue. Decide whether the image should communicate cold ambient light or neutral white material. Exposure compensation is a separate issue: snow can be correctly white-balanced and still rendered too dark by the meter.

### Underwater

Water absorbs red wavelengths rapidly. Custom WB or a red filter can improve shallow-water color, but deep footage may not contain enough red signal to recover cleanly. Artificial light close to the subject is the real solution.

### Astrophotography

There may be no neutral object in the scene, and light pollution adds complex spectra. Fixed WB keeps a sequence consistent, but final calibration may rely on known star colors, sky-background sampling, or dedicated astrophotography tools.

## When "accurate" isn't the goal

Technically correct white balance is a *means*, not an end. A slightly cooler image can read as quiet, early-morning, or melancholic; a slightly warmer one can read as cozy or nostalgic. Plenty of memorable photographs have a deliberate cast that "perfect" white balance would have erased.

The one place consistency really matters is across a *series* — a travel gallery, an event album, a set meant to be viewed together. Wandering white balance from frame to frame is one of the fastest ways to make a cohesive set look sloppy, even if each individual photo looks fine in isolation.

## Quick-reference cheat sheet

| Situation | Likely cast | What to try |
|---|---|---|
| Indoor incandescent / tungsten bulbs | Strong orange | Switch to a Tungsten preset, or shift toward blue |
| Fluorescent tubes / older LED office lighting | Greenish | Shift toward magenta |
| Open shade on a sunny day | Bluish | Switch to a Shade preset, or shift toward amber |
| Golden hour / sunset (often a *good* cast) | Warm amber | Leave it alone — or shift further toward amber to enhance it |
| Mixed lighting (window + room lamps) | Inconsistent across the frame | Pick the dominant source as your base; fine-tune the rest later from RAW |

## What to record in a photo recipe

If you want a look to be repeatable, “Cloudy WB” is not enough. Record:

- base mode or Kelvin value;
- Blue–Amber shift;
- Green–Magenta shift;
- camera model and picture profile/film simulation;
- dominant light source;
- whether the reference was neutral or intentionally biased.

The camera model matters because color filters, profiles, and shift scales differ. The lighting matters because a recipe is an input-to-output transformation, not a universal color preset.

White balance starts as a technical correction — undoing the color of your light source so whites stay white. WB Shift is what turns it into a precision tool: two simple dials that, once you understand the grid behind them, give you complete, repeatable control over the color of your images, whether your goal is invisible accuracy or a deliberate mood.
