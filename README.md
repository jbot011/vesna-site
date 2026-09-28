# VESNA site

## Adding Motion Monday videos

The Motion Monday grid is controlled by `motion.json` when the site is hosted on GitHub Pages.

To add a new video:

1. Put the new MP4 in the `assets` folder.
2. Open `motion.json`.
3. Add another entry with the MP4 filename.
4. Commit and push both files to GitHub.

Example:

```json
[
  {"file": "motion-01.mp4"},
  {"file": "motion-02.mp4"},
  {"file": "motion-03.mp4"},
  {"file": "motion-04.mp4"}
]
```

The order in `motion.json` is the order shown on the site.

Optional `alt` text can also be included for accessibility.

Important: when `index.html` is opened directly from your computer with a `file://` address, most browsers block JavaScript from fetching a local JSON file. In that case the original three videos remain as a preview fallback. Once uploaded to GitHub Pages, `motion.json` populates the grid automatically.
