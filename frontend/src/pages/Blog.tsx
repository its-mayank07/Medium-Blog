import { useNavigate, useParams } from "react-router-dom";
import FullBlog from "../components/FullBlog";
import { useBlog } from "../hooks"
import AppBar from "../components/AppBar";
import FullBlogShimmer from "../components/Shimmer/FullBlogShimmer";
import Comments from "../components/Comments";
import { useEffect } from "react";

const Blog = () => {
  const {id} = useParams()
  const {loading,blogs} = useBlog({id: id || ""});
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);
  
  if(loading) {
    return <div><FullBlogShimmer /></div>
  }
  return (
    <div>
      <AppBar/>
      {blogs && <FullBlog blog={blogs} />}
      {id && <Comments id={id} />}
    </div>
  )
}

export default Blog