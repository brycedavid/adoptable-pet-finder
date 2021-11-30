import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer/Footer";

describe("Footer Component Tests", () => {
  test("Footer renders correctly", () => {
    //Arrange
    render(<Footer />);
    const topOfPageLink = screen.getByText("Top of page");
    const petfinderLink = screen.getByTestId("petfinder-link");

    //Assert
    expect(topOfPageLink).toBeInTheDocument();
    expect(petfinderLink).toBeInTheDocument();
  });
});
