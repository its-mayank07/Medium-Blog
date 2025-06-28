import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="w-full text-3xl sm:text-4xl md:text-5xl font-semibold placeholder-gray-400 text-gray-900 focus:outline-none mb-6"
        />

        {/* Content textarea */}
        <textarea
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tell your story..."
          className="w-full text-base sm:text-lg placeholder-gray-500 text-gray-800 focus:outline-none min-h-[300px] resize-none"
        />

        {/* Publish button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={async () => {
              try {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/blog`,
                  { title, content },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token") || "",
                    },
                  }
                );
                if (!response.data.blog.publishedAt) {
                  response.data.blog.publishedAt = new Date().toISOString();
                }
                navigate(`/blog/${response.data.blog.id}`);
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
            Publish Blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publish;
