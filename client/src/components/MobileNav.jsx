import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import LoginUser from "./LoginUser";
import { useStore } from "@/store/useStore";
import logo from "../assets/logo.svg";
import { AlignRight, ShoppingCart } from "lucide-react";
import { useDelete } from "@/lib/useDelete";
import { toast } from "sonner";

const MobileNav = () => {
  const navigate = useNavigate();
  const setShowUserLogin = useStore((state) => state.setShowUserLogin);
  const addUser = useStore((state) => state.addUser);
  const setCartItems = useStore((state) => state.setCartItems);
  const [openNavMobile, setOpenNavMobile] = useState(false);
  const user = useStore((state) => state.user);
  const getCartCount = useStore((state) => state.getCartCount);

  const { mutate } = useDelete("/user/logout", {
    onSuccess: () => {
      setCartItems({});
      addUser(null);
      toast.success("Logged out");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Failed to logout, try again later");
    },
  });

  const logout = () => {
    mutate();
  };

  return (
    <div>
      <nav className="flex justify-between w-full py-6 px-4 md:hidden">
        <NavLink
        to={"/"}
          onClick={() => {
            setOpenNavMobile(false);
          }}
        >
          <img src={logo} alt="logo" className="mt-1.5 md:mt-0" />
        </NavLink>
        <NavLink to="/cart" className="relative ml-40 mr-2 md:hidden">
          <ShoppingCart className="w-8 h-8 max-md:mr-3" />
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
          <NavLink to={"/"} onClick={() => setOpenNavMobile(false)}>
            Home
          </NavLink>
          <NavLink to={"/products"} onClick={() => setOpenNavMobile(false)}>
            All Product
          </NavLink>
          <NavLink to={"/contact"} onClick={() => setOpenNavMobile(false)}>
            Contact
          </NavLink>
          <NavLink to={"/seller"} onClick={() => setOpenNavMobile(false)}>
            Seller
          </NavLink>
          {user ? (
            <Button
              onClick={logout}
              className="rounded-full mt-2 md:mt-0 w-25 md:w-full px-7 cursor-pointer hover:bg-red-500 transition duration-300 ease-in-out hover:text-white bg-red-400 text-white "
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => setShowUserLogin(true)}
              className="rounded-full mt-2 md:mt-0 w-25 md:w-full px-7 cursor-pointer hover:bg-[var(--color-primary-dull)] transition duration-300 ease-in-out hover:text-white bg-[var(--color-primary)] text-white "
            >
              Login
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileNav;
