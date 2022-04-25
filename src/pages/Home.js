// Home.js
// This is the homepage of the application, which is the first page the user will see. It includes
// a featured pets section and a search form.
// Base URL (/) automatically routes here in App.js.

import React, { lazy, Suspense } from "react";

import mainImage from "../shared/images/Puppy-and-Kitten.jpeg";

import Footer from "../components/Footer/Footer";
import PetDisplay from "../components/InfoDisplay/PetDisplay";

const SearchForm = lazy(() => import("../components/Search/SearchForm"));

const Home = () => {
  window.scrollTo({ top: 0, behavior: "instant" });

  return (
    <React.Fragment>
      <div className="home-header-divider" />
      <div className="main-content">
        <div className="main-image">
          <img
            className="main-image__img"
            altText="cute kitty and puppy"
            src={mainImage}
          />
        </div>
        <h1 className="heading--large">Featured Pets</h1>
        <h2 className="heading--medium">Browse our furry friends!</h2>
        {/* <Carousel /> */}
        <PetDisplay limit={25} displayAmount={8} featuredPets={true} />
        <div className="main-content__text-container">
          <h3 className="heading--small">
            <b>
              Looking to adopt a furry friend? You've come to the right place!
            </b>
          </h3>
          <p>
            With over a hundred thousand pets ready for adoption from over ten
            thousand organizations, there's no doubt we'll find the right member
            to add to the family!
          </p>
        </div>
        <div className="main-content__search-container">
          <Suspense fallback={<p>Loading...</p>}>
            <SearchForm />
          </Suspense>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
