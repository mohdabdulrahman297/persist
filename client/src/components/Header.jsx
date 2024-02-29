import React from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { HiUser, HiArrowSmRight, HiDocumentText } from "react-icons/hi";
import { toggleTheme } from "../redux/theme/themeSlice";
import { IoIosAddCircle } from "react-icons/io";
import { signoutSuccess } from "../redux/user/userSlice";

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-2 bg-orange-400 rounded-lg text-white">
          Culina
        </span>
        Share
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button
        className="w-12 h-10 lg:hidden bg-orange-400 text-white"
        color="gray"
      >
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>
                <HiUser className="mr-2" /> Profile
              </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Link to="/dashboard/create-recipe">
              <Dropdown.Item>
                <IoIosAddCircle className="mt-1 mr-2" /> Contribute
              </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Link to="/dashboard?tab=recipes">
              <Dropdown.Item>
                <HiDocumentText className="mt-1 mr-2" /> Recipes
              </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>
              <HiArrowSmRight className="mt-1 mr-2" /> Sign out
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button
              className="bg-orange-400 text-white dark:bg-orange-400 dark:text-white dark:hover:bg-gray-300"
              color="gray"
            >
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/recipes"} as={"div"}>
          <Link to="/recipes">Recipes</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
