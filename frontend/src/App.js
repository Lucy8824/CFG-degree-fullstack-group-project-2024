import './App.css';
import { useState } from "react";


const App = () => {
  const [ message, setMessage ] = useState();

  const handleButtonClick = async () => {
    const response = await fetch(`http://localhost:3003`);

    const json = await response.json();
    const newMessage = json.message;
    
    setMessage(newMessage);
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
