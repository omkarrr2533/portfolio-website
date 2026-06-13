# 📸 Add your images here

The site is already wired to use the images below. Until you drop the real
files in, each spot gracefully falls back to the existing `profile.jpg`
(or a gradient badge for the certificate), so nothing ever looks broken.

Save these files with these **exact names** and the site picks them up
automatically (no code changes, just refresh the browser):

## Required for the new look

| Save as | What it is | Used on |
|---|---|---|
| `public/images/headshot.jpg` | B&W professional headshot (suit) | **Home hero portrait** + About profile card |
| `public/images/portrait-full.jpg` | B&W full-body photo (white outfit) | Home page "About Me" section |
| `public/images/certs/nvidia-genai.jpg` | NVIDIA "Generative AI with Diffusion Models" certificate | Certifications — featured spotlight |

## Optional — nicer certificate thumbnails

The IBM / NVIDIA / Data-Science certificates already open as real PDFs from the
"View Certificate" button. If you'd also like a polished **image** thumbnail on
each card, drop a screenshot of the certificate at these paths and add an
`image:` field to the matching entry in `src/app/certifications/page.js`
(e.g. `image:'/images/certs/ibm.jpg'`):

- `public/images/certs/ibm.jpg`
- `public/images/certs/nvidia-rapid.jpg`
- `public/images/certs/data-science.jpg`

## Tips
- `.jpg`, `.jpeg`, `.png` or `.webp` all work — keep the filename above.
- Photos are shown in portrait frames with `object-fit: cover`, so a centered
  subject crops nicely. The B&W headshot (studio background) looks best in the
  hero; the full-body shot suits the taller "About Me" frame.
- After adding the files, just refresh — no rebuild needed in dev.

> ✅ Editing the site (certs, about info) now requires **admin login** — click the
> shield icon (bottom-right) and enter your `ADMIN_PASSWORD`. Visitors can no
> longer change or delete anything.
