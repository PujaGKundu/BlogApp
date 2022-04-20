import { NavLink } from "react-router-dom";

function ProfileHero(props) {
  return (
    <div className="profile-hero">
      <div className="cotainer">
        <img src={props.user.image || "/image/smiley.jpg"} alt="profileimg" />
        <h2>{props.user.username}</h2>
        <NavLink className="unselected btn" to="/settings">
          <i className="fa fa-cog" aria-hidden="true"></i>&nbsp; Edit Profile
          Settings
        </NavLink>
      </div>
    </div>
  );
}

export default ProfileHero;
