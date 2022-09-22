import { useState, useRef } from "react";
import Alert from "./component/Alert";
import CalculatorButton from "./component/CalculatorButton";
import "./App.css";

function CalculatorInner({
  stage,
  result,
  input_num,
  clear,
  add,
  sub,
  multi,
  division,
  percent,
  equal,
  nega,
  point,
}) {
  return (
    <div className="calculator-grid-box">
      <div className="stage">{stage}</div>
      <div className="show">
        <span>{result}</span>
      </div>

      <CalculatorButton func={clear} val="AC" className="ac" />
      <CalculatorButton val="+/-" className="nega" func={nega} />
      <CalculatorButton val="%" className="percent" func={percent} />
      <CalculatorButton val="÷" className="division" func={division} />

      <CalculatorButton func={() => input_num(7)} val="7" />
      <CalculatorButton func={() => input_num(8)} val="8" />
      <CalculatorButton func={() => input_num(9)} val="9" />
      <CalculatorButton className="multi" val="x" func={multi} />

      <CalculatorButton func={() => input_num(4)} val="4" />
      <CalculatorButton func={() => input_num(5)} val="5" />
      <CalculatorButton func={() => input_num(6)} val="6" />
      <CalculatorButton className="sub" val="-" func={sub} />

      <CalculatorButton func={() => input_num(1)} val="1" />
      <CalculatorButton func={() => input_num(2)} val="2" />
      <CalculatorButton func={() => input_num(3)} val="3" />
      <CalculatorButton className="add" val="+" func={add} />

      <CalculatorButton className="zero" val="0" func={() => input_num(0)} />
      <CalculatorButton val="." func={point} />
      <CalculatorButton val="=" className="equal" func={equal} />
    </div>
  );
}

function Calculator() {
  const [currOperator, setOperator] = useState("");
  const [isCalculated, setIC] = useState(false);
  const [left, setLeft] = useState("0");
  const [right, setRight] = useState("0");
  const [stage, setStage] = useState("");

  const [alertStyle, setAlertStyles] = useState([
    "出现错误",
    "rgb(250, 13, 35)",
    // 用于防抖！
    false,
  ]);
  const alertBox = useRef();
  function showAlert(i, c) {
    if (alertStyle[2]) {
      return;
    }
    alertBox.current.children[0].style.transform = "translateY(0)";
    setAlertStyles([i, c, true]);
    setTimeout(() => {
      alertBox.current.children[0].style.transform = "translateY(-100%)";
      setAlertStyles([i, c, false]);
    }, 3000);
  }

  const input_num = (num) => {
    if (typeof num !== "number") {
      showAlert("请给数字！(来自 input_num 函数)", "#22ef12");
      return;
    }
    if (isCalculated) {
      setLeft(num + "");
      setRight("");
      setOperator("");
      setIC(false);
    } else {
      if (currOperator === "") {
        if (left === "0") {
          setLeft(num + "");
        } else {
          setLeft(left + "" + num);
        }
      } else {
        if (right === "0") {
          setRight(num + "");
        } else {
          setRight(right + "" + num);
        }
      }
    }
  };
  const clear = () => {
    setOperator("");
    setIC(false);
    setLeft("0");
    setRight("");
    setStage("");
  };
  const normalOperation = (type, text) => {
    if (text === undefined) {
      text = type;
    }
    setOperator(type);
    setStage(left + text);
    setRight("0");
    // 如果是刚计算完，就接着上一次的结果来计算；
    // 避免按下一个数的时候清除该结果
    if (isCalculated) {
      setIC(false);
    }
  };
  const add = () => normalOperation("+"),
    sub = () => normalOperation("-"),
    multi = () => normalOperation("*", "x"),
    division = () => normalOperation("/", "÷");
  const percent = () => {
    if (currOperator === "") {
      if (left === "0") {
        showAlert("0% = 0 !!!", "#fff");
        return;
      }
      setLeft(parseFloat(left) / 100 + "");
    } else {
      if (right === "0") {
        showAlert("0% = 0 !!!", "#fff");
        return;
      }
      setRight(parseFloat(right) / 100 + "");
    }
  };
  const nega = () => {
    if (currOperator === "") {
      if (left === "0") {
        showAlert("-0 === +0", "#fff");
        return;
      }
      setLeft(parseFloat(left) > 0 ? "-" + left : left.substring(1));
    } else {
      if (right === "0") {
        showAlert("-0 === +0", "#fff");
        return;
      }
      setRight(parseFloat(right) > 0 ? "-" + right : right.substring(1));
    }
  };
  const point = () => {
    if (currOperator === "") {
      if (~left.indexOf(".")) {
        showAlert("已是小数！", "#f0f");
        return;
      }
      setLeft(left + ".");
    } else {
      if (~right.indexOf(".")) {
        showAlert("已是小数！", "#f0f");
        return;
      }
      setRight(right + ".");
    }
  };

  // TODO
  const equal = () => {
    let res;
    switch (currOperator) {
      case "+":
        res = parseFloat(left) + parseFloat(right);
        break;
      case "-":
        res = parseFloat(left) - parseFloat(right);
        break;
      case "*":
        res = parseFloat(left) * parseFloat(right);
        break;
      case "/":
        if (right === "0") {
          showAlert("除数不能为零！", "rgb(250, 3, 5)");
          return;
        }
        res = parseInt(left) / parseInt(right);
        break;
      default:
        showAlert("未定义的运算符！", "#ab2632");
        return;
    }
    setOperator("");
    setStage(stage + right + "=");
    setLeft(res);
    setRight("0");
    setIC(true);
  };

  return (
    <>
      <div ref={alertBox} id="alert-box">
        <Alert info={alertStyle[0]} color={alertStyle[1]} />
      </div>
      <div className="calculator-container" id="calculator-container">
        <div className="calculator-inner-box">
          <CalculatorInner
            clear={clear}
            input_num={input_num}
            stage={stage}
            result={currOperator === "" ? left : right}
            add={add}
            sub={sub}
            division={division}
            multi={multi}
            percent={percent}
            equal={equal}
            nega={nega}
            point={point}
          />
        </div>
      </div>
    </>
  );
}
export default Calculator;
