# Wedding Site — Setup Guide

This guide explains how to:
1. Move your site from GitHub Pages to **Netlify** (free, same GitHub repo)
2. Give Arina access to a **visual content editor** at `/admin`

---

## What changed?

All the text content that was hard-coded in `index.html` now lives in **`content.json`**.
The site reads this file automatically when it loads. The CMS lets Arina edit it through a nice visual interface — no code, no JSON, just forms.

---

## Step 1 — Replace files in your GitHub repo

Add/replace these files in the root of your existing repo:

```
index.html          ← rebuilt (renders content from content.json)
styles.css          ← same design, bugs fixed
script.js           ← cleaner, combined loader + RSVP logic
content.json        ← ALL editable content lives here
netlify.toml        ← Netlify configuration
admin/
  index.html        ← Decap CMS entry point
  config.yml        ← CMS field configuration
```

> Your image files (`elnur.jpg`, `arina.jpg`, etc.) don't change — leave them in the repo root.

---

## Step 2 — Update config.yml

Open `admin/config.yml` and replace:

```yaml
repo: YOUR_GITHUB_USERNAME/YOUR_REPO_NAME
```

With your actual GitHub repo, e.g.:

```yaml
repo: elnur/arinaelnur-wedding
```

Commit and push all files.

---

## Step 3 — Connect Netlify

1. Go to [netlify.com](https://netlify.com) and sign up / log in (free)
2. Click **Add new site → Import an existing project**
3. Choose **GitHub** and select your repo
4. Build settings are auto-detected from `netlify.toml` (publish: `.`)
5. Click **Deploy site**

Your site will deploy at a Netlify URL. You can then set your custom domain (arinaelnur.de) in **Site settings → Domain management**.

---

## Step 4 — Enable Netlify Identity (powers the CMS login)

1. In Netlify dashboard → **Site settings → Identity**
2. Click **Enable Identity**
3. Under **Registration**, choose **Invite only**
4. Scroll to **Git Gateway** → click **Enable Git Gateway**

---

## Step 5 — Invite Arina

1. Still in **Identity**, click **Invite users**
2. Enter Arina's email address
3. She'll receive an email → she sets a password → done

---

## Step 6 — Arina edits content

Arina goes to:

```
https://arinaelnur.de/admin
```

She logs in with her email + password and sees a form with all the editable fields:
- Love story paragraphs
- Ceremony schedule
- Planning crew (names, photos, emails, phones)
- FAQ
- Dress code
- RSVP settings (Google Script URL, Gift List URL)

When she saves, Netlify automatically updates `content.json` in the GitHub repo and redeploys the site in ~30 seconds.

---

## Updating real contact info

The current `content.json` has placeholder emails and phone numbers (e.g. `elnur@example.com`).
Update them either:
- **Via the CMS admin panel** (Planning Crew section) — easiest
- **Directly in `content.json`** on GitHub (click the file → pencil icon → edit → commit)

---

## RSVP setup (unchanged from original)

Your Google Apps Script integration is already configured in `content.json` under `rsvp.googleScriptUrl`.
If you need to change it, edit that field in the CMS or directly in `content.json`.

For new setup: paste `google-apps-script.js` into Google Sheets → Extensions → Apps Script, deploy as a Web App, paste the URL into `content.json → rsvp → googleScriptUrl`.

---

## Adding new photos to the crew section

1. Upload the image file to the root of the GitHub repo (drag & drop in the GitHub UI)
2. In the CMS admin, go to Planning Crew and update the photo filename

---

That's it. Questions? The files are all plain text and well-commented.
