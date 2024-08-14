require(`dotenv`).config();
console.log(process.env);

const express = require(`express`);
const cors = require(`cors`);
const pool = require(`./pool.js`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);

const port = process.env.PORT || 3003;

const app = express();
app.use(express.json());
app.use(cors());

app.get(`/`, (req, res) => {
  res.json({
    message: `hello there you`,
  });
});

// endpoint to register new users
app.post(`/register`, async (req, res) => {
  const { email, password } = req.body;
  try {
    // checks if email already exists
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }
    // hash password before saving with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert new user into sql query
    const insertUserQuery = "INSERT INTO USERS (email, password) VALUES (?, ?)";
    await pool.query(insertUserQuery, [email, hashedPassword]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// //request to generate JWT with post
// app.post(`/user/generateToken`, (req, res) => {
//   // this validates user
//   const { username, password } = req.body;
//   if (username === "validUser" && password === "validPassword") {
//     // this generate JWT token if validation succeded
//     let jwtSecretKey = process.env.JWT_SECRET_KEY;
//     let data = {
//       time: Date(),
//       userID: username, // stored user identifier in jwt payload
//     };

//     //sign jwt with secret key
//     const token = jwt.sign(data, jwtSecretKey, { expiresIn: "1h" });

//     //send token in response
//     res.send(token);
//   } else {
//     res.status(401).send("Invalid credentials");
//   }
// });

// // now verify JWT with get request

// app.get("/user/validateToken", (req, res) => {
//   //tokens are passed in header of request for security
//   let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
//   let jwtSecretKey = process.env.JWT_SECRET_KEY;
//   try {
//     const token = req.header(tokenHeaderKey)?.split(" ")[1];
//     const verified = jwt.verify(token, jwtSecretKey);
//     if (verified) {
//       return res.send("Successfully verified");
//     } else {
//       return res.status(401).send("Verification failed");
//     }
//   } catch (error) {
//     return res.status(401).send("Invalid token");
//   }
// });

app.listen(port, () => {
  console.log(`listening on port ${port}.`);
});
