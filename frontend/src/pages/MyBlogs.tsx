import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar";

const MyBlogs = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    // Get the current user ID from the token
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;
      // Redirect to the profile page with user ID
      navigate(`/user/${userId}`);
    } 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error: unknown) {
      // If token parsing fails, redirect to signin
      navigate("/signin");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div>
        <AppBar />
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return null;
};

export default MyBlogs;

