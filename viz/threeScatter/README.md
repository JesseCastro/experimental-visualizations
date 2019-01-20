# Interactive 3d Scatter Plot Using d3.js/three.js

## Background

A webGL based 3d interactive visualization using live data from Google Data Studio.  I used [d3.js][d3_site] for data processing and [three.js][three_site] for rendering the webGL animation.  

## Installation Instructions (without build)
Edit the contents of `dist/manifest.json` to match you GCP bucket.  Then upload the contents of `dist` and use as normal.  

## Build Instructions

Replace "YOUR_DEV_BUCKET" and "YOUR_PROD_BUCKET" in `package.json` file with
your own GCS buckets.


Make sure you have [npm][npm_site] and
[gsutil][gsutil_site] installed locally.



When you first clone this folder, run:
```bash
npm install
```


How to use the scripts:
```bash
# to build the "dev" version
npm run build:dev

# to push to the "dev" bucket
npm run push:dev

# to build & push to the "dev" bucket
npm run deploy:dev

# to build the "prod" version
npm run build:prod

# to push to the "prod" bucket
npm run push:prod

# to build & push to the "prod" bucket
npm run deploy:prod

```


[showcase]: https://developers.google.com/visualization "Community Visualization Gallery"
[npm_site]: https://www.npmjs.com/ "Node Package Manager"
[gsutil_site]: https://cloud.google.com/storage/docs/gsutil "gsutil Tool docs"
[d3_site]: https://d3js.org "D3 Data-driven documents"
[three_site]: https://threejs.org/ "three.js 3d javascript library"
