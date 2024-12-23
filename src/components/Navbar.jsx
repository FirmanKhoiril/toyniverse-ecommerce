import { signOut } from "firebase/auth";
import { auth } from "../service/firebase";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { TbLogout } from "react-icons/tb";
import { generateRandomColor } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  closeHoverCart,
  logoutUser,
  openHoverCart,
  openSidebar,
  resetFormData,
  setUserProfile,
} from "../store/globalSlice";
import { useEffect, useMemo } from "react";
import { IoCartOutline } from "react-icons/io5";
import CartHover from "./CartHover";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useNavbarBackground } from "../hooks/useNavbarBackground";
import useGetCartByUserId from "../hooks/useGetCartByUserId";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProfile, hoverCart } = useSelector(
    (state) => state.global
  );
  const location = useLocation();

  const handleLogOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("user");
      dispatch(logoutUser());
    });
    dispatch(resetFormData());
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (!userProfile || userProfile.username !== user.username) {
        dispatch(setUserProfile(user));
      }
    }
  }, [location, dispatch, userProfile]);

  const avatarColor = useMemo(() => {
    if (userProfile?.username) {
      return generateRandomColor();
    }
    return undefined;
  }, [userProfile?.username]);

  const isActiveLink = (path) => location.pathname === path;

  const handleOpenHoverCart = () => {
    dispatch(openHoverCart());
  };

  const handleCloseHoverCart = () => {
    dispatch(closeHoverCart());
  };

  const handleOpenSidebar = () => {
    dispatch(openSidebar());
  };

  const navbarBg = useNavbarBackground();

  const { data, isSuccess } = useGetCartByUserId();

  return (
    <nav
      className={`w-full px-4 py-2 z-50 sticky top-0 transition duration-200 ${navbarBg}`}
    >
      {/* Mobile Devices */}
      <div className="mx-auto container flex">
        <div className="sm:hidden flex items-center w-full justify-between">
          <div className="text-3xl flex items-center gap-2 font-extrabold">
            <button
              type="button"
              onClick={handleOpenSidebar}
              className="p-2 hover:bg-black/5 group-hover:bg-black/5 rounded-full"
            >
              <HiOutlineMenuAlt2 size={28} />
            </button>
            <Link to="/">
              <div className="flex items-center gap-2">
                <div className="flex text-white flex-col text-base font-extrabold">
                  <span className="bg-blue-500  px-2">T</span>
                  <span className="bg-sky-500  px-2">N</span>
                </div>
                <div className="">
                  <p className="text-lg sm:text-2xl">ToyNiverse</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center relative gap-3">
            <div
              className="relative group"
              onMouseEnter={handleOpenHoverCart}
              onMouseLeave={handleCloseHoverCart}
            >
              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="p-2 hover:bg-black/5 group-hover:bg-black/5 rounded-full"
              >
                <IoCartOutline size={28} />
              </button>
              {isSuccess && data?.length > 0 ? (
                <div className="absolute top-0 right-0 px-1.5 border rounded-full border-blue-500 ">
                  <p className="text-[12px]">{data?.length}</p>
                </div>
              ) : (
                <div className="absolute top-0 right-0 px-1.5 border rounded-full border-blue-500 ">
                  <p className="text-[12px]">0</p>
                </div>
              )}
              {hoverCart && <CartHover />}
            </div>
            {!userProfile ? (
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="p-2 hover:bg-black/5 rounded-full"
              >
                <FaRegUser size={24} />
              </button>
            ) : userProfile?.username ? (
              <Avatar
                name={userProfile?.username}
                size="35"
                color={avatarColor}
                className="rounded-md"
              />
            ) : (
              <img
                src={userProfile?.image}
                alt={userProfile?.displayName}
                className="rounded-full w-8 h-8"
                referrerPolicy="no-referrer"
              />
            )}
          </div>
        </div>

        {/* Large Devices */}
        <div className="hidden sm:flex pl-2 justify-between w-full items-center">
          <div className="text-3xl font-bold">
            <Link to="/">
              <div className="flex items-center gap-2">
                <div className="flex text-white flex-col text-base font-extrabold">
                  <span className="bg-blue-500  px-2">T</span>
                  <span className="bg-sky-500  px-2">N</span>
                </div>
                <div className="">
                  <p className="text-lg sm:text-2xl">ToyNiverse</p>
                </div>
              </div>
            </Link>
          </div>

          <ul className="flex gap-6 items-center">
            <li>
              <Link
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
                to="/about"
                className={`text-lg  ${
                  isActiveLink("/about") ? "text-blue-500" : ""
                } hover:text-blue-600`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`text-lg  ${
                  isActiveLink("/contact") ? "text-blue-500" : ""
                } hover:text-blue-600`}
              >
                Contact
              </Link>
            </li>
          </ul>

          {!userProfile ? (
            <div className="flex items-center gap-4">
              <div
                className="relative group"
                onMouseEnter={handleOpenHoverCart}
                onMouseLeave={handleCloseHoverCart}
              >
                <button
                  type="button"
                  onClick={() => navigate("/cart")}
                  className="p-2 hover:bg-black/5 group-hover:bg-black/5 rounded-full"
                >
                  <IoCartOutline size={28} />
                </button>
                <div className="absolute top-0 right-0 px-1.5 border rounded-full border-blue-500 ">
                  <p className="text-[12px]">0</p>
                </div>

                {hoverCart && <CartHover />}
              </div>
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
            <div className="flex items-center gap-3">
              <div
                className="relative group"
                onMouseEnter={handleOpenHoverCart}
                onMouseLeave={handleCloseHoverCart}
              >
                <button
                  type="button"
                  onClick={() => navigate("/cart")}
                  className="p-2 hover:bg-black/5 group-hover:bg-black/5 rounded-full"
                >
                  <IoCartOutline size={28} />
                </button>
                {isSuccess && data?.length > 0 ? (
                  <div className="absolute top-0 right-0 px-1.5 border rounded-full border-blue-500 ">
                    <p className="text-[12px]">{data?.length}</p>
                  </div>
                ) : (
                  <div className="absolute top-0 right-0 px-1.5 border rounded-full border-blue-500 ">
                    <p className="text-[12px]">0</p>
                  </div>
                )}
                {hoverCart && <CartHover />}
              </div>
              <button
                type="button"
                onClick={handleLogOut}
                className="p-2 hover:bg-black/5 rounded-full"
              >
                <TbLogout size={28} />
              </button>
              {userProfile?.username ? (
                <Avatar
                  name={userProfile?.username}
                  size="40"
                  color={avatarColor}
                  className="rounded-md"
                />
              ) : (
                <img
                  src={userProfile?.image}
                  alt={userProfile?.displayName}
                  className="rounded-full w-10 h-10"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
