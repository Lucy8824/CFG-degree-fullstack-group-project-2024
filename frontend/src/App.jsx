import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; 
import LoginPage from "./components/LoginPage.jsx";
import CustomButton from "./components/CustomButton.jsx"; 


const App = () => {
  return (
    <Router>
<div id="Root">
    <div className="App">
      <LoginPage />
    <CustomButton forgotPassword="forgotPassword" buttonText="Forgotten your password?" />
   <CustomButton signUp="Sign up" buttonText="Don't have an account? Sign up"/>
    </div>
</div> 
</Router> 
);
}

export default App;
