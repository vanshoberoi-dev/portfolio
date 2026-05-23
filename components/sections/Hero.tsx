"use client";

import { motion } from "framer-motion";
import { ArrowDown, FileText, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { personal } from "@/data/personal";
import { HeroBackdrop } from "@/components/effects/HeroBackdrop";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
    >
      <HeroBackdrop />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 pt-28 pb-16 sm:px-8 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-forest-300"
        >
          <span className="relative grid h-2.5 w-2.5 place-items-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-forest-300/70" />
            <span className="relative h-2 w-2 rounded-full bg-forest-300" />
          </span>
          {personal.status}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-display text-5xl leading-[1.05] text-parchment sm:text-7xl md:text-8xl"
        >
          {personal.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-2xl text-base text-parchment-dim sm:text-lg"
        >
          {personal.role}.
          <span className="block pt-2 text-forest-100">{personal.tagline}</span>
        </motion.p>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="grid grid-cols-2 gap-3 sm:max-w-3xl sm:grid-cols-4"
        >
          {personal.stats.map((s) => (
            <li
              key={s.label}
              className="glass rounded-2xl px-4 py-3"
            >
              <div className="text-[10px] uppercase tracking-wider text-forest-300">
                {s.label}
              </div>
              <div className="font-display text-xl text-parchment sm:text-2xl">
                {s.value}
              </div>
              <div className="text-[11px] text-parchment-dim">{s.sub}</div>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap items-center gap-3"
        >
          <a
            href={personal.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-sunset px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-sunset-soft"
          >
            <FileText size={16} /> View Resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-forest-400/60 px-5 py-2.5 text-sm font-medium text-parchment transition hover:border-forest-300 hover:bg-forest-800/40"
          >
            <Mail size={16} /> Contact Me
          </a>

          <div className="ml-1 flex items-center gap-1">
            <IconLink href={personal.links.github} label="GitHub">
              <FaGithub size={16} />
            </IconLink>
            <IconLink href={personal.links.linkedin} label="LinkedIn">
              <FaLinkedinIn size={16} />
            </IconLink>
            <IconLink href={`mailto:${personal.email}`} label="Email">
              <Mail size={16} />
            </IconLink>
          </div>
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-2 inline-flex items-center gap-2 self-start text-xs text-parchment-dim transition hover:text-parchment sm:absolute sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2"
          aria-label="Scroll to About"
        >
          <span>Scroll</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <ArrowDown size={14} />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-mist-strong text-parchment-dim transition hover:border-sunset hover:text-sunset"
    >
      {children}
    </a>
  );
}
