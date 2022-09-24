import React, { useState, useRef } from "react";
import CalculatorInner from "./component/CalculatorInner";
import Alert from "./component/Alert";
import "./App.css";

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
  const cent2 = () => {
    if (currOperator === "") {
      if (left === "0") {
        showAlert("0不能为分母", "rgb(199, 124, 25)");
        return;
      }
      setLeft(1/parseFloat(left) + "");
    } else {
      if (right === "0") {
        showAlert("0不能为分母", "rgb(199, 124, 25)");
        return;
      }
      setRight(1/parseFloat(right) + "");
    }
  }
  const clearOne = () => {
    if (currOperator === "") {
      if (left === "0") {
        return;
      }
      if(left.length === 1) {
        setLeft("0");
      } else {
        setLeft(left.slice(0, left.length-1));
      }
    } else {
      if (right === "0" || right === "") {
        return;
      }
      if(right.length === 1) {
        setRight("0");
      } else {
        setRight(right.slice(0, right.length-1));
      }
    }
  }
  const square = () => {
    if (currOperator === "") {
      setLeft(parseFloat(left)*parseFloat(left) + "");
    } else {
      setRight(parseFloat(right)*parseFloat(right) + "");
    }
  }

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
    setLeft(res + '');
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
            funcs = {{
              add, sub, division, multi, percent, equal, nega, point, cent2, clearOne, square
            }}
          />
        </div>
      </div>
    </>
  );
}
export default Calculator;
