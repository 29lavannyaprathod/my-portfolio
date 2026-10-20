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
        "Recent Engineering graduate with a strong foundation in Python, SQL, and software development, "
        "and hands-on experience in machine learning, data analysis, and AI-based applications. "
        "Passionate about building practical, data-driven software solutions and equally interested "
        "in backend development, REST APIs, and full-stack engineering. "
        "Seeking entry-level opportunities in Software Engineering, Data Science, or AI/ML roles."
    ),
    "email": "lavannyaprathod@gmail.com",
    "phone": "+91 9902755917",
    "linkedin": "https://www.linkedin.com/in/lavannya-rathod",   # placeholder — confirm exact URL
    "github":   "https://github.com/lavannya-rathod",             # placeholder — confirm exact URL
    "resume_file": "Lavannya_P_Rathod_Resume_new.pdf",
    # ── Profile picture ─────────────────────────────────────────────────────────
    # Place your photo at:  static/images/profile.jpg
    # Supported formats:    .jpg  .jpeg  .png  .webp
    # Recommended size:     400 × 400 px minimum, square crop
    "profile_photo": "profile.png",   # change filename/extension if needed

    "skills": [
        {
            "category": "Programming",
            "skills_list": ["Python", "SQL", "HTML", "CSS", "JavaScript (basics)"],
        },
        {
            "category": "Software Engineering",
            "skills_list": ["Flask", "REST APIs", "Streamlit", "Model Deployment", "Git", "GitHub", "VS Code", "Jupyter Notebook"],
        },
        {
            "category": "Data Analysis",
            "skills_list": ["Pandas", "NumPy", "Data Cleaning", "Feature Engineering", "Exploratory Data Analysis (EDA)"],
        },
        {
            "category": "Machine Learning",
            "skills_list": ["Scikit-learn", "Logistic Regression", "Random Forest", "Model Evaluation", "Classification"],
        },
        {
            "category": "Deep Learning & NLP",
            "skills_list": ["LSTM", "Time-Series Analysis", "Neural Networks", "NLP Techniques"],
        },
        {
            "category": "Data Visualization",
            "skills_list": ["Power BI", "Tableau", "Matplotlib", "Plotly", "Microsoft Excel"],
        },
        {
            "category": "Databases & Tools",
            "skills_list": ["MySQL", "OpenAI API", "Postman (basics)", "Jupyter Notebook"],
        },
    ],

    "projects": [
        {
            "id": "heart-disease",
            "num": "01",
            "title": "Heart Disease Detection System",
            "category": "Machine Learning · Healthcare",
            "summary": (
                "A machine learning system that predicts the likelihood of heart disease based on "
                "clinical parameters, achieving approximately 85% accuracy with strong precision and recall."
            ),
            "bullets": [
                "Built a machine learning model using Logistic Regression and Random Forest on a dataset with 300+ records and 13+ clinical features.",
                "Performed data preprocessing, feature engineering, and exploratory data analysis (EDA) to enhance model performance.",
                "Assessed model effectiveness, achieving approximately 85% accuracy with strong precision and recall metrics.",
                "Deployed a Streamlit-based interface enabling real-time predictions from user-provided health parameters.",
                "Utilized machine learning techniques for predictive modeling and classification tasks.",
            ],
            "tools": ["Python", "Pandas", "Scikit-learn", "Machine Learning", "Streamlit"],
            "github": None,
            "demo": None,
        },
        {
            "id": "ai-blog-generator",
            "num": "02",
            "title": "AI Blog Generator",
            "category": "AI Application · Web Development",
            "summary": (
                "An AI-powered web application that generates complete blog articles in under 5 seconds "
                "using the OpenAI API, with export support for TXT, HTML, and Markdown formats."
            ),
            "bullets": [
                "Engineered an AI-powered web application using Streamlit and OpenAI API capable of generating complete blog articles in under 5 seconds.",
                "Constructed backend logic in Python for prompt processing and dynamic content generation.",
                "Incorporated export functionality supporting three formats: TXT, HTML, and Markdown.",
                "Designed an interactive user interface ensuring seamless content generation and real-time input handling.",
            ],
            "tools": ["Python", "Streamlit", "OpenAI API", "HTML/CSS"],
            "github": None,
            "demo": None,
        },
        {
            "id": "ecommerce-analysis",
            "num": "03",
            "title": "E-commerce Customer Behavior Analysis",
            "category": "Data Analysis · Business Intelligence",
            "summary": (
                "Comprehensive exploratory data analysis on an e-commerce dataset with 1000+ transaction "
                "records, culminating in 5+ Power BI and Matplotlib dashboards to surface actionable business insights."
            ),
            "bullets": [
                "Executed exploratory data analysis (EDA) on an e-commerce dataset with 1000+ transaction records.",
                "Applied data cleaning and preprocessing techniques across multiple features for structured evaluation.",
                "Produced 5+ visualizations and dashboards with Power BI and Matplotlib to highlight key business insights.",
                "Derived actionable insights to support business decision-making and improve customer engagement strategies.",
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
                "A Python-based analytics system capable of processing Excel and CSV datasets, "
                "performing statistical analysis, and generating interactive reports with 4+ visual insights."
            ),
            "bullets": [
                "Created a Python-based data analytics system capable of processing Excel and CSV datasets with multiple input features.",
                "Executed data cleaning, statistical analysis, and visualization workflows.",
                "Incorporated NLP techniques for analyzing text-based data within datasets.",
                "Generated interactive reports with 4+ visual insights to support data-driven decision-making.",
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
                "Assisted in teaching basic computer skills including MS Office, internet usage, and typing to 30+ students across multiple sessions.",
                "Mentored learners in understanding fundamental programming concepts and delivered hands-on guidance during 10+ lab sessions.",
                "Troubleshot 20+ technical issues related to software and system usage, ensuring smooth lab operations.",
                "Strengthened digital literacy and confidence among students through practical learning activities.",
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
