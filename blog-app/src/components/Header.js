import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="container">
        <div className="flex jc-between al-center">
          <h2 className="logo">conduit</h2>
          <div className="flex jc-between al-center">
            <NavLink
              className={(isActive) =>
                "active-nav" + (!isActive ? " unselected" : "")
              }
              to="/"
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              className={(isActive) =>
                "active-nav" + (!isActive ? " unselected" : "")
              }
              to="/signin"
            >
              <li>Sign In</li>
            </NavLink>
            <NavLink
              className={(isActive) =>
                "active-nav" + (!isActive ? " unselected" : "")
              }
              to="/signup"
            >
              <li>Sign Up</li>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
