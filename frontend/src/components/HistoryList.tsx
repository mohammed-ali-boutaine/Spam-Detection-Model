import { Mail } from 'lucide-react';
import type { HistoryItem } from '../types';

interface HistoryListProps {
  history: HistoryItem[];
}

export default function HistoryList({ history }: HistoryListProps) {
  if (history.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center gap-2 mb-4">
        <Mail className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl font-bold text-gray-800">
          Recent Predictions
        </h2>
      </div>
      <div className="space-y-3">
        {history.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              <p className="text-sm text-gray-700 font-medium mb-1">
                {item.message}
              </p>
              <p className="text-xs text-gray-500">{item.timestamp}</p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="px-3 py-1 rounded-full text-sm font-semibold"
                style={{
                  backgroundColor: item.prediction === 'Spam' ? '#fee2e2' : '#d1fae5',
                  color: item.prediction === 'Spam' ? '#991b1b' : '#065f46'
                }}
              >
                {item.prediction}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
