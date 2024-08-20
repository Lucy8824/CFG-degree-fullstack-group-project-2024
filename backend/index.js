require(`dotenv`).config();
console.log(process.env);

const express = require(`express`);
const cors = require(`cors`);
const pool = require(`./pool.js`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);

const port = process.env.PORT || 3006;

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

//request to generate JWT with post
app.post(`/user/generateToken`, async (req, res) => {
  // this validates user
  const { email, password } = req.body;
  try {
    //query to db to find the user by email
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length > 0) {
      const user = rows[0];

      // compare password with stored hashed one in db
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        // if it's valid generate a token
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        const data = {
          time: Date(),
          userID: user.id,
        };

        // Sign the JWT token with the secret key
        const token = jwt.sign(data, jwtSecretKey, { expiresIn: "1h" });

        // Send the token as a response
        res.status(200).json({ token });
      } else {
        // If the password is incorrect
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      // If the email does not exist
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// now verify JWT with get request
app.get("/user/validateToken", (req, res) => {
  //tokens are passed in header of request for security
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  try {
    const token = req.header(tokenHeaderKey)?.split(" ")[1];
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return res.send("Successfully verified");
    } else {
      return res.status(401).send("Verification failed");
    }
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// get request attempt
app.get("/User_sign_up", async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM User_sign_up");
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Problem" });
  }
});

// post request attempt
app.post("/User_sign_up", async (req, res) => {
  const { full_name, email_address, password } = req.body;

  if (!full_name || !email_address || !password) {
    return res.status(400).json({ error: "Invalid Request" });
  }
  if (!email_address.includes("@")) {
    return res.status(400).json({ message: "Incorrect email address" });
  }
  try {
    const [results] = await pool.query(
      "INSERT INTO User_sign_up (full_name, email_address, password) VALUES (?, ?, ?)",
      [full_name, email_address, password]
    );
    console.log("New user sign up data:", results);
    res.status(200).json({ message: "New user created" });
  } catch (err) {
    console.error("Data insertion failed", err);
    res.status(500).json({ error: "Data insertion failed" });
  }
});
