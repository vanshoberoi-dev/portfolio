"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, ChevronDown } from "lucide-react";

type Edu = {
  institution: string;
  degree: string;
  location: string;
  duration: string;
  score: string;
  note?: string;
};

export function EducationCard({ edu }: { edu: Edu }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-forest-800/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sunset"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-forest-700/70 text-forest-200">
          <GraduationCap size={16} />
        </span>
        <div className="flex-1">
          <h3 className="font-display text-base text-parchment leading-snug">
            {edu.institution}
          </h3>
          <p className="text-xs text-forest-200">{edu.degree}</p>
        </div>
        <span className="hidden text-xs text-parchment-dim sm:block">
          {edu.duration}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-forest-300"
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-mist-strong"
          >
            <dl className="grid gap-2 px-4 py-3 text-xs sm:grid-cols-3">
              <div>
                <dt className="text-parchment-dim">Score</dt>
                <dd className="font-medium text-forest-100">{edu.score}</dd>
              </div>
              <div>
                <dt className="text-parchment-dim">Location</dt>
                <dd className="font-medium text-forest-100">{edu.location}</dd>
              </div>
              <div>
                <dt className="text-parchment-dim">Duration</dt>
                <dd className="font-medium text-forest-100">{edu.duration}</dd>
              </div>
              {edu.note && (
                <div className="sm:col-span-3">
                  <dt className="text-parchment-dim">Note</dt>
                  <dd className="font-medium text-forest-100">{edu.note}</dd>
                </div>
              )}
            </dl>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
