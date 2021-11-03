// Home.js
// This is the homepage of the application, which is the first page the user will see. It includes
// a featured pets section and a search form.
// Base URL (/) automatically routes here in App.js.

import classes from "./Home.module.css";

import Card from "../components/UI/Card";
import Image from "../components/UI/Image";
import HomeSearchForm from "../components/Search/HomeSearchForm";
import PetDisplay from "../components/InfoDisplay/PetDisplay";

const Home = (props) => {
  const searchFormSubmitHandler = (searchValue) => {
    props.forwardFormData(searchValue);
  };

  return (
    <div className={classes["home-main-content"]}>
      <Card class="main-image-container">
        <Image
          class="main-image"
          altText="cute kitty and puppy"
          source="https://www.petlink.net/wp-content/uploads/2019/04/Puppy-and-Kitten-Closeup-Over-White-649091176_2052x1466.jpeg"
        />
      </Card>
      <h2 className={classes["feature-text"]}>Featured Pets</h2>
      <PetDisplay limit={25} displayAmount={8} />
      <div className={classes["homepage-text-container"]}>
        <h3>
          Looking to adopt a furry friend? You've come to the right place!
        </h3>
        <p>
          With over a hundred thousand pets ready for adoption from over ten
          thousand organizations, there's no doubt we'll find the right member
          to add to the family!
        </p>
      </div>
      <Card class="main-search-container">
        <HomeSearchForm onSubmit={searchFormSubmitHandler} />
      </Card>
    </div>
  );
};

export default Home;