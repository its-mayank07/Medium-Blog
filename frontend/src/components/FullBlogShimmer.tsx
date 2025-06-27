const FullBlogShimmer = () => {
  return (
    <div>
      {/* AppBar shimmer */}
      <div className="flex justify-between items-center border-b border-gray-200 bg-white px-6 md:px-10 py-4 animate-pulse">
        <div className="h-6 w-24 bg-gray-200 rounded" />
       <div className="flex items-center gap-3">
        <div className="h-9 w-20 bg-gray-200 font-medium rounded-full px-5 py-2.5" />
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
        </div> 
      </div>

      {/* Blog content shimmer */}
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8 animate-pulse">
        {/* Left blog content shimmer */}
        <div className="flex-1 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-11/12" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>

        {/* Author card shimmer */}
        <div className="w-full lg:w-64 shrink-0 border-l border-gray-200 pl-6 space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlogShimmer;
