import React, { useState, useRef } from "react";
import CalculatorInner from "./component/CalculatorInner";
import Alert from "./component/Alert";
import useSetState from "./hooks/useSetSate";
import "./App.css";

function Calculator() {
  const [state, setState] = useSetState({
    currOperator: "",
    isCalculated: false,
    left: "0",
    right: "0",
    stage: "",
  });

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
    if (state.isCalculated) {
      setState({
        left: num + "",
        right: "",
        currOperator: "",
        isCalculated: false,
      });
    } else {
      if (state.currOperator === "") {
        if (state.left === "0") {
          setState({
            left: num + "",
          });
        } else {
          setState({
            left: state.left + "" + num,
          });
        }
      } else {
        if (state.right === "0") {
          setState({
            right: num + "",
          });
        } else {
          setState({
            right: state.right + "" + num,
          });
        }
      }
    }
  };
  const clear = () => {
    setState({
      currOperator: "",
      isCalculated: false,
      left: "0",
      right: "",
      stage: "",
    });
  };
  const normalOperation = (type, text) => {
    if (text === undefined) {
      text = type;
    }
    setState({
      currOperator: type,
      stage: state.left + text,
      right: "0",
      isCalculated: false,
    });
    // FIXME
    // 如果是刚计算完，就接着上一次的结果来计算；
    // 避免按下一个数的时候清除该结果
    // if (isCalculated) {
    //   setIC(false);
    // }
  };
  const add = () => normalOperation("+"),
    sub = () => normalOperation("-"),
    multi = () => normalOperation("*", "x"),
    division = () => normalOperation("/", "÷");
  const percent = () => {
    if (state.currOperator === "") {
      if (state.left === "0") {
        showAlert("0% = 0 !!!", "#fff");
        return;
      }
      setState({
        left: parseFloat(state.left) / 100 + "",
      });
    } else {
      if (state.right === "0") {
        showAlert("0% = 0 !!!", "#fff");
        return;
      }
      setState({
        right: parseFloat(state.right) / 100 + "",
      });
    }
  };
  const nega = () => {
    if (state.currOperator === "") {
      if (state.left === "0") {
        showAlert("-0 === +0", "#fff");
        return;
      }
      setState({
        left:
          parseFloat(state.left) > 0
            ? "-" + state.left
            : state.left.substring(1),
      });
    } else {
      if (state.right === "0") {
        showAlert("-0 === +0", "#fff");
        return;
      }
      setState({
        right:
          parseFloat(state.right) > 0
            ? "-" + state.right
            : state.right.substring(1),
      });
    }
  };
  const point = () => {
    if (state.currOperator === "") {
      if (~state.left.indexOf(".")) {
        showAlert("已是小数！", "#f0f");
        return;
      }
      setState({
        left: state.left + ".",
      });
    } else {
      if (~state.right.indexOf(".")) {
        showAlert("已是小数！", "#f0f");
        return;
      }
      setState({
        right: state.right + ".",
      });
    }
  };
  const cent2 = () => {
    if (state.currOperator === "") {
      if (state.left === "0") {
        showAlert("0不能为分母", "rgb(199, 124, 25)");
        return;
      }
      setState({
        left: 1 / parseFloat(state.left) + "",
      });
    } else {
      if (state.right === "0") {
        showAlert("0不能为分母", "rgb(199, 124, 25)");
        return;
      }
      setState({
        right: 1 / parseFloat(state.right) + "",
      });
    }
  };
  const clearOne = () => {
    if (state.currOperator === "") {
      if (state.left === "0") {
        return;
      }
      if (state.left.length === 1) {
        setState({ left: "0" });
      } else {
        setState({ left: state.left.slice(0, state.left.length - 1) });
      }
    } else {
      if (state.right === "0" || state.right === "") {
        return;
      }
      if (state.right.length === 1) {
        setState({ right: "0" });
      } else {
        setState({ right: state.right.slice(0, state.right.length - 1) });
      }
    }
  };
  const square = () => {
    if (state.currOperator === "") {
      setState({ left: parseFloat(state.left) * parseFloat(state.left) + "" });
    } else {
      setState({
        right: parseFloat(state.right) * parseFloat(state.right) + "",
      });
    }
  };

  const equal = () => {
    let res;
    switch (state.currOperator) {
      case "+":
        res = parseFloat(state.left) + parseFloat(state.right);
        break;
      case "-":
        res = parseFloat(state.left) - parseFloat(state.right);
        break;
      case "*":
        res = parseFloat(state.left) * parseFloat(state.right);
        break;
      case "/":
        if (state.right === "0") {
          showAlert("除数不能为零！", "rgb(250, 3, 5)");
          return;
        }
        res = parseInt(state.left) / parseInt(state.right);
        break;
      default:
        showAlert("未定义的运算符！", "#ab2632");
        return;
    }
    setState({
      currOperator: "",
      left: res + "",
      right: "0",
      isCalculated: true,
      stage: state.stage + state.right + "=",
    });
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
            stage={state.stage}
            result={state.currOperator === "" ? state.left : state.right}
            funcs={{
              add,
              sub,
              division,
              multi,
              percent,
              equal,
              nega,
              point,
              cent2,
              clearOne,
              square,
            }}
          />
        </div>
      </div>
    </>
  );
}
export default Calculator;
