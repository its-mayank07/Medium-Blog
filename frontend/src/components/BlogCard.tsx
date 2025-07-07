import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useRef } from "react";

interface BlogCardProps {
  authorName: string;
  authorId :string
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
  authorId,
  id,
  isAuthor,
  onDelete,
}: BlogCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const readingTime = Math.max(1, Math.ceil(content.length / 300));

  useEffect(() => {
    if (!showMenu) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const deleteBlog = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: sessionStorage.getItem("token") || "",
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
          <Avatar name={authorId} />
          <span className="font-medium text-black">{authorName}</span>
          <span>·</span>
          <span>{publishedDate}</span>
        </div>

        {isAuthor && (
          <div className="relative" ref={menuRef}>
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
              title="Options"
              onClick={() => setShowMenu((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={showMenu}
            >
              <span className="text-2xl font-bold text-gray-600">⋯</span>
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-xl shadow-md z-50">
                <Link to={`/blog/${id}/edit`} state={{ title, content }}>
                  <button
                    className="flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-xl transition-colors"
                    onClick={() => {
                      setShowMenu(false);
                      // TODO: handle update logic
                    }}
                  >
                    Update
                  </button>
                </Link>
                <button
                  className="flex items-center w-full gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-xl transition-colors"
                  onClick={() => {
                    deleteBlog();
                    setShowMenu(false);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
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
