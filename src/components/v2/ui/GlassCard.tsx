interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = "", hover }: GlassCardProps) {
  return (
    <div className={`v2-glass rounded-2xl ${hover ? "transition-colors duration-300 hover:v2-glass-hover" : ""} ${className}`}>
      {children}
    </div>
  );
}
