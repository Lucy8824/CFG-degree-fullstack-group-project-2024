import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage.js";
import SignUp from "./components/SignUp.js";
import Profile from "./components/ProfilePage/Profile.js";
import ForgotPassword from "./components/ForgotPassword.js";
import Festivals from "./Pages/Festivals";
import PrivateRoutes from "./components/LoginPage/PrivateRoutes.js";
import AuthProvider from "./components/AuthProvider.js";
import FeedsPage from "./components/FeedsPage/FeedsPage.js";
// import CustomButton from "./components/CustomButton.js";
import FestivalDetailsPage from './Pages/FestivalDetailsPage';
import FestivalButton from "./component/FestivalButton";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div id="Root">
          <div className="App">
            <div className="container">
                <Routes>
                  <Route path="/" element={<LoginPage />}></Route>
                  <Route path="/SignUp" element={<SignUp />}></Route>
                  <Route
                    path="/ForgotPassword"
                    element={<ForgotPassword />}
                  ></Route>
                  {/* Protected Routes */}
                  <Route element={<PrivateRoutes />}>
                    {/* <Route path="/Profile" element={<Profile />}></Route> */} {/* Uncomment if we need this one */}
                    <Route path="/Profile" element={<Profile userId={2}/>}></Route>
                    <Route path="/festivals" element={<Festivals />} />
                    <Route path="/festival/:id" element={<FestivalDetailsPage />} />
                  </Route>
                </Routes>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
