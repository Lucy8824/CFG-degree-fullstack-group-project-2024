import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./components/LoginPage.js";
// import CustomButton from "./components/CustomButton.js";
import SignUp from "./components/SignUp.js";
import Profile from "./components/ProfilePage/Profile.js";
import ForgotPassword from "./components/ForgotPassword.js";
import FeedsPage from "./components/FeedsPage/FeedsPage.js";

const App = () => {
  return (
    <Router>
      <div id="Root">
        <div className="App">
          <div className="container">
            {
              <Routes>
                <Route path="/" index element={<LoginPage />}></Route>
                <Route path="/SignUp" element={<SignUp />}></Route>
                <Route path="/Profile" element={<Profile userId={2}/>}></Route>
                <Route
                  path="/ForgotPassword"
                  element={<ForgotPassword />}
                ></Route>
              </Routes>
            }
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
