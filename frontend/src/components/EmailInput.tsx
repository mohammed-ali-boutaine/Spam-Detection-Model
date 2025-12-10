
import type { ExampleMessage } from '../types.ts';

interface EmailInputProps {
  title: string;
  message: string;
  onTitleChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  exampleMessages: ExampleMessage[];
  onExampleClick: (example: ExampleMessage) => void;
}

export default function EmailInput({
  title,
  message,
  onTitleChange,
  onMessageChange,
  exampleMessages,
  onExampleClick,
}: EmailInputProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Email Subject (Optional)
      </label>
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Enter email subject..."
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors mb-4"
      />
      
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Email Message
      </label>
      <textarea
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        placeholder="Type or paste email content here..."
        className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none transition-colors"
      />
      <div className="text-sm text-gray-500 mt-2">
        {message.length} characters
      </div>

      {/* Example Messages */}
      <div className="mt-6">
        <p className="text-sm font-semibold text-gray-700 mb-2">
          Quick Examples:
        </p>
        <div className="flex flex-wrap gap-2">
          {exampleMessages.map((example, idx) => (
            <button
              key={idx}
              onClick={() => onExampleClick(example)}
              className="text-xs px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-left"
            >
              Example {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
