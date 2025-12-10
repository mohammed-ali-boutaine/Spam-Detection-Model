export interface PredictionResult {
  prediction: string;
  timestamp: string;
}

export interface HistoryItem {
  message: string;
  prediction: string;
  timestamp: string;
}

export interface ExampleMessage {
  title: string;
  message: string;
}
