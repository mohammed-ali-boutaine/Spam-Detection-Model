import { TrendingUp } from 'lucide-react';

interface PredictButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}

export default function PredictButton({ onClick, disabled, loading }: PredictButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <TrendingUp className="w-5 h-5" />
          Analyze Email
        </>
      )}
    </button>
  );
}
