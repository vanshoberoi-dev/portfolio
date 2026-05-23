import { MapPin, Mail, Phone } from "lucide-react";
import { personal } from "@/data/personal";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { EducationCard } from "@/components/ui/EducationCard";

export function About() {
  return (
    <SectionShell id="about">
      <SectionTitle
        kicker="About"
        title="A developer who ships."
        subtitle="Final-year CSE at GNDU. I work across enterprise CMS (Sitecore), full-stack web (Next.js + .NET), and applied AI — from RAG pipelines to fine-tuned vision models."
      />

      <div className="grid gap-8 md:grid-cols-[1fr_1.1fr]">
        <div className="glass flex flex-col gap-4 rounded-2xl p-5">
          <h3 className="font-display text-lg text-parchment">Quick facts</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3 text-parchment-dim">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-forest-700/70 text-forest-200">
                <MapPin size={14} />
              </span>
              <span className="text-parchment">{personal.location}</span>
            </li>
            <li className="flex items-center gap-3 text-parchment-dim">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-forest-700/70 text-forest-200">
                <Mail size={14} />
              </span>
              <a
                href={`mailto:${personal.email}`}
                className="text-parchment hover:text-sunset"
              >
                {personal.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-parchment-dim">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-forest-700/70 text-forest-200">
                <Phone size={14} />
              </span>
              <a
                href={`tel:${personal.phone.replace(/\s/g, "")}`}
                className="text-parchment hover:text-sunset"
              >
                {personal.phone}
              </a>
            </li>
          </ul>

          <div className="ink-divider mt-2" />

          <p className="text-sm leading-relaxed text-parchment-dim">
            I like building things that survive past the demo: observable
            backends, deployable AI features, and frontends that load fast and
            feel calm. Lately, that means Sitecore + Next.js by day, and AI
            automations by night.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="px-1 text-xs font-medium uppercase tracking-[0.22em] text-forest-300">
            Education
          </h3>
          {personal.education.map((edu) => (
            <EducationCard key={edu.institution} edu={edu} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
