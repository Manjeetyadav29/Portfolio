# Manjeet Yadav Portfolio — Complete Setup Guide

## Table of Contents
1. [Do I Need a Backend?](#1-do-i-need-a-backend)
2. [Contact Form → Google Sheets Setup](#2-contact-form--google-sheets-setup)
3. [What to Add in Assets](#3-what-to-add-in-assets)
4. [How to Add/Change Your Projects](#4-how-to-addchange-your-projects)
5. [How to Add/Change Blog Posts](#5-how-to-addchange-blog-posts)
6. [How to Update Your Personal Info](#6-how-to-update-your-personal-info)
7. [Deployment Guide](#7-deployment-guide)

---

## 1. Do I Need a Backend?

**NO! This portfolio runs 100% without a backend.**

| Feature | How It Works | Backend Needed? |
|---------|-------------|-----------------|
| All pages | Static Angular SSR (prerendered HTML) | No |
| Contact form | Google Sheets via Apps Script | No |
| Blog posts | Static data in TypeScript files | No |
| Case studies | Static data in TypeScript files | No |
| Theme toggle | localStorage (browser storage) | No |
| SEO meta tags | Angular SSR renders them server-side | No |

The only external service you need is a **free Google Sheet** for contact form data.

---

## 2. Contact Form → Google Sheets Setup

### Step-by-step:

#### Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Portfolio Contact Form"
4. In Row 1, add these headers:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Email`
   - D1: `Subject`
   - E1: `Message`

#### Step 2: Add Apps Script
1. In Google Sheets, go to **Extensions → Apps Script**
2. Delete any existing code
3. Paste this:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.subject,
    data.message
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Click **Save** (Ctrl+S)

#### Step 3: Deploy
1. Click **Deploy → New Deployment**
2. Click the gear icon → Select **Web App**
3. Settings:
   - Description: "Portfolio Contact Form"
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. Click **Authorize access** → Choose your Google account → Allow
6. **Copy the Web App URL** (looks like `https://script.google.com/macros/s/xxx/exec`)

#### Step 4: Add URL to Your Code
Open `src/app/services/contact-form.service.ts` and replace:
```typescript
private readonly GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
```
With your actual URL:
```typescript
private readonly GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

**That's it! Every form submission now goes to your Google Sheet.**

---

## 3. What to Add in Assets

### `src/assets/images/` — Add these files:

| File | Purpose | Recommended Size |
|------|---------|-----------------|
| `og-default.jpg` | Social sharing preview image (when someone shares your link on LinkedIn/Twitter) | 1200 x 630 px |
| `profile.jpg` | Your professional photo (optional, for About page) | 400 x 400 px |
| `hero-bg.webp` | Hero section background (optional) | 1920 x 1080 px |

**Tips:**
- Use **WebP format** for better performance (smaller files)
- Optimize images at [squoosh.app](https://squoosh.app) or [tinypng.com](https://tinypng.com)
- Keep each image under 200KB

### `src/assets/icons/` — Add these files:

| File | Purpose |
|------|---------|
| `favicon.ico` | Browser tab icon (16x16 and 32x32) |
| `favicon-16x16.png` | Small favicon |
| `favicon-32x32.png` | Regular favicon |
| `apple-touch-icon.png` | iOS home screen icon (180x180) |
| `android-chrome-192x192.png` | Android icon |

**How to generate all favicons:**
1. Go to [favicon.io](https://favicon.io)
2. Upload your logo or generate from text "MY"
3. Download the zip — it contains all sizes
4. Copy files to `src/assets/icons/`
5. Copy `favicon.ico` to `public/` folder

### `src/assets/` — Other files:

| File | Purpose |
|------|---------|
| `Manjeet_Yadav_Resume.pdf` | Your resume for the "Download Resume" button |

---

## 4. How to Add/Change Your Projects

### File: `src/app/features/case-studies/data/case-studies.data.ts`

This is the **ONLY file you need to edit** to add/remove/modify projects.

### To add a new project:

Add a new object to the `CASE_STUDIES_DATA` array:

```typescript
{
  slug: 'my-new-project',           // URL-friendly name (used in /case-studies/my-new-project)
  title: 'My New Project',
  subtitle: 'Project Category',
  description: 'Brief one-line description of the project.',
  challenge: 'What problem did this project solve?',
  solution: 'How did you solve it?',
  architecture: 'What architecture/patterns did you use?',
  results: [
    { label: 'Metric Name', before: 'Old Value', after: 'New Value', improvement: 'X% better' },
    // Add 3-4 metrics
  ],
  technologies: ['Angular', 'TypeScript', 'etc'],
  codeSnippet: `// Optional code example
export class MyComponent {}`,
  year: 2024
},
```

### To remove a project:
Simply delete its object from the array.

### To change order:
Move objects up/down in the array — first item appears first on the page.

### Important: Update sitemap too!
When adding a new project, add its URL to `public/sitemap.xml`:
```xml
<url>
  <loc>https://yourdomain.com/case-studies/my-new-project</loc>
  <changefreq>yearly</changefreq>
  <priority>0.7</priority>
</url>
```

---

## 5. How to Add/Change Blog Posts

### File: `src/app/features/blog/data/blog.data.ts`

Same pattern as case studies. Add a new object:

```typescript
{
  slug: 'my-blog-post',
  title: 'My Blog Post Title',
  excerpt: 'Short description shown on the blog listing page.',
  content: `
<h2>Your HTML Content Here</h2>
<p>Write your blog post in HTML format.</p>
<pre><code>// Code examples work too</code></pre>
  `,
  publishedDate: '2024-12-01',
  tags: ['Angular', 'TypeScript'],
  readingTime: 5,
},
```

---

## 6. How to Update Your Personal Info

### File: `src/app/core/constants/app.constants.ts`

Update ALL placeholders:

```typescript
export const APP_CONSTANTS = {
  siteName: 'Manjeet Yadav',
  siteUrl: 'https://your-actual-domain.com',  // Your deployed URL

  social: {
    email: 'your-real-email@gmail.com',
    linkedin: 'https://linkedin.com/in/your-real-profile',
    github: 'https://github.com/your-real-username',
  },

  meta: {
    twitterHandle: '@your_real_handle',
  },

  resume: {
    downloadUrl: '/assets/Manjeet_Yadav_Resume.pdf',
  }
} as const;
```

Also update:
- `src/environments/environment.prod.ts` — `siteUrl`
- `public/robots.txt` — Sitemap URL
- `public/sitemap.xml` — All `<loc>` URLs

---

## 7. Deployment Guide

### Option A: Vercel (RECOMMENDED — Best for Angular SSR)

**Free tier, automatic SSL, instant deploys, global CDN.**

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Build the project
npm run build:prod

# 3. Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: manjeet-yadav-portfolio
# - Directory: ./
# - Override settings? No
```

Or connect your GitHub repo:
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repo
4. Build settings:
   - Framework: Angular
   - Build command: `npm run build:prod`
   - Output directory: `dist/manjeet-yadav-portfolio`
5. Deploy!

### Option B: Netlify (Good for static)

```bash
# 1. Build
npm run build:prod

# 2. Install Netlify CLI
npm install -g netlify-cli

# 3. Deploy
netlify deploy --prod --dir=dist/manjeet-yadav-portfolio/browser
```

For SSR on Netlify, you'd need the Netlify adapter (more complex). For a portfolio, static prerendered output works great.

### Option C: Firebase Hosting

```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Initialize
firebase init hosting
# - Public directory: dist/manjeet-yadav-portfolio/browser
# - Single-page app: Yes
# - Overwrite index.html: No

# 4. Build
npm run build:prod

# 5. Deploy
firebase deploy
```

### Option D: GitHub Pages (Simplest, free)

```bash
# 1. Build for static
npm run build:prod

# 2. The output in dist/manjeet-yadav-portfolio/browser/ can be
#    deployed to any static host including GitHub Pages

# 3. Use the 'angular-cli-ghpages' package:
npm install -g angular-cli-ghpages
npx ngh --dir=dist/manjeet-yadav-portfolio/browser
```

### My Recommendation:

| Platform | SSR Support | Free SSL | Custom Domain | Difficulty |
|----------|-------------|----------|---------------|------------|
| **Vercel** | Yes (best) | Yes | Yes | Easy |
| Netlify | Partial | Yes | Yes | Easy |
| Firebase | Yes | Yes | Yes | Medium |
| GitHub Pages | No (static only) | Yes | Yes | Easiest |

**Go with Vercel** — it natively supports Angular SSR, has the best free tier, and deploys in seconds.
