
import React, { useState } from "react"; 

const LoginPage = () => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    // perform authentication here
    console.log("Email:", email);
    console.log("Password:", password);
};
return (
<div>
<form onSubmit={handleSubmit}>
    <h1>Welcome to your Festival Meetup</h1>
<div>
<input 
type="email"
id="email"
value={email}
onChange={(e) => setEmail(e.target.value)} 
placeholder="Email" required
/>
</div>

<div> 
    <input 
    type="password"
    id="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)} 
    placeholder="Password" required
    />
    </div>
    <button type="submit">Login</button>
    </form>
</div>
)};
export default LoginPage;
