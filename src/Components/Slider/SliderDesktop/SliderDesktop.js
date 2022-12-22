import "./SliderDesktop.scss";
import { useRef, useEffect, useState, Fragment } from "react";

const SliderDesktop = (props) => {
  const sliderDesktop = useRef();
  const slidesContainer = useRef();
  const containerButtonLeft = useRef();
  const containerButtonRight = useRef();
  const containerSmallButtonLeft = useRef();
  const containerSmallButtonRight = useRef();
  const [currentId, setCurrentId] = useState(undefined); // ID OF ACTUAL DISPLAY SLIDE

  useEffect(() => {
    if (props.picked === "nonAutoMoveSlider") { // IF IN FORM USER CHOOSE NON AUTO MOVE IT WILL HIDE TEXTS AND DISPLAY SMALL SLIDER BELOW MAIN
      sliderDesktop.current.classList.add("sliderDesktop--nonAutoMove"); 
    }
    if (props.picked === "autoMoveSlider") {
      sliderDesktop.current.classList.add("sliderDesktop--autoMove"); // IF IN FORM USER CHOOSE AUTO-MOVE IT WILL SHOW TEXTS AND HIDE SMALL SLIDER
    }
    slidesContainer.current.childNodes[0].classList.add("current");
    slidesContainer.current.childNodes[0].style.display = "block";
    setCurrentId(0); // ON FIRST RENDER ELEMENT, SET DISPLAY SLIDE ON SLIDE WITH ID 0
    props.moveSlider(autoMoveSliderDesktop);
  }, []);

  const toggleLeftImgHandler = () => { // FUNCTION RESPONSIBLE FOR MOVE TO PREVIOUS SLIDE
    if (slidesContainer.current.childNodes.length > 1) {
      containerButtonLeft.current.style.pointerEvents = "none";
      containerButtonRight.current.style.pointerEvents = "none";
      containerSmallButtonLeft.current.style.pointerEvents = "none";
      containerSmallButtonRight.current.style.pointerEvents = "none";
      for (let i = 0; i < slidesContainer.current.childNodes.length; i++) {
        if (slidesContainer.current.childNodes[i].classList.contains("current")) {
          slidesContainer.current.childNodes[i].style.left = "0";
          if (slidesContainer.current.childNodes[i - 1] !== undefined) {
            slidesContainer.current.childNodes[i - 1].style.display = "block";
            slidesContainer.current.childNodes[i - 1].style.left = "-100%";
          } else {
            slidesContainer.current.childNodes[slidesContainer.current.childNodes.length - 1].style.display = "block";
            slidesContainer.current.childNodes[slidesContainer.current.childNodes.length - 1].style.left = "-100%";
          }
          let counterCurrent = 0;
          let counterSecond = 100;
          const move = setInterval(() => {
            counterCurrent += 1;
            counterSecond -= 1;
            slidesContainer.current.childNodes[i].style.left = `${counterCurrent}%`;
            if (slidesContainer.current.childNodes[i - 1] !== undefined) {
              slidesContainer.current.childNodes[i - 1].style.left = `-${counterSecond}%`;
            } else {
              slidesContainer.current.childNodes[slidesContainer.current.childNodes.length - 1].style.left = `-${counterSecond}%`;
            }
            if (counterCurrent === 100 || counterSecond === 0) {
              containerButtonLeft.current.style.pointerEvents = "auto";
              containerButtonRight.current.style.pointerEvents = "auto";
              containerSmallButtonLeft.current.style.pointerEvents = "auto";
              containerSmallButtonRight.current.style.pointerEvents = "auto";
              clearInterval(move);
              slidesContainer.current.childNodes[i].classList.remove("current");
              slidesContainer.current.childNodes[i].style.display = "none";
              if (slidesContainer.current.childNodes[i - 1] !== undefined) {
                slidesContainer.current.childNodes[i - 1].classList.add("current");
                setCurrentId(i - 1);
              } else {
                slidesContainer.current.childNodes[slidesContainer.current.childNodes.length - 1].classList.add("current");
                setCurrentId(slidesContainer.current.childNodes.length - 1);
              }
            }
          }, 1);
        }
      }
    }
  };

  const toggleRightImgHandler = () => { // FUNCTION RESPONSIBLE FOR MOVE TO NEXT SLIDE
    if (slidesContainer.current.childNodes.length > 1) {
      containerButtonLeft.current.style.pointerEvents = "none";
      containerButtonRight.current.style.pointerEvents = "none";
      containerSmallButtonLeft.current.style.pointerEvents = "none";
      containerSmallButtonRight.current.style.pointerEvents = "none";
      for (let i = 0; i < slidesContainer.current.childNodes.length; i++) {
        if (slidesContainer.current.childNodes[i].classList.contains("current")) {
          slidesContainer.current.childNodes[i].style.left = "0";
          if (slidesContainer.current.childNodes[i + 1] !== undefined) {
            slidesContainer.current.childNodes[i + 1].style.display = "block";
            slidesContainer.current.childNodes[i + 1].style.left = "100%";
          } else {
            slidesContainer.current.childNodes[0].style.display = "block";
            slidesContainer.current.childNodes[0].style.left = "100%";
          }
          let counterCurrent = 0;
          let counterSecond = 100;
          const move = setInterval(() => {
            counterCurrent += 1;
            counterSecond -= 1;
            slidesContainer.current.childNodes[i].style.left = `-${counterCurrent}%`;
            if (slidesContainer.current.childNodes[i + 1] !== undefined) {
              slidesContainer.current.childNodes[i + 1].style.left = `${counterSecond}%`;
            } else {
              slidesContainer.current.childNodes[0].style.left = `${counterSecond}%`;
            }
            if (counterCurrent === 100 || counterSecond === 0) {
              containerButtonLeft.current.style.pointerEvents = "auto";
              containerButtonRight.current.style.pointerEvents = "auto";
              containerSmallButtonLeft.current.style.pointerEvents = "auto";
              containerSmallButtonRight.current.style.pointerEvents = "auto";
              clearInterval(move);
              slidesContainer.current.childNodes[i].classList.remove("current");
              slidesContainer.current.childNodes[i].style.display = "none";
              if (slidesContainer.current.childNodes[i + 1] !== undefined) {
                slidesContainer.current.childNodes[i + 1].classList.add("current");
                setCurrentId(i + 1);
              } else {
                slidesContainer.current.childNodes[0].classList.add("current");
                setCurrentId(0);
              }
            }
          }, 1);
        }
      }
    }
  };

  const pickSlideHandler = (event) => { // FUNCTION RESPONSIBLE FOR DISPLAY PICKED SLIDE FROM SMALL SLIDER
    for (let i = 0; i < slidesContainer.current.childNodes.length; i++) {
      slidesContainer.current.childNodes[i].classList.remove("current");
      slidesContainer.current.childNodes[i].style.display = "none";
    }
    slidesContainer.current.childNodes[+event.target.id].style.display = "block";
    slidesContainer.current.childNodes[+event.target.id].style.left = "0";
    slidesContainer.current.childNodes[+event.target.id].classList.add("current");
    setCurrentId(+event.target.id);
  };

  const autoMoveSliderDesktop = () => { // FUNCTION RESPONSIBLE FOR CHANGEING SLIDES AUTOMATICALLY 
    sliderDesktop.current.style.pointerEvents = "none";
    setInterval(() => {
      toggleRightImgHandler();
    }, 20000); 
  };

  let slidesMain = props.slidesArray.map((slide) => ( // CREATE SLIDES ELEMENTS
    <div key={slide.id} className="slidesContainer__slide" style={{ backgroundImage: `url(${slide.url})` }}>
      <div className="slide__text slide__text--left">{slide.textLeft}</div>
      <div className="slide__text slide__text--right">{slide.textRight}</div>
    </div>
  ));
  let slidesSmall; // VARIABLE WHICH STORE SMALL SLIDES ELEMENTS
  if (props.slidesArray.length > 3) {
    slidesSmall = (
      <Fragment>
        {props.slidesArray.map((slide) => {
          if (slide.id === currentId && slide.id === 0) {
            return <div onClick={pickSlideHandler} id={props.slidesArray.length - 2} key={props.slidesArray.length - 2} className="slidesContainer__slide" style={{ backgroundImage: `url(${props.slidesArray[props.slidesArray.length - 2].url})` }}></div>;
          } else if (slide.id === currentId && slide.id === 1) {
            return <div onClick={pickSlideHandler} id={props.slidesArray.length - 1} key={props.slidesArray.length - 1} className="slidesContainer__slide" style={{ backgroundImage: `url(${props.slidesArray[props.slidesArray.length - 1].url})` }}></div>;
          } else if (slide.id === currentId && slide.id >= 2) {
            return <div onClick={pickSlideHandler} id={slide.id - 2} key={slide.id - 2} className="slidesContainer__slide" style={{ backgroundImage: `url(${props.slidesArray[slide.id - 2].url})` }}></div>;
          }
        })}
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
        {props.slidesArray.map((slide) => {
          if (slide.id === currentId && slide.id === props.slidesArray.length - 2) {
            return <div onClick={pickSlideHandler} id={0} key={0} className="slidesContainer__slide" style={{ backgroundImage: `url(${props.slidesArray[0].url})` }}></div>;
          } else if (slide.id === currentId && slide.id === props.slidesArray.length - 1) {
            return <div onClick={pickSlideHandler} id={1} key={1} className="slidesContainer__slide" style={{ backgroundImage: `url(${props.slidesArray[1].url})` }}></div>;
          } else if (slide.id === currentId && slide.id >= 0) {
            return <div onClick={pickSlideHandler} id={slide.id + 2} key={slide.id + 2} className="slidesContainer__slide" style={{ backgroundImage: `url(${props.slidesArray[slide.id + 2].url})` }}></div>;
          }
        })}
      </Fragment>
    );
  }
  if (props.slidesArray.length === 3) {
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
    <div ref={sliderDesktop} className="sliderDesktop sliderDesktop--style">
      <div ref={containerButtonLeft} className="sliderDesktop__containerButton sliderDesktop__containerButton--left" onClick={toggleLeftImgHandler}></div>
      <div ref={containerButtonRight} className="sliderDesktop__containerButton sliderDesktop__containerButton--right" onClick={toggleRightImgHandler}></div>
      <div ref={slidesContainer} className="sliderDesktop__slidesContainer">
        {slidesMain}
      </div>
      <div className="sliderDesktop__smallSlidesContainer">
        <i ref={containerSmallButtonLeft} className="bi bi-caret-left-fill smallSlidesContainer__arrow smallSlidesContainer__arrow--left" onClick={toggleLeftImgHandler}></i>
        <i ref={containerSmallButtonRight} className="bi bi-caret-right-fill smallSlidesContainer__arrow smallSlidesContainer__arrow--right" onClick={toggleRightImgHandler}></i>
        <div className="smallSlidesContainer__slidesContainer">
          {slidesSmall}
        </div>
      </div>
    </div>
  );
};

export default SliderDesktop;
