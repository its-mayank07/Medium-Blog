import AppBar from "../AppBar";
import BlogCard from "../BlogCard";
import BlogCardShimmer from "../BlogCardShimmer";
import { useBlogs } from "../../hooks";

const Blogs = () => {
 
  const { loading, blogs } = useBlogs();

 if (loading) {
  return (
    <div>
      <AppBar />
      <div className="flex justify-center w-ful" mt-5>
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
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          id={blog.id}
          publishedDate={"Dec 3,2025"}
          title={blog.title}
          authorName={blog.author.name || "Anonymous"}
          content={blog.content}
        />
      ))}
    </div>
  </div>
</div>

  );
};

export default Blogs;

