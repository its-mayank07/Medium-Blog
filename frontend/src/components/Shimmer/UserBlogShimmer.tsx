import BlogCardShimmer from "./BlogCardShimmer";

export default function UserBlogShimmer() {
  return (
    <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8 mt-8 w-full">
          {/* Mobile Tab Navbar Shimmer */}
          <div className="flex md:hidden w-full justify-center mb-6">
            <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-sm flex overflow-hidden animate-pulse">
              <div className="flex-1 px-6 py-3 h-10 bg-gray-100"></div>
              <div className="flex-1 px-6 py-3 h-10 bg-gray-100"></div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-start w-full">
            {/* Main (Blogs) Shimmer */}
            <main className="flex-1">
              {/* Mobile: Blog content shimmer */}
              <div className="md:hidden">
                <div className="space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="border-b border-gray-200 py-6 px-4 sm:px-6 animate-pulse">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200" />
                          <div className="space-y-1">
                            <div className="h-4 bg-gray-200 rounded w-28" />
                            <div className="h-3 bg-gray-200 rounded w-20" />
                          </div>
                        </div>
                      </div>
                      {/* Title */}
                      <div className="mb-3">
                        <div className="h-7 bg-gray-200 rounded w-4/5 mb-2" />
                        <div className="h-7 bg-gray-200 rounded w-3/5" />
                      </div>
                      {/* Content */}
                      <div className="space-y-2 mb-4">
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-11/12" />
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                      </div>
                      {/* Reading time */}
                      <div className="h-4 bg-gray-100 rounded w-24" />
                    </div>
                  ))}
                </div>
              </div>
              {/* Desktop: Blog content shimmer */}
              <div className="hidden md:block">
                <div className="space-y-6 md:max-w-3xl lg:max-w-4xl mx-auto w-full">
                  {[...Array(3)].map((_, i) => (
                    <BlogCardShimmer key={i} />
                  ))}
                </div>
              </div>
            </main>
            {/* Desktop: Profile sidebar shimmer */}
            <div className="hidden md:block">
              <aside className="w-full max-w-sm mx-auto md:w-80 lg:w-96 md:pl-8 flex-shrink-0 mb-8 md:mb-0 md:self-start">
                <div className="bg-white rounded-2xl p-8 flex flex-col items-center animate-pulse shadow-sm border border-gray-100">
                  {/* Avatar shimmer */}
                  <div className="w-24 h-24 bg-gray-200 rounded-full mb-6"></div>
                  {/* Name shimmer */}
                  <div className="h-8 w-32 bg-gray-200 rounded mb-3"></div>
                  {/* Email shimmer */}
                  <div className="h-4 w-40 bg-gray-200 rounded mb-4"></div>
                  {/* Bio shimmer */}
                  <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-36 bg-gray-200 rounded mb-6"></div>
                  {/* Follow button shimmer */}
                  <div className="w-full mb-6">
                    <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
                  </div>
                  {/* Tab navbar shimmer */}
                  <div className="w-full mb-6">
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <div className="flex-1 h-8 bg-gray-200 rounded-md"></div>
                      <div className="flex-1 h-8 bg-gray-200 rounded-md ml-1"></div>
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
            </div>
          </div>
        </div>
  );
} 