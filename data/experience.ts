export type WorkMode = "Remote" | "Hybrid" | "On-site";

export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  workMode: WorkMode;
  summary: string;
  stack: string[];
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: "L&G Consultancy",
    role: "Software Developer — Sitecore CMS + Next.js",
    start: "Jan 2026",
    end: "Present",
    location: "India",
    workMode: "Hybrid",
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
    company: "Upwork",
    role: "Freelance AI Automation Engineer",
    start: "Jul 2025",
    end: "Nov 2025",
    location: "India",
    workMode: "Remote",
    summary:
      "Directly dealing with clients to build n8n / Zapier hosts and automations.",
    stack: ["n8n", "Python", "JS", "AI Agents", "Automations", "Hostinger"],
    bullets: [
      "Set up n8n on Oracle Cloud, then migrated to Hostinger.",
      "Built automation workflows to generate cover letters for Upwork jobs.",
      "Researched writing patterns of top freelancers.",
    ],
  },
  {
    company: "EaseMyMed",
    role: "AI Developer Intern",
    start: "Dec 2024",
    end: "Jun 2025",
    location: "India",
    workMode: "Remote",
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
    start: "Sep 2024",
    end: "Dec 2024",
    location: "India",
    workMode: "Remote",
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

const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

function parseMonthYear(s: string): Date | null {
  const m = s.trim().match(/^([A-Za-z]{3,9})\s+(\d{4})$/);
  if (!m) return null;
  const monthIdx = MONTHS.indexOf(m[1].slice(0, 3).toLowerCase());
  if (monthIdx < 0) return null;
  return new Date(parseInt(m[2], 10), monthIdx, 1);
}

function computeLength(start: string, end: string): string | null {
  const startDate = parseMonthYear(start);
  const endDate =
    end.trim().toLowerCase() === "present" ? new Date() : parseMonthYear(end);
  if (!startDate || !endDate) return null;

  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());
  if (months < 1) return null;

  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (years === 0) return `${months} mo`;
  if (rem === 0) return years === 1 ? "1 yr" : `${years} yrs`;
  return `${years} yr ${rem} mo`;
}

export function formatDuration(
  exp: Pick<Experience, "start" | "end">,
): string {
  const range = `${exp.start} – ${exp.end}`;
  const length = computeLength(exp.start, exp.end);
  return length ? `${range} · ${length}` : range;
}
