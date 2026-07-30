# SPS Web & Digital — Client Site Starter

A reusable Eleventy + Decap CMS starter. Fork it per client, swap the content
and images, re-skin the colours, and the client gets their own login to edit
text and photos while the design and SEO stay locked to you.

The current content is the iRetreat concept, so this repo doubles as that build.

---

## What lives where

    src/
      _data/
        home.yml     Client-editable content (this is what Decap writes to)
        seo.yml      Title, meta, schema  -> LOCKED to you, not in the CMS
        site.yml     Base URL             -> LOCKED to you, not in the CMS
      _includes/
        head.njk     SEO tags, Open Graph, LocalBusiness schema, fonts, CSS
      css/
        styles.css   The whole design. Brand colours are the first variables.
      images/        Real image files (fast, good for SEO)
      admin/
        index.html   Loads the Decap panel
        config.yml   Defines exactly what the client can edit
      index.njk      The page template (design + placeholders)
      sitemap.njk    Generates /sitemap.xml
      robots.njk     Generates /robots.txt
    .eleventy.js     Build config
    netlify.toml     Tells Netlify how to build

The client only ever sees the fields listed in `src/admin/config.yml`.
Because `seo.yml` and `site.yml` are not listed there, they can't touch SEO,
schema, or the domain. You edit those in the repo.

---

## Run it locally

You need Node.js 18 or newer.

    npm install
    npm start

Open http://localhost:8080 to see the site.
The admin panel is at http://localhost:8080/admin (login works once deployed,
see auth below).

Build for production:

    npm run build      # outputs to _site/

---

## Deploy to Netlify

1. Push this repo to GitHub.
2. In Netlify: New site from Git, pick the repo. Build command and publish
   folder are already set in `netlify.toml` (`npm run build` -> `_site`).
3. Point the client's domain at the Netlify site.

---

## Client login (DecapBridge)

Netlify Identity is deprecated, so auth is handled by DecapBridge (free at this
scale). One-time per site:

1. Go to https://decapbridge.com and connect this GitHub repo.
2. It gives you two URLs. Paste them into `src/admin/config.yml` in place of the
   placeholders under `backend:` (`identity_url` and the site id).
3. Invite the client by email from the DecapBridge dashboard.
4. They set a password, go to `yourdomain/admin`, and edit. Every save commits
   to GitHub and Netlify rebuilds automatically (live in about a minute).

---

## Spinning up the NEXT client (the reusable bit)

1. Duplicate this repo.
2. Replace the photos in `src/images/` and the logo.
3. Rewrite `src/_data/home.yml` with their content.
4. Fill in `src/_data/seo.yml` and `src/_data/site.yml` (title, description,
   their address, lat/long for the schema, their domain).
5. Re-skin: change the two brand colours at the top of `src/css/styles.css`
   (`--green` and `--green-deep`) and the font links in `head.njk` if needed.
6. Deploy, connect DecapBridge, invite the client.

Layout and structure carry over untouched, so after the first one this is a
few hours, not a rebuild.

---

## Notes

- Single page by design. Extra pages (About, Contact, blog) are a later add-on:
  create a new `.njk` file, a matching data file, and a new entry in
  `config.yml`.
- Keep the gallery at 7 photos and in order; the layout assigns each position a
  specific size.
- The enquiry form is presentation only. Wire it to Netlify Forms or GHL before
  go-live.
