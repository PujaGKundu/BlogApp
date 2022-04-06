import { NavLink } from "react-router-dom";

function Header(props) {
  return (
    <header>
      <div className="container">
        <div className="flex jc-between al-center">
          <h2 className="logo">conduit</h2>
          <nav>{props.isLoggedIn ? <AuthHeader /> : <NonAuthHeader />}</nav>
        </div>
      </div>
    </header>
  );
}

function NonAuthHeader() {
  return (
    <ul className="flex jc-between al-center">
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
    </ul>
  );
}

function AuthHeader() {
  return (
    <ul className="flex jc-between al-center">
      <li>
        <NavLink
          className={(isActive) =>
            "active-nav" + (!isActive ? " unselected" : "")
          }
          to="/"
          exact
        >
          <i className="fa fa-home" aria-hidden="true"></i>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={(isActive) =>
            "active-nav" + (!isActive ? " unselected" : "")
          }
          to="/new-post"
        >
          <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          New Article
        </NavLink>
      </li>
      <li>
        <NavLink
          className={(isActive) =>
            "active-nav" + (!isActive ? " unselected" : "")
          }
          to="/settings"
        >
          <i className="fa fa-cog" aria-hidden="true"></i>
          Settings
        </NavLink>
      </li>
      <li>
        <NavLink
          className={(isActive) =>
            "active-nav" + (!isActive ? " unselected" : "")
          }
          to="/profile"
        >
          <i className="fa fa-user" aria-hidden="true"></i>
          Profile
        </NavLink>
      </li>
    </ul>
  );
}

export default Header;
