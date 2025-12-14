import { TrendingUp } from 'lucide-react';
import Spinner from './Spinner';

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
      className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <Spinner size="md" color="white" />
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
