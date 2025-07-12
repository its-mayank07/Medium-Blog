export default function UserBlogShimmer() {
  return (
    <aside className="w-full max-w-xs mx-auto md:w-72 lg:w-96 md:pl-8 flex-shrink-0 mb-8 md:mb-0 md:self-start">
      <div className="bg-white rounded-xl p-6 flex flex-col items-center animate-pulse">
        {/* Avatar shimmer */}
        <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
        
        {/* Name shimmer */}
        <div className="mt-4 h-8 w-32 bg-gray-200 rounded"></div>
        
        {/* Email shimmer */}
        <div className="mt-2 h-4 w-40 bg-gray-200 rounded"></div>
        
        {/* Bio shimmer */}
        <div className="mt-2 h-4 w-48 bg-gray-200 rounded"></div>
        
        {/* Follow button shimmer */}
        <div className="flex flex-col items-stretch w-full gap-3 mt-4">
          <div className="h-10 w-full bg-gray-200 rounded-md"></div>
        </div>
        
        {/* Tab navbar shimmer */}
        <div className="flex w-full justify-center mb-4 mt-4">
          <div className="flex">
            <div className="px-4 py-2 h-8 w-20 bg-gray-200 rounded-l"></div>
            <div className="px-4 py-2 h-8 w-20 bg-gray-200 rounded-r"></div>
          </div>
        </div>
        
        {/* Followers/Following content shimmer */}
        <div className="w-full space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
} 