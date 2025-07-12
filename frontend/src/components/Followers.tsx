import { Link } from "react-router-dom";
import { useUserFollowers } from "../hooks";
import Avatar from "./Avatar";

export default function Followers({ id, refreshKey }: { id: string; refreshKey?: number }) {
  const { userFollowers, loading } = useUserFollowers({ id, refreshKey });

  return (
    <div className="w-full mt-4">
      <h2
        className="
          font-semibold 
          text-base
          mb-2 
          text-gray-800 
          tracking-tight 
          flex 
          items-center 
          gap-2
          sm:text-lg
          md:text-xl
          md:mb-3
          "
      >
        <span className="inline-block">
          Followers
        </span>
        <span className="ml-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium md:text-sm">
          {userFollowers.length}
        </span>
      </h2>
      {loading ? (
        <div className="flex items-center justify-center py-2">
          <span className="inline-block w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" aria-label="Loading" />
        </div>
      ) : userFollowers.length === 0 ? (
        <div className="text-gray-500 text-sm italic">No followers yet.</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {userFollowers.map((follower) => (
            <li key={follower.id} className="py-1 px-2 hover:bg-gray-50 rounded transition-colors flex items-center gap-2  hover:cursor-pointer">
              <Link to={`/user/${follower.id}`} className="flex items-center gap-2">
                <Avatar name={follower.id || "Anonymous"} size="small" />
                <span className="font-medium">{follower.name || "Anonymous"}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}