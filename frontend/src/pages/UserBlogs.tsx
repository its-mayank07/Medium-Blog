import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import BlogCardShimmer from "../components/BlogCardShimmer";
import { useUserBlogs } from "../hooks";
import type { Blog } from "../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import { faker } from "@faker-js/faker";

const generateAuthorBio = () => {
  return faker.person.bio(); // Returns realistic bios
};

const UserBlogs = () => {

  const { id } = useParams();
  const { loading, userBlogs: initialBlogs } = useUserBlogs({ id: id || "" });
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
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

  // Profile Sidebar Content
  const ProfileSidebar = (
    <aside className="w-full md:w-56 md:pl-8 flex-shrink-0 mb-8 md:mb-0 md:self-start">
      <div className="bg-white rounded-xl p-6 flex flex-col items-center">
        <Avatar name={blogs[0]?.author?.id || "U"} size="forProfile" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900 text-center">
          {blogs.length > 0 ? blogs[0].author.name : isOwnProfile ? "Your Profile" : "Anonymous"}
        </h1>
        <p className="text-gray-500 text-sm mb-2 text-center italic">
          {/* Author bio placeholder */}
          {generateAuthorBio() || "No bio provided yet."}
        </p>
        <p className="text-gray-600 text-sm mt-1  text-center">
          {blogs.length} {blogs.length === 1 ? 'blog' : 'blogs'} published
        </p>
        <div className="flex flex-col items-stretch w-full gap-3 mt-4">
          {isOwnProfile && (
            <button
              onClick={() => navigate("/publish")}
              className="inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 w-full justify-center"
            >
              Write a blog
            </button>
          )}
          {!isOwnProfile && (
            <button
              onClick={() => navigate("/blogs")}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 w-full justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to blogs
            </button>
          )}
        </div>
      </div>
    </aside>
  );

  // Loading State
  if (loading) {
    return (
      <div>
        <AppBar />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start px-4 sm:px-6 lg:px-8 mt-8">
          {/* Main (Stories) */}
          <main className="flex-1">
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <BlogCardShimmer key={i} />
              ))}
            </div>
          </main>
          {/* Sidebar Skeleton */}
          <aside className="w-full md:w-56 md:pl-8 flex-shrink-0 mt-8 md:mt-0 md:self-start">
            <div className="bg-white rounded-xl p-6 flex flex-col items-center animate-pulse min-h-[250px]">
              <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-8 w-32 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
              <div className="h-10 w-40 bg-gray-200 rounded"></div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // Empty State
  if (!blogs || blogs.length === 0) {
    return (
      <div>
        <AppBar />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start px-4 sm:px-6 lg:px-8 mt-8">
          <main className="flex-1">
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
          </main>
          {ProfileSidebar}
        </div>
      </div>
    );
  }

  // Main Profile + Stories
  return (
    <div>
      <AppBar />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start px-4 sm:px-6 lg:px-8 mt-8">
        {/* Main (Stories) */}
        <main className="flex-1">
          <div className="space-y-6">
            {blogs.map((blog: Blog) => {
              let dateString = "Unknown date";
              if (blog.publishedAt) {
                const date = new Date(blog.publishedAt);
                if (!isNaN(date.getTime())) {
                  dateString = date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });
                }
              }
              return (
                <BlogCard
                  isAuthor={isOwnProfile}
                  key={blog.id}
                  id={blog.id}
                  publishedDate={dateString}
                  title={blog.title}
                  authorName={blog.author.name || "Anonymous"}
                  content={blog.content}
                  onDelete={isOwnProfile ? handleDelete : undefined}
                  authorId={blog.author.id}
                />
              );
            })}
          </div>
        </main>
        {/* Vertical Separator for desktop */}
        <div className="hidden md:block h-auto mx-4 border-l border-gray-200" style={{ minHeight: '300px' }} />
        {/* Profile Sidebar */}
        {ProfileSidebar}
      </div>
    </div>
  );
};

export default UserBlogs;

