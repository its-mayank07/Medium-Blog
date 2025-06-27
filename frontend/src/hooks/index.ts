import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog {
    id: string;
    title: string;
    content: string;
    author: {
        name: string;
    };
}
export const useBlog = ({id} : {id : string}) => {
     const [loading,setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog>();

    const handleBlogs = async ()=> {
       const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
        headers : {
            Authorization : localStorage.getItem("token")
        }
       });
       setBlogs(response.data.blog);
       setLoading(false);

    }
    useEffect(() => {
        handleBlogs();
    },[])

    return {
        loading,blogs
    }
}
export const useBlogs = () =>{
    const [loading,setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const handleBlogs = async ()=> {
       const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
        headers : {
            Authorization : localStorage.getItem("token")
        }
       });
       setBlogs(response.data.blog);
       setLoading(false);

    }
    useEffect(() => {
        handleBlogs();
    },[])

    return {
        loading,blogs
    }
}

