import { cn } from "@/lib/cn";

type Props = {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({
  kicker,
  title,
  subtitle,
  align = "left",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {kicker && (
        <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-forest-300">
          <span className="inline-block h-px w-8 bg-forest-400/60" />
          {kicker}
        </span>
      )}
      <h2 className="font-display text-3xl leading-tight text-parchment sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-sm text-parchment-dim sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
