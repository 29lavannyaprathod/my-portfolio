# Lavannya Pradeep Rathod — Professional Portfolio

A clean, minimal, recruiter-friendly portfolio website built with Python, Flask, HTML5, and Vanilla CSS.

## Tech Stack

- **Backend**: Python 3 + Flask
- **Templates**: Jinja2
- **Styling**: Vanilla CSS3 (no frameworks)
- **JS**: Vanilla JavaScript (navigation only)
- **Production**: Gunicorn
- **Hosting**: Render (free tier)

## Project Structure

```
my-portfolio/
├── app.py                 ← Flask app + all portfolio data
├── requirements.txt
├── render.yaml            ← Render.com deployment config
├── .gitignore
├── README.md
├── templates/
│   ├── base.html          ← Shared layout (nav + footer)
│   ├── index.html         ← Full single-page portfolio
│   └── 404.html
├── static/
│   ├── css/style.css
│   ├── js/main.js
│   ├── images/
│   └── files/
│       └── Lavannya_P_Rathod_Resume_new.pdf
└── Lavannya_P_Rathod_Resume_new.pdf  ← Original (preserved)
```

## Running Locally

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Start the dev server
python app.py

# 3. Open in browser
# http://localhost:5000
```

## Deployment on Render (Free)

1. Push this folder to a GitHub repository.
2. Go to [render.com](https://render.com) → **New → Web Service**
3. Connect your GitHub repo.
4. Render auto-detects `render.yaml` — click **Create Web Service**.
5. Your public URL will be shown after the first deploy (≈2 min).

> **Note**: Render free tier spins down after 15 min of inactivity. First request may take ~30 s to wake up.

## Placeholders to Update

| Item | Location | Action needed |
|---|---|---|
| LinkedIn URL | `app.py` line ~20 | Replace with your actual LinkedIn profile URL |
| GitHub URL | `app.py` line ~21 | Replace with your actual GitHub profile URL |
| Project GitHub links | `app.py` — each project `"github"` key | Add actual repo URLs when available |
| Project demo links | `app.py` — each project `"demo"` key | Add live demo URLs if applicable |
| Contact section display names | `templates/index.html` → contact cards | Auto-update when you fix URLs above |

## Customising Content

All portfolio data lives in the `PORTFOLIO` dictionary in `app.py`. Edit it to:
- Add new projects
- Update certifications
- Change the summary or headline
- Add GitHub/demo links to projects

## License

Personal portfolio — all rights reserved.
