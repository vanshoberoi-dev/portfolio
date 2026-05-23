export type Experience = {
  company: string;
  role: string;
  duration: string;
  summary: string;
  stack: string[];
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: "L&G Consultancy",
    role: "Software Developer — Sitecore CMS + Next.js",
    duration: "Jan 2026 – Present",
    summary:
      "Shipping enterprise Sitecore + Next.js work and .NET MVC/Web APIs on a live client project.",
    stack: ["Sitecore", "Next.js", ".NET", "C#", "Tailwind", "MVC"],
    bullets: [
      "Developing a live project in the Sitecore stack (enterprise CMS) with Next.js powering the frontend.",
      "Built frontend with HTML, CSS, Bootstrap, JavaScript, and Tailwind across multiple modules.",
      "Developed .NET MVC applications and Web APIs for backend integrations.",
    ],
  },
  {
    company: "EaseMyMed",
    role: "AI Developer & Software Developer Intern",
    duration: "Dec 2024 – Jun 2025 · 6 months",
    summary:
      "Automated the patient insurance-claim pipeline by analyzing medical documents and insurance policies with custom AI flows.",
    stack: [
      "Python",
      "Django REST",
      "OpenAI",
      "Gemini",
      "RAG",
      "AWS SageMaker",
      "GCP",
      "Docker",
    ],
    bullets: [
      "Designed and managed RESTful APIs using Django REST Framework.",
      "Integrated OpenAI (4o-mini) and Gemini 2.0 Flash with custom AI functions — bypassing LangChain where it added overhead.",
      "Implemented RAG for contextual continuity across consecutive AI calls.",
      "Integrated Bhashini AI voice models and built benchmarking + feedback mechanisms.",
      "Built pipelines for image processing, PDF/ZIP handling, and structured JSON workflows.",
      "Used AWS SageMaker (dev) and Google Cloud (deployment) via Git pipelines, Dockerfile, and CloudBuild.",
      "Maintained daily technical documentation on Notion.",
      "Libraries: requests, json, base64, PyMuPDF, google-genai, Pillow.",
    ],
  },
  {
    company: "Learnflu",
    role: "Machine Learning Trainee Intern",
    duration: "Sep 2024 – Dec 2024",
    summary:
      "Applied ML/DL through hands-on projects and led a team of fellow interns.",
    stack: ["Python", "TensorFlow", "ResNet101x1", "scikit-learn"],
    bullets: [
      "Learned core ML/DL concepts via applied, project-based work.",
      "Fine-tuned ResNet101x1 for 13-class jute-pest classification — 95% accuracy.",
      "Headed a team of fellow interns through the program.",
    ],
  },
];
