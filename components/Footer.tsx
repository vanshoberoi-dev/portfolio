import { Heart, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { personal } from "@/data/personal";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-mist-strong bg-forest-950/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-6 sm:flex-row sm:px-8">
        <p className="text-xs text-parchment-dim">
          © {year} {personal.name}. Crafted with{" "}
          <Heart size={11} className="mb-0.5 inline text-sunset" /> in the
          forest.
        </p>

        <div className="flex items-center gap-2">
          <a
            href={personal.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid h-8 w-8 place-items-center rounded-full border border-mist-strong text-parchment-dim transition hover:border-sunset hover:text-sunset"
          >
            <FaGithub size={14} />
          </a>
          <a
            href={personal.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid h-8 w-8 place-items-center rounded-full border border-mist-strong text-parchment-dim transition hover:border-sunset hover:text-sunset"
          >
            <FaLinkedinIn size={14} />
          </a>
          <a
            href={`mailto:${personal.email}`}
            aria-label="Email"
            className="grid h-8 w-8 place-items-center rounded-full border border-mist-strong text-parchment-dim transition hover:border-sunset hover:text-sunset"
          >
            <Mail size={14} />
          </a>
        </div>

        <p className="text-[11px] text-parchment-dim">
          Built with Next.js · Tailwind · Framer Motion
        </p>
      </div>
    </footer>
  );
}
