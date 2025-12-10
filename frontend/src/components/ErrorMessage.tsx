interface ErrorMessageProps {
  error: string;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;

  return (
    <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
      <p className="text-red-700 text-sm">
        <strong>Error:</strong> {error}
      </p>
    </div>
  );
}
