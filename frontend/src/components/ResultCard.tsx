import { AlertCircle, CheckCircle } from 'lucide-react';
import type { PredictionResult } from '../types';

interface ResultCardProps {
  result: PredictionResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  const isSpam = result.prediction === 'Spam';

  return (
    <div className="mt-6 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200">
      <div className="flex items-start gap-4">
        {isSpam ? (
          <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
        ) : (
          <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
        )}
        <div className="flex-1">
          <h3
            className="text-2xl font-bold"
            style={{
              color: isSpam ? '#ef4444' : '#10b981'
            }}
          >
            {result.prediction}
          </h3>
        </div>
      </div>
    </div>
  );
}
