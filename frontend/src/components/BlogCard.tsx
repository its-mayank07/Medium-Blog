import { Link } from "react-router-dom";
import Avatar from "./Avatar";


interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id : string
}

const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id
}: BlogCardProps) => {
  const readingTime = Math.max(1, Math.ceil(content.length / 300));

    return (
      <Link to={`/blog/${id}`}>
    <div className="border-b border-gray-200 py-4 px-4 sm:px-6">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Avatar name={authorName} />
        <span className="font-medium text-black">{authorName}</span>
        <span>·</span>
        <span>{publishedDate}</span>
      </div>

      <h2 className="text-lg font-bold text-black mt-1">{title}</h2>

      <p className="text-gray-700 text-sm mt-1 line-clamp-2">
        {content.slice(0, 140)}...
      </p>

      <div className="mt-4 text-sm text-gray-500">{readingTime} min read</div>
    </div>
    </Link>
  );
};

export default BlogCard;
