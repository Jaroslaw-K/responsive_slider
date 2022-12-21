import "./ChoiceForm.scss";
import { useState, useRef } from "react";

// FORM WHICH ALLOW USER TO CHOOSE TYPE OF SLIDER
const ChoiceForm = (props) => {
  const choiceForm = useRef();
  const [choosed, setChoosed] = useState(undefined);
  const submitFormHandler = (event) => {
    event.preventDefault();
    if (choosed === "autoMoveSlider" || choosed === "nonAutoMoveSlider") {
      choiceForm.current.classList.add("choiceForm--hide"); // ADD CLASS RESPONSIBLE FOR HIDING FORM
      props.setPicked(choosed); // SEND DATA TO HIGHER COMPONENT ABOUT TYPE OF CHOOSED SLIDER
    }
  };
  const nonAutoMoveChoiceHandler = () => {
    setChoosed("nonAutoMoveSlider");
  };
  const autoMoveChoiceHandler = () => {
    setChoosed("autoMoveSlider");
  };
  return (
    <div ref={choiceForm} className="choiceForm choiceForm--style">
      <div className="choiceForm__bgOverlay">
        <form className="bgOverlay__form" onSubmit={submitFormHandler}>
          <label>
            <input type="radio" value={choosed} name="sliderType" onChange={nonAutoMoveChoiceHandler} /> Non Auto-Move Slider
          </label>
          <label>
            <input type="radio" value={choosed} name="sliderType" onChange={autoMoveChoiceHandler} /> Auto-Move Slider
          </label>
          <button className="bgOverlay__btn">ACCEPT</button>
        </form>
      </div>
    </div>
  );
};

export default ChoiceForm;

