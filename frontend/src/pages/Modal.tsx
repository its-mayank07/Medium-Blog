import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, useParams, useLocation } from "react-router-dom";

// Simple Loading component
const Loading = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="flex flex-col items-center">
      <svg className="animate-spin h-8 w-8 text-gray-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
      <div className="text-gray-600 text-lg font-medium">Updating...</div>
    </div>
  </div>
);

const Modal = () => {
  const location = useLocation();
  const { title, content } = location.state || {};
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedContent, setUpdatedContent] = useState(content);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  const handleUpdate = async () => {
    setLoading(true);
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
            Authorization: sessionStorage.getItem("token") || "",
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
        navigate("/signin");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

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
          placeholder="Write your blog..."
          className="w-full text-base sm:text-lg placeholder-gray-500 text-gray-800 focus:outline-none min-h-[300px] resize-none"
        />

        {/* Update Blog button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleUpdate}
            className="rounded-full bg-gray-900 text-white px-5 py-2 text-sm font-medium hover:bg-gray-800 transition-all whitespace-nowrap"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
