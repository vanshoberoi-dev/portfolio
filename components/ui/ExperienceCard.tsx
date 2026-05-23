"use client";

import { useState } from "react";
import { Briefcase, Plus } from "lucide-react";
import { motion } from "framer-motion";
import type { Experience } from "@/data/experience";
import { Modal } from "./Modal";
import { StackChips } from "./StackChips";

export function ExperienceCard({ exp }: { exp: Experience }) {
  const [open, setOpen] = useState(false);

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
          <div className="flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h3 className="font-display text-lg text-parchment">
                {exp.company}
              </h3>
              <span className="text-xs text-parchment-dim">{exp.duration}</span>
            </div>
            <p className="text-sm text-forest-200">{exp.role}</p>
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
        subtitle={`${exp.role} · ${exp.duration}`}
      >
        <div className="space-y-5">
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
