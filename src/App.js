import React, { Fragment } from "react";
import Navbar from "./Navbar/Navbar";
import Header from "./UI/Header";
import Card from "./UI/Card";
import Image from "./UI/Image";

import classes from "./App.module.css";

function App() {
  return (
    <Fragment>
      <Navbar />
      <main classes={classes["main-content"]}>
        <Header />
        <Card>
          <Image
            altText="cute kitty and puppy"
            source="https://www.petlink.net/wp-content/uploads/2019/04/Puppy-and-Kitten-Closeup-Over-White-649091176_2052x1466.jpeg"
          />
        </Card>
      </main>
    </Fragment>
  );
}

export default App;
