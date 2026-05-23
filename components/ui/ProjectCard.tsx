"use client";

import { useState } from "react";
import { ExternalLink, Sparkles, Plus } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { Modal } from "./Modal";
import { StackChips } from "./StackChips";

export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="glass group flex h-full w-full flex-col gap-3 rounded-2xl p-5 text-left transition hover:border-forest-400/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sunset"
        aria-label={`Open details for ${project.title}`}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sunset/15 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-sunset">
            <Sparkles size={10} /> {project.category}
          </span>
          <span className="text-[11px] text-parchment-dim">{project.date}</span>
        </div>
        <h3 className="font-display text-xl leading-tight text-parchment">
          {project.title}
        </h3>
        <p className="text-sm leading-snug text-forest-100">{project.impact}</p>
        <div className="mt-auto space-y-3 pt-2">
          <StackChips items={project.stack.slice(0, 4)} />
          <div className="flex items-center justify-between">
            <div className="flex gap-3 text-xs text-parchment-dim">
              {project.liveUrl && (
                <span className="inline-flex items-center gap-1">
                  <ExternalLink size={12} /> Live
                </span>
              )}
              {project.codeUrl && (
                <span className="inline-flex items-center gap-1">
                  <FaGithub size={12} /> Code
                </span>
              )}
            </div>
            <span className="grid h-7 w-7 place-items-center rounded-full border border-forest-500/50 text-forest-200 transition group-hover:border-sunset group-hover:text-sunset">
              <Plus size={14} />
            </span>
          </div>
        </div>
      </motion.button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={project.title}
        subtitle={`${project.date} · ${project.category}`}
      >
        <div className="space-y-5">
          <p className="rounded-xl border border-forest-500/30 bg-forest-800/40 p-3 text-sm text-forest-100">
            {project.impact}
          </p>
          <StackChips items={project.stack} size="md" />
          <ul className="space-y-2.5">
            {project.bullets.map((b, i) => (
              <li key={i} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-forest-400"
                />
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
          {(project.liveUrl || project.codeUrl) && (
            <div className="flex flex-wrap gap-2 pt-1">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-sunset px-4 py-2 text-sm font-medium text-ink transition hover:bg-sunset-soft"
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-forest-500/60 px-4 py-2 text-sm text-parchment transition hover:border-forest-300 hover:text-forest-100"
                >
                  <FaGithub size={14} /> View Code
                </a>
              )}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
