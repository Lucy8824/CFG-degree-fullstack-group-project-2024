import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage.js";

// import CustomButton from "./components/CustomButton.js";
// import SignUp from "./components/SignUp.js";
import Profile from "./components/ProfilePage/Profile.js";
import ForgotPassword from "./components/ForgotPassword.js";

import FeedsPage from "./components/FeedsPage/FeedsPage.js";
import PrivateRoutes from "./components/LoginPage/PrivateRoutes.js";
import AuthProvider from "./components/AuthProvider.js";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div id="Root">
          <div className="App">
            <div className="container">
              {
                <Routes>
                  <Route path="/" element={<LoginPage />}></Route>
                  <Route path="/SignUp" element={<SignUp />}></Route>
                  <Route
                    path="/ForgotPassword"
                    element={<ForgotPassword />}
                  ></Route>

                  <Route element={<PrivateRoutes />}>
                    <Route path="/Profile" element={<Profile />}></Route>
                  </Route>
                </Routes>
              }
            </div>

import Festivals from "./Pages/Festivals";
import FestivalButton from "./component/FestivalButton";

import FeedsPage from "./components/FeedsPage.js";


const App = () => {
  return (
    <Router>
      <div id="Root">
        <div className="App">
          <div className="container">
             {/* <FeedsPage userid={2}/> */}
            {
              <Routes>
                <Route path="/" index element={<LoginPage />}></Route>

                <Route path="/SignUp" element={<SignUp />}></Route>
                <Route path="/Profile" element={<Profile userId={2}/>}></Route>

                <Route
                  path="/ForgotPassword"
                  element={<ForgotPassword />}
                ></Route>
                <Route path="/festivals" element={<Festivals />} />
              </Routes>
            }

          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
