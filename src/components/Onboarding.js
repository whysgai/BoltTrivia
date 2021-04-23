import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeOnboarding } from "../redux/actions/gameStateActions";

const Onboarding = () => {
  const [slide, setSlide] = useState(1);

  const dispatch = useDispatch();

  const clickNext = () => {
    if (slide !== 3) {
      setSlide(slide + 1);
    } else {
      dispatch(closeOnboarding());
    }
  };

  return (
    <>
      {slide === 1 ? (
        <p>Slide 1 Instructions</p>
      ) : slide === 2 ? (
        <p>Slide 2 Instructions</p>
      ) : (
        <p>Slide 3 Instructions</p>
      )}
      <button
        onClick={() => dispatch(closeOnboarding())}
        className="btn btn-primary"
      >
        Skip
      </button>

      <button onClick={clickNext} className="btn btn-primary">
        Next
      </button>
    </>
  );
};

export default Onboarding;
