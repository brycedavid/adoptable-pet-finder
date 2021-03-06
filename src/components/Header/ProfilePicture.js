// ProfilePicture.js
// This component is rendered as a child to Header.js and renders the profile picture associated with the user account (currently not implemented).

const ProfilePicture = () => {
  return (
    <div className={"header__profile-picture-container"}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
        alt="Profile"
      />
    </div>
  );
};

export default ProfilePicture;
