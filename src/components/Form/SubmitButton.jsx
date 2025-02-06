export default function SubmitButton({ isLoading, text }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full bg-blue-500 text-white px-6 py-3 font-bold rounded"
    >
      {isLoading ? (
        <div className="relative h-6">
          <img
            src="/public/loadingSpinnerW.svg"
            alt="loading"
            className="w-9 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      ) : (
        text
      )}
    </button>
  );
}
