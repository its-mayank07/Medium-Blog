import { Link } from "react-router-dom";

const Avatar = ({ name,size = "small",isDisable = false}: { name: string, size? : "big" | "small", isDisable? : boolean }) => {

  const AvatarUrl = `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(name)}`;
  const initial = name?.[0]?.toUpperCase() || "A";
  return (
    isDisable ? ( 
      <div className={`${size === "small" ? "w-8 h-8 text-xs" : "w-10 h-10 text-md"} rounded-full bg-gray-200 flex items-center justify-center  font-semibold text-gray-700`}>
        {AvatarUrl ? (<img src={AvatarUrl} />)  : initial}
      </div>
    ) : (
      <Link to={"/profile"}>
        <div className={`${size === "small" ? "w-8 h-8 text-xs" : "w-10 h-10 text-md"} rounded-full bg-gray-200 flex items-center justify-center  font-semibold text-gray-700`}>
          {AvatarUrl ? (<img src={AvatarUrl} />)  : initial}
        </div>
      </Link>
    )
  );
}
export default Avatar