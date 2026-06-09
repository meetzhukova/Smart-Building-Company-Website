# Tech Forward Builders

**Diploma project · VG2 IT Development · Grade 6**

A full-stack frontend solution for a fictional smart building construction company — combining a public marketing website with an internal employee portal for IoT device management on active construction sites.

---

## About the Project

**Tech Forward Builders** is a Norwegian company specialising in smart buildings, IoT technology, building automation, and on-site equipment testing. This project was developed as my diploma assignment and received the highest grade — **6** on the Norwegian grading scale (1–6), demonstrating web development, UI/UX design, and information architecture using HTML, CSS, and JavaScript.

The solution is split into two connected parts: a **public website** that presents the company to clients, and an **employee portal** where staff manage IoT devices in real time.

---

## Company Challenges & Solutions

### Challenges

| Challenge | Description |
|-----------|-------------|
| **No digital presence** | The company needed a modern website to communicate its services, showcase completed projects, and attract new clients in the smart construction market. |
| **Scattered device data** | IoT sensors and controllers across construction sites were tracked manually — no single place to see what was installed, where, or in what condition. |
| **No real-time visibility** | Technicians had no quick way to check whether devices were online, under testing, or needed maintenance. |
| **No accountability** | When a device was registered on site, there was no record of who added it or when. |

### Solutions

| Solution | How it works |
|----------|--------------|
| **Public website** | A single-page marketing site with clear sections — hero, features, services, projects, and contact — giving the company a professional online identity. |
| **Employee portal** | A password-protected internal system where staff log in, view all devices, register new ones, and monitor status from any browser. |
| **Cloud database** | Device data is stored in **Firebase Firestore**, so updates sync in real time across all portal pages without reloading. |
| **Search & filters** | The Devices page lets employees search by name, type, location, or notes, and filter by status (Online, Testing, Maintenance, Offline). |
| **Registration tracking** | Each new device automatically records the name of the employee who registered it. |

---

## Part 1 — Public Website

**File:** `index.html`

The landing page is designed as a **1920px canvas** with **80px side margins**, built for a clean, premium construction-tech aesthetic.

### Sections

- **Home** — Full-screen hero with company tagline and call-to-action
- **Features** — 8 key benefits of smart construction (monitoring, automation, security, energy efficiency, and more)
- **Services** — 4 core solutions: smart lighting, building monitoring, security & access control, energy management
- **Projects** — Portfolio of 3 completed smart building projects
- **Contact** — Contact form and company details in the footer

### Design & Style

- **Typography:** Helvetica Neue — light weight for body, bold for headings
- **Accent colour:** `#FDA246` (warm orange) used for highlights and CTAs
- **Layout:** Flexbox-based; alternating dark and light sections
- **Hero:** Full-bleed background image with a subtle gradient overlay
- **Navigation:** Pill-shaped nav links with smooth scroll between sections (`javascript/scroll.js`)
- **Assets:** Custom SVG logos, project images, and button graphics exported from the design file

---

## Part 2 — Employee Portal

**Folder:** `portal/`

An internal dashboard for employees to manage IoT devices on construction sites. Access is restricted — unauthenticated users are redirected to the login page.

### Pages

| Page | File | Purpose |
|------|------|---------|
| Login | `portal/login.html` | Employee sign-in with demo accounts |
| Dashboard | `portal/portal.html` | Overview stats + recent devices table |
| Devices | `portal/equipment.html` | Full device list with search, edit, delete, and notes |
| Register | `portal/register.html` | Add a new device to the system |
| Status | `portal/status.html` | Visual card grid grouped by device status |
| Database | `portal/database.html` | Raw view of all Firestore records |

### How It Works

```
Visitor → index.html → Employee Portal → login.html
                                              ↓
                                    sessionStorage (user session)
                                              ↓
                                    portal.html (dashboard)
                                              ↓
                          Register / Devices / Status / Database
                                              ↓
                                    Firebase Firestore (devices)
```

1. **Login** — Email and password are validated against a built-in user list. On success, the user object is saved to `sessionStorage`.
2. **Auth guard** — Every portal page loads `portal/js/auth.js`, which checks for an active session and redirects to login if none exists.
3. **CRUD operations** — Devices are stored in a Firestore collection called `devices`:
   - **Create** — Register page (`addDoc`)
   - **Read** — All pages listen with `onSnapshot` for live updates
   - **Update** — Edit modal on Devices page (`updateDoc`)
   - **Delete** — Delete button on Devices page (`deleteDoc`)
4. **Logout** — Clears the session and returns to the login page.

### Portal Design

- **Layout:** Dark sidebar (`#0f172a`) + light content area (`#f3f4f6`)
- **Navigation:** Icon-based sidebar with active state highlight (`#2563eb`)
- **Tables:** White cards with status pills — green (Online), red (Offline), orange (Testing), blue (Maintenance)
- **Modals:** Edit device and view notes without leaving the page

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `erik@techforward.no` | `admin123` |
| Technician | `sofia@techforward.no` | `tech123` |

---

## Technologies

| Layer | Stack |
|-------|-------|
| Markup | HTML5 (semantic structure, accessibility) |
| Styling | CSS3 — Flexbox, custom properties, responsive clamp values |
| Logic | Vanilla JavaScript — ES6 modules, async/await |
| Auth | Client-side session via `sessionStorage` |
| Database | Firebase Firestore (cloud NoSQL, real-time sync) |

No frameworks, no build tools — plain HTML, CSS, and JavaScript.

---

## Project Structure

```
├── index.html                  Public website
├── assets/                     Images, logos, SVGs
├── css/
│   ├── index.css               Landing page styles
│   ├── portal.css              Shared portal layout
│   ├── equipment.css           Devices page
│   ├── register.css            Register page
│   ├── status.css              Status page
│   └── login.css               Login page
├── javascript/
│   ├── firebase.js             Firebase config & init
│   ├── register.js             Add device (Create)
│   ├── equipment.js            Device table (Read, Update, Delete)
│   ├── status.js               Status card grid
│   └── scroll.js               Smooth scroll on public site
└── portal/
    ├── login.html
    ├── portal.html             Dashboard
    ├── equipment.html          All devices
    ├── register.html           Register device
    ├── status.html             Status overview
    ├── database.html           Firestore viewer
    └── js/
        └── auth.js               Session guard & logout
```

---

## Getting Started

Clone the repo and run a local server (required for ES modules and Firebase):

```bash
# Python
python3 -m http.server 8000

# or Node.js
npx serve .
```

Open `http://localhost:8000` for the public site, or go directly to `http://localhost:8000/portal/login.html` for the portal.

---

## Author

Developed as a diploma project in **VG2 IT Development**.  
**Final grade: 6** — the highest mark in the Norwegian grading system (1 = fail, 6 = excellent).

---

*Tech Forward Builders is a fictional company created for educational purposes.*
