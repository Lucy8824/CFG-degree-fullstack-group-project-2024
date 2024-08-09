import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage.js";
// import CustomButton from "./components/CustomButton.js";
import SignUp from "./components/SignUp.js";

const App = () => {
  return (
    <Router>
      <div id="Root">
        <div className="App">
          <div className="container">
            <Routes>
              <Route path="/" index element={<LoginPage />}></Route>
              <Route path="/SignUp" element={<SignUp />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
