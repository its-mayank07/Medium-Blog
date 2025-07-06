import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
const isLoggedIn = !!sessionStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/blogs");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to Medium Clone</h1>
        <p className="text-gray-600 mb-6">Discover and share ideas from writers around the world.</p>
        <div className="space-x-4">
          <Link
            to="/signup"
            className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Sign Up
          </Link>
          <Link
            to="/signin"
            className="border border-black text-black px-5 py-2 rounded-full hover:bg-gray-100 transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
