import os
from flask import Flask, render_template, send_from_directory, abort

app = Flask(__name__)

# ─── Portfolio Data ────────────────────────────────────────────────────────────
PORTFOLIO = {
    "name": "Lavannya Pradeep Rathod",
    "name_short": "Lavannya Rathod",
    # Removed standalone headline — subheadline now carries the intro
    "subheadline": "Software Engineer · Data Science · AI & Machine Learning",
    "summary": (
        "Recent Electronics and Communication Engineering graduate with a strong foundation in Python, "
        "SQL, and software engineering, alongside hands-on experience in machine learning algorithms, "
        "predictive analytics, and AI applications. Proven ability to build practical data-driven software, "
        "REST APIs, and interactive analytics dashboards. Actively seeking entry-level opportunities "
        "in Software Engineering, Data Science, or AI/ML roles."
    ),
    "email": "lavannyaprathod@gmail.com",
    "phone": "+91 9902755917",
    "linkedin": "https://www.linkedin.com/in/lavannya-pradeep-rathod-b3a287319/",
    "github":   "https://github.com/29lavannyaprathod",
    "resume_file": "Lavannya_P_Rathod_Resume_new.pdf",
    # ── Profile picture ─────────────────────────────────────────────────────────
    # File is located at: static/images/profile.png
    "profile_photo": "images/profile.png",

    "skills": [
        {
            "category": "Programming Languages",
            "skills_list": ["Python", "SQL", "HTML", "CSS", "JavaScript (basics)"],
        },
        {
            "category": "Software & Web Engineering",
            "skills_list": ["Flask", "REST APIs", "Streamlit", "Model Deployment", "Git", "GitHub", "Visual Studio Code"],
        },
        {
            "category": "Data Science & Analysis",
            "skills_list": ["Pandas", "NumPy", "Data Cleaning", "Feature Engineering", "Data Modeling", "Statistical Analysis", "EDA"],
        },
        {
            "category": "Machine Learning & AI",
            "skills_list": ["Scikit-learn", "Logistic Regression", "Random Forest", "Model Evaluation", "Classification", "Predictive Analytics", "OpenAI API"],
        },
        {
            "category": "Deep Learning & NLP",
            "skills_list": ["LSTM", "Time-Series Analysis", "Neural Networks", "NLP Techniques"],
        },
        {
            "category": "Data Visualization & BI",
            "skills_list": ["Power BI", "Tableau", "Matplotlib", "Plotly", "Microsoft Excel"],
        },
        {
            "category": "Databases & Tools",
            "skills_list": ["MySQL", "Jupyter Notebook", "Postman (basics)"],
        },
    ],

    "projects": [
        {
            "id": "heart-disease",
            "num": "01",
            "title": "Heart Disease Detection System",
            "category": "Machine Learning · Healthcare",
            "summary": (
                "A predictive healthcare machine learning system that analyzes clinical indicators to detect heart disease, "
                "achieving ~85% accuracy with high precision and recall, deployed with an interactive real-time Streamlit UI."
            ),
            "bullets": [
                "Developed a machine learning model using Logistic Regression and Random Forest on a dataset with 300+ records and 13+ clinical features.",
                "Executed data preprocessing, feature engineering, and exploratory data analysis (EDA) to enhance model performance.",
                "Analyzed model effectiveness, achieving approximately 85% accuracy with strong precision and recall metrics.",
                "Deployed a Streamlit-based interface enabling real-time predictions derived from user-provided health parameters.",
                "Applied machine learning algorithms and predictive analytics for classification and forecasting tasks.",
            ],
            "tools": ["Python", "Pandas", "Scikit-learn", "Machine Learning", "Streamlit"],
            "github": None,
            "demo": None,
        },
        {
            "id": "ai-blog-generator",
            "num": "02",
            "title": "AI Blog Generator",
            "category": "Generative AI · Web Application",
            "summary": (
                "An AI-powered content generation platform built with Streamlit and OpenAI API that generates complete, structured "
                "articles of 500+ words in under 5 seconds with multi-format export capabilities."
            ),
            "bullets": [
                "Engineered an AI-powered web application using Streamlit and OpenAI APIs capable of generating complete blog articles of 500+ words in under 5 seconds.",
                "Constructed backend logic in Python for prompt processing and dynamic content generation, enabling export functionality supporting 3 formats: TXT, HTML, and Markdown.",
                "Designed an interactive UI supporting 5+ configurable prompt parameters for seamless, real-time content generation.",
            ],
            "tools": ["Python", "Streamlit", "OpenAI API", "HTML/CSS"],
            "github": None,
            "demo": None,
        },
        {
            "id": "ecommerce-analysis",
            "num": "03",
            "title": "E-commerce Customer Behavior Analysis",
            "category": "Data Analytics · Business Intelligence",
            "summary": (
                "End-to-end exploratory and statistical data analysis on 1,000+ customer transaction records, delivering 5+ interactive "
                "Power BI and Matplotlib dashboards to drive revenue decisions and retention."
            ),
            "bullets": [
                "Performed exploratory data analysis (EDA) and statistical analysis on an e-commerce dataset with 1000+ transaction records.",
                "Standardized data cleaning and preprocessing techniques across 10+ features for structured evaluation.",
                "Produced 5+ data visualization dashboards with Power BI and Matplotlib to highlight key business insights.",
                "Derived actionable insights that informed business decision-making and improved customer engagement strategies.",
            ],
            "tools": ["Python", "Pandas", "NumPy", "Matplotlib", "Power BI"],
            "github": None,
            "demo": None,
        },
        {
            "id": "analytics-platform",
            "num": "04",
            "title": "Automated Data Analytics Platform",
            "category": "Data Engineering · NLP",
            "summary": (
                "A Python data science platform processing multi-feature Excel/CSV datasets with automated statistical analysis, "
                "NLP text processing, and real-time interactive visual reporting."
            ),
            "bullets": [
                "Built a Python-based data science platform processing Excel/CSV datasets with 500+ records and 15+ input features.",
                "Streamlined data cleaning, statistical analysis, and data visualization workflows across 5+ metrics, integrating NLP for text-based data analysis.",
                "Generated interactive reports with 4+ visual insights, cutting manual reporting effort and supporting faster data-driven decision-making.",
            ],
            "tools": ["Python", "Pandas", "NumPy", "Plotly", "NLP"],
            "github": None,
            "demo": None,
        },
    ],

    "experience": [
        {
            "role": "Computer Literacy Volunteer",
            "org": "Government College",
            "type": "Volunteer Experience",
            "dates": None,
            "bullets": [
                "Taught basic computer skills including MS Office, internet usage, and typing to 30+ students across 15+ sessions.",
                "Mentored learners in fundamental programming concepts and delivered hands-on guidance during 10+ lab sessions.",
                "Resolved 20+ technical issues related to software and system usage, ensuring smooth lab operations.",
                "Strengthened digital literacy and confidence among 30+ students through 10+ hands-on practical learning activities.",
            ],
        }
    ],

    "education": [
        {
            "degree": "Bachelor of Engineering",
            "field": "Electronics and Communication Engineering",
            "institution": "The Oxford College of Engineering, Bangalore",
            "location": "Bangalore, IN",
            "dates": "Dec 2021 – May 2025",
            "result_label": "CGPA",
            "result": "7.9 / 10",
            "level": "degree",
        },
        {
            "degree": "Pre-Degree Course (Class XII)",
            "field": "Science",
            "institution": "Government PU College, Siddalinganagar, Gadag",
            "location": "Gadag, IN",
            "dates": None,
            "result_label": "Percentage",
            "result": "68.2%",
            "level": "school",
        },
        {
            "degree": "Class X (Secondary School)",
            "field": None,
            "institution": "Shri Parshwanatha English Medium High School, Gadag",
            "location": "Gadag, IN",
            "dates": None,
            "result_label": "Percentage",
            "result": "81.60%",
            "level": "school",
        },
    ],

    "certifications": [
        {
            "title": "SQL for Beginners – MySQL and Database Design",
            "issuer": "Udemy",
        },
        {
            "title": "Microsoft Excel – From Beginner to Expert",
            "issuer": None,
        },
        {
            "title": "Microsoft Power BI – Advanced Data Transformation",
            "issuer": None,
        },
        {
            "title": "SQL (Advanced)",
            "issuer": "HackerRank",
        },
    ],
}


# ─── Routes ───────────────────────────────────────────────────────────────────

@app.route("/")
def index():
    return render_template("index.html", p=PORTFOLIO)


@app.route("/resume")
def download_resume():
    resume_dir = os.path.join(app.root_path, "static", "files")
    filename = PORTFOLIO["resume_file"]
    filepath = os.path.join(resume_dir, filename)
    if not os.path.isfile(filepath):
        abort(404)
    return send_from_directory(resume_dir, filename, as_attachment=True)


@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html", p=PORTFOLIO), 404


@app.errorhandler(500)
def internal_error(e):
    return render_template("404.html", p=PORTFOLIO), 500


if __name__ == "__main__":
    debug = os.environ.get("FLASK_DEBUG", "false").lower() == "true"
    app.run(debug=debug, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
