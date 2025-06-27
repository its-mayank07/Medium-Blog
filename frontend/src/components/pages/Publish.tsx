import { useState } from "react";
import AppBar from "../AppBar";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";

const Publish = () => {
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const navigate = useNavigate();
  return (
    <div>
      <AppBar />

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Title input and Publish button */}
        <div className="flex items-center gap-4 mb-6">
          {/* Title input */}
          <input
            onChange={(e) => setTitle(e.target.value) }
            type="text"
            placeholder="Title"
            className="flex-1 text-5xl font-semibold placeholder-gray-400 text-gray-900 focus:outline-none"
          />

          {/* Circular Publish button */}
          <button onClick={async() => {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                title,
                content
            },{
                headers : {
                    Authorization : localStorage.getItem("token")
                }
            });
            navigate(`/blog/${response.data.blog.id}`)
          }} className="rounded-full bg-gray-900 text-white px-5 py-2 text-sm font-medium hover:bg-gray-800 transition-all whitespace-nowrap">
            Publish Blog
          </button>
        </div>

        {/* Content textarea */}
        <textarea
            onChange={(e) => setContent(e.target.value) }
          placeholder="Tell your story..."
          className="w-full text-lg placeholder-gray-500 text-gray-800 focus:outline-none min-h-[300px] resize-none"
        />
      </div>
    </div>
  );
};

export default Publish;
