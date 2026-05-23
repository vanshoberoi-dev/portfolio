import { cn } from "@/lib/cn";

type Props = {
  id: string;
  className?: string;
  children: React.ReactNode;
};

export function SectionShell({ id, className, children }: Props) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-24",
        className,
      )}
    >
      {children}
    </section>
  );
}
