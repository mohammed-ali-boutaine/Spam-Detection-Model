import  { useState } from 'react';
import { Shield, AlertCircle, CheckCircle, Mail, TrendingUp } from 'lucide-react';

const API_URL = 'http://localhost:8000';

export default function APP() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  // Call backend API
  const predictSpam = async (text: string) => {
    const response = await fetch(`${API_URL}/check-mail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Prediction failed');
    }

    const data = await response.json();
    return {
      prediction: data.message === 'spam' ? 'Spam' : 'Not Spam',
      confidence: data.prediction === 1 ? 0.99 : 0.01, // You can add confidence to backend if needed
      timestamp: new Date().toLocaleTimeString()
    };
  };

  const handlePredict = async () => {
    if (!message.trim()) return;
    
    setLoading(true);
    setError('');
    try {
      const prediction = await predictSpam(message);
      setResult(prediction);
      setHistory(prev => [{
        message: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
        ...prediction
      }, ...prev].slice(0, 5));
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err.message || 'Failed to connect to the server. Make sure the backend is running.');
    }
    setLoading(false);
  };

  const exampleMessages = [
    "Congratulations! You've won a FREE iPhone! Click here to claim your prize NOW!",
    "Hi John, are we still meeting for coffee tomorrow at 3pm?",
    "URGENT: Your account will be closed! Verify now to avoid suspension!"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Spam Detection System
          </h1>
          <p className="text-gray-600">
            AI-powered message classification using machine learning
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* Input Section */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Enter Message to Analyze
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type or paste a message here..."
              className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none transition-colors"
            />
            <div className="text-sm text-gray-500 mt-2">
              {message.length} characters
            </div>
          </div>

          {/* Example Messages */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Quick Examples:
            </p>
            <div className="flex flex-wrap gap-2">
              {exampleMessages.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => setMessage(example)}
                  className="text-xs px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-left"
                >
                  Example {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Predict Button */}
          <button
            onClick={handlePredict}
            disabled={!message.trim() || loading}
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
                Analyze Message
              </>
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <p className="text-red-700 text-sm">
                <strong>Error:</strong> {error}
              </p>
            </div>
          )}

          {/* Result Section */}
          {result && (
            <div className="mt-6 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200">
              <div className="flex items-start gap-4">
                {result.prediction === 'Spam' ? (
                  <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
                ) : (
                  <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
                )}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2" style={{
                    color: result.prediction === 'Spam' ? '#ef4444' : '#10b981'
                  }}>
                    {result.prediction}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Confidence: <span className="font-bold">{(result.confidence * 100).toFixed(1)}%</span>
                  </p>
                  
                  {/* Confidence Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full transition-all duration-500 rounded-full"
                      style={{
                        width: `${result.confidence * 100}%`,
                        backgroundColor: result.prediction === 'Spam' ? '#ef4444' : '#10b981'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* History Section */}
        {history.length > 0 && (
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
                    <span className="text-sm font-semibold text-gray-600">
                      {(item.confidence * 100).toFixed(0)}%
                    </span>
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
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>Powered by Machine Learning • Built with FastAPI & Scikit-learn</p>
        </div>
      </div>
    </div>
  );
}