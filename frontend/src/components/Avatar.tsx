import { Link } from "react-router-dom";
import { useState } from "react";

const Avatar = ({ name, size = "small", isDisable = false }: { name: string, size?: "big" | "small", isDisable?: boolean }) => {
  const [imageError, setImageError] = useState(false);
  const safeName = name || "Anonymous";
  const AvatarUrl = `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(safeName)}`;
  const initial = safeName[0]?.toUpperCase() || "A";

  const handleImageError = () => {
    setImageError(true);
  };

  const avatarContent = (
    <div className={`${size === "small" ? "w-8 h-8 text-xs" : "w-10 h-10 text-md"} rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700 overflow-hidden`}>
      {!imageError && safeName ? (
        <img 
          src={AvatarUrl} 
          alt={`Avatar for ${safeName}`}
          onError={handleImageError}
          className="w-full h-full object-cover"
        />
      ) : (
        initial
      )}
    </div>
  );

  return isDisable ? avatarContent : (
    <Link to={"/profile"}>
      {avatarContent}
    </Link>
  );
}

export default Avatar;