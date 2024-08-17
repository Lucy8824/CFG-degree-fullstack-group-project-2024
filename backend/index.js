
require(`dotenv`).config();
console.log(process.env);

const express = require(`express`);
const cors = require(`cors`);
const pool = require(`./pool`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);
const bodyParser = require('body-parser');

const port = process.env.PORT || 3006;

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); //to parse incoming JSON data

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

// these are requests to login using authentication
// request to generate JWT with post
app.post(`/user/generateToken`, (req, res) => {
  // this validates user
  const { username, password } = req.body;
  if (username === "validUser" && password === "validPassword") {
    // this generate JWT token if validation succeded
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
      time: Date(),
      userID: username, // stored user identifier in jwt payload
    };

    //sign jwt with secret key
    const token = jwt.sign(data, jwtSecretKey, { expiresIn: "1h" });

    //send token in response
    res.send(token);
  } else {
    res.status(401).send("Invalid credentials");
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
    console.log(`listening on port ${port}`)
})


// get request attempt
app.get('/User_sign_up', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM User_sign_up')
        res.json(result)
    } catch (err) {
        res.status(500).json({message: 'Problem'})
    }
});



// post request attempt
app.post('/User_sign_up', async (req, res) => {
    const {full_name, email_address, password} = req.body;

    if (!full_name || !email_address || !password) {
        return res.status(400).json({error: 'Invalid Request'});
    }
    if (!email_address.includes('@')) {
        return res.status(400).json({message: 'Incorrect email address'});
    }
try {
    const [results] = await pool.query(
        'INSERT INTO User_sign_up (full_name, email_address, password) VALUES (?, ?, ?)', 
        [full_name, email_address, password]);
    console.log('New user sign up data:', results);
    res.status(200).json({message: 'New user created'});
}   catch (err) {
    console.error('Data insertion failed', err);
    res.status(500).json({error: 'Data insertion failed'});
}

});

///get user information for the profile page (working)

app.get('/getProfile/:id', async (req, res) => {
  const userId = req.params.id;
  console.log("Querying profile for user ID:", userId);  // Log user ID for debugging

  const getProfileQuery = `
  SELECT 
    first_name, age, location, about_me, profile_picture_url, favourite_artists, attended_festivals, plan_to_visit
  FROM user_profile
  WHERE user_id = ?`;

  console.log("Executing query:", getProfileQuery, "with values:", [userId]);  // Log the query

  try {
    const [rows] = await pool.execute(getProfileQuery, [userId]);
    
    console.log("Query Result:", rows);

    if (rows.length === 0) {
      console.log("User not found for user ID:", userId);
      return res.status(404).send("User not found");
    }

    const profile = rows[0];

    // Convert the comma-separated strings into arrays
    if (profile.favourite_artists && typeof profile.favourite_artists === 'string') {
      profile.favourite_artists = profile.favourite_artists.split(',').map(artist => artist.trim());
    }
    
    if (profile.plan_to_visit && typeof profile.plan_to_visit === 'string') {
      profile.plan_to_visit = profile.plan_to_visit.split(',').map(festival => festival.trim());
    }
    
    if (profile.attended_festivals && typeof profile.attended_festivals === 'string') {
      profile.attended_festivals = profile.attended_festivals.split(',').map(festival => festival.trim());
    }

    console.log("Profile data:", profile);
    res.status(200).json(profile);

  } catch (error) {
    console.error("Error retrieving profile:", error);
    res.status(500).send("Error retrieving profile");
  }
});


