import React, { useRef, useEffect } from "react";
import "./calculatorButton.css";

function CalculatorButton({ val, func, className, disabled }) {
  const calBtn = useRef();

  useEffect(() => {
    let circle;
    calBtn.current.onmousedown = (e) => {
      circle = document.createElement("span");
      circle.classList.add("cal-box-circle");
      circle.style.left = e.clientX - calBtn.current.offsetLeft + "px";
      circle.style.top = e.clientY - calBtn.current.offsetTop + "px";
      circle.style.transform = "translate(-50%, -50%)";
      calBtn.current.appendChild(circle);
    };
    calBtn.current.onmouseup = () => {
      if(circle) {
        calBtn.current.removeChild(circle);
      }
    };
    // TODO
    calBtn.current.oncontextmenu = (e) => {
      e.preventDefault();
    }
  });
  return (
    <>
      <button
        type="button"
        className={className ? "ccl-btn " + className : "ccl-btn"}
        onClick={func}
        ref={calBtn}
        disabled={disabled}
      >
        {val}
      </button>
    </>
    
  );
}
export default CalculatorButton;
