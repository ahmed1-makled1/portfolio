# Dynamic Portfolio Template Engine

A fully data-driven, reusable portfolio template powered by SheetJS. Change Excel files to completely update the site without touching any source code.

## 🚀 Features

- **Data-Driven Architecture**: All content loaded from Excel/CSV files
- **3D Flip Card Projects**: Interactive project cards with smooth animations
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
├── data/                # Excel/CSV data files
│   ├── profile.csv
│   ├── skills.csv
│   ├── experience.csv
│   ├── education.csv
│   ├── services.csv
│   ├── freelance-platforms.csv
│   ├── certificates.csv
│   ├── social-links.csv
│   └── projects.csv
├── js/
│   ├── data-loader.js   # SheetJS data parsing
│   ├── renderers.js     # Dynamic rendering functions
│   └── main.js          # Application entry point
└── index.html           # Main HTML file
```

## 📊 Excel Data Schemas

### profile.csv
Personal information and contact details.

| Column | Description | Example |
|--------|-------------|---------|
| Name | Full name | Ahmed Makled |
| Title | Job title | Flutter Mobile Application Developer |
| AvatarPath | Path to profile image | assets/images/profile.jpg |
| About | About description | I'm a professional Flutter Developer... |
| Email | Email address | ahmed@example.com |
| Phone | Phone number | +201009269051 |
| WhatsApp | WhatsApp number | +201009269051 |
| Location | Location | Egypt |
| CVPath | Path to CV file | assets/cv/Ahmed_Makled_CV.pdf |
| CVVersion | CV version | v1.0 |
| CVLastUpdated | Last updated date | 2026-01-15 |

### skills.csv
Skills grouped by categories.

| Column | Description | Example |
|--------|-------------|---------|
| Category | Skill category | Core Skills |
| SkillName | Individual skill | Flutter & Dart |

### experience.csv
Work experience timeline.

| Column | Description | Example |
|--------|-------------|---------|
| Company | Company name | Digital Egypt Pioneers Initiative |
| Position | Job position | Cross-Platform Mobile App Development |
| StartDate | Start date | 07/2025 |
| EndDate | End date | Present |
| Description | Job description | Intensive training program... |
| LogoPath | Company logo path (optional) | assets/images/company-logo.png |

### education.csv
Education timeline.

| Column | Description | Example |
|--------|-------------|---------|
| Degree | Degree name | B.Sc. of Information Technology |
| Institution | Institution name | Damietta University |
| Dates | Date range | 2022 – 2026 |
| Description | Description | Bachelor's degree focusing on... |

### services.csv
Services offered.

| Column | Description | Example |
|--------|-------------|---------|
| ServiceName | Service name | Mobile UI/UX Design |
| IconClass | Font Awesome icon class | fa-solid fa-mobile-screen-button |
| Description | Service description | Design intuitive mobile interfaces... |

### freelance-platforms.csv
Freelance platform profiles.

| Column | Description | Example |
|--------|-------------|---------|
| PlatformName | Platform name | Upwork |
| LogoPath | Platform logo path | assets/images/upwork-logo.png |
| ProfileURL | Profile URL | https://www.upwork.com/freelancers/~ |
| Description | Description | Professional freelance profile... |

### certificates.csv
Certificates and certifications.

| Column | Description | Example |
|--------|-------------|---------|
| Title | Certificate title | Flutter Development Certification |
| Issuer | Issuing organization | Google |
| Date | Date obtained | 2025 |
| Description | Description | Comprehensive Flutter course... |
| ImagePath | Certificate image path | assets/certificates/flutter-cert.png |

### social-links.csv
Social media links.

| Column | Description | Example |
|--------|-------------|---------|
| PlatformName | Platform name | LinkedIn |
| URL | Profile URL | https://linkedin.com/in/username |
| IconClass | Font Awesome icon class | fa-brands fa-linkedin-in |

### projects.csv
Project portfolio with flip cards.

| Column | Description | Example |
|--------|-------------|---------|
| Name | Project name | Weather App |
| ShortDesc | Short description | Search any city worldwide... |
| LongDesc | Detailed description | A comprehensive weather app... |
| TechStack | Technologies (comma-separated) | Flutter, API Integration, Provider |
| FrontImage | Project image path | assets/projects/weather-app.png |
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
   - Edit the CSV files with your information
   - You can open CSV files in Excel, Google Sheets, or any spreadsheet editor
   - Save your changes

2. **Replace Assets**
   - Place your profile image in `/assets/images/`
   - Place your CV in `/assets/cv/`
   - Place certificate images in `/assets/certificates/`
   - Place project screenshots in `/assets/projects/`
   - Update the paths in the CSV files to match your file names

3. **Deploy**
   - Upload the entire folder to any web host (GitHub Pages, Netlify, Vercel, etc.)
   - No code changes required!

### For Developers

1. **Clone or download the project**

2. **Local Development**
   - Use a local server (e.g., `python -m http.server` or VS Code Live Server)
   - Open `index.html` in your browser
   - The portfolio will load data from CSV files

3. **Customization**
   - Edit CSS variables in `index.html` to change colors
   - Modify `renderers.js` to change rendering logic
   - Add new sections by extending the data files and renderers

## 🎨 Customization Guide

### Changing Colors

Edit the CSS variables in `index.html`:

```css
:root {
   --bg-main: #f6f9fc;        /* Main background */
   --bg-surface: #ffffff;        /* Card/surface background */
   --primary: #2563eb;        /* Primary accent color */
   --primary-hover: #1d4ed8;        /* Hover color */
   --text-main: #0f172a;         /* Main text color */
   --text-muted: #475569;        /* Muted text color */
   --border-color: #dbe4f0;         /* Border color */
}
```

### Adding New Skills Categories

Simply add a new category name in the `skills.csv` file under the `Category` column. The system will automatically group and render skills by category.

### Adding New Projects

1. Add a new row to `projects.csv`
2. Fill in the required columns
3. Add your project image to `/assets/projects/`
4. Update the `FrontImage` path in the CSV
5. The project card will appear automatically

### Adding Social Links

Add a new row to `social-links.csv` with:
- PlatformName: Name of the platform
- URL: Your profile URL
- IconClass: Font Awesome icon class (find icons at https://fontawesome.com/icons)

Special handling:
- **WhatsApp**: URL will be automatically converted to wa.me format
- **Email**: URL will be automatically converted to mailto: format

## 📱 Features Explained

### 3D Flip Card Projects

- **Front Side**: Shows project image, name, short description, and tech stack badges
- **Back Side**: Click to flip and see detailed description, features list, and action buttons
- **Conditional Buttons**: Only shows buttons for links that exist (GitHub, Live Demo, App Stores, Docs)

### Certificate Lightbox

- Click any certificate card to open a full-size modal
- Use zoom in/out buttons or keyboard (+/-) to zoom
- Press Escape or click outside to close
- Backdrop blur effect for modern look

### CV Download

- CV download button appears in Hero and Contact sections
- Only renders if `CVPath` is specified in `profile.csv`
- Supports PDF, DOCX, and other document formats

### Dark Mode

- Toggle button in navigation bar
- Preference saved in localStorage
- Persists across sessions

## 🔧 Troubleshooting

### Data Not Loading

- Ensure all CSV files are in the `/data` folder
- Check browser console for errors (F12)
- Verify file paths in CSV files match actual asset locations
- Use a local server (not file:// protocol) for proper data loading

### Images Not Showing

- Check image paths in CSV files are correct
- Ensure images exist in the correct `/assets/` subfolder
- Verify image file names match exactly (case-sensitive)

### Flip Cards Not Working

- Ensure JavaScript is enabled
- Check browser console for errors
- Verify `renderers.js` is loaded correctly

## 📄 File Format Notes

### CSV vs Excel

The template uses CSV files by default because:
- Easier to edit in any text editor
- Smaller file size
- Universal compatibility

**To use Excel (.xlsx) files instead:**
1. Open CSV in Excel
2. Save as .xlsx
3. Update the filename in `data-loader.js` from `.csv` to `.xlsx`
4. SheetJS handles both formats automatically

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

1. **Keep CSV files organized**: Use consistent formatting
2. **Optimize images**: Compress images before adding to assets
3. **Test locally**: Use a local server before deploying
4. **Backup data**: Keep copies of your CSV files
5. **Version control**: Use Git to track changes if you're a developer

## 🔄 Updating Content

To update any content:
1. Edit the corresponding CSV file
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
- Projects: 2-column grid (auto-adjusts)
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
