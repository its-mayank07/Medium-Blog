const BlogCardShimmer = () => {
  return (
    <div className="border-b border-gray-200 py-4 px-4 sm:px-6 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          {/* Avatar shimmer */}
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          {/* Author name shimmer */}
          <div className="h-4 bg-gray-300 rounded w-24" />
          {/* Dot separator */}
          <span className="text-gray-400">·</span>
          {/* Date shimmer */}
          <div className="h-4 bg-gray-300 rounded w-20" />
        </div>

      </div>

      {/* Blog title shimmer */}
      <div className="mt-1">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-1" />
      </div>

      {/* Content snippet shimmer */}
      <div className="mt-1 space-y-1">
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-300 rounded w-11/12" />
      </div>

      {/* Reading time shimmer */}
      <div className="mt-4">
        <div className="h-4 bg-gray-300 rounded w-20" />
      </div>
    </div>
  );
};

export default BlogCardShimmer;
