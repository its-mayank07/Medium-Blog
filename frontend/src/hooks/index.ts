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
    email : string;
  };
  publishedAt: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AllUser {
  id: string;
  name: string;
  email: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
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

// fetch all blogs of a user
export const useUserBlogs = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [userBlogs, setUserBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const handleUserBlogs = async () => {
      setLoading(true);
      try {
        setError(null);
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/user/${id}`, {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        });
        if (isMounted) setUserBlogs(response.data.blog);
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
          if (isMounted) setError(errorMessage);
        } else {
          if (isMounted) setError("An unexpected error occurred.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    handleUserBlogs();
    return () => { isMounted = false; };
  }, [id, navigate]);

  return {
    loading,
    userBlogs,
    error,
  };
};

// fetch all the blogs of the users the current user follows
export const useFollowingBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [followingBlogs, setFollowingBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  const handleFollowingBlogs = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/following`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      });
     
      setFollowingBlogs(response.data.blog);
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
    handleFollowingBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    followingBlogs,
  };
};


// fetch all followers of a user
export const useUserFollowers = ({ id, refreshKey }: { id: string, refreshKey?: number }) => {
  const [loading, setLoading] = useState(true);
  const [userFollowers, setUserFollowers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleUserFollowers = async () => {
      try {
        setError(null);
        const response = await axios.get(`${BACKEND_URL}/api/v1/user/${id}/followers`, {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        });
        setUserFollowers(response.data.followers);
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
    handleUserFollowers();
  }, [id, navigate, refreshKey]);

  return {
    loading,
    userFollowers,
    error,
  };
};

// fetch all following of a user
export const useUserFollowing = ({ id, refreshKey }: { id: string, refreshKey?: number }) => {
  const [loading, setLoading] = useState(true);
  const [userFollowing, setUserFollowing] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleUserFollowing = async () => {
      try {
        setError(null);
        const response = await axios.get(`${BACKEND_URL}/api/v1/user/${id}/following`, {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        });
        setUserFollowing(response.data.following);
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
    handleUserFollowing();
  }, [id, navigate, refreshKey]);

  return {
    loading,
    userFollowing,
    error,
  };
};

// check if the current user is following the target user
export function useIsFollowing(targetUserId: string) {
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!targetUserId) return;
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/v1/user/${targetUserId}/is-following`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((res) => setIsFollowing(res.data.isFollowing))
      .catch(() => setIsFollowing(false))
      .finally(() => setLoading(false));
  }, [targetUserId]);

  return { isFollowing, loading };
}

// gets all users 

export const useAllUsers = () => {
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<AllUser[]>([]);
  const navigate = useNavigate();

  const handleAllUsers = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/user/allusers`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      });
    
      setAllUsers(response.data.users);
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
    handleAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    allUsers,
  };
}


