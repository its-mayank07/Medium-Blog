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
  };
  publishedAt: string;
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog>();
  const navigate = useNavigate();

  const handleBlogs = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
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
        navigate("/signup");
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

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  const handleBlogs = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
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
        navigate("/signup");
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

export const useMyBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  const handleBlogs = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/us`, {
        headers: {
          Authorization: localStorage.getItem("token"),
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
        navigate("/signup");
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
