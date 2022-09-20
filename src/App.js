import { useState, useEffect, useRef } from 'react';
import './App.css';


function CalculatorButton({ val, func, className }) {
  const calBtn = useRef();
  useEffect(() => {
    let circle;
    calBtn.current.onmousedown = (e) => { 
      circle = document.createElement("span");
      circle.classList.add("cal-box-circle");
      circle.style.left = e.clientX - calBtn.current.offsetLeft + 'px';
      circle.style.top = e.clientY - calBtn.current.offsetTop + 'px';
      circle.style.transform = "translate(-50%, -50%)";
      // circle.style.animation = "";
      calBtn.current.appendChild(circle);
    }
    calBtn.current.onmouseup = () => {
      calBtn.current.removeChild(circle);
    }
  })
  return <button type='button' className={ 'ccl-btn ' + className} onClick={ func } ref={calBtn}>{val}</button>
}

function CalculatorInner({ stage, result, input_num, clear, input_zero, add, sub, multi, division, equal }) {

  return (
    <div className='calculator-grid-box'>
      <div className='stage'>{ stage }</div>
      <div className='show'>
        <span>{ result }</span>
      </div>

      <CalculatorButton func={ clear } val="AC" className='ac' />
      <CalculatorButton val="+/-" className='nega' />
      <CalculatorButton val="%" className='mod' />
      <CalculatorButton val="÷" className='division' func={division}/>

      <CalculatorButton func={ () => input_num(7) } val="7"/>
      <CalculatorButton func={ () => input_num(8) } val="8"/>
      <CalculatorButton func={ () => input_num(9) } val="9"/>
      <CalculatorButton className="multi" val="x" func={multi}/>

      <CalculatorButton func={ () => input_num(4) } val="4"/>
      <CalculatorButton func={ () => input_num(5) } val="5"/>
      <CalculatorButton func={ () => input_num(6) } val="6"/>
      <CalculatorButton className="sub" val="-" func={sub}/>

      <CalculatorButton func={ () => input_num(1) } val="1"/>
      <CalculatorButton func={ () => input_num(2) } val="2"/>
      <CalculatorButton func={ () => input_num(3) } val="3"/>
      <CalculatorButton className="add" val="+" func={ add }/>

      <CalculatorButton className="zero" val="0" func={ input_zero }/>
      <CalculatorButton val="."/>
      <CalculatorButton val="=" className="equal" func={ equal } />

    </div>
  )
}

function Calculator() {
  // status state
  const [currOperator, setOperator] = useState("");
  const [isCalculated, setIC] = useState(false);
  const [left, setLeft] = useState("0");
  const [right, setRight] = useState("0");

  const [stage, setStage] = useState("");
  // style state

  const input_num = (num) => {
    if(typeof num !== 'number') {
      console.warn("请给数字！(来自 input_num 函数)")
      return;
    }
    if(isCalculated) {
      setLeft(num+'');
      setRight('');
      setOperator("");
      setIC(false);
    } else {
      if(currOperator === "") {
        if(left === "0") {
          setLeft(num+'')
        } else {
          setLeft(left + '' + num);
        }
      } else {
        if(right === "0") {
          setRight(num+'')
        } else {
          setRight(right+ '' + num);
        }
      }
    }
  }
  const input_zero = () => {
  }
  const clear = () => {
    setOperator("");
    setIC(false);
    setLeft("0");
    setRight("");
    setStage("");
  }
  // FIXME
  const normalOperation = text => {
    setOperator(text);
    setStage(left + text);
    setRight("0");
  }
  const add = () => normalOperation("+");
  const sub = () => normalOperation("-");
  const multi = () => normalOperation("*");
  const division = () => normalOperation("/");

  // TODO
  const equal = () => {
    let res;
    switch(currOperator) {
      case "+": 
        res = parseInt(left) + parseInt(right);
        break;
      case "-":
        res = parseInt(left) - parseInt(right);
        break;
      case "*":
        res = parseInt(left) * parseInt(right);
        break;
      case "/":
        res = parseInt(left) / parseInt(right);
        break;
      default: console.warn("未定义的运算符");
    }
    setOperator("");
    setStage(stage + right);
    setLeft(res);
    setRight("0");
    setIC(true);
    console.log("===");
  }

  return(
    <>
      <div className='calculator-container' id="calculator-container">
        <div className='calculator-inner-box'>
          <CalculatorInner 
            clear={clear} 
            input_num={ input_num } 
            stage={stage} 
            result={currOperator === "" ? left : right}
            input_zero={input_zero} 
            add={add}
            sub={sub}
            division={division}
            multi={multi}
            equal={equal} />
        </div>
      </div>
    </>
  )
}
export default Calculator;