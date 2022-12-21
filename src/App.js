import "./scss/main.scss";
import { useState } from "react";
import image1 from "./assets/7031408.jpg";
import image2 from "./assets/5502227.jpg";
import image3 from "./assets/5524205.jpg";
import image4 from "./assets/1438834.jpg";
//Components
import ChoiceForm from "./Components/ChoiceForm/ChoiceForm";
import Slider from "./Components/Slider/Slider";

const App = () => {
  const [picked, setPicked] = useState(undefined); // STORE USER CHOICE OF TYPE OF SLIDER
  const autoMoveSlider = (moveSlider) => { // THIS FUNCTION CALL RECIVED FUNCTION RESPONSIBLE FOR SLIDES AUTO MOVE 
    moveSlider();
  };
  const nonAutoMoveSlider = () => {};

  const sliderData = [ // ARRAY WITH SLIDER IMAGES AND TEXTS
    {
      id: 0,
      url: image1,
      textLeft: "SEE OUR OFFER",
      textRight: "WE HANDLE ALL THE FORMALITIES",
    },
    {
      id: 1,
      url: image2,
      textLeft: "WIDE CHOICE OF OFFERS",
      textRight: "OFFERS ADJUSTED TO NEEDS",
    },
    {
      id: 2,
      url: image3,
      textLeft: "AGENTS AVAILABLE 24/7",
      textRight: "CALL US",
    },
    {
      id: 3,
      url: image4,
      textLeft: "NEW OFFERS EVERY WEEK",
      textRight: "WE CARE FOR YOUR SATISFACTION",
    },
  ];
  return (
    <div className="app">
      <ChoiceForm setPicked={setPicked} />
      {picked === "nonAutoMoveSlider" && <Slider moveSlider={nonAutoMoveSlider} slidesArray={sliderData} picked={picked} />}
      {picked === "autoMoveSlider" && <Slider moveSlider={autoMoveSlider} slidesArray={sliderData} picked={picked} />}
    </div>
  );
};

export default App;
