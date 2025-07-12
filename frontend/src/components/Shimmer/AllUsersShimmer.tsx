import AppBar from "../AppBar";

const AllUsersShimmer = () => {
  return (
    <div>
      <AppBar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Header Shimmer */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="p-2 bg-gray-200 rounded-lg animate-pulse">
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
            </div>
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-4 w-64 bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>

        {/* Search and Results Row Shimmer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          {/* Search Bar Shimmer */}
          <div className="flex-1">
            <div className="relative">
              <div className="w-full h-9 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Results Counter Shimmer */}
          <div className="flex-shrink-0">
            <div className="w-24 h-6 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Users List Shimmer */}
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-3 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  {/* Avatar Shimmer */}
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  </div>
                  
                  {/* User Info Shimmer */}
                  <div className="flex-1 min-w-0">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>

                {/* Stats Shimmer - Hidden on mobile */}
                <div className="hidden md:flex items-center space-x-4">
                  <div className="text-center">
                    <div className="h-3 w-6 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div className="h-2 w-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="text-center">
                    <div className="h-3 w-6 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div className="h-2 w-12 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="text-center">
                    <div className="h-3 w-6 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div className="h-2 w-10 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>

                {/* Mobile Arrow Shimmer */}
                <div className="md:hidden">
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllUsersShimmer;
