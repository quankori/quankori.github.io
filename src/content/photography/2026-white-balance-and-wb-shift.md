---
title: "White Balance, Demystified: A Field Guide to WB and WB Shift"
date: "2026-04-22"
year: "2026"
summary: "Why your photos sometimes turn out too orange or too blue, what your camera is actually doing about it, and how the often-overlooked WB Shift grid gives you precise, repeatable control over color — explained with a numbers-only example anyone can follow."
tags: ["photography", "white-balance", "color", "technique"]
---

# White Balance, Demystified: A Field Guide to WB and WB Shift

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

## How "Auto" makes its guess

Auto White Balance (AWB) scans the scene, estimates which light source is most likely illuminating it, and applies a correction in the opposite direction — if the light looks warm (low Kelvin, orange-leaning), the camera pushes the image cooler to cancel it out, and vice versa.

This works nicely when a scene has one dominant, "normal" light source. It tends to fall apart in two common situations:

- **Mixed lighting** — a room lit by both window daylight and tungsten lamps gives the camera two different casts to reconcile, and it can only pick one
- **Scenes with a dominant color** — a sunset, a forest canopy, or a wall of red brick can fool AWB into thinking *the light itself* is that color, so it "corrects" away the very thing that made the shot worth taking

## The hidden second axis: green and magenta

Kelvin only describes one axis of color: blue on one end, amber/red on the other. But plenty of real-world light sources — fluorescent tubes, many LED panels, some sodium-vapor street lights — also push images toward **green**, a cast that no amount of Kelvin adjustment can fix. Counteracting it requires shifting the opposite way, toward **magenta**.

This is exactly what **WB Shift** (sometimes called "WB fine-tuning" or "WB correction") is for: a small two-dimensional grid layered on top of your chosen white balance setting, letting you nudge the image along *both* axes independently:

- **Axis 1 — Blue ↔ Amber**: the same axis Kelvin describes, just exposed as fine adjustment steps
- **Axis 2 — Green ↔ Magenta**: the axis Kelvin can't touch, for casts from artificial lighting

Most cameras expose this as a small grid — commonly something like ±9 steps in each direction — that you can nudge with a joystick or dial while reviewing a live preview.

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
2. **Use your camera's Custom / Preset white balance mode** and photograph that reference. The camera measures the cast in the reference shot and stores the correction it needs — often expressed as a Kelvin value, sometimes alongside shift values — so every subsequent photo in that light comes out neutral.
3. **Or shoot RAW and stop worrying about nailing it in-camera.** A RAW file stores the sensor's data largely untouched; white balance is just a tag you can change after the fact with zero quality loss. JPEGs "bake in" the white balance at the moment of capture, which is why getting it right in-camera matters far more for JPEG shooters.
4. **Treat WB Shift as a creative dial, not just a corrective one.** Just as you might bracket exposure, try bracketing white balance — shoot the same scene with the dials nudged a few clicks in either direction and compare.

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

White balance starts as a technical correction — undoing the color of your light source so whites stay white. WB Shift is what turns it into a precision tool: two simple dials that, once you understand the grid behind them, give you complete, repeatable control over the color of your images, whether your goal is invisible accuracy or a deliberate mood.
