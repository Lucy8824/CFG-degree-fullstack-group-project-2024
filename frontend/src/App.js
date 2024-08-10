import './App.css';
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Festivals from "./Pages/Festivals";


const App = () => {
  const [ message, setMessage ] = useState();

  const handleButtonClick = async () => {
    const response = await fetch(`http://localhost:3003`);

    const json = await response.json();
    const newMessage = json.message;
    
    setMessage(newMessage);
  }

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/festivals">Search Festival</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>
                  Hello World
                </h1>
                {message && <p>{message}</p>}
                <button onClick={handleButtonClick}> 
                   Click me
                </button>
              </div>
            }
              />
              <Route path="/festivals" element={<Festivals />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
