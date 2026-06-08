# Tech Forward Builders

Educational exam project (VG2 IT Development) — a modern website and employee portal for a fictional smart building construction company.

## Project Overview

**Tech Forward Builders** specializes in smart buildings, IoT technology, building automation, and equipment testing. The project demonstrates professional frontend development, UI/UX design, and information architecture using only HTML, CSS, and JavaScript.

### Part 1 — Public Website (`index.html`)

- **Home** — Hero with company stats and CTA
- **Features** — 8 key benefits of smart construction
- **Services** — Solutions offered (design, materials, construction, digital management)
- **Projects** — Portfolio of completed smart building projects
- **Contact** — Contact form with glassmorphism card overlay

Design: 1920px canvas, 80px side margins, 60px top margin. Dark/light aesthetic with orange accents and glassmorphism effects.

### Part 2 — Employee Portal (`portal/`)

Internal system for managing IoT devices on construction sites.

| Page | File | Description |
|------|------|-------------|
| Login | `portal/login.html` | Employee authentication |
| Dashboard | `portal/dashboard.html` | Stat cards + recent activity |
| Equipment | `portal/equipment.html` | Full device table with search/filters |
| Register Device | `portal/register.html` | Add new devices to the system |
| Status Overview | `portal/status.html` | Card grid showing device status |

**Demo login credentials:**

| Role | Email | Password |
|------|-------|----------|
| Admin | `erik@techforward.no` | `admin123` |
| Technician | `sofia@techforward.no` | `tech123` |

## Database Concept

The mock database (`js/database.js`) simulates four relational tables, persisted in `localStorage`:

### Users
| Column | Type |
|--------|------|
| user_id | number |
| name | string |
| email | string |
| role | string |
| password_hash | string |

### Devices
| Column | Type |
|--------|------|
| device_id | number |
| name | string |
| type | string |
| status | string |
| location_id | number (FK) |
| last_checked | ISO datetime |

### Locations
| Column | Type |
|--------|------|
| location_id | number |
| name | string |
| area | string |

### Reports
| Column | Type |
|--------|------|
| report_id | number |
| device_id | number (FK) |
| user_id | number (FK) |
| date | ISO datetime |
| comment | string |
| result | string |

## File Structure

```
├── index.html              Public website
├── css/
│   ├── variables.css       Design tokens
│   ├── base.css            Reset & typography
│   ├── components.css      Buttons, cards, forms, tables
│   ├── public.css          Landing page layout
│   └── portal.css          Employee portal layout
├── js/
│   ├── database.js         Mock database layer
│   ├── auth.js             Session management
│   ├── main.js             Public site interactions
│   ├── portal.js           Shared portal utilities
│   └── pages/              Page-specific scripts
└── portal/
    ├── login.html
    ├── dashboard.html
    ├── equipment.html
    ├── register.html
    └── status.html
```

## Getting Started

No build tools or dependencies required. Open `index.html` in a browser, or use a local server:

```bash
# Python
python3 -m http.server 8000

# Node.js (if npx available)
npx serve .
```

Then visit `http://localhost:8000`.

## Technologies

- HTML5 (semantic markup, accessibility)
- CSS3 (custom properties, grid, flexbox, glassmorphism)
- Vanilla JavaScript (ES6+, localStorage, sessionStorage)
- Google Fonts (Inter, Space Grotesk)
