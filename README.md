# Dynamic Portfolio Template Engine

A fully data-driven, reusable portfolio template powered by SheetJS. Change Excel files to completely update the site without touching any source code.

# Portfolio Link

https://ahmed1-makled1.github.io/portfolio/

## 🚀 Features

- **Data-Driven Architecture**: All content loaded from Excel files
- **3D Flip Card Projects**: Interactive project cards with smooth animations
- **Project Galleries**: Click on any project image to open a gallery of multiple screenshots
- **Certificate Lightbox**: Modal with zoom controls for certificates
- **Freelance Platforms Section**: Showcase your freelance profiles
- **Dark Mode Support**: Native dark/light theme toggle
- **Fully Responsive**: Works on all devices
- **Zero Code Changes**: Update content by editing Excel files only
- **Loading States**: Skeleton loaders while data fetches
- **Error Handling**: Graceful fallbacks for missing data

## 📁 Folder Structure

```
portfolio/
├── assets/
│   ├── images/          # Profile image, logos
│   ├── cv/              # Resume/CV files
│   ├── certificates/    # Certificate images
│   └── projects/        # Project screenshots
├── css/
│   ├── style.css        # Main stylesheet
│   ├── layout.css       # Layouts and grids
│   └── theme.css        # Theme variables and colors
├── data/                # Excel data files
│   ├── profile.xlsx
│   ├── skills.xlsx
│   ├── experience.xlsx
│   ├── education.xlsx
│   ├── services.xlsx
│   ├── freelance-platforms.xlsx
│   ├── certificates.xlsx
│   ├── social-links.xlsx
│   └── projects.xlsx
├── js/
│   ├── data-loader.js   # SheetJS data parsing
│   ├── renderers.js     # Dynamic rendering functions
│   └── main.js          # Application entry point
└── index.html           # Main HTML file
```

## 📊 Excel Data Schemas

### profile.xlsx
Personal information and contact details.

| Column | Description | Example |
|--------|-------------|---------|
| Name | Full name | Ahmed Makled |
| Title | Job title | Flutter Mobile Application Developer |
| Description | Short tagline/description | Mobile App Developer |
| AvatarPath | Path to profile image | assets/images/profile.jpg |
| About | About description | I'm a professional Flutter Developer... |
| Email | Email address | ahmed@example.com |
| Phone | Phone number | +201009269051 |
| WhatsApp | WhatsApp number | +201009269051 |
| Location | Location | Egypt |
| CVPath | Path to CV file | assets/cv/Ahmed_Makled_CV.pdf |
| CVVersion | CV version | v1.0 |
| CVLastUpdated | Last updated date | 2026-01-15 |

### skills.xlsx
Skills grouped by categories.

| Column | Description | Example |
|--------|-------------|---------|
| Category | Skill category | Core Skills |
| SkillName | Individual skill | Flutter & Dart |

### experience.xlsx
Work experience timeline.

| Column | Description | Example |
|--------|-------------|---------|
| Company | Company name | Digital Egypt Pioneers Initiative |
| Position | Job position | Cross-Platform Mobile App Development |
| StartDate | Start date | 07/2025 |
| EndDate | End date | Present |
| Description | Job description | Intensive training program... |
| LogoPath | Company logo path (optional) | assets/images/company-logo.png |

### education.xlsx
Education timeline.

| Column | Description | Example |
|--------|-------------|---------|
| Degree | Degree name | B.Sc. of Information Technology |
| Dates | Date range | 2022 – 2026 |
| Description | Description | Bachelor's degree focusing on... |
| Institution | Institution name | Damietta University |

### services.xlsx
Services offered.

| Column | Description | Example |
|--------|-------------|---------|
| ServiceName | Service name | Mobile UI/UX Design |
| IconClass | Font Awesome icon class | fa-solid fa-mobile-screen-button |
| Description | Service description | Design intuitive mobile interfaces... |

### freelance-platforms.xlsx
Freelance platform profiles.

| Column | Description | Example |
|--------|-------------|---------|
| PlatformName | Platform name | Upwork |
| LogoPath | Platform logo path | assets/images/upwork-logo.png |
| ProfileURL | Profile URL | https://www.upwork.com/freelancers/~ |
| Description | Description | Professional freelance profile... |

### certificates.xlsx
Certificates and certifications.

| Column | Description | Example |
|--------|-------------|---------|
| Title | Certificate title | Flutter Development Certification |
| Issuer | Issuing organization | Google |
| Date | Date obtained | 2025 |
| Description | Description | Comprehensive Flutter course... |
| ImagePath | Certificate image path | assets/certificates/flutter-cert.png |

### social-links.xlsx
Social media links.

| Column | Description | Example |
|--------|-------------|---------|
| PlatformName | Platform name | LinkedIn |
| URL | Profile URL | https://linkedin.com/in/username |
| IconClass | Font Awesome icon class | fa-brands fa-linkedin-in |

### projects.xlsx
Project portfolio with flip cards and image galleries.

| Column | Description | Example |
|--------|-------------|---------|
| Name | Project name | Weather App |
| ShortDesc | Short description | Search any city worldwide... |
| LongDesc | Detailed description | A comprehensive weather app... |
| TechStack | Technologies (comma-separated) | Flutter, API Integration, Provider |
| FrontImages | Project images (comma-separated) | assets/projects/img1.png, assets/projects/img2.png |
| Features | Features (comma-separated) | Search cities,7-day forecast,Clean UI |
| GitHubURL | GitHub repository URL | https://github.com/user/repo |
| LiveURL | Live demo URL | https://demo.example.com |
| PlayStoreURL | Play Store URL | https://play.google.com/... |
| AppStoreURL | App Store URL | https://apps.apple.com/... |
| DocPath | Documentation path | assets/docs/project-doc.pdf |

## 🛠️ Setup Instructions

### For Non-Technical Users

1. **Replace Data Files**
   - Open the `/data` folder
   - Edit the XLSX files with your information
   - You can open them directly in Excel or Google Sheets
   - Save your changes

2. **Replace Assets**
   - Place your profile image in `/assets/images/`
   - Place your CV in `/assets/cv/`
   - Place certificate images in `/assets/certificates/`
   - Place project screenshots in `/assets/projects/`
   - Update the paths in the XLSX files to match your file names

3. **Deploy**
   - Upload the entire folder to any web host (GitHub Pages, Netlify, Vercel, etc.)
   - No code changes required!

### For Developers

1. **Clone or download the project**

2. **Local Development**
   - Use a local server (e.g., `python -m http.server` or VS Code Live Server)
   - Open `index.html` in your browser
   - The portfolio will load data from Excel files automatically

3. **Customization**
   - Edit CSS variables in `css/theme.css` to change colors
   - Modify `js/renderers.js` to change rendering logic
   - Add new sections by extending the data files and renderers

## 🎨 Customization Guide

### Changing Colors

Edit the CSS variables in `css/theme.css` to change colors, gradients, and backgrounds for both Light and Dark modes:

```css
:root {
    /* Brand Colors */
    --primary: #4f46e5;            /* Modern Indigo */
    --primary-hover: #4338ca;      /* Deep Indigo */
    --accent: #06b6d4;             /* Accent color (Cyan) */
    
    /* Backgrounds */
    --bg-main: #f8fafc;            /* Solid main background fallback */
    /* ... */
}

/* --- Dark Mode Override --- */
.dark-mode {
    --primary: #818cf8;            /* Light Indigo */
    /* ... */
}
```

### Adding New Skills Categories

Simply add a new category name in the `skills.xlsx` file under the `Category` column. The system will automatically group and render skills by category.

### Adding New Projects

1. Add a new row to `projects.xlsx`
2. Fill in the required columns
3. Add your project images to `/assets/projects/`
4. Update the `FrontImages` path in the Excel file (separate multiple images with a comma)
5. The project card and image gallery will appear automatically

### Adding Social Links

Add a new row to `social-links.xlsx` with:
- PlatformName: Name of the platform
- URL: Your profile URL
- IconClass: Font Awesome icon class (find icons at https://fontawesome.com/icons)

Special handling:
- **WhatsApp**: URL will be automatically converted to wa.me format
- **Email**: URL will be automatically converted to mailto: format

## 📱 Features Explained

### 3D Flip Card Projects

- **Front Side**: Shows project cover image, name, short description, and tech stack badges
- **Image Gallery**: Click on the project image to open a full-screen gallery with navigation arrows
- **Back Side**: Click the card to flip and see detailed description, features list, and action buttons
- **Conditional Buttons**: Only shows buttons for links that exist (GitHub, Live Demo, App Stores, Docs)

### Lightbox (Certificates & Project Galleries)

- Click any certificate card or project image to open a full-size modal
- Use left/right arrows to navigate between images in a gallery
- Use zoom in/out buttons or keyboard (+/-) to zoom
- Press Escape or click outside to close
- Backdrop blur effect for modern look

### CV Download

- CV download button appears in Hero and Contact sections
- Only renders if `CVPath` is specified in `profile.xlsx`
- Supports PDF, DOCX, and other document formats

### Dark Mode

- Toggle button in navigation bar
- Preference saved in localStorage
- Persists across sessions

## 🔧 Troubleshooting

### Data Not Loading

- Ensure all `.xlsx` files are in the `/data` folder
- Check browser console for errors (F12)
- Verify file paths in Excel files match actual asset locations
- Use a local server (not file:// protocol) for proper data loading

### Images Not Showing

- Check image paths in Excel files are correct
- Ensure images exist in the correct `/assets/` subfolder
- Verify image file names match exactly (case-sensitive)

### Flip Cards Not Working

- Ensure JavaScript is enabled
- Check browser console for errors
- Verify `renderers.js` is loaded correctly

## 🚀 Deployment Options

### GitHub Pages

1. Create a GitHub repository
2. Upload all files
3. Go to Settings > Pages
4. Select main branch as source
5. Your portfolio will be live at `https://username.github.io/repo-name`

### Netlify

1. Drag and drop the portfolio folder to Netlify
2. Your site will be live instantly

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the portfolio folder
3. Follow the prompts

### Traditional Hosting

1. Upload all files via FTP to your hosting provider
2. Ensure `index.html` is in the public folder
3. Access via your domain

## 📝 License

This template is free to use for personal and commercial projects.

## 🤝 Support

For issues or questions:
- Check the troubleshooting section
- Review browser console for errors
- Ensure all file paths are correct

## 🎯 Best Practices

1. **Keep Excel files organized**: Use consistent formatting
2. **Optimize images**: Compress images before adding to assets
3. **Test locally**: Use a local server before deploying
4. **Backup data**: Keep copies of your `.xlsx` files
5. **Version control**: Use Git to track changes if you're a developer

## 🔄 Updating Content

To update any content:
1. Edit the corresponding `.xlsx` file in the `/data` folder
2. Save the file
3. Refresh your browser
4. Changes appear instantly (no code changes needed!)

## 📊 Data Validation

The template includes error handling:
- Missing files show warnings in console
- Empty fields are hidden automatically
- Missing images show alt text
- Invalid data is gracefully handled

## 🎨 UI Components

### Responsive Grids
- Skills: 3-column grid (auto-adjusts)
- Projects: 3-column grid (auto-adjusts)
- Services: 3-column grid (auto-adjusts)
- Certificates: 3-column grid (auto-adjusts)
- Freelance Platforms: 3-column grid (auto-adjusts)

### Timeline Components
- Experience and Education use vertical timeline
- Automatically scales with content
- Responsive on mobile devices

### Navigation
- Sticky navigation bar
- Mobile hamburger menu
- Smooth scroll to sections
- Dynamic section links (Certificates, Freelance added if data exists)

---

**Built with ❤️ using SheetJS, Vanilla JavaScript, and modern CSS**
