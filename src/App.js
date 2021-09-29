import React, { Fragment } from "react";

import Navbar from "./Navbar/Navbar";
import Header from "./UI/Header";
import Card from "./UI/Card";
import Image from "./UI/Image";
import SearchForm from "./Search/SearchForm";

import classes from "./App.module.css";

function App() {
  return (
    <Fragment>
      <Navbar />
      <main classes={classes["main-content"]}>
        <Header />
        <Card class="main-image-container">
          <Image
            class="main-image"
            altText="cute kitty and puppy"
            source="https://www.petlink.net/wp-content/uploads/2019/04/Puppy-and-Kitten-Closeup-Over-White-649091176_2052x1466.jpeg"
          />
        </Card>
        <div className={classes["homepage-text-container"]}>
          <p>
            Looking to adopt a furry friend? You've come to the right place!
            With over a hundred thousand pets ready for adoption from over ten
            thousand organizations, there's no doubt we'll find the right member
            to add to the family!
          </p>
        </div>
        <Card class="main-search-container">
          <SearchForm />
        </Card>
      </main>
    </Fragment>
  );
}

export default App;
