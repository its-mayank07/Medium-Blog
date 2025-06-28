const AppBarShimmer = () => {
  return (
    <header className="flex justify-between items-center border-b border-gray-200 bg-white px-6 md:px-10 py-4 shadow-sm animate-pulse">
      {/* Logo */}
      <div className="h-6 w-24 bg-gray-300 rounded"></div>

      {/* Buttons */}
      <div className="flex gap-3 items-center">
        {/* Publish button shimmer */}
        <div className="h-10 w-24 bg-gray-300 rounded-full"></div>

        {/* Profile avatar shimmer */}
        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
      </div>
    </header>
  );
};

export default AppBarShimmer;
