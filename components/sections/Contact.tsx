"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { personal } from "@/data/personal";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";

const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "YOUR_WEB3FORMS_KEY";

export function Contact() {
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if ((data.get("company") as string)?.trim()) return;

    data.append("access_key", ACCESS_KEY);
    data.append("from_name", personal.name + " portfolio");
    data.append(
      "subject",
      (data.get("subject") as string) ||
        `New message from ${data.get("name") || "visitor"}`,
    );

    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Message sent. I'll get back to you within 24 hours.");
        form.reset();
      } else {
        toast.error(json.message ?? "Something went wrong. Try email instead.");
      }
    } catch {
      toast.error("Network error. Please email me directly.");
    } finally {
      setSending(false);
    }
  }

  return (
    <SectionShell id="contact">
      <SectionTitle
        kicker="Contact"
        title="Let's build something."
        subtitle="Hiring, collaborating, or just curious — drop a line. Replies within 24 hours."
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <form
          onSubmit={onSubmit}
          className="glass flex flex-col gap-4 rounded-2xl p-5 sm:p-6"
        >
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            title="Leave empty"
            placeholder="Leave empty"
            className="hidden"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="name" label="Name" required placeholder="Your name" />
            <Field
              name="email"
              type="email"
              label="Email"
              required
              placeholder="you@company.com"
            />
          </div>

          <Field
            name="subject"
            label="Subject"
            placeholder="Role / opportunity / question"
          />

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium uppercase tracking-wider text-forest-300">
              Message
            </span>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell me what you're building or what you need."
              className="rounded-xl border border-mist-strong bg-forest-900/40 px-3.5 py-2.5 text-sm text-parchment placeholder:text-parchment-dim/60 focus:border-forest-300 focus:outline-none"
            />
          </label>

          <button
            type="submit"
            disabled={sending}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full bg-sunset px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-sunset-soft disabled:cursor-not-allowed disabled:opacity-60",
            )}
          >
            <Send size={14} />
            {sending ? "Sending…" : "Send message"}
          </button>

          <p className="text-[11px] text-parchment-dim">
            Protected by a honeypot. No tracking, no spam.
          </p>
        </form>

        <aside className="flex flex-col gap-3">
          <DirectLink
            icon={<Mail size={14} />}
            label="Email"
            value={personal.email}
            href={`mailto:${personal.email}`}
          />
          <DirectLink
            icon={<Phone size={14} />}
            label="Phone"
            value={personal.phone}
            href={`tel:${personal.phone.replace(/\s/g, "")}`}
          />
          <DirectLink
            icon={<FaLinkedinIn size={14} />}
            label="LinkedIn"
            value="vansh-o"
            href={personal.links.linkedin}
            external
          />
          <DirectLink
            icon={<FaGithub size={14} />}
            label="GitHub"
            value="Vanshoberoi-dev"
            href={personal.links.github}
            external
          />
          <DirectLink
            icon={<MapPin size={14} />}
            label="Location"
            value={personal.location}
          />
        </aside>
      </div>
    </SectionShell>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-forest-300">
        {label}
        {required && <span className="ml-0.5 text-sunset">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="rounded-xl border border-mist-strong bg-forest-900/40 px-3.5 py-2.5 text-sm text-parchment placeholder:text-parchment-dim/60 focus:border-forest-300 focus:outline-none"
      />
    </label>
  );
}

function DirectLink({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <div className="glass flex items-center gap-3 rounded-xl p-3.5 transition hover:border-sunset/50">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-forest-700/70 text-forest-200">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-forest-300">
          {label}
        </div>
        <div className="truncate text-sm text-parchment">{value}</div>
      </div>
    </div>
  );
  if (!href) return inner;
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="block"
    >
      {inner}
    </a>
  );
}
