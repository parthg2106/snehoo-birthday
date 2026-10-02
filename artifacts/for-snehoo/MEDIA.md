# Media guide

Everything lives in `public/media/` and is described in one file: `src/data/media.ts`.

## Replace a photo
1. Drop the new file into `public/media/` (keep or change the name).
2. In `src/data/media.ts`, update that photo's `src`, `alt`, `width`, `height`, `title`, `caption`.
3. If the file is stored sideways, set `turn: -90` (or `90`). Photos are never cropped.

## Add a photo to "You, in different versions"
Add an entry to `photos`, then add it to the `versions` array.

## Replace or add a video
1. Put the `.mp4` in `public/media/` and (optionally) a poster as `video-N-poster.jpg`.
2. Edit or add an object in the `clips` array (`src`, `poster`, `label`, `title`, `caption`).
Videos start muted, never autoplay, and use `preload="metadata"`.

## Wishes
Edit the `wishes` array in the same file.
