"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award } from "lucide-react";
import { skillGroups } from "@/data/skills";
import { achievements } from "@/data/achievements";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";

export function Skills() {
  const [active, setActive] = useState(skillGroups[0].id);
  const activeGroup = skillGroups.find((g) => g.id === active)!;

  return (
    <SectionShell id="skills">
      <SectionTitle
        kicker="Skills & Wins"
        title="The toolkit + the receipts."
        subtitle="Tabs scope the stack to what's relevant for the role you're hiring for. Badges link milestones at a glance."
      />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="glass flex flex-col rounded-2xl p-5">
          <div className="-mx-1 flex flex-wrap gap-1.5">
            {skillGroups.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setActive(g.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition",
                  active === g.id
                    ? "bg-forest-300 text-ink"
                    : "text-parchment-dim hover:text-parchment",
                )}
                aria-pressed={active === g.id}
              >
                {g.label}
              </button>
            ))}
          </div>

          <p className="mt-4 text-sm text-parchment-dim">{activeGroup.blurb}</p>

          <AnimatePresence mode="wait">
            <motion.ul
              key={activeGroup.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-5 flex flex-wrap gap-2"
            >
              {activeGroup.items.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-forest-500/40 bg-forest-800/50 px-3 py-1.5 text-xs text-forest-100"
                >
                  {item}
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="px-1 text-xs font-medium uppercase tracking-[0.22em] text-forest-300">
            Achievements
          </h3>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {achievements.map((a) => (
              <li key={a.title} className="group">
                <div className="glass flex items-start gap-3 rounded-xl p-3 transition hover:border-sunset/50">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-sunset/15 text-sunset">
                    <Award size={14} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                      <h4 className="text-sm font-medium text-parchment">
                        {a.title}
                      </h4>
                      {a.year && (
                        <span className="text-[10px] text-parchment-dim">
                          {a.year}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs leading-snug text-parchment-dim">
                      {a.detail}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}
