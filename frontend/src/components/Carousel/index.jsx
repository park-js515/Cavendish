import React, { useEffect, useRef, useState } from "react";
import "styles/css/carousel.css";

function Carousel({ carouselList }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [currentList, setCurrentList] = useState(carouselList);
  let touchStartX = null;

  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselList.length !== 0) {
      const startData = carouselList[0];
      const endData = carouselList[carouselList.length - 1];
      const newList = [endData, ...carouselList, startData];

      setCurrentList(newList);
    }
  }, [carouselList]);

  useEffect(() => {
    if (carouselRef.current !== null) {
      carouselRef.current.style.transform = `translateX(-${currentIndex}00%)`;
    }
  }, [currentIndex]);

  const moveToNthSlide = (index) => {
    setTimeout(() => {
      setCurrentIndex(index);
      if (carouselRef.current !== null) {
        carouselRef.current.style.transition = "";
      }
    }, 500);
  };

  const handleSwipe = (direction) => {
    const newIndex = currentIndex + direction;

    if (newIndex === carouselList.length + 1) {
      moveToNthSlide(1);
    } else if (newIndex === 0) {
      moveToNthSlide(carouselList.length);
    }

    setCurrentIndex((prevIndex) => prevIndex + direction);
    if (carouselRef.current !== null) {
      carouselRef.current.style.transition = "all 0.5s ease-in-out";
    }
  };

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (touchStartX !== null && carouselRef.current !== null) {
      const currTouchX = e.changedTouches[0].clientX;
      carouselRef.current.style.transform = `translateX(calc(-${currentIndex}00% - ${
        (touchStartX - currTouchX) * 2 || 0
      }px))`;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartX !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      if (touchStartX >= touchEndX) {
        handleSwipe(1);
      } else {
        handleSwipe(-1);
      }
      touchStartX = null;
    }
  };

  return (
    <div className="container">
      <div
        className="carouselWrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          className="swipeLeft"
          onClick={() => handleSwipe(-1)}
        >
          {"<"}
        </button>
        <button
          type="button"
          className="swipeRight"
          onClick={() => handleSwipe(1)}
        >
          {">"}
        </button>
        <ul className="carousel" ref={carouselRef}>
          {currentList.map((image, idx) => (
            <li key={`${image}-${idx}`} className="carouselItem">
              <img
                src={`${process.env.REACT_APP_API}/image/${image}`}
                alt="carousel-img"
                onDragStart={(e) => e.preventDefault()}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Carousel;
