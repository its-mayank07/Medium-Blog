import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import BlogCardShimmer from "../components/BlogCardShimmer";
import { useMyBlogs } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MyBlogs = () => {
 
 const { loading, blogs: initialBlogs } = useMyBlogs();
   const [blogs, setBlogs] = useState(initialBlogs);
   const navigate = useNavigate();
 
   useEffect(() => {
     const token = localStorage.getItem("token");
     if (!token) {
       navigate("/signin");
     }
   }, [navigate]);
 
   useEffect(() => {
     setBlogs(initialBlogs);
   }, [initialBlogs]);
 
   const handleDelete = (id: string) => {
     setBlogs((prev) => prev.filter((blog) => blog.id !== id));
   };

 if (loading) {
  return (
    <div>
      <AppBar />
      <div className="flex justify-center w-ful mt-5">
        <div className="w-full max-w-2xl space-y-4 px-4 sm:px-6">
          {[...Array(3)].map((_, i) => (
            <BlogCardShimmer key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

  if (!blogs || blogs.length === 0) {
    return (
      <div>
        <AppBar />
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
            <p className="text-lg">No blogs found.</p>
            <p className="text-sm text-gray-400">You haven't published a blog yet</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AppBar />
      <div className="flex justify-center px-2 mt-2 sm:px-0">
        <div className="w-full max-w-2xl space-y-4 cursor-pointer">
          {blogs.map((blog) => {
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
                isAuthor={true}
                key={blog.id}
                id={blog.id}
                publishedDate={dateString}
                title={blog.title}
                authorName={blog.author.name || "Anonymous"}
                content={blog.content}
                onDelete={handleDelete}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;

