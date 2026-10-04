# ORYA Global

Source code for the ORYA website, including the interactive ORYA Analytics demo. Built with React, TypeScript and Vite, with an optional Express production server.

## Local development

Use Node.js 22.12 or later and **pnpm 10.4.1**, the version pinned in `package.json`. From the repository root:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Validation and production build:

```sh
pnpm check
pnpm exec vitest run
pnpm build
```

## Deployment

After installing dependencies and building, run the included production server:

```sh
pnpm start
```

It serves `dist/public` and defaults to port **3000**. Set `PORT` to use another port.

Alternatively, publish `dist/public` to a static host. Configure an SPA fallback that serves `index.html` for client-side routes while serving existing asset files normally. Routes are `/`, `/capabilities`, `/work`, `/analytics`, `/about` and `/contact`.

## Demo and contact behavior

The `/analytics` page uses synthetic sales records and guided questions. It does not connect to a live AI service or upload the visitor’s files. Saved demo views stay in this browser’s local storage on the same device and can be removed by clearing the site’s browser data.

The contact form opens an email draft addressed to `contact@orya.global`; the visitor sends that email through their email app. It then opens the [ORYA Cal.com discovery calendar](https://cal.com/contact-orya.global/discoverycall), prefilling the supplied name and email. There is no server-side enquiry submission endpoint.

## Optional configuration and assets

Set both `VITE_ANALYTICS_ENDPOINT` and `VITE_ANALYTICS_WEBSITE_ID` before building to enable the optional analytics script. The script loads from `<VITE_ANALYTICS_ENDPOINT>/umami` only when both values are supplied. These `VITE_` settings are public client configuration.

The original raster logo is not bundled. The shared header and footer display an ORYA text wordmark if the original image cannot load. To use the official raster logo independently of the original storage service, add the asset to `client/public` and update its source reference.
