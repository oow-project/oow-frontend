interface ErrorMessageProps {
  message: string;
  className?: string;
}

export const ErrorMessage = ({ message, className = "p-4 md:p-6" }: ErrorMessageProps) => (
  <div
    className={`rounded border border-oow-orange/40 bg-oow-navy-700 text-oow-orange ${className}`}
  >
    <p className="text-sm font-medium">{message}</p>
  </div>
);
