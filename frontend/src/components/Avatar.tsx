import { useState } from "react";

const Avatar = ({ name, size = "small" }: { name: string, size?: "big" | "small" | "forProfile"}) => {
  const [imageError, setImageError] = useState(false);
  const safeName = name || "Anonymous";
  const AvatarUrl = `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(safeName)}`;
  const initial = safeName[0]?.toUpperCase() || "A";

  const handleImageError = () => {
    setImageError(true);
  };

  const avatarContent = (
    <div className={`${size === "small" ? "w-8 h-8 text-xs" : size === "forProfile" ? "w-20 h-20 text-md" : "w-10 h-10 text-md"} rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700 overflow-hidden`}>
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

  return avatarContent;
  
}

export default Avatar;