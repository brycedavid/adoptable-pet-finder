import classes from "./Home.module.css";

import Card from "../../components/UI/Card";
import Image from "../../components/UI/Image";
import SearchForm from "../../components/Search/SearchForm";
import PetDisplay from "../../components/Pets/PetDisplay";

const Home = () => {
  return (
    <div className={classes["main-content"]}>
      <Card class="main-image-container">
        <Image
          class="main-image"
          altText="cute kitty and puppy"
          source="https://www.petlink.net/wp-content/uploads/2019/04/Puppy-and-Kitten-Closeup-Over-White-649091176_2052x1466.jpeg"
        />
      </Card>
      <PetDisplay />
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
        <SearchForm />
      </Card>
    </div>
  );
};

export default Home;
