
const Avatar = ({ name,size = "small" }: { name: string, size? : "big" | "small" }) => {
  const initial = name?.[0]?.toUpperCase() || "M";
  return (
    <div className={`${size === "small" ? "w-6 h-6 text-xs" : "w-10 h-10 text-md"} rounded-full bg-gray-200 flex items-center justify-center  font-semibold text-gray-700`}>
      {initial}
    </div>
  );
}

export default Avatar