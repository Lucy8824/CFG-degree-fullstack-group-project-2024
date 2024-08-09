import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import LoginPage from "./components/LoginPage.jsx";
// import CustomButton from "./components/CustomButton.jsx"; 
import SignUp from "./components/SignUp.jsx";


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
}

export default App;
