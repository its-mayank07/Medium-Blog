import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import BlogCardShimmer from "../components/Shimmer/BlogCardShimmer";
import AppBarShimmer from "../components/Shimmer/AppBarShimmer";
import { useBlogs, useFollowingBlogs } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Blogs = () => {
  const { loading: allBlogsLoading, blogs: allBlogs } = useBlogs();
  const { loading: followingBlogsLoading, followingBlogs } = useFollowingBlogs();
  const [activeTab, setActiveTab] = useState<"all" | "following">("all");
  const [localAllBlogs, setLocalAllBlogs] = useState(allBlogs);
  const [localFollowingBlogs, setLocalFollowingBlogs] = useState(followingBlogs);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  const handleDelete = (id: string) => {
    setLocalAllBlogs(prev => prev.filter(blog => blog.id !== id));
    setLocalFollowingBlogs(prev => prev.filter(blog => blog.id !== id));
  };

 
  useEffect(() => {
    setLocalAllBlogs(allBlogs);
  }, [allBlogs]);

  useEffect(() => {
    setLocalFollowingBlogs(followingBlogs);
  }, [followingBlogs]);

  const isLoading = allBlogsLoading || followingBlogsLoading;
  const currentBlogs = activeTab === "all" ? localAllBlogs : localFollowingBlogs;

  if (isLoading) {
    return (
      <div>
        <AppBarShimmer />
        <div className="flex justify-center mt-10 px-2 sm:px-0">
          <div className="w-full max-w-2xl space-y-4">
            {[...Array(3)].map((_, i) => (
              <BlogCardShimmer key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentBlogs.length === 0) {
    return (
      <div>
        <AppBar />
        <SubNavbar activeTab={activeTab} setActiveTab={setActiveTab}/>

        <div className="flex justify-center px-2 mt-10 sm:px-0">
          <div className="w-full max-w-2xl text-center text-gray-500 flex flex-col items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 opacity-60"
              fill="none"
              viewBox="0 0 64 64"
              stroke="currentColor"
            >
              <rect x="8" y="16" width="48" height="32" rx="6" fill="#f3f4f6" />
              <path d="M16 24h32M16 32h20" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" />
              <circle cx="48" cy="32" r="3" fill="#a1a1aa" />
            </svg>
            <p className="text-lg">
              {activeTab === "all" ? "No blogs found." : "No blogs from people you follow."}
            </p>
            <p className="text-sm text-gray-400">
              {activeTab === "all" 
                ? "Be the first to publish a blog and inspire others!" 
                : "Follow some authors to see their blogs here."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AppBar/>
      <SubNavbar activeTab={activeTab} setActiveTab={setActiveTab}/>

      <div className="flex justify-center px-2 mt-2 sm:px-0">
        <div className="w-full max-w-2xl space-y-4 cursor-pointer">
          {currentBlogs.map((blog) => {
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
                key={blog.id}
                id={blog.id}
                publishedDate={dateString}
                title={blog.title}
                authorName={blog.author.name || "Anonymous"}
                content={blog.content}
                isAuthor={false} 
                onDelete={handleDelete}
                authorId={blog.author.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blogs;

const SubNavbar = ({activeTab, setActiveTab}: {activeTab: "all" | "following", setActiveTab: (tab: "all" | "following") => void}) => {
  return(
    <div className="sticky top-16 z-10 bg-white">
      <div className="flex justify-center lg:ml-10 mt-4 px-2 sm:px-0">
        <div className="w-full max-w-2xl">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-6 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${
                activeTab === "all" 
                  ? "text-gray-900 border-gray-900" 
                  : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("all")}
            >
              For You
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${
                activeTab === "following" 
                  ? "text-gray-900 border-gray-900" 
                  : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("following")}
            >
              Following
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


