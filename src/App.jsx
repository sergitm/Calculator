import { useState } from 'react'
import './App.css'

function App() {
  const [answer, setAnswer] = useState("0")
  const [expression, setExpression] = useState("")

  const et = expression.trim();

  const calculate = () => {
    if (isOperator(et.charAt(et.length - 1))) return;
    const parts = et.split(" ");
    const newParts = [];

    for (let i = parts.length -1; i >= 0; i--) {
      if (["/", "*", "+"].includes(parts[i]) && isOperator(parts[i])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i -1;
        while (isOperator(parts[k])) {
          j++;
          k--;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression).toString());
    } else {
      setAnswer(eval(newExpression).toString());
    }
    setExpression("");
  }

  const isOperator = (button) => {
    return /[*/+-]/.test(button);
  }

  const buttonPress = (button) => {
    if (isOperator(button)) {
      if (isOperator(et.charAt(et.length - 1)) && button !== '-') {
        setExpression(et.substring(0, et.length - 2) + " " + button + " ");
        return;
      };
      setExpression(et + " " + button + " ");
    }
    else {
      switch (button) {
        case "clear":
          setAnswer("");
          setExpression("0");
          break;
        case "negative":
          setAnswer((parseFloat(answer) * -1).toString());
          break;
        case "percentage":
          setAnswer((parseFloat(answer) / 100).toString());
          break;
        case "=":
          calculate();
          break;
        case "0":
          if (expression.charAt(0) === "0") return;
          setExpression(expression + button);
          break;
        case ".":
          const lastNumber = expression.split(/[-+/*]/g).pop();
          if (!lastNumber) return;
          if (lastNumber?.includes(".")) return;
          setExpression(expression + button);
          break;
        default:
          if (expression.charAt(0) === "0") {
            setExpression(expression.slice(1) + button);
          } else {
            setExpression(expression + button);
          }
          break;
      }
    }
  }

  return (
    <>
      <div className="container">
        <h1>Calculator</h1>
        <div id="calculator">
          <div id="display" style={{ textAlign: 'right' }}>
            <div id="answer">{answer}</div>
            <div id='expression'>{expression}</div>
          </div>
          <div id="buttons"></div>
          <button id='clear' onClick={() => buttonPress("clear")} className="light-gray">C</button>
          <button id='negative' onClick={() => buttonPress("negative")} className="light-gray">+/-</button>
          <button id='percentage' onClick={() => buttonPress("percentage")} className="light-gray">%</button>
          <button id='divide' onClick={() => buttonPress("/")} className="yellow">/</button>
          <button id='seven' onClick={() => buttonPress("7")} className="dark-gray">7</button>
          <button id='eight' onClick={() => buttonPress("8")} className="dark-gray">8</button>
          <button id='nine' onClick={() => buttonPress("9")} className="dark-gray">9</button>
          <button id='multiply' onClick={() => buttonPress("*")} className="yellow">X</button>
          <button id='four' onClick={() => buttonPress("4")} className="dark-gray">4</button>
          <button id='five' onClick={() => buttonPress("5")} className="dark-gray">5</button>
          <button id='six' onClick={() => buttonPress("6")} className="dark-gray">6</button>
          <button id='subtract' onClick={() => buttonPress("-")} className="yellow">-</button>
          <button id='one' onClick={() => buttonPress("1")} className="dark-gray">1</button>
          <button id='two' onClick={() => buttonPress("2")} className="dark-gray">2</button>
          <button id='three' onClick={() => buttonPress("3")} className="dark-gray">3</button>
          <button id='add' onClick={() => buttonPress("+")} className="yellow">+</button>
          <button id='zero' onClick={() => buttonPress("0")} className="dark-gray">0</button>
          <button id='decimal' onClick={() => buttonPress(".")} className="dark-gray">.</button>
          <button id='equals' onClick={() => buttonPress("=")} className="yellow">=</button>
        </div>
      </div>
    </>
  )
}

export default App
