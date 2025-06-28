import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Modal = () => {
  const location = useLocation();
  const { title, content } = location.state || {};
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedContent, setUpdatedContent] = useState(content);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      <AppBar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-12">
        {/* Title input */}
        <input
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="w-full text-3xl sm:text-4xl md:text-5xl font-semibold placeholder-gray-400 text-gray-900 focus:outline-none mb-6"
        />

        {/* Content textarea */}
        <textarea
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
          placeholder="Tell your story..."
          className="w-full text-base sm:text-lg placeholder-gray-500 text-gray-800 focus:outline-none min-h-[300px] resize-none"
        />

        {/* Update Blog button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={async () => {
              try {
                const response = await axios.put(
                  `${BACKEND_URL}/api/v1/blog`,
                  {
                    id: id,
                    title: updatedTitle,
                    content: updatedContent,
                  },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token") || "",
                    },
                  }
                );
                navigate(`/blog/${response.data.id}`);
              } catch (error: unknown) {
                if (
                  typeof error === "object" &&
                  error !== null &&
                  "response" in error &&
                  typeof (error as { response?: { status?: number } }).response === "object" &&
                  (error as { response?: { status?: number } }).response?.status === 401
                ) {
                  navigate("/signup");
                }
              }
            }}
            className="rounded-full bg-gray-900 text-white px-5 py-2 text-sm font-medium hover:bg-gray-800 transition-all whitespace-nowrap"
          >
            Update Blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
