import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

const NavMenuItem = ({ children, customStyle = false }) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={`${customStyle === true ? "hover:bg-white focus:bg-white": navigationMenuTriggerStyle()} `}>
        {children}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default NavMenuItem;
