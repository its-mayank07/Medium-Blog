import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    id : string;
  };
  publishedAt: string;
}

// fetch a single blog
export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog>();
  const navigate = useNavigate();

  const handleBlogs = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      });
     
      setBlogs(response.data.blog);
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { status?: number } }).response ===
          "object" &&
        (error as { response?: { status?: number } }).response?.status === 401
      ) {
        navigate("/signin");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    blogs,
  };
};


// fetch all blogs
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  const handleBlogs = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      });
    
      setBlogs(response.data.blog);
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { status?: number } }).response ===
          "object" &&
        (error as { response?: { status?: number } }).response?.status === 401
      ) {
        navigate("/signin");
      }
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    handleBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    blogs,
  };
};



export const useUserBlogs = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [userBlogs, setUserBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleUserBlogs = async () => {
      try {
        setError(null);
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/user/${id}`, {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        });
        setUserBlogs(response.data.blog);
      } catch (error: unknown) {
        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error &&
          typeof (error as { response?: { status?: number } }).response ===
            "object" &&
          (error as { response?: { status?: number } }).response?.status === 401
        ) {
          navigate("/signin");
        } else if (
          typeof error === "object" &&
          error !== null &&
          "response" in error &&
          typeof (error as { response?: { status?: number; data?: { error?: string } } }).response ===
            "object" &&
          (error as { response?: { status?: number; data?: { error?: string } } }).response?.status === 404
        ) {
          const errorMessage = (error as { response?: { data?: { error?: string } } }).response?.data?.error || "User doesn't exist";
          setError(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };
    handleUserBlogs();
  }, [id, navigate]);

  return {
    loading,
    userBlogs,
    error,
  };
};
