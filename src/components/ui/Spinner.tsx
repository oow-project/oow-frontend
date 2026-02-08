interface SpinnerProps {
  className?: string;
}

export const Spinner = ({ className = "py-20" }: SpinnerProps) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-oow-navy-600 border-t-oow-orange" />
  </div>
);
