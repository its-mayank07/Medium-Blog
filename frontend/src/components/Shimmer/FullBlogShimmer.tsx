const FullBlogShimmer = () => {
  return (
    <div>
      {/* AppBar shimmer */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/60 shadow-sm animate-pulse">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="h-8 w-20 sm:w-24 bg-gray-200 rounded"></div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="h-10 w-20 sm:w-24 bg-gray-300 rounded-full"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-full border border-gray-200"></div>
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog content shimmer */}
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8 animate-pulse">
        {/* Left blog content shimmer */}
        <div className="flex-1 space-y-4">
          {/* Title shimmer */}
          <div className="h-10 bg-gray-200 rounded w-3/4" />
          {/* Date shimmer */}
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          {/* Content shimmer */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-11/12" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-11/12" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </div>

        {/* Author card shimmer */}
        <div className="w-full lg:w-64 shrink-0 border-l border-gray-200 pl-6 space-y-4">
          {/* Author label shimmer */}
          <div className="h-4 bg-gray-200 rounded w-16" />
          {/* Author info shimmer */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-300" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24" />
              <div className="h-3 bg-gray-200 rounded w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlogShimmer;
