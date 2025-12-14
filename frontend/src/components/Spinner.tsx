interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export default function Spinner({ size = 'md', color = 'white' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-3',
    lg: 'w-8 h-8 border-4'
  };

  const colorClasses = {
    white: 'border-white border-t-transparent',
    indigo: 'border-indigo-600 border-t-transparent',
    gray: 'border-gray-400 border-t-transparent'
  };

  return (
    <div
      className={`${sizeClasses[size]} ${colorClasses[color as keyof typeof colorClasses] || colorClasses.white} rounded-full animate-spin`}
    />
  );
}
