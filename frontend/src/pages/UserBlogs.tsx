import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import { useUserBlogs } from "../hooks";
import type { Blog } from "../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileSidebar from "../components/ProfileSideBar";
import UserBlogShimmer from "../components/Shimmer/UserBlogShimmer";


const UserBlogs = () => {

  const { id } = useParams();
  const { loading, userBlogs: initialBlogs } = useUserBlogs({ id: id || "" });
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [activeTab, setActiveTab] = useState<"blogs" | "profile">("profile");
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentUserId = payload.id;
      setIsOwnProfile(currentUserId === id);

    } 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error: unknown) {
      setIsOwnProfile(false);
    }
  }, [navigate, id]);

  useEffect(() => {
    setBlogs(initialBlogs);
  }, [initialBlogs]);

  const handleDelete = (id: string) => {
    setBlogs((prev: Blog[]) => prev.filter((blog: Blog) => blog.id !== id));
  };

 

  // Loading State
  if (loading) {
    return (
      <div>
        <AppBar />
        <UserBlogShimmer />
      </div>
    );
  }

  // Empty State
  if (!blogs || blogs.length === 0) {
    return (
      <div>
        <AppBar />
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          {/* Mobile Tab Navbar */}
          <div className="flex md:hidden w-full justify-center mb-4">
            <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow flex overflow-hidden">
              <button
                className={`flex-1 px-4 py-2 text-sm font-medium transition-colors duration-200 ${activeTab === "blogs" ? "bg-gray-100 text-gray-900" : "bg-white text-gray-500 hover:bg-gray-50"}`}
                onClick={() => setActiveTab("blogs")}
              >
                Blogs
              </button>
              <button
                className={`flex-1 px-4 py-2 text-sm font-medium transition-colors duration-200 ${activeTab === "profile" ? "bg-gray-100 text-gray-900" : "bg-white text-gray-500 hover:bg-gray-50"}`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
            </div>
          </div>
          {/* Mobile: Show only the selected tab */}
          <div className="md:hidden">
            {activeTab === "blogs" ? (
              <section>
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {isOwnProfile ? "Start writing your story" : "No stories yet"}
                  </h3>
                  <p className="text-gray-600 text-sm max-w-md mx-auto">
                    {isOwnProfile
                      ? "Share your thoughts, experiences, and ideas with the world. Your first story is just a click away."
                      : "This user hasn't published any stories yet."}
                  </p>
                  {isOwnProfile && (
                    <button
                      onClick={() => navigate("/publish")}
                      className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Write your first story
                    </button>
                  )}
                </div>
              </section>
            ) : (
              <section>
                <ProfileSidebar blogs={blogs} isOwnProfile={isOwnProfile} userId={id || ""} />
              </section>
            )}
          </div>
          {/* Desktop: Show both side by side */}
          <div className="hidden md:flex md:flex-row md:items-start gap-0">
            <section className="flex-1 min-w-0">
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {isOwnProfile ? "Start writing your story" : "No stories yet"}
                </h3>
                <p className="text-gray-600 text-sm max-w-md mx-auto">
                  {isOwnProfile
                    ? "Share your thoughts, experiences, and ideas with the world. Your first story is just a click away."
                    : "This user hasn't published any stories yet."}
                </p>
                {isOwnProfile && (
                  <button
                    onClick={() => navigate("/publish")}
                    className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Write your first story
                  </button>
                )}
              </div>
            </section>
            <div className="hidden md:block h-auto border-l border-gray-200" style={{ minHeight: '300px', marginRight: 0, marginLeft: 0 }} />
            <section className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0 mb-3 md:mb-0">
              <ProfileSidebar blogs={blogs} isOwnProfile={isOwnProfile} userId={id || ""} />
            </section>
          </div>
        </div>
      </div>
    );
  }

  function UserBlogsTabs({ blogs, isOwnProfile, userId }: { blogs: Blog[]; isOwnProfile: boolean; userId: string }) {
    return (
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Mobile Tab Navbar */}
        <div className="flex md:hidden w-full justify-center mb-4">
          <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow flex overflow-hidden">
            <button
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors duration-200 ${activeTab === "blogs" ? "bg-gray-100 text-gray-900" : "bg-white text-gray-500 hover:bg-gray-50"}`}
              onClick={() => setActiveTab("blogs")}
            >
              Blogs
            </button>
            <button
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors duration-200 ${activeTab === "profile" ? "bg-gray-100 text-gray-900" : "bg-white text-gray-500 hover:bg-gray-50"}`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
          </div>
        </div>
        {/* Mobile: Show only the selected tab */}
        <div className="md:hidden">
          {activeTab === "blogs" ? (
            <section>
              <div className="space-y-6">
                {blogs.map((blog: Blog) => (
                  <BlogCard
                    isAuthor={isOwnProfile}
                    key={blog.id}
                    id={blog.id}
                    publishedDate={blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "Unknown date"}
                    title={blog.title}
                    authorName={blog.author.name || "Anonymous"}
                    content={blog.content}
                    onDelete={isOwnProfile ? handleDelete : undefined}
                    authorId={blog.author.id}
                  />
                ))}
              </div>
            </section>
          ) : (
            <section>
              <ProfileSidebar blogs={blogs} isOwnProfile={isOwnProfile} userId={userId} />
            </section>
          )}
        </div>
        {/* Desktop: Show both side by side */}
        <div className="hidden md:flex md:flex-row md:items-start gap-0">
          <section className="flex-1 min-w-0">
            <div className="space-y-6">
              {blogs.map((blog: Blog) => (
                <BlogCard
                  isAuthor={isOwnProfile}
                  key={blog.id}
                  id={blog.id}
                  publishedDate={blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "Unknown date"}
                  title={blog.title}
                  authorName={blog.author.name || "Anonymous"}
                  content={blog.content}
                  onDelete={isOwnProfile ? handleDelete : undefined}
                  authorId={blog.author.id}
                />
              ))}
            </div>
          </section>
          <div className="hidden md:block h-auto border-l border-gray-200" style={{ minHeight: '300px', marginRight: 0, marginLeft: 0 }} />
          <section className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0 mb-3 md:mb-0">
            <ProfileSidebar blogs={blogs} isOwnProfile={isOwnProfile} userId={userId} />
          </section>
        </div>
      </div>
    );
  }

  // Main Profile + Stories
  return (
    <div>
      <AppBar />
      <UserBlogsTabs blogs={blogs} isOwnProfile={isOwnProfile} userId={id || ""} />
    </div>
  );
};

export default UserBlogs;

