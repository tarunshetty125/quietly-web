interface SectionShellProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tight?: boolean;
}

export function SectionShell({ children, className = "", id, tight }: SectionShellProps) {
  return (
    <section id={id} className={`${tight ? "v2-section-tight" : "v2-section"} ${className}`}>
      {children}
    </section>
  );
}
