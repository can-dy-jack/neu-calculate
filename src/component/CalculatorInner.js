import React, { useEffect } from "react";
import CalculatorButton from "./CalculatorButton";

function CalculatorInner({ stage, result, input_num, clear, funcs }) {
  useEffect(() => {
    // 监听键盘
    window.onkeydown = (e) => {
      const type = e.code;
      console.log(type, e.shiftKey)
      if (e.shiftKey && type === "Digit5") {
        // shift + 5 => %
        funcs.percent();
        return;
      }
      if (type === "Period" || type === "NumpadDecimal") {
        // .
        funcs.point();
        return;
      }
      if (type.indexOf("Digit") > -1 || type.indexOf("Numpad") > -1) {
        // 0-9
        input_num(+type[type.length - 1]);
        return;
      }
      switch(type) {
        case "Slash": funcs.cent2(); break; //  1/x
        case "NumpadAdd": funcs.add(); break; //  +
        case "NumpadSubtract": funcs.sub(); break; //  -
        case "Minus": funcs.nega(); break; //  - 负
        case "NumpadMultiply": funcs.multi(); break; //  x
        case "NumpadDivide": funcs.division(); break; //  /
        case "Equal": funcs.equal(); break; //  =
        case "Backspace": funcs.clearOne(); break; //  Backspace
        case "Delete": clear(); break; // Delete
        default: return;
      }
    };
  });
 
  return (
    <div className="calculator-grid-box">
      <div className="stage">{stage}</div>
      <div className="show">
        <span>{result}</span>
      </div>
 
      <CalculatorButton val="±" className="nega" func={funcs.nega} />
      <CalculatorButton val="" disabled={true} />
      <CalculatorButton func={clear} val="AC" className="ac" />
      <CalculatorButton val="BackSpace" className="clear-one" func={funcs.clearOne} />

      <CalculatorButton val="&#8543;" className="cent2" func={funcs.cent2} />
      <CalculatorButton val={<span>x<small><sup>2</sup></small></span>} className="square" func={funcs.square}/>
      <CalculatorButton val="%" className="percent" func={funcs.percent} />
      <CalculatorButton val="÷" className="division" func={funcs.division} />

      <CalculatorButton func={() => input_num(7)} val="7" />
      <CalculatorButton func={() => input_num(8)} val="8" />
      <CalculatorButton func={() => input_num(9)} val="9" />
      <CalculatorButton className="multi" val="x" func={funcs.multi} />

      <CalculatorButton func={() => input_num(4)} val="4" />
      <CalculatorButton func={() => input_num(5)} val="5" />
      <CalculatorButton func={() => input_num(6)} val="6" />
      <CalculatorButton className="sub" val="-" func={funcs.sub} />

      <CalculatorButton func={() => input_num(1)} val="1" />
      <CalculatorButton func={() => input_num(2)} val="2" />
      <CalculatorButton func={() => input_num(3)} val="3" />
      <CalculatorButton className="add" val="+" func={funcs.add} />

      <CalculatorButton className="zero" val="0" func={() => input_num(0)} />
      <CalculatorButton val="." func={funcs.point} />
      <CalculatorButton val="=" className="equal" func={funcs.equal} />
    </div>
  );
}
export default CalculatorInner;