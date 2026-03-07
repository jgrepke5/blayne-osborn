# Blayne Osborn for Nevada Assembly 39

Campaign website for Republican Assemblyman Blayne Osborn.

## Quick Start - Local Preview

To preview the site locally, you can simply open `index.html` in your web browser, or use a local server:

```bash
# Using Python (most Macs have this)
cd /Users/jonahgrepke/Blayne
python3 -m http.server 8000
# Then open http://localhost:8000 in your browser
```

## Deployment to GitHub Pages (Free)

### Step 1: Create a GitHub Account
If you don't have one, go to [github.com](https://github.com) and sign up (free).

### Step 2: Create a New Repository
1. Click the **+** icon in the top right → **New repository**
2. Name it: `blayneosborn` (or any name you want)
3. Set to **Public**
4. Click **Create repository**

### Step 3: Upload the Files
**Option A: Using GitHub Web Interface (Easiest)**
1. On your new repository page, click **uploading an existing file**
2. Drag and drop ALL files from the `/Users/jonahgrepke/Blayne/` folder
3. Click **Commit changes**

**Option B: Using Git Command Line**
```bash
cd /Users/jonahgrepke/Blayne
git init
git add .
git commit -m "Initial campaign website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/blayneosborn.git
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** (tab at the top)
3. Scroll down to **Pages** (left sidebar)
4. Under "Source", select **main** branch
5. Click **Save**
6. Wait 1-2 minutes, then your site will be live at:
   `https://YOUR_USERNAME.github.io/blayneosborn/`

### Step 5: Connect Your Custom Domain (Optional)
1. In your domain registrar (GoDaddy, Namecheap, etc.), add these DNS records:
   - Type: `CNAME`
   - Name: `www`
   - Value: `YOUR_USERNAME.github.io`
   
   For apex domain (blayneosborn.com without www):
   - Type: `A`
   - Name: `@`
   - Values: 
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

2. In GitHub Pages settings, enter your custom domain: `blayneosborn.com`
3. Check "Enforce HTTPS"

## Setting Up the Contact Form

The contact form currently points to Formspree. To make it work:

### Option 1: Formspree (Free - 50 submissions/month)
1. Go to [formspree.io](https://formspree.io)
2. Sign up for free
3. Create a new form
4. Copy your form ID (looks like `xyzabcde`)
5. In `index.html`, replace `YOUR_FORM_ID` with your actual ID:
   ```html
   <form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Option 2: Basin (Free - 100 submissions/month)
1. Go to [usebasin.com](https://usebasin.com)
2. Create a free account
3. Create a new form endpoint
4. Replace the form action URL in `index.html`

### Option 3: Netlify Forms (Free with Netlify hosting)
If you deploy to Netlify instead of GitHub Pages, just add `netlify` attribute to the form:
```html
<form class="contact-form" netlify>
```

## File Structure

```
Blayne/
├── index.html          # Main homepage
├── privacy.html        # Privacy policy page
├── styles.css          # All styling
├── script.js           # Navigation & form handling
├── images/
│   ├── logo.png
│   ├── hero-parade.jpg
│   ├── headshot-formal.jpg
│   ├── committee.jpg
│   ├── with-governor.jpg
│   ├── nevada-assembly-republicans.png
│   └── lyon-county-republicans.png
├── README.md           # This file
└── homepage-content.md # Content reference document
```

## Updating Content

### To change text:
Edit `index.html` directly. The file is well-commented.

### To add the major endorsement:
1. Add the endorsement logo to `images/` folder
2. In `index.html`, find the endorsement placeholder section and replace:
```html
<div class="endorsement-logo endorsement-placeholder">
    <span>Major Endorsement<br>Coming Soon</span>
</div>
```
With:
```html
<div class="endorsement-logo">
    <img src="images/new-endorsement-logo.png" alt="Endorsement Name">
</div>
```

### To change colors:
Edit the CSS variables at the top of `styles.css`:
```css
:root {
    --color-navy: #1B3A5C;
    --color-red: #9B2335;
    /* etc. */
}
```

## Support

For technical issues with the website, the code is standard HTML/CSS/JavaScript and can be edited by any web developer.

---

**Paid for by Blayne Osborn for Nevada**
