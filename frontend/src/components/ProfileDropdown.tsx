import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import Avatar from "./Avatar";
import { useDispatch } from "react-redux";
import { setUserId } from "../stored/InfoSlicer";



const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = String(localStorage.getItem("userId"));
  const AvatarUrl = `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(userId)}`;


  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(setUserId(""));
    navigate("/signin");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black"
      >
        <Avatar name={userId} size="big" isDisable = {true} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border pt-1 border-gray-200 rounded-lg shadow-md z-50">
          <Link
            to="/profile"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            <img
              src={AvatarUrl}
              alt="user_profile"
              className="w-6 h-6 rounded-full bg-gray-200 mr-2"
            />
            <span className="font-semibold text-gray-700">Profile</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <MdLogout className="mr-2" /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
