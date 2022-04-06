import ProfileHero from "./ProfileHero";
import ProfileNav from "./ProfileNav";

function Profile(props) {
  return (
    <>
      <ProfileHero user={props.user} />
      <ProfileNav user={props.user} />
    </>
  );
}

export default Profile;
