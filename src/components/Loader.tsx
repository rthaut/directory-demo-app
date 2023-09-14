export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex min-h-full flex-grow items-center justify-center">
      <div
        className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-cyan-600"
        role="status"
      >
        <span className="sr-only">Indefinite Loading Indicator</span>
      </div>
      <span className="ml-2 text-lg font-medium text-gray-500">{text}</span>
    </div>
  );
}
