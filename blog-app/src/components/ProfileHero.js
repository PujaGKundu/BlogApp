import { NavLink } from "react-router-dom";

function ProfileHero() {
  return (
    <div className="profile-hero">
      <div className="cotainer">
        <img src="/image/smiley.jpg" alt="profileimg" />
        <h2>Username</h2>
        <NavLink className="unselected btn" to="/settings">
          <i class="fa fa-cog" aria-hidden="true"></i>&nbsp; Edit Profile
          Settings
        </NavLink>
      </div>
    </div>
  );
}

export default ProfileHero;
