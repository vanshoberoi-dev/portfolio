import { cn } from "@/lib/cn";

type Props = {
  items: readonly string[];
  className?: string;
  size?: "sm" | "md";
};

export function StackChips({ items, className, size = "sm" }: Props) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "rounded-full border border-forest-500/40 bg-forest-800/50 text-forest-100",
            size === "sm" && "px-2.5 py-0.5 text-[11px]",
            size === "md" && "px-3 py-1 text-xs",
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
