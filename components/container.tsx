interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = '',
}: ContainerProps) {
  return (
    <div className={`h-full max-w-7xl mx-auto p-5 ${className}`}>
      {children}
    </div>
  );
}
