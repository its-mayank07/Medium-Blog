const Quote = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200">
      <div className="max-w-md w-full p-6 bg-gray-100 rounded-xl shadow-lg flex flex-col items-start">
        <p className="text-2xl font-medium mb-4 text-gray-900">
          “The customer service I received was exceptional. The support team went above and beyond to address my concerns.”
        </p>
        <p className="text-lg font-bold text-gray-800">Jules Winnfield</p>
        <p className="text-sm text-gray-600">CEO, Acme Inc</p>
      </div>
    </div>
  );
};

export default Quote;