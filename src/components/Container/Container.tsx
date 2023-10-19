import clsx from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}
export function Container({ children, className }: ContainerProps) {
  return (
    <div className={clsx("max-w-screen-xl mx-auto px-site-gutter", className)}>
      {children}
    </div>
  );
}
