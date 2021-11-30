// Title.js
// This component is rendered as a child to Header.js and includes the title of the website.

const Title = () => {
  return (
    <div className={"title-container"}>
      <h1 className={"title-container-welcome"}>Welcome to:</h1>
      <h1 className={"title-container-header"}>Adoptable Pet Finder</h1>
      <h2 className={"title-container-subtext"}>
        Locate Pets & Adoption Centers Near You!
      </h2>
    </div>
  );
};

export default Title;
