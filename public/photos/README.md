# 📸 Wedding Photos

Add your photos to **this folder** with the EXACT filenames shown below.
The app reads them automatically — no code changes needed!

---

## Required Files

| Slot | Filename | Where it appears |
|------|----------|-----------------|
| Hero couple photo | `couple.jpeg` | Full-screen splash / cover page |
| Gallery photo 1 | `gallery-1.jpeg` | Scrolling gallery |
| Gallery photo 2 | `gallery-2.jpeg` | ↑ |
| … | … | ↑ |
| Gallery photo 37 | `gallery-37.jpeg` | ↑ (all 37 slots supported) |

> **Note:** Missing slots are silently skipped — you don't need to fill all 37.

---

## Tips
- **Supported format:** JPEG (`.jpeg`)
- **couple.jpeg:** Portrait orientation works best — faces should be in the upper 60% as the bottom is covered by the invitation text overlay
- **Gallery photos:** Any orientation — they're cropped to a `155×200px` card in the infinite scroll
- **Missing photos:** Slots without a matching file are hidden automatically, no errors shown

---

## Deployment (Vercel)
1. Add all photos here
2. `git add public/photos/ && git commit -m "Add wedding photos"`
3. `git push` → Vercel auto-deploys ✅
