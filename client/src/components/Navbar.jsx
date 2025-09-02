import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Input } from "./ui/input";
import { AlignRight, Search, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import logo from "../assets/logo.svg";
import NavMenuItem from "./NavMenuItem";
import { useStore } from "@/store/useStore";
import MobileNav from "./MobileNav";
import profile_icon from "../assets/profile_icon.png";
import { useEffect } from "react";
import { useDelete } from "@/lib/useDelete";
import { toast } from "sonner";

const Navbar = () => {
  const setShowUserLogin = useStore((state) => state.setShowUserLogin);
  const user = useStore((state) => state.user);
  const setCartItems = useStore((state) => state.setCartItems);
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const searchQuery = useStore((state) => state.searchQuery);
  const addUser = useStore((state) => state.addUser);
  const getCartCount = useStore((state) => state.getCartCount());
  const navigate = useNavigate();

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

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  const logout = (e) => {
    mutate();
  };

  return (
    <header className="w-full md:flex md:top-0 md:bg-white md:z-100 justify-center shadow">
      <MobileNav />
      <NavigationMenu
        viewport={false}
        className="justify-between  list-none w-full gap-90 py-3 hidden md:flex"
      >
        <Link to={"/"} className="-mt-1">
          <img src={logo} alt="logo" />
        </Link>
        <div className="flex gap-1 pt-2 -mb-1">
          <NavMenuItem>
            <NavLink to="/">Home</NavLink>
          </NavMenuItem>
          <NavMenuItem>
            <NavLink to="/products">All Product</NavLink>
          </NavMenuItem>
          <NavMenuItem>
            <NavLink to="/contact">Contact</NavLink>
          </NavMenuItem>
          <NavMenuItem>
            <NavLink to="/seller">Seller</NavLink>
          </NavMenuItem>
          <NavMenuItem customStyle={true}>
            <div className="relative -mt-1.5">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=""
                placeholder="Search Products"
              />
              <Search className="absolute right-4 top-[17px]" />
            </div>
          </NavMenuItem>
          <NavMenuItem>
            <NavLink to="/cart" className="relative mr-2">
              <ShoppingCart className="w-20 h-20" />
              <div className="absolute w-5 h-5 rounded-full bg-green-400 text-center left-6 bottom-5 text-white">
                {getCartCount}
              </div>
            </NavLink>
          </NavMenuItem>
          {user ? (
            <NavigationMenuItem className="relative z-40">
              <NavigationMenuTrigger>
                <img src={profile_icon} className="w-10" alt="" />
              </NavigationMenuTrigger>
              <NavigationMenuContent className="-ml-20 mb-10">
                <ul className="grid w-[200px] gap-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <NavLink to={"/my-orders"}>My Orders</NavLink>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild onClick={logout}>
                      <NavLink href="#">Logout</NavLink>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Button
                  onClick={() => setShowUserLogin(true)}
                  className="rounded-full mt-2 md:mt-0 w-25 md:w-full px-7 cursor-pointer hover:bg-[var(--color-primary-dull)] transition duration-300 ease-in-out hover:text-white bg-[var(--color-primary)] text-white "
                >
                  Login
                </Button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
        </div>
      </NavigationMenu>
    </header>
  );
};

export default Navbar;
