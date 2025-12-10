import { Shield } from 'lucide-react';

export default function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <Shield className="w-12 h-12 text-indigo-600" />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Spam Detection System
      </h1>
      <p className="text-gray-600">
        AI-powered email classification using machine learning
      </p>
    </div>
  );
}
