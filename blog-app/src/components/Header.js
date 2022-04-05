import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="container">
        <div className="flex jc-between al-center">
          <h2 className="logo">conduit</h2>
          <div className="flex jc-between al-center">
            <li>
              <NavLink
                className={(isActive) =>
                  "active-nav" + (!isActive ? " unselected" : "")
                }
                to="/"
                exact
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(isActive) =>
                  "active-nav" + (!isActive ? " unselected" : "")
                }
                to="/signin"
              >
                Sign In
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(isActive) =>
                  "active-nav" + (!isActive ? " unselected" : "")
                }
                to="/signup"
              >
                Sign Up
              </NavLink>
            </li>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
