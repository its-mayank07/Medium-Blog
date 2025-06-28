const BlogCardShimmer = () => {
  return (
    <div className="flex justify-center px-2 sm:px-0">
      <div className="w-full max-w-2xl border-b border-gray-200 py-6 px-4 sm:px-6 animate-pulse space-y-4">
        
        {/* Header with avatar and metadata */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          <div className="h-4 bg-gray-300 rounded w-28" />
          <span className="text-gray-400">·</span>
          <div className="h-4 bg-gray-300 rounded w-24" />
        </div>

        {/* Blog title */}
        <div className="h-6 bg-gray-300 rounded w-3/5" />

        {/* Snippet lines */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-11/12" />
          <div className="h-4 bg-gray-300 rounded w-2/3" />
        </div>

        {/* Reading time placeholder */}
        <div className="h-4 bg-gray-300 rounded w-24" />
      </div>
    </div>
  );
};

export default BlogCardShimmer;
