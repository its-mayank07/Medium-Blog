import { useParams } from "react-router-dom";
import FullBlog from "../FullBlog";
import { useBlog } from "../../hooks"
import AppBar from "../AppBar";
import FullBlogShimmer from "../FullBlogShimmer";


const Blog = () => {
  const {id} = useParams()
  const {loading,blogs} = useBlog({id: id || ""});
  if(loading) {
    return <div><FullBlogShimmer /></div>
  }
  return (
    <div>
      <AppBar />
      {blogs && <FullBlog blog={blogs} />}
    </div>
  )
}

export default Blog