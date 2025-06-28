import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

const AppBar = () => {
  return (
    <header className="flex justify-between items-center border-b border-gray-200 bg-white px-6 md:px-10 py-4 shadow-sm">
      <Link to={"/blogs"}>
      <div className="text-xl font-semibold text-gray-800 tracking-tight">
        Medium
      </div>
      </Link>
      <div className="flex gap-3 items-center">
        <Link to={"/publish"}>
        <button type="button" className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 text-center ">Publish</button>
        </Link>     
        <ProfileDropdown/>
      </div>
    </header>
  );
};

export default AppBar;
