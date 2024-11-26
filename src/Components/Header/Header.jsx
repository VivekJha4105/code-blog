import { useSelector } from "react-redux";
import { Container, Logo, LogoutButton } from "../index";
import { Link } from "react-router-dom";
import { useRef } from "react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const inputRef = useRef(null);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Sign Up",
      slug: "/sign-up",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="bg-gray-700 mb-2 shadow-lg sm:py-4 md:py-5 rounded-b-md sm:px-2 md:px-4">
      <Container>
        <nav className="flex itmes-center justify-between">
          <div className="self-center  hover:scale-110 duration-150">
            <Link to={"/"} className="font-bold sm:text-xl md:text-2xl">
              <Logo width="200px" />
            </Link>
          </div>
          <div>
            <ul className="flex ml-auto md:gap-4">
              {navItems.length &&
                navItems.map((item) => (
                  <li
                    key={item.name}
                    className={`${
                      item.active ? "block" : "hidden"
                    } p-2 md:px-4  rounded-lg text-slate-200 hover:bg-slate-900 duration-150`}
                  >
                    <Link
                      className="cursor-pointer font-semibold "
                      to={item.slug}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              {authStatus && (
                <li>
                  <LogoutButton />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
