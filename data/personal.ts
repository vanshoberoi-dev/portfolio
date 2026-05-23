export const personal = {
  name: "Vansh Oberoi",
  role: "Software Developer · Sitecore + Next.js · AI/ML",
  tagline:
    "Software developer building enterprise level full-stack apps, and Generative AI-powered automations. Currently shipping with Sitecore + Next.js + .NET.",
  status: "Open to opportunities",
  location: "Kapurthala, Punjab, India",
  email: "vanshoberoi462@gmail.com",
  phone: "+91 9646570760",
  links: {
    github: "https://github.com/Vanshoberoi-dev",
    linkedin: "https://www.linkedin.com/in/vansh-o/",
    resume:
      "https://drive.google.com/file/d/1xSwKRfzUR2IPfNQ1_Y0hPtF5VXNFB627/view?usp=drive_link",
  },
  stats: [
    { label: "GATE 2026", value: "AIR 8959", sub: "of 211,010" },
    { label: "Experience", value: "2+ yrs", sub: "industry + intern" },
    { label: "Projects", value: "15+", sub: "shipped" },
    { label: "Status", value: "Open", sub: "to opportunities" },
  ],
  education: [
    {
      institution: "Guru Nanak Dev University",
      degree: "B.Tech in Computer Science & Engineering",
      location: "Amritsar, Punjab",
      duration: "Aug 2022 – June 2026",
      score: "8.21 CGPA",
      note: "State Government University",
    },
    {
      institution: "Montgomery Guru Nanak Public School",
      degree: "Class XII · CBSE",
      location: "Kapurthala, Punjab",
      duration: "Aug 2021",
      score: "88.4%",
      note: "Senior Secondary",
    },
    {
      institution: "Little Angels CO-ED Public School",
      degree: "Class X · CBSE",
      location: "Kapurthala, Punjab",
      duration: "Aug 2019",
      score: "87.4%",
      note: "Secondary",
    },
  ],
} as const;

export type Personal = typeof personal;
