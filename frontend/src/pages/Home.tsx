import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineBookOpen, HiOutlineUserAdd, HiOutlineLogin } from "react-icons/hi";

const Home = () => {
  const isLoggedIn = !!sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/blogs");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center">
          {/* Illustration */}
          <div className="mb-8">
            <HiOutlineBookOpen className="w-20 h-20 text-gray-800 mx-auto" />
          </div>
          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
            Welcome to <span className="text-gray-900">Medium</span>
          </h1>
          {/* Tagline */}
          <p className="text-gray-600 text-lg mb-8 max-w-xl">
            Discover, read, and share ideas from writers around the world. Join the conversation and start your own story today.
          </p>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto mb-4">
            <Link
              to="/signup"
              className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:bg-gray-900 transition w-full"
            >
              <HiOutlineUserAdd className="w-6 h-6" /> Sign Up
            </Link>
            <Link
              to="/signin"
              className="flex items-center justify-center gap-2 border border-gray-800 text-gray-900 px-6 py-3 rounded-full text-lg font-semibold shadow hover:bg-gray-100 transition w-full"
            >
              <HiOutlineLogin className="w-6 h-6" /> Sign In
            </Link>
          </div>
          <div className="mt-2">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-gray-700 font-medium hover:underline text-base"
            >
              <HiOutlineBookOpen className="w-5 h-5" /> Start Reading
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
