export type Project = {
  slug: string;
  title: string;
  impact: string;
  date: string;
  stack: string[];
  category: "Web" | "AI/ML" | "Automation" | "Game";
  featured: boolean;
  liveUrl?: string;
  codeUrl?: string;
  bullets: string[];
};

export const projects: Project[] = [
  {
    slug: "promptwizard",
    title: "PromptWizard",
    impact: "Custom UI for Microsoft's prompt optimizer · live in <5 hours",
    date: "Jun 2025",
    stack: ["Next.js", "Vercel", "Microsoft Backend", "TypeScript"],
    category: "Web",
    featured: true,
    liveUrl: "https://prompt-wizard-three.vercel.app/",
    bullets: [
      "Designed and implemented a custom frontend UI for Microsoft's prompt optimizer, focused on user flow and clarity.",
      "Integrated the backend API with a Vercel-first, single-command monorepo deployment.",
      "Built a 'Test Values' feature for auto-filled sample data and instant output previews.",
      "Added multi-feature selection so users get optimized prompts tailored to their picks.",
      "Achieved end-to-end deployment in under 5 hours; iterated on UX post-launch.",
      "Plug-and-play deployment — no manual server config required.",
    ],
  },
  {
    slug: "dms",
    title: "Document Management System",
    impact: ".NET 8 MVC · SQL Server with query-store metrics and Serilog",
    date: "Mar 2026",
    stack: [".NET 8", "MVC", "SQL Server", "Serilog", "SEQ"],
    category: "Web",
    featured: true,
    codeUrl: "https://github.com/vanshoberoi-dev/DocumentManagementSystem",
    bullets: [
      "Used SQL Server with query-store metrics and SEQ/Serilog logging for end-to-end observability.",
      "Worked with pagination and DB clustering for scale.",
      "Implemented MVC patterns end-to-end across controllers, views, and services.",
    ],
  },
  {
    slug: "jute-pest",
    title: "Jute Pest Classification",
    impact: "95% accuracy · fine-tuned ResNet101x1 across 13 pest classes",
    date: "Nov 2024",
    stack: ["TensorFlow", "ResNet101x1", "AWS m5.large", "Python"],
    category: "AI/ML",
    featured: true,
    liveUrl: "https://jute-pest-classifier.streamlit.app/",
    codeUrl:
      "https://www.kaggle.com/code/vanshoberoi3103/jute-pest-tf-restnet101x1-95-acc-on-1st-try",
    bullets: [
      "Fine-tuned TensorFlow's ResNet101x1 to classify 13 jute-pest types with 95% accuracy.",
      "Implemented preprocessing including cropping, resizing, and pixel normalization.",
      "Optimized training on an AWS m5.large to ~10s/epoch via tuning and prefetch().",
      "Used SparseCategoricalCrossentropy loss with SGD optimizer.",
    ],
  },
  {
    slug: "bombay-house",
    title: "Bombay House Price Prediction",
    impact: "Linear regression model deployed to AWS EC2 behind Nginx",
    date: "Aug 2024",
    stack: ["Python", "scikit-learn", "Streamlit", "AWS EC2", "Nginx"],
    category: "AI/ML",
    featured: true,
    liveUrl: "https://bangalore-house-predictor.streamlit.app/",
    codeUrl: "https://github.com/Vansh462/Bangluru-House-Price-Prediction",
    bullets: [
      "Built a house-price prediction model using Python and linear regression.",
      "Wrapped it in a Streamlit web app and deployed on AWS EC2.",
      "Configured Nginx as a reverse proxy for efficient serving.",
    ],
  },
  {
    slug: "dr-prescription",
    title: "Dr's Medicine Prescription Prediction",
    impact: ">99% test accuracy · Random Forest on ~5,900 patient records",
    date: "Dec 2024",
    stack: ["Python", "pandas", "scikit-learn", "seaborn", "Jupyter"],
    category: "AI/ML",
    featured: true,
    codeUrl:
      "https://kaggle.com/code/vanshoberoi3103/dr-s-medicine-prescription-prediction-model-99",
    bullets: [
      "Built a supervised ML pipeline to predict medical prescriptions from patient data.",
      "Processed and cleaned ~5,900 patient records.",
      "Performed EDA and feature engineering to surface key patterns.",
      "Trained a Random Forest classifier with hyperparameter tuning — >99% test accuracy.",
      "Visualized results with confusion matrices and classification reports.",
    ],
  },
  {
    slug: "mood-website",
    title: "Mood Website",
    impact: "Figma → code · fully responsive with AOS + Swiper",
    date: "2024",
    stack: ["HTML", "CSS", "Bootstrap", "AOS", "Swiper"],
    category: "Web",
    featured: true,
    liveUrl: "https://vanshoberoi-dev.github.io/website-mood-practice/",
    bullets: [
      "Translated a Figma design directly into responsive code.",
      "Used lazy loading, media queries, AOS (Animation on Scroll), and Swiper carousels.",
      "Tuned layout across mobile, tablet, and desktop breakpoints.",
    ],
  },
  {
    slug: "freelance-automation",
    title: "Freelance Workflow Automation",
    impact: "Auto cover-letter + Upwork proposal generator from job descriptions",
    date: "Oct 2025",
    stack: ["n8n", "make.com", "Zapier", "Gemini API", "OpenAI API"],
    category: "Automation",
    featured: false,
    bullets: [
      "Built an auto cover-letter generator for jobs and Upwork proposals straight from job descriptions.",
      "Composed Google Sheets, Gemini chat models, AI agent orchestration, and Google Docs nodes.",
    ],
  },
  {
    slug: "sports-person",
    title: "Sports Person Classification",
    impact: "84.31% test accuracy · wavelet + HaarCascade preprocessing",
    date: "Sep 2024",
    stack: ["scikit-learn", "OpenCV", "GridSearchCV", "Wavelet"],
    category: "AI/ML",
    featured: false,
    codeUrl:
      "https://github.com/Vansh462/LearningProjects/SportsPersonClassification",
    bullets: [
      "Face-based sports person classifier using HaarCascades and wavelet transforms.",
      "Systematic hyperparameter tuning across SVC, RandomForest, and Logistic Regression with GridSearchCV.",
      "Selected Logistic Regression as the optimal classifier at 84.31% test accuracy.",
      "Evaluated with post-training confusion matrix analysis.",
    ],
  },
  {
    slug: "tips-app",
    title: "Tips App",
    impact: "Streamlit + joblib-serialized regression for real-time tip prediction",
    date: "Aug 2024",
    stack: ["Streamlit", "scikit-learn", "joblib"],
    category: "AI/ML",
    featured: false,
    codeUrl: "https://github.com/Vansh462/LearningProjects/tips%20app",
    bullets: [
      "Built a tip-prediction web app using Streamlit and a pre-trained scikit-learn regression model.",
      "Designed an interactive UI for real-time bill input and instant tip output.",
      "Integrated inference by loading a pickled estimator at runtime.",
    ],
  },
  {
    slug: "site-link-scraper",
    title: "Official Site Link Scraper",
    impact: "Multiprocessing scraper resolving bank official URLs by name",
    date: "Jan 2024",
    stack: ["Python", "Selenium", "BeautifulSoup", "Multiprocessing"],
    category: "Automation",
    featured: false,
    codeUrl: "https://github.com/Vansh462/Scraping-Challenge",
    bullets: [
      "Led a backend project to scrape official bank links using only the bank's name.",
      "Used the Google library for efficient lookup and parsing.",
      "Applied multiprocessing for performance optimization.",
    ],
  },
  {
    slug: "pong",
    title: "Pong Game",
    impact: "Classic Pong with AI opponent in Pygame",
    date: "Oct 2023",
    stack: ["Python", "Pygame"],
    category: "Game",
    featured: false,
    bullets: [
      "Implemented classic Pong gameplay using Python and Pygame.",
      "Used pygame.sprite.Sprite for modular paddle and ball components.",
      "Handled precise ball-paddle and ball-wall collisions.",
      "Added dynamic audio feedback with .ogg files.",
      "Supported real-time keyboard input plus basic AI tracking for the opponent.",
    ],
  },
  {
    slug: "sentiment-analysis",
    title: "Scrap & Sentiment Analysis",
    impact: "Rule-based NLP pipeline producing structured Excel report",
    date: "Aug 2023",
    stack: ["Python", "pandas", "BeautifulSoup", "NLTK", "Jupyter"],
    category: "AI/ML",
    featured: false,
    codeUrl: "https://github.com/Vansh462/BlackCoffer",
    bullets: [
      "Built a rule-based NLP / text-analytics pipeline in Python and Jupyter.",
      "Automated web scraping, text extraction, cleaning, and tokenization.",
      "Used pre-defined positive/negative wordlists to compute sentiment metrics.",
      "Custom functions for readability and sentiment scoring.",
      "Generated a comprehensive structured Excel report with all extracted features.",
    ],
  },
];
