# 🚀 Mr. Nexora | Personal Portfolio Website

An ultra-modern, responsive, high-performance developer portfolio built with **HTML5, Modern CSS3, and Vanilla JavaScript**, powered by a **100% JSON-driven Single Source of Truth architecture**.

Designed for **Sahan Udara (T.M.S.U. Thennakoon / Mr. Nexora)** — Full-Stack Developer & Cybersecurity Enthusiast.

---

## ✨ Architecture Highlights

- **Single Source of Truth**: All content (projects, blog posts, skills, qualifications, services, social links, personal bio, stats) lives in structured `/data/*.json` files.
- **Zero Framework Bloat**: Pure Vanilla JavaScript with modular ES6 imports (`data-loader.js`, `theme.js`, `modal.js`, `components.js`).
- **GitHub Pages Compatible**: Completely static client-side rendering with zero server or database requirements. Works seamlessly from `https://mr-nexora.github.io/mr-nexora-personal-portfolio/`.
- **Modern Design System**: CSS variables with persistent Dark and Light mode toggle, smooth transitions, mobile drawer navigation, and accessible WCAG-compliant contrasts.
- **Interactive Capabilities**:
  - Live real-time project searching, multi-category pills, and sorting.
  - Accessible Project Details Modal with gallery thumbnail switching and capability lists.
  - Full Blog system with featured story and instant in-page Article Reader Modal.
  - Interactive Developer Experiments (CSS Gradient Studio, Markdown to HTML, Security Base64 token inspector).
  - Validated contact channels with 1-click clipboard copying.

---

## 📂 Project Structure

```text
/
├── index.html            # Main Landing: Hero, Stats, Featured Works, Services, Lab, Testimonials
├── about.html            # Full Biography, Education, Experience, Skills Matrix, Certifications
├── projects.html         # Complete Portfolio with live search, filters, sorting, and detail modals
├── blog.html             # Full Articles catalog, search, categories, and modal article reader
├── contact.html          # Contact channels, one-click copy, and validated interactive message form
│
├── data/                 # 100% Content Data Source (Edit here to update site!)
│   ├── site.json         # Website title, author, SEO metadata
│   ├── personal.json     # Bio, full name, brand, location, focus areas
│   ├── navigation.json   # Header & footer navigation structure
│   ├── projects.json     # All portfolio project items
│   ├── skills.json       # Categorized skills matrix & proficiency percentages
│   ├── services.json     # Professional services offered
│   ├── experience.json   # Work history and independent developer timeline
│   ├── education.json    # Academic degree & university qualifications
│   ├── certifications.json # Verified certifications & specialized courses
│   ├── blog.json         # Technical articles and tutorials
│   ├── resources.json    # Free downloads, UI packs, and starter templates
│   ├── testimonials.json # Recommendations and client feedback
│   ├── social.json       # Social profiles (GitHub, LinkedIn, WhatsApp, Email, etc.)
│   ├── stats.json        # Key metrics and numerical counters
│   └── tools.json        # Interactive developer lab experiments
│
├── css/
│   ├── style.css         # Design tokens, reset, typography, header, footer
│   ├── components.css    # Cards, buttons, modals, badges, search bars, timeline
│   └── responsive.css    # Fluid breakpoints for mobile, tablet, and desktop
│
├── js/
│   ├── app.js            # Master entry point detecting active page
│   ├── data-loader.js    # Memory-cached JSON fetcher with error boundaries
│   ├── theme.js          # Dark/Light theme manager with localStorage
│   ├── navigation.js     # Sticky blur header, mobile drawer, active link indicators
│   ├── modal.js          # Accessible modal system for projects & articles
│   ├── components.js     # Reusable HTML component template generators
│   ├── utils.js          # Toast notifications, copy to clipboard, date formatters
│   ├── home.js           # Homepage controller & animated count-up
│   ├── projects.js       # Projects catalog, search & filtering logic
│   ├── about.js          # About page controller
│   ├── blog.js           # Blog catalog controller & newsletter handler
│   ├── contact.js        # Contact channels & form validation
│   └── tools.js          # Interactive developer lab experiments
│
├── assets/               # Images and icons
├── server.js             # Local development static Express server
├── sitemap.xml           # Search engine sitemap
├── robots.txt            # Search engine directives
└── README.md             # Content management guide
```

---

## 🛠️ Content Management Guide (JSON System)

You never need to edit HTML to update portfolio content! Simply modify the corresponding JSON file in `/data/`:

### 1. How to Add a New Project
Open `data/projects.json` and append a new object to the array:

```json
{
  "id": "proj-07",
  "title": "Cloud Security Scanner",
  "slug": "cloud-security-scanner",
  "shortDescription": "Automated security scanner auditing IAM permissions and open ports.",
  "fullDescription": "In-depth case study of automated cloud vulnerability detection...",
  "category": "Cybersecurity",
  "technologies": ["Python", "Docker", "Security", "Bash"],
  "image": "assets/img/work-4.webp",
  "gallery": ["assets/img/work-4.webp"],
  "github": "https://github.com/mr-nexora",
  "liveDemo": "https://mr-nexora.github.io/mr-nexora-personal-portfolio/",
  "status": "Completed",
  "startDate": "2025-03-01",
  "completionDate": "2025-05-15",
  "featured": true,
  "tags": ["Security", "Python", "Cloud"],
  "features": [
    "Scans misconfigured endpoints",
    "Generates executive PDF compliance report",
    "Automated alerts via Webhook"
  ],
  "role": "Security Researcher",
  "team": "Solo Project",
  "displayOrder": 7
}
```
*The project will immediately appear on the Home featured section, Projects catalog, search, and detail modal!*

### 2. How to Edit or Remove a Project
- **Edit**: In `data/projects.json`, change any field (e.g., set `"featured": false` or change `"title"`).
- **Remove**: Simply delete the project object from the array in `data/projects.json`.

### 3. How to Create & Manage Blog Articles

All blog content is stored in **`data/blog.json`**. The blog system supports both **legacy plain text** and **rich structured content blocks**, alongside automatic **social sharing** and **Copy Link** capabilities.

#### A. Basic Article Schema
Each article object in `data/blog.json` contains:
```json
{
  "id": "blog-06",
  "title": "Understanding Linux Kernel Namespaces",
  "slug": "understanding-linux-kernel-namespaces",
  "excerpt": "A short summary shown on blog cards and used for social sharing and SEO meta descriptions.",
  "category": "Cybersecurity",
  "tags": ["Linux", "Containers", "Security"],
  "image": "assets/img/work-6.webp",
  "author": "Sahan Udara (Mr. Nexora)",
  "date": "2026-01-10",
  "readingTime": "5 min read",
  "featured": false,
  "published": true,
  "content": [ ...structured blocks or plain text string... ]
}
```

#### B. Supported Content Blocks

##### 1. Paragraph with Inline Links & Formatting
You can pass a simple string or an array of formatted inline segments:
```json
{
  "type": "paragraph",
  "content": [
    { "type": "text", "text": "Visit my open-source projects on " },
    { "type": "link", "text": "GitHub (@mr-nexora)", "url": "https://github.com/mr-nexora", "target": "_blank" },
    { "type": "text", "text": " and read the documentation with " },
    { "type": "bold", "text": "high-performance" },
    { "type": "text", "text": " code samples." }
  ]
}
```
*Note: Strings also support standard markdown syntax: `**bold**`, `*italic*`, `` `code` ``, and `[text](url)`!*

##### 2. Headings (Level 2, 3, or 4)
```json
{
  "type": "heading",
  "level": 2,
  "text": "Deep Dive into Modern Web Security"
}
```

##### 3. Lists (Unordered or Ordered)
```json
{
  "type": "list",
  "style": "unordered",
  "items": [
    "Content Security Policy (CSP)",
    "Strict Cross-Origin Resource Sharing (CORS)",
    "Parameterized SQL statements"
  ]
}
```
*(For numbered lists, set `"style": "ordered"`)*

##### 4. Code Blocks (with Language & Copy Button)
```json
{
  "type": "code",
  "language": "javascript",
  "code": "async function fetchData() {\n  const res = await fetch('./data/blog.json');\n  return await res.json();\n}"
}
```

##### 5. Quotes / Blockquotes
```json
{
  "type": "quote",
  "text": "Simplicity is prerequisite for reliability.",
  "author": "Edsger W. Dijkstra"
}
```

##### 6. Images with Captions
```json
{
  "type": "image",
  "src": "assets/img/work-1.webp",
  "alt": "Architecture diagram",
  "caption": "Figure 1: Client-side data flow architecture"
}
```

##### 7. Callout Boxes
```json
{
  "type": "callout",
  "variant": "tip",
  "title": "Pro Tip",
  "text": "Use relative paths like ./data/ to ensure complete GitHub Pages compatibility."
}
```
*(Supported variants: `"info"`, `"tip"`, `"warning"`)*

##### 8. Dividers
```json
{
  "type": "divider"
}
```

##### 9. Block Link / CTA Button
```json
{
  "type": "link",
  "text": "Explore Full Source on GitHub",
  "url": "https://github.com/mr-nexora",
  "target": "_blank"
}
```

---

#### C. Social Sharing & Copy Link
Every article automatically generates a **Share this article** footer bar in the article reader modal:
- **LinkedIn, Twitter / X, Facebook, WhatsApp, Email**: Dynamically pre-populates official share links with the article's URL, title, and excerpt.
- **Copy Link**: Copies the canonical URL (`blog.html?post=article-slug`) to clipboard and flashes a green checkmark + toast notification.
- **Deep Linking**: Visiting `blog.html?post=my-article-slug` directly opens the reader modal automatically!
- **Dynamic SEO**: Opening an article dynamically updates `document.title`, `meta[name="description"]`, OpenGraph tags (`og:title`, `og:description`, `og:image`, `og:url`), and Twitter cards. Closing the modal restores original page metadata.

### 4. How to Add or Update a Skill
Open `data/skills.json`. Find the category (e.g. `frontend`, `backend`, `cybersecurity`) and update the percentage or add a new skill object:

```json
{
  "id": "skill-docker",
  "name": "Docker & Container Security",
  "category": "cybersecurity",
  "icon": "uil uil-box",
  "level": "Proficient",
  "percentage": 80,
  "description": "Container image scanning, multi-stage builds, and non-root runtime environments.",
  "technologies": ["Docker", "Containers", "DevSecOps"]
}
```

### 5. How to Add a Certification
Open `data/certifications.json` and add:

```json
{
  "id": "cert-07",
  "title": "Certified Ethical Hacker (CEH) Track",
  "organization": "Security Learning Program",
  "date": "2026",
  "category": "certification",
  "certificateId": "CEH-TRACK-2026",
  "certificateUrl": "https://example.com/verify",
  "image": "assets/img/work-4.webp",
  "skills": ["Penetration Testing", "Network Analysis", "Metasploit"],
  "description": "Practical coursework in defensive network hardening and vulnerability analysis."
}
```

### 6. How to Add a Service
Open `data/services.json` and add:

```json
{
  "id": "srv-07",
  "title": "API Architecture & Security Consultation",
  "description": "Designing high-throughput, protected REST and GraphQL gateways.",
  "icon": "uil uil-shield-slash",
  "features": [
    "Rate-limiting and DDoS mitigation",
    "JWT token lifecycle planning",
    "API documentation via Swagger / OpenAPI"
  ],
  "technologies": ["Node.js", "Express", "Security", "REST"],
  "startingPrice": "Project Quote",
  "available": true
}
```

### 7. How to Add Work Experience or Education
- **Experience**: Edit `data/experience.json` (company, position, dates, responsibilities).
- **Education**: Edit `data/education.json` (institution, program, degree, field, dates).

### 8. How to Update Social Links & Contact Info
- **Social profiles**: Edit `data/social.json` to change URLs, handles, or add platforms.
- **Personal contact details**: Edit `data/personal.json` (email, phone, location, work status, freelance status).

### 9. How to Change Statistics
Edit `data/stats.json`. You can provide fixed values or assign `"dynamicKey": "totalProjects"` to have the site calculate exact counts dynamically from `projects.json`!

### 10. How to Add Resources
Open `data/resources.json` and add a new template, component, or code snippet object.

---

## 💻 Local Development

Run the lightweight development server:

```bash
npm install
npm run dev
```

Visit: `http://localhost:3000`

---

## ⚖️ Copyright & Notice

**© 2026 T.M.S.U. Thennakoon (Sahan Udara / Mr. Nexora). All Rights Reserved.**
Strictly personal portfolio showcase and demonstration purposes.
