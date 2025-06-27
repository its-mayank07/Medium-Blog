import { faker } from '@faker-js/faker';
import type { Blog } from "../hooks";
import Avatar from './Avatar';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const generateAuthorBio = () => {
  return faker.person.bio(); // Returns realistic bios
};

const FullBlog = ({ blog }: { blog: Blog }) => {
  const navigate = useNavigate();

  let dateString = "Unknown date";
  if (blog.publishedAt) {
    const date = new Date(blog.publishedAt);
    if (!isNaN(date.getTime())) {
      dateString = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);
  const authorBio = generateAuthorBio();

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
      {/* Blog Content */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{blog.title}</h1>
        <p className="text-sm text-gray-500 mb-4">{dateString}</p>
        <p className="text-gray-800 mb-4">{blog.content}</p>
      </div>

      {/* Author Info */}
      <div className="w-full lg:w-64 shrink-0 border-l border-gray-200 pl-6">
        <p className="text-sm text-gray-500 mb-2">Author</p>
        <div className="flex items-center gap-3">
          <Avatar name= {blog.author.name || "Anonymous"} size='big' />
          <div>
            <p className="font-semibold text-gray-900">{blog.author.name || "Anonymous"}</p>
            <p className="text-sm text-gray-600">{authorBio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
