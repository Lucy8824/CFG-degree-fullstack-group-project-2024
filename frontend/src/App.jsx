import './App.css';
import LoginPage from "./components/LoginPage.jsx";
import CustomButton from "./components/CustomButton.jsx"; 


const App = () => {
  return (
<div id="Root">
    <div className="App">
      <LoginPage />
    <CustomButton forgotPassword="forgotPassword" buttonText="Forgotten your password?" />
   <CustomButton signUp="Sign up" buttonText="Don't have an account? Sign up"/>
    </div>
</div>  
);
}

export default App;
