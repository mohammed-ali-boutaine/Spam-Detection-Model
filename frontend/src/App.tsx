import { useState } from 'react';
import Header from './components/Header';
import EmailInput from './components/EmailInput';
import PredictButton from './components/PredictButton';
import ErrorMessage from './components/ErrorMessage';
import ResultCard from './components/ResultCard';
import HistoryList from './components/HistoryList';
import { predictSpam } from './services/api';
import type { PredictionResult, HistoryItem, ExampleMessage } from './types';

export default function App() {
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const exampleMessages: ExampleMessage[] = [
    { title: "Congratulations!", message: "You've won a FREE iPhone! Click here to claim your prize NOW!" },
    { title: "Meeting Tomorrow", message: "Hi John, are we still meeting for coffee tomorrow at 3pm?" },
    { title: "URGENT Account Alert", message: "Your account will be closed! Verify now to avoid suspension!" }
  ];

  const handlePredict = async () => {
    if (!message.trim()) return;
    
    setLoading(true);
    setError('');
    try {
      const prediction = await predictSpam(title, message);
      setResult(prediction);
      
      const displayText = `${title ? title + ': ' : ''}${message.substring(0, 50)}${message.length > 50 ? '...' : ''}`;
      setHistory(prev => [{
        message: displayText,
        ...prediction
      }, ...prev].slice(0, 5));
    } catch (err: any) {
      console.error('Prediction error:', err);
      setError(err.message || 'Failed to connect to the server. Make sure the backend is running.');
    }
    setLoading(false);
  };

  const handleExampleClick = (example: ExampleMessage) => {
    setTitle(example.title);
    setMessage(example.message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <Header />

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <EmailInput
            title={title}
            message={message}
            onTitleChange={setTitle}
            onMessageChange={setMessage}
            exampleMessages={exampleMessages}
            onExampleClick={handleExampleClick}
          />

          <PredictButton
            onClick={handlePredict}
            disabled={!message.trim() || loading}
            loading={loading}
          />

          <ErrorMessage error={error} />

          {result && <ResultCard result={result} />}
        </div>

        <HistoryList history={history} />
      </div>
    </div>
  );
}