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
  const userId = sessionStorage.getItem("userId") || "Anonymous";

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
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    dispatch(setUserId(""));
    navigate("/signin");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black"
      >
        <Avatar name={userId} size="big" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border pt-1 border-gray-200 rounded-lg shadow-md z-50">
          <Link
            to="/profile"
            className="flex flex-row items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            onClick={() => setOpen(false)}
          >
            <Avatar name={userId} size="small"/>
            <span className="font-semibold text-gray-700 ml-2">Profile</span>
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
