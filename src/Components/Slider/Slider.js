import { Fragment } from "react";
import SliderDesktop from "./SliderDesktop/SliderDesktop";
import SliderMobile from "./SliderMobile/SliderMobile";
import { BrowserView, MobileView } from "react-device-detect"; 

const Slider = (props) => {
  return (
    <Fragment>
      <BrowserView> {/* WILL RENDER COMPONENT ONLY ON BROWSER */}
        <SliderDesktop moveSlider={props.moveSlider} slidesArray={props.slidesArray} picked={props.picked} />
      </BrowserView>
      <MobileView> {/* WILL RENDER COMPONENT ONLY ON MOBILE DEVICES */}
        <SliderMobile moveSlider={props.moveSlider} slidesArray={props.slidesArray} picked={props.picked} />
      </MobileView>
    </Fragment>
  );
};

export default Slider;
