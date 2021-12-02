import { useState } from "react";

import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";
import PetDisplayCarousel from "./PetDisplayCarousel";

const Carousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [length, setLength] = useState(8);

  const goToPrevSlide = () => {
    let index;
    if (activeIndex < 1) {
      index = length;
    } else {
      index = activeIndex - 1;
    }
    setActiveIndex(index);
  };

  const goToNextSlide = () => {
    let index;
    if (activeIndex === length) {
      index = 1;
    } else {
      index = activeIndex + 1;
    }
    setActiveIndex(index);
  };

  return (
    <div className="slider">
      <div className="slider-items">
        <div>
          <LeftArrow goToPrevSlide={goToPrevSlide} />
        </div>
        <PetDisplayCarousel
          activeIndex={activeIndex}
          limit={25}
          displayAmount={8}
          featuredPets={true}
        />
        <div>
          <RightArrow goToNextSlide={goToNextSlide} />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
