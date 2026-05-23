"use client";

import { useState } from "react";
import { Briefcase, MapPin, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { formatDuration, type Experience, type WorkMode } from "@/data/experience";
import { cn } from "@/lib/cn";
import { Modal } from "./Modal";
import { StackChips } from "./StackChips";

const workModeStyles: Record<WorkMode, string> = {
  Remote: "bg-forest-700/60 text-forest-100 border-forest-500/40",
  Hybrid: "bg-sunset/15 text-sunset-soft border-sunset/30",
  "On-site": "bg-mist-strong text-parchment-dim border-parchment-dim/30",
};

function WorkModePill({ mode }: { mode: WorkMode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
        workModeStyles[mode],
      )}
    >
      {mode}
    </span>
  );
}

export function ExperienceCard({ exp }: { exp: Experience }) {
  const [open, setOpen] = useState(false);
  const duration = formatDuration(exp);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="glass group relative flex w-full flex-col gap-3 rounded-2xl p-5 text-left transition hover:border-forest-400/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sunset"
        aria-label={`Open details for ${exp.role} at ${exp.company}`}
      >
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-forest-700/70 text-forest-200">
            <Briefcase size={18} />
          </span>
          <div className="flex flex-1 flex-wrap items-start justify-between gap-x-3 gap-y-1">
            <div className="min-w-0">
              <h3 className="font-display text-lg text-parchment">
                {exp.company}
              </h3>
              <p className="text-sm text-forest-200">{exp.role}</p>
            </div>
            <div className="flex flex-col items-start gap-1.5 text-xs text-parchment-dim sm:items-end">
              <span>{duration}</span>
              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                <span className="inline-flex items-center gap-1">
                  <MapPin size={11} className="text-forest-300" aria-hidden />
                  {exp.location}
                </span>
                <WorkModePill mode={exp.workMode} />
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-parchment-dim">{exp.summary}</p>
        <div className="flex items-end justify-between gap-3">
          <StackChips items={exp.stack.slice(0, 5)} />
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-forest-500/50 text-forest-200 transition group-hover:border-sunset group-hover:text-sunset">
            <Plus size={14} />
          </span>
        </div>
      </motion.button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={exp.company}
        subtitle={`${exp.role} · ${duration}`}
      >
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2 text-xs text-parchment-dim">
            <span className="inline-flex items-center gap-1">
              <MapPin size={12} className="text-forest-300" aria-hidden />
              {exp.location}
            </span>
            <span aria-hidden className="text-forest-500/60">·</span>
            <WorkModePill mode={exp.workMode} />
          </div>
          <StackChips items={exp.stack} size="md" />
          <ul className="space-y-2.5">
            {exp.bullets.map((b, i) => (
              <li key={i} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-forest-400"
                />
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </>
  );
}
