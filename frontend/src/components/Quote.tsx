const Quote = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200">
      <div className="max-w-md w-full p-6 bg-gray-100 rounded-xl shadow-lg flex flex-col items-start">
        <p className="text-2xl font-medium mb-4 text-gray-900">
          “I don’t have a plan. I just do whatever feels right — and somehow, it works.”
        </p>
        <p className="text-lg font-bold text-gray-800">Mayank</p>
        <p className="text-sm text-gray-600">Probably building something again.</p>
      </div>
    </div>
  );
};

export default Quote;
