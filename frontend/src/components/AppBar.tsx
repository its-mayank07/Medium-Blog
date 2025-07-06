import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

const AppBar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/60 shadow-sm">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Title */}
          <Link to="/blogs" className="flex items-center">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight hover:text-gray-700 transition-colors">
              Medium
            </div>
          </Link>

          {/* Right side - Publish + Profile */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/publish">
              <button
                type="button"
                className="inline-flex items-center px-4 sm:px-5 py-2.5 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Publish
              </button>
            </Link>
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppBar;
