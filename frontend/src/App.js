import './App.css';
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Festivals from "./Pages/Festivals";
import FestivalButton from "./component/FestivalButton";


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

        <main>
          <Routes>
            {/* Home page route */}
            <Route
              path="/"
              element={
                <div>
                  <header>
                    <h1>Welcome to the Festival Finder</h1>
                  </header>
                  <h1>
                    Home Page
                  </h1>
                  {message && <p>{message}</p>}
                  {/* <button onClick={handleButtonClick}> 
                    Search Festivals
                  </button> */}
                  <FestivalButton />
                </div>
              }
            />
            {/* Festivals page Route */}
            <Route path="/festivals" element={<Festivals />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
