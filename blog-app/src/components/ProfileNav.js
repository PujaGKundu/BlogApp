import { NavLink } from "react-router-dom";

function ProfileNav() {
  return (
    <div className="container">
      <div className="article-heading">
        <ul className="flex">
          <li>
            <NavLink
              className={(isActive) =>
                "active-nav" + (!isActive ? " unselected" : "")
              }
              to="/"
            >
              My Articles
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(isActive) =>
                "active-nav" + (!isActive ? " unselected" : "")
              }
              to="/"
            >
              Favourite Articles
            </NavLink>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
}

export default ProfileNav;
