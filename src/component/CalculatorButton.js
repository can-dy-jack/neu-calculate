import { useRef, useEffect } from "react";
import "./calculatorButton.css";

function CalculatorButton({ val, func, className }) {
  const calBtn = useRef();
  useEffect(() => {
    let circle;
    calBtn.current.onmousedown = (e) => {
      circle = document.createElement("span");
      circle.classList.add("cal-box-circle");
      circle.style.left = e.clientX - calBtn.current.offsetLeft + "px";
      circle.style.top = e.clientY - calBtn.current.offsetTop + "px";
      circle.style.transform = "translate(-50%, -50%)";
      // circle.style.animation = "";
      calBtn.current.appendChild(circle);
    };
    calBtn.current.onmouseup = () => {
      if(circle) {
        calBtn.current.removeChild(circle);
      }
    };
  });
  return (
    <button
      type="button"
      className={"ccl-btn " + className}
      onClick={func}
      ref={calBtn}
    >
      {val}
    </button>
  );
}
export default CalculatorButton;
