import { useDispatch, useSelector } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import { closeSidebar, logoutUser, resetFormData } from "../store/globalSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../service/firebase";
import { TbLogout } from "react-icons/tb";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  const { isSidebarOpen, userProfile } = useSelector((state) => state.global);

  const isActiveLink = (path) => location.pathname === path;

  const handleLogOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("user");
      dispatch(logoutUser());
    });
    dispatch(resetFormData());
    dispatch(closeSidebar());
  };

  return (
    <>
      <div
        onClick={handleCloseSidebar}
        className={`w-screen h-screen fixed z-50 bg-black/10 top-0 ${
          isSidebarOpen ? "flex sm:hidden" : "hidden"
        } transition duration-300`}
      ></div>
      <aside
        className={`${
          isSidebarOpen ? "translate-x-[0%]" : "translate-x-[-200%]"
        } sm:hidden flex flex-col fixed left-0 transition duration-300 bg-gray-50 drop-shadow-sm max-w-[350px] w-full items-start z-[90] h-screen top-0 px-[22px] py-6`}
      >
        <button type="button" onClick={handleCloseSidebar}>
          <IoCloseOutline size={28} />
        </button>
        <ul className="flex gap-6 w-full justify-around  flex-col h-full items-center">
          <li>
            <Link
              onClick={handleCloseSidebar}
              to="/"
              className={`text-lg  ${
                isActiveLink("/") ? "text-blue-500" : ""
              } hover:text-blue-600`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              onClick={handleCloseSidebar}
              to="/products"
              className={`text-lg  ${
                isActiveLink("/products") ? "text-blue-500" : ""
              } hover:text-blue-600`}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              onClick={handleCloseSidebar}
              to="/about"
              className={`text-lg  ${
                isActiveLink("/about") ? "text-blue-500" : ""
              } hover:text-blue-600`}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              onClick={handleCloseSidebar}
              to="/contact"
              className={`text-lg  ${
                isActiveLink("/contact") ? "text-blue-500" : ""
              } hover:text-blue-600`}
            >
              Contact
            </Link>
          </li>
          {!userProfile ? (
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-sky-500 text-white rounded-lg shadow-md hover:bg-sky-600 transition"
              >
                Sign In
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleLogOut}
              className="p-2 opacity-80 hover:opacity-100 flex items-center gap-2 rounded-full"
            >
              <TbLogout size={28} /> <span>Log Out</span>
            </button>
          )}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
