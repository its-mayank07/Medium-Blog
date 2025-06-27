const BlogCardShimmer = () => {
  return (
    <div className="flex justify-center px-2 sm:px-0">
      <div className="w-full max-w-2xl border-b border-gray-200 py-4 px-4 sm:px-6 animate-pulse space-y-3">
        {/* Header */}
        <div className="flex items-center gap-2 text-sm">
          <div className="w-6 h-6 rounded-full bg-gray-300" />
          <div className="h-4 bg-gray-300 rounded w-24" />
          <span className="text-gray-400">·</span>
          <div className="h-4 bg-gray-300 rounded w-20" />
        </div>

        {/* Title */}
        <div className="h-5 bg-gray-300 rounded w-3/4" />

        {/* Content snippet */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-300 rounded w-full" />
          <div className="h-3 bg-gray-300 rounded w-5/6" />
        </div>

        {/* Reading time */}
        <div className="h-3 bg-gray-300 rounded w-20" />
      </div>
    </div>
  );
};

export default BlogCardShimmer;
