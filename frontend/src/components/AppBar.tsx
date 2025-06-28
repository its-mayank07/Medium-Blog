import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

const AppBar = () => {
  return (
    <header className="flex flex-wrap justify-between items-center border-b border-gray-200 bg-white px-4 sm:px-6 md:px-10 py-4 shadow-sm">
      {/* Logo / Title */}
      <Link to="/blogs">
        <div className="text-lg sm:text-xl font-semibold text-gray-800 tracking-tight">
          Medium
        </div>
      </Link>

      {/* Right side - Publish + Profile */}
      <div className="flex flex-wrap gap-2 sm:gap-3 items-center mt-3 sm:mt-0">
        <Link to="/publish">
          <button
            type="button"
            className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-4 sm:px-5 py-2 text-center"
          >
            Publish
          </button>
        </Link>
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default AppBar;
