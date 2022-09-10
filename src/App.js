import { Component } from 'react';
import './App.css';

const operat = ['+','-','/','x','0'];
class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '0',
      stag: '0',
      operator: '',
      isCalculated: false,
      isNegative: false
    }
    this.getNumber = this.getNumber.bind(this);
    this.getZero = this.getZero.bind(this);
    this.getDecimal = this.getDecimal.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.add = this.add.bind(this);
    this.calculator = this.calculator.bind(this);
    this.subtract = this.subtract.bind(this);
    this.divide = this.divide.bind(this);
    this.multiply = this.multiply.bind(this);
    
    this.show =this.show.bind(this);
  }
  getNumber(number) {
    let t;
    if(operat.includes(this.state.input) || this.state.isCalculated ) {
      t = number;
    } else {
      t = this.state.input + number;
    }
    if(this.state.isNegative) {
      t = '-' + t;
    }
    this.setState({
      input: t,
      isCalculated: false,
      isNegative: false
    })
  }
  getZero(){
    if(operat.includes(this.state.input) || this.state.isCalculated ) {
      this.setState({
        input: '0',
        isCalculated: false
      })
    } else {
      this.setState(state => ({
        input: state.input + '0',
        isCalculated: false
      }))
    }
  }
  getDecimal() {
    if(this.state.isCalculated) {
      this.setState({
        input: '0.',
        isCalculated: false
      })
    } else if(Number.isInteger(+this.state.input) && this.state.input.indexOf('.') === -1) {
      this.setState(state => ({
        input: state.input + '.'
      }))
    }
  }
  clearInput() {
    // 一切数据都恢复默认值！
    this.setState({
      input: '0',
      stag: '0',
      operator: '',
      isCalculated: false,
      isNegative: false
    })
  }
  add() {
    if(operat.includes(this.state.input)) {
      this.setState(state => ({
        input: '+',
        stag: state.stag.slice(0,-1) + '+',
        operator: '+',
        isNegative: false
      }))
      return;
    }
    if((this.state.stag.indexOf('+') > -1 || this.state.stag.indexOf('-') > -1 || this.state.stag.indexOf('/') > -1 || this.state.stag.indexOf('x') > -1) && this.state.stag.indexOf('=') === -1) {
      this.calculator();
      // this.show();
      this.setState(state => {
        return { 
          input: '+',
          stag: state.input + '+',
          operator: '+'
        }
      })
    } else {
      this.setState(state => {
        return { 
          input: '+',
          stag: state.input + '+',
          operator: '+'
        }
      })
    }
  }
  subtract() {
    if(operat.includes(this.state.input)) {
      this.setState(state => ({
        isNegative: !state.isNegative
      }))
      // console.log(this.state.isNegative)
      return;
    }
   if((this.state.stag.indexOf('+') > -1 || this.state.stag.indexOf('-') > -1 || this.state.stag.indexOf('/') > -1 || this.state.stag.indexOf('x') > -1) && this.state.stag.indexOf('=') === -1) {
      this.calculator();
    }
    this.setState(state => {
      return { 
        input: '-',
        stag: state.input + '-',
        operator: '-'
      }
    })
  }
  divide() {
    if(operat.includes(this.state.input)) {
      this.setState(state => ({
        input: '/',
        stag: state.stag.slice(0,-1) + '/',
        operator: '/',
        isNegative: false
      }))
      return;
    }
    if((this.state.stag.indexOf('+') > -1 || this.state.stag.indexOf('-') > -1 || this.state.stag.indexOf('/') > -1 || this.state.stag.indexOf('x') > -1) && this.state.stag.indexOf('=') === -1) {
      this.calculator();
    }
    this.setState(state => {
      return {
        input: '/',
        stag: state.input + '/',
        operator: '/'
      }
    })
  }
  multiply() {
    if(operat.includes(this.state.input)) {
      this.setState(state => ({
        input: 'x',
        stag: state.stag.slice(0,-1) + 'x',
        operator: '*',
        isNegative: false
      }))
      return;
    }
    if((this.state.stag.indexOf('+') > -1 || this.state.stag.indexOf('-') > -1 || this.state.stag.indexOf('/') > -1 || this.state.stag.indexOf('x') > -1) && this.state.stag.indexOf('=') === -1) {
      this.calculator();
    }
    this.setState(state => {
      return {
        input: 'x',
        stag: state.input + 'x',
        operator: '*'
      }
    })
  }
  calculator() {
    let num1,num2;
    if(Number.isInteger(this.state.input) && this.state.stag.indexOf('.') === -1 ) {
      num2 = parseInt(this.state.input);
      num1 = parseInt(this.state.stag);
    } else {
      num2 = parseFloat(this.state.input);
      num1 = parseFloat(this.state.stag);
    }
    
    switch(this.state.operator) {
      case '+': this.setState(state => {
        return {
          input: num1 + num2,
          stag: state.stag + state.input + '=' + (num1 + num2),
          isCalculated: true
        }
      });
        break;
      case '-': this.setState(state => {
        return {
          input: num1 - num2,
          stag: state.stag + state.input + '=' + (num1 - num2),
          isCalculated: true
        }
      });
        break;
      case '/': this.setState(state => {
        const ans = num1 / num2;
        return {
          input: ans,
          stag: state.stag + state.input + '=' + ans,
          isCalculated: true
        }
      });
        break;
      case '*': this.setState(state => {
        const ans = num1 * num2;
        return {
          input: ans,
          stag: state.stag + state.input + '=' + ans,
          isCalculated: true
        }
      });
        break;
      default: break;
    }
  }
  show() {
    console.log(this.state.input)
    console.log(this.state.stag)
    console.log(this.state.operator)
    console.log(this.state.isCalculated)
  }
  render() {
    return (
      <div className="app">
        <div className="stag-area show">{ this.state.stag }</div>
        <div className="input-area show" id="display">{ this.state.input }</div>
        <div className="btn-box">
          <button id="clear" onClick={ this.clearInput }>AC</button>
          <button id="divide" onClick={ this.divide }>/</button>
          <button id="multiply" onClick={ this.multiply }>x</button>
          
          <button id="seven" onClick={ ()=> this.getNumber('7') }>7</button>
          <button id="eight" onClick={ ()=> this.getNumber('8') }>8</button>
          <button id="nine" onClick={ ()=> this.getNumber('9') }>9</button>
          <button id="subtract" onClick= { this.subtract }>-</button>
          
          <button id="four" onClick={ ()=> this.getNumber('4') }>4</button>
          <button id="five" onClick={ ()=> this.getNumber('5') }>5</button>
          <button id="six" onClick={ ()=> this.getNumber('6') }>6</button>
          <button id="add" onClick= { this.add }>+</button>
          
          <button id="one" onClick={ ()=> this.getNumber('1') }>1</button>
          <button id="two" onClick={ ()=> this.getNumber('2') }>2</button>
          <button id="three" onClick={ ()=> this.getNumber('3') }>3</button>
          <button id="equals" onClick= { this.calculator }>=</button>
          
          <button id="zero" onClick={ this.getZero }>0</button>
          <button id="decimal" onClick={ this.getDecimal }>.</button>
        </div>
      </div>
    )
  }
}
export default Calculator;