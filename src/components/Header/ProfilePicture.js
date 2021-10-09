import classes from "./ProfilePicture.module.css";

const ProfilePicture = () => {
  return (
    <div className={classes["profile-picture-container"]}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" />
    </div>
  );
};

export default ProfilePicture;
