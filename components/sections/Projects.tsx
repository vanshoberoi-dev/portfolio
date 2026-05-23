"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { cn } from "@/lib/cn";

const FILTERS = ["All", "Web", "AI/ML", "Automation", "Game"] as const;
type Filter = (typeof FILTERS)[number];

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo<Project[]>(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  );

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);
  const visible = showAll ? filtered : featured.length ? featured : filtered;
  const canShowMore = !showAll && rest.length > 0 && featured.length > 0;

  return (
    <SectionShell id="projects">
      <SectionTitle
        kicker="Projects"
        title="Selected work, click for the receipts."
        subtitle="Lead with impact, open for stack + bullets + links."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => {
              setFilter(f);
              setShowAll(false);
            }}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-medium transition",
              filter === f
                ? "bg-forest-300 text-ink"
                : "border border-forest-500/40 text-parchment-dim hover:border-forest-300 hover:text-parchment",
            )}
            aria-pressed={filter === f}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <li key={p.slug} className="h-full">
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>

      {canShowMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 rounded-full border border-forest-500/60 px-5 py-2.5 text-sm text-parchment transition hover:border-forest-300 hover:bg-forest-800/40"
          >
            Show {rest.length} more{" "}
            <ChevronDown size={14} className="transition group-hover:translate-y-0.5" />
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <p className="py-10 text-center text-sm text-parchment-dim">
          No projects in this category yet.
        </p>
      )}
    </SectionShell>
  );
}
