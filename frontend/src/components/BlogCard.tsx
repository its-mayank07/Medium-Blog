import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
  isAuthor: boolean;
  onDelete?: (id: string) => void;
}

const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
  isAuthor,
  onDelete,
}: BlogCardProps) => {
  const readingTime = Math.max(1, Math.ceil(content.length / 300));

  const deleteBlog = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      });
      if (onDelete) onDelete(id);
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  return (
    <div className="border-b border-gray-200 py-4 px-4 sm:px-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Avatar name={authorName} />
          <span className="font-medium text-black">{authorName}</span>
          <span>·</span>
          <span>{publishedDate}</span>
        </div>

        {isAuthor && (
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Delete blog"
            onClick={() => {
              deleteBlog();
            }}
          >
            <MdDelete className="text-lg text-gray-600 hover:text-gray-700" />
          </button>
        )}
      </div>

      <Link to={`/blog/${id}`}>
        <h2 className="text-lg font-bold text-black mt-1">{title}</h2>

        <p className="text-gray-700 text-sm mt-1 line-clamp-2">
          {content.slice(0, 140)}...
        </p>

        <div className="mt-4 text-sm text-gray-500">{readingTime} min read</div>
      </Link>
    </div>
  );
};

export default BlogCard;
