const AppBarShimmer = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/60 shadow-sm animate-pulse">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Title shimmer */}
          <div className="h-8 w-20 sm:w-24 bg-gray-200 rounded"></div>

          {/* Right side shimmer - Publish + Users + Profile */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Publish button shimmer */}
            <div className="h-10 w-20 sm:w-24 bg-gray-300 rounded-full"></div>
            {/* Users button shimmer */}
            <div className="w-10 h-10 bg-gray-200 rounded-full border border-gray-200"></div>
            {/* Profile avatar shimmer */}
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppBarShimmer;
