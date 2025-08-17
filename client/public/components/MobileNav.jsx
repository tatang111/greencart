import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import LoginUser from "./LoginUser";
import { useStore } from "@/store/useStore";
import logo from "../assets/logo.svg";
import { AlignRight, ShoppingCart } from "lucide-react";

const MobileNav = () => {
  const [openNavMobile, setOpenNavMobile] = useState(false);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const getCartCount = useStore((state) => state.getCartCount);

  return (
    <div>
      <nav className="flex justify-between w-full py-6 px-4 md:hidden">
        <NavLink onClick={() => setOpenNavMobile(false)}>
          <img src={logo} alt="logo" />
        </NavLink>
        <NavLink to="/cart" className="relative ml-40 mr-2 md:hidden">
          <ShoppingCart className="w-8 h-8" />
          <div className="absolute w-5 h-5 text-sm  rounded-full bg-green-400 text-center left-6 bottom-5 text-white">
            {getCartCount()}
          </div>
        </NavLink>
        <button onClick={() => setOpenNavMobile(!openNavMobile)}>
          <AlignRight />
        </button>
      </nav>
      {openNavMobile && (
        <div
          className={`pl-6 pb-6 flex flex-col gap-2 transform overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            openNavMobile
              ? "max-h-96 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-4"
          }`}
        >
          <NavLink>Home</NavLink>
          <NavLink>All Product</NavLink>
          <NavLink>Contact</NavLink>
          {user ? (
            <Button
              onClick={() => setUser(null)}
              className="rounded-full mt-2 md:mt-0 w-25 md:w-full px-7 cursor-pointer hover:bg-red-500 transition duration-300 ease-in-out hover:text-white bg-red-400 text-white "
            >
              Logout
            </Button>
          ) : (
            <LoginUser />
          )}
        </div>
      )}
    </div>
  );
};

export default MobileNav;
