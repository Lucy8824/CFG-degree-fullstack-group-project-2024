import './App.css';
import { useState } from "react";


const App = () => {
  const [ message, setMessage ] = useState();

  const handleButtonClick = () => {
    setMessage(`Hello there`)
  }

  return (
    <div className="App">
      <h1>
        Hello World
      </h1>
      {message && <p>{message}</p>}
   <button onClick={handleButtonClick}> 
    Click me
   </button>
    </div>
  );
}

export default App;
