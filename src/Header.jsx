import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkIcon, LogOut, LogOutIcon } from "lucide-react";
import { UrlState } from "./Context";
import { logout } from "./Db/ApiAuth";
import { BarLoader } from "react-spinners";
import useFetch from "./Hooks/use-fetch";

const Header = () => {
  const navigate = useNavigate();
  const {loading, fn: fnLogout} = useFetch(logout);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const {user, fetchUser} = UrlState();
  

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
    <nav className="flex justify-between items-center p-3 px-10 bg-shadow-md">
      {/* Logo Section */}
      <div>
        <Link to="/">
          <h1 className="text-3xl font-mono font-semibold text-green-400">
            Shorter
          </h1>
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-14 relative">
        {/* Platform Dropdown */}
        <li className="relative">
          <button
            onClick={() => toggleDropdown("platform")}
            className="text-gray-700 hover:text-green-400 flex items-center"
          >
            Platform <KeyboardArrowDownIcon className="ml-1" />
          </button>
          {activeDropdown === "platform" && (
            <ul className="absolute top-full left-0 bg-white shadow-md rounded-md p-2 w-40">
              <li className="p-2 hover:bg-gray-100">
                <a href="#">Feature 1</a>
              </li>
              <li className="p-2 hover:bg-gray-100">
                <a href="#">Feature 2</a>
              </li>
            </ul>
          )}
        </li>

        {/* Resources Dropdown */}
        <li className="relative">
          <button
            onClick={() => toggleDropdown("resources")}
            className="text-gray-700 hover:text-green-400 flex items-center"
          >
            Resources <KeyboardArrowDownIcon className="ml-1" />
          </button>
          {activeDropdown === "resources" && (
            <ul className="absolute top-full left-0 bg-white shadow-md rounded-md p-2 w-40">
              <li className="p-2 hover:bg-gray-100">
                <a href="#">Docs</a>
              </li>
              <li className="p-2 hover:bg-gray-100">
                <a href="#">API Reference</a>
              </li>
            </ul>
          )}
        </li>

        {/* Language Dropdown */}
        <li className="relative">
          <button
            onClick={() => toggleDropdown("language")}
            className="text-gray-700 hover:text-green-400 flex items-center"
          >
            <LanguageIcon className="mr-1" />
            Language <KeyboardArrowDownIcon className="ml-1" />
          </button>
          {activeDropdown === "language" && (
            <ul className="absolute top-full left-0 bg-white shadow-md rounded-md p-2 w-40">
              <li className="p-2 hover:bg-gray-100">
                <a href="#">English</a>
              </li>
              <li className="p-2 hover:bg-gray-100">
                <a href="#">Hindi</a>
              </li>
            </ul>
          )}
        </li>
      </ul>

      {/* User Section */}
      <div>
        {!user ? (
          <Button onClick={() => navigate("/Auth")}>Login</Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
              <AvatarImage src={user?.user_metadata?.profile_pic} />
              <AvatarFallback>PA</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to ="/dashboard" className="flex items-center">
                <LinkIcon className="mr-2 h-4 w-4" /> 
                  Link
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                  onClick={() => {
                    fnLogout().then(() => {
                      fetchUser();
                      navigate("/auth");
                    });
                  }}
                  className="text-red-400"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
  </>
  );
};

export default Header;
