import React, { useState } from 'react';
import './App.css';

const convertStringToIntArray = (inputString:String):number[] => {
  // it assumes that the input is in a correct format
  if(inputString.length === 0) {
    return [];
  }
  let arr = inputString.split(',');
  return arr.map( item => parseInt(item,10));
}

const verifyChange = (arr:number[]):boolean => {
  // If array is empty, it assumes that no change is needed
  if(arr.length === 0)  {
    return true;
  // If array is not empty, there is at least one item. 
  // If the first item is not 25 there won't be enough change.
  } else if(arr[0] !== 25) {
    return false;
  } else {
    let billHash = {25:0, 50:0, 100:0};
    for(let i=0; i < arr.length; i++) {
      // get current bill
      let currentBill = arr[i];
      // increment bill hash
      if(currentBill === 25) {
        billHash[25]++;
      } else if(currentBill === 50) {
        billHash[50]++;
      } else {
        billHash[100]++;
      }
      // subtract the cost of the ticket (25)
      let change = currentBill - 25;
      if(change === 0) {
        continue;
      } else if(change === 75) {
        // do I have at least one ticket of 50 and one ticket of 25?
        if(billHash[50] >= 1 && billHash[25] >= 1) {
          billHash[50]--;
          billHash[25]--;
        // do I have at least three tickets of 25?
        } else if(billHash[25] >= 3) {
          billHash[25] = billHash[25] - 3;
        } else {
          return false;
        }
      } else if(change === 50) {
        // do I have at least one ticket of 50?
        if(billHash[50] >= 1) {
          billHash[50]--;
          billHash[25]--;
        // do I have at least three tickets of 25?
        } else if(billHash[25] >= 3) {
          billHash[25] = billHash[25] - 3;
        } else {
          return false;
        }
      } else if(change === 25) {
        // do I have at least one ticket of 25?
        if(billHash[25] >= 1) {
          billHash[25]--;
        } else {
          return false;
        }
      }
    }
    return true;
  }
}

const isChangeAvailable = (changeAvailable:boolean):String => {
  if(changeAvailable) {
    return "Yes";
  } else {
    return "No";
  }
}

function App() {
  const [result,setResult] = useState<String>("");
  const [inputText,setInputText] = useState("");

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    let text = event.target.value;
    let filteredText = text.replace(/[^0125,]/gi,"");
    setInputText(filteredText);
  }

  const handleClick = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let arr = convertStringToIntArray(inputText);
    console.log(arr);
    let changeAvailable = verifyChange(arr);
    console.log(changeAvailable);
    let changeResult = isChangeAvailable(changeAvailable);
    setResult(changeResult);
  }

  return (
    <div className="App">
      <h1>Algorithm Challenge</h1>
      <p>Fill in the input with numbers separated by commas and then click on "Check Change". Each number represents the bill received. I.E. "25,25,50" means that the employee received first a bill of 25 dollars, then another 25 dollars and finally 50 dollars in that order.</p>
      <input type="text" className="App__input" onChange={(event) => handleChange(event)} value={inputText}/>
      <button className="App__button" onClick={(event) => handleClick(event)}>Check Change</button>
      <p>Is change available?</p>
      <p>{result}</p>
    </div>
  );
}

export default App;
