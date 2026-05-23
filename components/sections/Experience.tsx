import { experience } from "@/data/experience";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ExperienceCard } from "@/components/ui/ExperienceCard";

export function Experience() {
  return (
    <SectionShell id="experience">
      <SectionTitle
        kicker="Experience"
        title="Where I've built things."
        subtitle="Click any role to see the work in detail."
      />

      <div className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute left-[15px] top-2 bottom-2 hidden w-px bg-gradient-to-b from-forest-500/0 via-forest-400/60 to-forest-500/0 sm:block"
        />

        <ol className="space-y-5">
          {experience.map((exp) => (
            <li key={exp.company} className="relative sm:pl-12">
              <span
                aria-hidden
                className="absolute left-2 top-6 hidden h-3 w-3 rounded-full border-2 border-forest-300 bg-forest-950 sm:block"
              />
              <ExperienceCard exp={exp} />
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
