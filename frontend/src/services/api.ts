import type { PredictionResult } from '../types';

const API_URL = 'http://localhost:8000';

export const predictSpam = async (title: string, message: string): Promise<PredictionResult> => {
  const response = await fetch(`${API_URL}/check-mail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, message }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Prediction failed');
  }

  const data = await response.json();
  return {
    prediction: data.message === 'spam' ? 'Spam' : 'Not Spam',
    timestamp: new Date().toLocaleTimeString()
  };
};
