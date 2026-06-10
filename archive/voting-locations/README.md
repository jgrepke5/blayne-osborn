# Voting Locations Archive

2026 primary election voting map pins and the Map Key have been removed from the live site. The district boundary map remains active.

## Contents

- `map-legend.js` — Map Key control (pin colors and mail dropoff icon)
- `map-legend.css` — Styles for the Map Key

Live data templates (empty, ready for new entries) remain at the project root:

- `voting-locations-data.js`
- `mail-ballot-dropoff-data.js`

## Restoring locations and map key

1. Add location entries to `voting-locations-data.js` and/or `mail-ballot-dropoff-data.js`.
2. Copy the legend block from `map-legend.js` into `map.js` (after marker setup).
3. Copy styles from `map-legend.css` into `styles.css`, or link the CSS file in `index.html`.
