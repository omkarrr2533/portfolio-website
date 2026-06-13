# 📸 Add your images here

The site is already wired to use the images below. Until you drop the real
files in, each spot gracefully falls back to the existing `profile.jpg`
(or a gradient badge for the certificate), so nothing looks broken.

Just save these 3 files with these **exact names** and the site picks them up
automatically (no code changes needed):

| Save as | What it is | Used on |
|---|---|---|
| `public/images/headshot.jpg` | Your B&W professional headshot (suit) | About page — profile card portrait |
| `public/images/portrait-full.jpg` | Your B&W full-body photo (white outfit) | Home page — "About Me" portrait |
| `public/images/certs/nvidia-genai.jpg` | The NVIDIA "Generative AI with Diffusion Models" certificate | Certifications page — featured certificate |

## Tips
- `.jpg`, `.jpeg`, `.png` or `.webp` all work — but keep the filename above
  (rename the extension in code if you use a different one).
- The photos are shown in portrait frames with `object-fit: cover`, so a
  centered subject crops nicely.
- After adding the files, just refresh the browser — no rebuild required in dev.

> Your certificate **PDFs** are already in `public/certificates/` and linked
> from the certifications page ("View Certificate").
