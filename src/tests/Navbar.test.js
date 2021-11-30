import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Navbar from "../components/Navbar/Navbar";

describe("Navbar component tests", () => {
  test("Home subnav navigates to the Home page when clicked", () => {
    //Arrange
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Navbar />
      </Router>
    );
    const homeSubnav = screen.getByText("Home");

    //Act
    homeSubnav.click();

    //Assert
    expect(history.location.pathname).toEqual("/home");
  });

  test("Adoption Center subnav navigates to AdoptionCenters page when clicked", () => {
    //Arrange
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Navbar />
      </Router>
    );
    const adoptionCentersSubnav = screen.getByText("Adoption Centers");

    //Act
    adoptionCentersSubnav.click();

    //Assert
    expect(history.location.pathname).toEqual("/adoption-centers");
  });

  test("Adoptable Pets subnav navigates to AdoptablePets page when clicked", () => {
    //Arrange
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Navbar />
      </Router>
    );
    const adoptionCentersSubnav = screen.getByText("Adoptable Pets");

    //Act
    adoptionCentersSubnav.click();

    //Assert
    expect(history.location.pathname).toEqual("/adoptable-pets");
  });

  test("About subnav navigates to About page when clicked", () => {
    //Arrange
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Navbar />
      </Router>
    );
    const adoptionCentersSubnav = screen.getByText("About");

    //Act
    adoptionCentersSubnav.click();

    //Assert
    expect(history.location.pathname).toEqual("/about");
  });
});
