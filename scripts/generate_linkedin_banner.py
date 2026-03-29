from PIL import Image, ImageDraw
import math

W, H = 1128, 191
bg = (9, 9, 11, 255)  # #09090b
img = Image.new("RGBA", (W, H), bg)
pix = img.load()

# Dot background settings from DotBackground.tsx
spacing = 28
# Center dots inside the grid cells so they appear more in the middle,
# instead of aligning directly on the banner edges.
shift_x = spacing / 2
shift_y = spacing / 2
r = 1

# Draw dots (rgba(255,255,255,0.14))
dot_alpha = int(round(255 * 0.14))
draw = ImageDraw.Draw(img, "RGBA")
cols = math.ceil(W / spacing) + 2
rows = math.ceil(H / spacing) + 2
for col in range(cols):
    for row in range(rows):
        x = col * spacing + shift_x
        y = row * spacing + shift_y
        draw.ellipse((x - r, y - r, x + r, y + r), fill=(255, 255, 255, dot_alpha))

# Radial gradient overlay from homepage:
# radial-gradient(ellipse 80% 50% at 50% 0%, rgba(250,250,250,0.04) 0%, transparent 70%)
cx, cy = W * 0.5, 0
# CSS ellipse size uses diameters. Convert to radii.
rx, ry = (W * 0.8) / 2, (H * 0.5) / 2
max_t = 0.70

for y in range(H):
    for x in range(W):
        nx = (x - cx) / rx if rx else 0
        ny = (y - cy) / ry if ry else 0
        d = math.sqrt(nx * nx + ny * ny)
        if d <= max_t:
            # 0.04 at center -> 0 at 70%
            alpha = 0.04 * (1 - d / max_t)
            if alpha <= 0:
                continue
            r0, g0, b0, _ = pix[x, y]
            sa = alpha
            ia = 1 - sa
            nr = int(round(250 * sa + r0 * ia))
            ng = int(round(250 * sa + g0 * ia))
            nb = int(round(250 * sa + b0 * ia))
            pix[x, y] = (nr, ng, nb, 255)

# Safe-zone optimization: subtle darkening on left where profile avatar overlays
for y in range(H):
    for x in range(W):
        t = max(0.0, min(1.0, 1 - x / (W * 0.18)))
        if t <= 0:
            continue
        alpha = 0.10 * t
        r0, g0, b0, a0 = pix[x, y]
        nr = int(round(r0 * (1 - alpha)))
        ng = int(round(g0 * (1 - alpha)))
        nb = int(round(b0 * (1 - alpha)))
        pix[x, y] = (nr, ng, nb, a0)

out = "public/linkedin-banner-safezone-1128x191.png"
img.convert("RGB").save(out, format="PNG", optimize=True)
print(out)
