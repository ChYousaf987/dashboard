import { CiSearch } from "react-icons/ci";
import { FiBell } from "react-icons/fi";
import { useSelector } from "react-redux"; // Import useSelector

function Navbar() {
  // Access user from Redux store
  const { user } = useSelector((state) => state.auth);

  // Use user.name or fallback to "Guest" if user is null or name is undefined
  const userName = user?.username ;

  return (
    <nav className="w-[80%] flex items-center justify-between px-6 py-4 bg-white shadow-sm fixed top-0 right-0 z-50">
      {/* Left: Welcome Section */}
      <div className="flex items-start space-x-3">
        <span className="text-3xl">👋</span>
        <div>
          <h1 className="text-base font-bold">
            Welcome <span className="text-blue-600">{userName}</span>,
          </h1>
          <p className="text-sm text-gray-500">
            Hello, here you can manage your dashboard
          </p>
        </div>
      </div>

      {/* Right: Notification + Profile */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 bg-white w-80">
          <CiSearch size={20} className="text-gray-600 cursor-pointer mr-2" />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full outline-none text-sm py-2"
          />
        </div>
        <FiBell size={20} className="text-gray-600 cursor-pointer" />
        <div className="w-8 h-8 bg-gray-300 rounded-full">
          <img
            src="https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fwww.gravatar.com%2Favatar%2F2c7d99fe281ecd3bcd65ab915bac6dd5%3Fs%3D250"
            className="rounded-full"
            alt=""
          />
        </div>
        <span className="text-gray-700 text-sm font-medium">{userName}</span>
      </div>
    </nav>
  );
}

export default Navbar;
