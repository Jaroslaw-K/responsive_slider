import { useState, useEffect, useRef, Fragment } from "react";
import "./SliderMobile.scss";

const SliderMobile = (props) => {
  const sliderMobile = useRef();
  const slidesContainer = useRef();
  const smallSlidesContainer = useRef();
  const containerSmallButtonLeft = useRef();
  const containerSmallButtonRight = useRef();
  const [startingPoint, setStartingPoint] = useState();
  const [shift, setShift] = useState(0);
  const [currentId, setCurrentId] = useState(undefined);

  useEffect(() => {
    if (props.picked === "nonAutoMoveSlider") {
      sliderMobile.current.classList.add("sliderMobile--nonAutoMove");
    }
    if (props.picked === "autoMoveSlider") {
      sliderMobile.current.classList.add("sliderMobile--autoMove");
    }
    slidesContainer.current.childNodes[0].classList.add("current");
    slidesContainer.current.childNodes[0].style.display = "block";
    setCurrentId(0);
    props.moveSlider(autoMoveSliderMobile);
  }, []);

  const autoMoveSliderMobile = () => {
    slidesContainer.current.style.pointerEvents = "none";
    setInterval(() => {
      for (let i = 0; i < slidesContainer.current.childNodes.length; i++) {
        if (slidesContainer.current.childNodes[i].classList.contains("current")) {
          if (slidesContainer.current.childNodes[i + 1] !== undefined) {
            slidesContainer.current.childNodes[i + 1].style.display = "block";
            slidesContainer.current.childNodes[i + 1].style.left = `100%`;
          } else {
            slidesContainer.current.childNodes[0].style.display = "block";
            slidesContainer.current.childNodes[0].style.left = `100%`;
          }
          let counterCurrent = 0;
          let counterNext = 100;
          let moveNextSlide = setInterval(() => {
            counterCurrent += 1;
            counterNext -= 1;
            slidesContainer.current.childNodes[i].style.left = `-${counterCurrent}%`;
            if (slidesContainer.current.childNodes[i + 1] !== undefined) {
              slidesContainer.current.childNodes[i + 1].style.left = `${counterNext}%`;
            } else {
              slidesContainer.current.childNodes[0].style.left = `${counterNext}%`;
            }

            if (counterCurrent === 100) {
              clearInterval(moveNextSlide);
              slidesContainer.current.childNodes[i].classList.remove("current");
              slidesContainer.current.childNodes[i].style.display = "none";
              if (slidesContainer.current.childNodes[i + 1] !== undefined) {
                slidesContainer.current.childNodes[i + 1].classList.add("current");
                slidesContainer.current.childNodes[i + 1].style.display = "block";
              } else {
                slidesContainer.current.childNodes[0].classList.add("current");
                slidesContainer.current.childNodes[0].style.display = "block";
              }
            }
          }, 1);
        }
      }
    }, 20000);
  };

  const touchStartHandler = (event) => {
    setStartingPoint(event.touches[0].clientX);
    for (let i = 0; i < slidesContainer.current.childNodes.length; i++) {
      if (slidesContainer.current.childNodes[i].classList.contains("current")) {
        if (slidesContainer.current.childNodes[i + 1] !== undefined) {
          slidesContainer.current.childNodes[i + 1].style.display = "block";
          slidesContainer.current.childNodes[i + 1].style.left = "100%";
        } else {
          slidesContainer.current.childNodes[0].style.display = "block";
          slidesContainer.current.childNodes[0].style.left = "100%";
        }
        if (slidesContainer.current.childNodes[i - 1] !== undefined) {
          slidesContainer.current.childNodes[i - 1].style.display = "block";
          slidesContainer.current.childNodes[i - 1].style.right = "-100%";
        } else {
          slidesContainer.current.childNodes[slidesContainer.current.childNodes.length - 1].style.display = "block";
          slidesContainer.current.childNodes[slidesContainer.current.childNodes.length - 1].style.left = "-100%";
        }
      }
    }
  };

  const touchMoveHandler = (event) => {
    slidesContainer.current.style.pointerEvents = "none";
    setShift(startingPoint - event.touches[0].clientX);
    if (shift > 0) {
      // move to next slide
      for (let i = 0; i < slidesContainer.current.childNodes.length; i++) {
        if (slidesContainer.current.childNodes[i].classList.contains("current")) {
          slidesContainer.current.childNodes[i].style.display = "block";
          slidesContainer.current.childNodes[i].style.left = `-${shift}px`;
          slidesContainer.current.childNodes[i].style.right = ``;
          if (slidesContainer.current.childNodes[i + 1] !== undefined) {
            slidesContainer.current.childNodes[i + 1].style.left = `${slidesContainer.current.clientWidth - shift}px`;
            slidesContainer.current.childNodes[i + 1].style.right = ``;
          } else {
            slidesContainer.current.childNodes[0].style.left = `${slidesContainer.current.clientWidth - shift}px`;
            slidesContainer.current.childNodes[0].style.right = ``;
          }
        }
      }
    }
    if (shift < 0) {
      // move to previous slide
      for (let i = 0; i < slidesContainer.current.childNodes.length; i++) {
        if (slidesContainer.current.childNodes[i].classList.contains("current")) {
          if (slidesContainer.current.childNodes[i].classList.contains("current")) {
            slidesContainer.current.childNodes[i].style.display = "block";
            slidesContainer.current.childNodes[i].style.right = `${shift}px`;
            slidesContainer.current.childNodes[i].style.left = ``;
            if (slidesContainer.current.childNodes[i - 1] !== undefined) {
              slidesContainer.current.childNodes[i - 1].style.right = `${slidesContainer.current.clientWidth + shift}px`;
              slidesContainer.current.childNodes[i - 1].style.left = ``;
            } else {
              slidesContainer.current.childNodes[slidesContainer.current.childNodes.length - 1].style.right = `${slidesContainer.current.clientWidth + shift}px`;
              slidesContainer.current.childNodes[slidesContainer.current.childNodes.length - 1].style.left = ``;
            }
          }
        }
      }
    }
  };
  const touchEndHandler = (event) => {
    if (shift > 0) {
      // end finger and be visible next slide
      if (shift > slidesContainer.current.clientWidth / 4) {
        // enough to jump to next slide
        for (let i = 0; i < slidesContainer.current.childNodes.length; i++) {
          if (slidesContainer.current.childNodes[i].classList.contains("current")) {
            let currentPosition = parseFloat(slidesContainer.current.childNodes[i].style.left);
            let nextPosition;
            if (slidesContainer.current.childNodes[i + 1] !== undefined) {
              nextPosition = parseFloat(slidesContainer.current.childNodes[i + 1].style.left);
            } else {
              nextPosition = parseFloat(slidesContainer.current.childNodes[0].style.left);
            }
            let counter = 0;
            let moveNextSlide = setInterval(() => {
              counter -= 3;
              let positionCurrent = currentPosition + counter;
              let positionNext = nextPosition + counter;
              slidesContainer.current.childNodes[i].style.left = `${positionCurrent}px`;
              if (slidesContainer.current.childNodes[i + 1] !== undefined) {
                slidesContainer.current.childNodes[i + 1].style.left = `${positionNext}px`;
              } else {
                slidesContainer.current.childNodes[0].style.left = `${positionNext}px`;
              }
              if (positionCurrent <= -slidesContainer.current.clientWidth) {
                clearInterval(moveNextSlide);
                for (let j = 0; j < slidesContainer.current.childNodes.length; j++) {
                  slidesContainer.current.childNodes[j].style.left = "";
                  slidesContainer.current.childNodes[j].style.right = "";
                  slidesContainer.current.childNodes[j].style.display = "none";
                }
                slidesContainer.current.childNodes[i].classList.remove("current");
                if (slidesContainer.current.childNodes[i + 1] !== undefined) {
                  slidesContainer.current.childNodes[i + 1].style.display = `block`;
                  slidesContainer.current.childNodes[i + 1].classList.add("current");
                  setCurrentId(i + 1);
                } else {
                  slidesContainer.current.childNodes[0].style.display = `block`;
                  slidesContainer.current.childNodes[0].classList.add("current");
                  setCurrentId(0);
                }
                setShift(0);
                slidesContainer.current.style.pointerEvents = "auto";
              }
            }, 1);
          }
        }
      } else {
        // not enough to jump to next slide
        for (let i = 0; i < slidesContainer.current.childNodes.length; i++) {
          if (slidesContainer.current.childNodes[i].classList.contains("current")) {
            let currentPosition = parseFloat(slidesContainer.current.childNodes[i].style.left);
            let nextPosition;
            if (slidesContainer.current.childNodes[i + 1] !== undefined) {
              nextPosition = parseFloat(slidesContainer.current.childNodes[i + 1].style.left);
            } else {
              nextPosition = parseFloat(slidesContainer.current.childNodes[0].style.left);
            }
            let counter = 0;
            let moveBackSlide = setInterval(() => {
              counter += 3;
              let positionCurrent = currentPosition + counter;
              let positionNext = nextPosition + counter;
              slidesContainer.current.childNodes[i].style.left = `${positionCurrent}px`;
              if (slidesContainer.current.childNodes[i + 1] !== undefined) {
                slidesContainer.current.childNodes[i + 1].style.left = `${positionNext}px`;
              } else {
                slidesContainer.current.childNodes[0].style.left = `${positionNext}px`;
              }

              if (positionCurrent >= 0) {
                clearInterval(moveBackSlide);
                for (let j = 0; j < slidesContainer.current.childNodes.length; j++) {
                  slidesContainer.current.childNodes[j].style.left = "";
                  slidesContainer.current.childNodes[j].style.right = "";
                  slidesContainer.current.childNodes[j].style.display = "none";
                }
                slidesContainer.current.childNodes[i].style.display = `block`;
                setShift(0);
                slidesContainer.current.style.pointerEvents = "auto";
              }
            }, 1);
          }
        }
      }
    }
    if (shift < 0) {
      // end finger and be visible previous slide
      if (shift < -Math.abs(slidesContainer.current.clientWidth / 4)) {
        // enough to jump to previous slide
        for (let i = 0; i < slidesContainer.current.childNodes.length; i++) {
          if (slidesContainer.current.childNodes[i].classList.contains("current")) {
            let currentPosition = parseFloat(slidesContainer.current.childNodes[i].style.right);
            let previousPosition;
            if (slidesContainer.current.childNodes[i - 1] !== undefined) {
              previousPosition = parseFloat(slidesContainer.current.childNodes[i - 1].style.right);
            } else {
              previousPosition = parseFloat(slidesContainer.current.childNodes[slidesContainer.current.childNodes.length - 1].style.right);
            }
            let counter = 0;
            let moveNextSlide = setInterval(() => {
              counter -= 3;
              let positionCurrent = currentPosition + counter;
              let positionPrevious = previousPosition + counter;
              slidesContainer.current.childNodes[i].style.right = `${positionCurrent}px`;
              if (slidesContainer.current.childNodes[i - 1] !== undefined) {
                slidesContainer.current.childNodes[i - 1].style.right = `${positionPrevious}px`;
              } else {
                slidesContainer.current.childNodes[slidesContainer.current.childNodes.length - 1].style.right = `${positionPrevious}px`;
              }
              if (Math.abs(positionCurrent) >= slidesContainer.current.clientWidth) {
                clearInterval(moveNextSlide);
                for (let j = 0; j < slidesContainer.current.childNodes.length; j++) {
                  slidesContainer.current.childNodes[j].style.left = "";
                  slidesContainer.current.childNodes[j].style.right = "";
                  slidesContainer.current.childNodes[j].style.display = "none";
                }
                slidesContainer.current.childNodes[i].classList.remove("current");
                if (slidesContainer.current.childNodes[i - 1] !== undefined) {
                  slidesContainer.current.childNodes[i - 1].style.display = `block`;
                  slidesContainer.current.childNodes[i - 1].classList.add("current");
                  setCurrentId(i - 1);
                } else {
                  slidesContainer.current.childNodes[slidesContainer.current.childNodes.length - 1].style.display = `block`;
                  slidesContainer.current.childNodes[slidesContainer.current.childNodes.length - 1].classList.add("current");
                  setCurrentId(slidesContainer.current.childNodes.length - 1);
                }
                setShift(0);
                slidesContainer.current.style.pointerEvents = "auto";
              }
            }, 1);
          }
        }
      } else {
        // not enough to jump to previous slide
        for (let i = 0; i < slidesContainer.current.childNodes.length; i++) {
          if (slidesContainer.current.childNodes[i].classList.contains("current")) {
            let currentPosition = parseFloat(slidesContainer.current.childNodes[i].style.right);
            let previousPosition;
            if (slidesContainer.current.childNodes[i - 1] !== undefined) {
              previousPosition = parseFloat(slidesContainer.current.childNodes[i - 1].style.right);
            } else {
              previousPosition = parseFloat(slidesContainer.current.childNodes[slidesContainer.current.childNodes.length - 1].style.right);
            }
            let counter = 0;
            let moveBackSlide = setInterval(() => {
              counter += 3;
              let positionCurrent = currentPosition + counter;
              let positionPrevious = previousPosition + counter;
              slidesContainer.current.childNodes[i].style.right = `${positionCurrent}px`;
              if (slidesContainer.current.childNodes[i - 1] !== undefined) {
                slidesContainer.current.childNodes[i - 1].style.right = `${positionPrevious}px`;
              } else {
                slidesContainer.current.childNodes[slidesContainer.current.childNodes.length - 1].style.right = `${positionPrevious}px`;
              }
              if (positionCurrent >= 0) {
                clearInterval(moveBackSlide);
                for (let j = 0; j < slidesContainer.current.childNodes.length; j++) {
                  slidesContainer.current.childNodes[j].style.left = "";
                  slidesContainer.current.childNodes[j].style.right = "";
                  slidesContainer.current.childNodes[j].style.display = "none";
                }
                slidesContainer.current.childNodes[i].style.display = "block";
                setShift(0);
                slidesContainer.current.style.pointerEvents = "auto";
              }
            }, 1);
          }
        }
      }
    }
  };
  // update slide view after click on arrow
  useEffect(() => {
    if (slidesContainer.current.childNodes[currentId] !== undefined) {
      for (let i = 0; i < slidesContainer.current.childNodes.length; i++) {
        slidesContainer.current.childNodes[i].classList.remove("current");
        slidesContainer.current.childNodes[i].style.display = "none";
        slidesContainer.current.childNodes[i].style.left = "";
        slidesContainer.current.childNodes[i].style.right = "";
      }

      slidesContainer.current.childNodes[currentId].style.display = "block";
      slidesContainer.current.childNodes[currentId].style.left = "0";
      slidesContainer.current.childNodes[currentId].classList.add("current");
    } else {
      return;
    }
  }, [setCurrentId, currentId]);

  const toggleLeftImgHandler = () => {
    if (currentId !== 0) {
      setCurrentId((prevState) => prevState - 1);
    } else {
      setCurrentId(props.slidesArray.length - 1);
    }
  };

  const toggleRightImgHandler = () => {
    if (currentId !== props.slidesArray.length - 1) {
      setCurrentId((prevState) => prevState + 1);
    } else {
      setCurrentId(0);
    }
  };

  const pickSlideHandler = (event) => {
    for (let i = 0; i < slidesContainer.current.childNodes.length; i++) {
      slidesContainer.current.childNodes[i].classList.remove("current");
      slidesContainer.current.childNodes[i].style.display = "none";
      slidesContainer.current.childNodes[i].style.left = "";
      slidesContainer.current.childNodes[i].style.right = "";
    }
    slidesContainer.current.childNodes[+event.target.id].style.display = "block";
    slidesContainer.current.childNodes[+event.target.id].style.left = "0";
    slidesContainer.current.childNodes[+event.target.id].classList.add("current");
    setCurrentId(+event.target.id);
  };

  let slidesMain = props.slidesArray.map((slide) => (
    <div key={slide.id} className="slidesContainer__slide" style={{ backgroundImage: `url(${slide.url})` }}>
      <div className="slide__text slide__text--left">{slide.textLeft}</div>
      <div className="slide__text slide__text--right">{slide.textRight}</div>
    </div>
  ));

  let slidesSmall;
  if (props.slidesArray.length >= 3) {
    slidesSmall = (
      <Fragment>
        {props.slidesArray.map((slide) => {
          if (slide.id === currentId) {
            return <div onClick={pickSlideHandler} id={slide.id <= 0 ? props.slidesArray.length - 1 : slide.id - 1} key={slide.id <= 0 ? props.slidesArray.length - 1 : slide.id - 1} className="slidesContainer__slide" style={{ backgroundImage: `url(${props.slidesArray[slide.id <= 0 ? props.slidesArray.length - 1 : slide.id - 1].url})` }}></div>;
          }
        })}
        {props.slidesArray.map((slide) => {
          if (slide.id === currentId) {
            return <div id={slide.id} key={slide.id} className="slidesContainer__slide currentSmall" style={{ backgroundImage: `url(${props.slidesArray[slide.id].url})` }}></div>;
          }
        })}
        {props.slidesArray.map((slide) => {
          if (slide.id === currentId) {
            return <div onClick={pickSlideHandler} id={slide.id >= props.slidesArray.length - 1 ? 0 : slide.id + 1} key={slide.id >= props.slidesArray.length - 1 ? 0 : slide.id + 1} className="slidesContainer__slide" style={{ backgroundImage: `url(${props.slidesArray[slide.id >= props.slidesArray.length - 1 ? 0 : slide.id + 1].url})` }}></div>;
          }
        })}
      </Fragment>
    );
  }
  if (props.slidesArray.length === 2) {
    slidesSmall = (
      <Fragment>
        {props.slidesArray.map((slide) => {
          if (slide.id === currentId) {
            return <div id={slide.id} key={slide.id} className="slidesContainer__slide currentSmall" style={{ backgroundImage: `url(${props.slidesArray[slide.id].url})` }}></div>;
          }
        })}
        {props.slidesArray.map((slide) => {
          if (slide.id === currentId) {
            return <div onClick={pickSlideHandler} id={slide.id >= props.slidesArray.length - 1 ? 0 : slide.id + 1} key={slide.id >= props.slidesArray.length - 1 ? 0 : slide.id + 1} className="slidesContainer__slide" style={{ backgroundImage: `url(${props.slidesArray[slide.id >= props.slidesArray.length - 1 ? 0 : slide.id + 1].url})` }}></div>;
          }
        })}
      </Fragment>
    );
  }
  if (props.slidesArray.length === 1) {
    slidesSmall = (
      <Fragment>
        {props.slidesArray.map((slide) => {
          if (slide.id === currentId) {
            return <div id={slide.id} key={slide.id} className="slidesContainer__slide currentSmall" style={{ backgroundImage: `url(${props.slidesArray[slide.id].url})` }}></div>;
          }
        })}
      </Fragment>
    );
  }
  return (
    <div ref={sliderMobile} className="sliderMobile sliderMobile--style">
      <div ref={slidesContainer} onTouchStart={touchStartHandler} onTouchMove={touchMoveHandler} onTouchEnd={touchEndHandler} className="sliderMobile__slidesContainer">
        {slidesMain}
      </div>
      <div ref={smallSlidesContainer} className="sliderMobile__smallSlidesContainer">
        <i ref={containerSmallButtonLeft} className="bi bi-caret-left-fill smallSlidesContainer__arrow smallSlidesContainer__arrow--left" onClick={toggleLeftImgHandler}></i>
        <i ref={containerSmallButtonRight} className="bi bi-caret-right-fill smallSlidesContainer__arrow smallSlidesContainer__arrow--right" onClick={toggleRightImgHandler}></i>
        <div ref={smallSlidesContainer} className="smallSlidesContainer__slidesContainer">
          {slidesSmall}
        </div>
      </div>
    </div>
  );
};

export default SliderMobile;