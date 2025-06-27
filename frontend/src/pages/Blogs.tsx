import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import BlogCardShimmer from "../components/BlogCardShimmer";
import { useBlogs } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Blogs = () => {
 
  const { loading, blogs } = useBlogs();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

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
      key={blog.id}
      id={blog.id}
      publishedDate={dateString}
      title={blog.title}
      authorName={blog.author.name || "Anonymous"}
      content={blog.content}
    />
  );
})}
    </div>
  </div>
</div>

  );
};

export default Blogs;

