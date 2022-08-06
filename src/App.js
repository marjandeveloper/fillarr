import './App.css'
import { useState } from 'react'

// Sve je dobro još da uradim equals

function App() {
  const [display, setDisplay] = useState('')
  const [copyDisplay, setCopyDisplay] = useState('')
  const [arrayOfDisplay, setArrayOfDisplay] = useState([])

  // Handle this to separate string and add new element to the arrayOfDisplay
  const addToArrayOfDisplay = (number, operator) => {
    const operators = ['+', '-', '*', '/']
    if (number === '') {
      setCopyDisplay('')
      return
    } else if (operators.includes(arrayOfDisplay[arrayOfDisplay.length - 1])) {
      arrayOfDisplay[arrayOfDisplay.length - 1] = operator
      setCopyDisplay('')
      console.log(arrayOfDisplay)
    } else {
      setArrayOfDisplay((current) => [...current, number, operator])
      setCopyDisplay('')
    }
    // console.log(copyDisplay)
  }
  // Handle this if click on an operator button
  const handleOperator = (operator) => {
    if (display === '') {
      return
    } else {
      const newOperator = operator.target.textContent
      const displayValue = operator.target.dataset.display

      setDisplay(displayValue + newOperator)
      // console.log(copyDisplay, '|', newOperator)
      addToArrayOfDisplay(copyDisplay, newOperator)
      setCopyDisplay(copyDisplay + newOperator)
    }
  }
  // Handle this to check decimal number
  const handleDecimal = (decimal) => {
    // console.log(copyDisplay)
    if (display === '') {
      return
    } else if (!copyDisplay.includes(decimal)) {
      setDisplay(display + decimal)
      setCopyDisplay(copyDisplay + decimal)
    }
  }
  // Handle this if click on a number button
  const handleNumber = (number) => {
    const newNumber = number.target.textContent
    const displayValue = number.target.dataset.display
    setCopyDisplay('')
    if (newNumber === '.') {
      handleDecimal(newNumber)
      return
    }
    if (displayValue === '' && newNumber === '0') {
      return
    } else {
      console.log(displayValue, newNumber)
      setDisplay(displayValue + newNumber)
      setCopyDisplay(copyDisplay + newNumber)
    }

    // console.log(copyDisplay)
  }

  // Update states
  const updateStates = () => {
    setDisplay(arrayOfDisplay[0])
    setCopyDisplay(arrayOfDisplay[0])
    setArrayOfDisplay([])
  }

  const getLastNumber = (lastNumber) => {
    // console.log(lastNumber)
    setArrayOfDisplay((cur) => [...cur, lastNumber])
  }
  // Handle this if click on the equal button
  const handleEquals = () => {
    const operators = ['+', '-', '*', '/']

    const firstCharacter = copyDisplay.charAt(0)
    let lastNumber = ''

    if (operators.includes(firstCharacter)) {
      copyDisplay.substring(1)
    }
    if (display !== '') {
      if (!operators.includes(copyDisplay) && arrayOfDisplay.length <= 2) {
        // setArrayOfDisplay((current) => [...current, copyDisplay])
        // console.log(copyDisplay)
        getLastNumber(lastNumber)
      } else if (
        operators.includes(arrayOfDisplay[arrayOfDisplay.length - 1]) &&
        arrayOfDisplay.length === 2
      ) {
        // console.log('Ima 2')
        arrayOfDisplay.pop()
        updateStates()
      } else {
        return
      }
    }
  }
  // console.log(copyDisplay)
  return (
    <div className='App'>
      <textarea
        readOnly
        name='proba'
        id=''
        cols='30'
        rows='10'
        value={display || '0'}
      ></textarea>
      <br />
      <button data-display={display} onClick={handleNumber}>
        0
      </button>
      <button data-display={display} onClick={handleNumber}>
        1
      </button>
      <button data-display={display} onClick={handleNumber}>
        2
      </button>
      <button data-display={display} onClick={handleNumber}>
        3
      </button>
      <button data-display={display} onClick={handleOperator}>
        +
      </button>
      <button data-display={display} onClick={handleOperator}>
        -
      </button>
      <button data-display={display} onClick={handleEquals}>
        =
      </button>
      <button onClick={handleNumber}>.</button>
      <div>{arrayOfDisplay}</div>
    </div>
  )
}

export default App
