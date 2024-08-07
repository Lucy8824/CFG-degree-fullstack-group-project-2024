
import React, { useState } from "react"; 
import "./LoginPage.css";
import CustomButton from "./CustomButton.jsx";

const LoginPage = () => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = (event) => {
    event.preventDefault();
    // authentication here
    console.log("Email:", email);
    console.log("Password:", password);
};
return (
<div className="container">
<h1 className="title">Welcome to your Festival Meetup</h1>
<form onSubmit={handleSubmit}>
    
<div>
<input 
type="email"
id="email"
value={email}
onChange={(event) => setEmail(event.target.value)} 
required placeholder="Email" 
/>
</div>

<div> 
    <input 
    type="password"
    id="password"
    value={password}
    onChange={(event) => setPassword(event.target.value)} 
    required placeholder="Password"
    />
    </div>
    </form>
    <CustomButton type="submit" buttonText="Login"/>
    
</div>
)};
export default LoginPage;
