require(`dotenv`).config();
console.log(process.env);

const express = require(`express`);
const cors = require(`cors`);
const pool = require(`./pool`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);
const axios = require('axios');
const bodyParser = require('body-parser');


const port = process.env.PORT || 3003;

const app = express();
module.exports = app; // Export the app for testing

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



// Ticketmaster api routes for fetching festivals

app.get('/api/festivals', async (req, res) => {
  const API_KEY = process.env.TICKETMASTER_API_KEY;
  const page = req.query.page || 0; //Default to page 0 if not provided

  try {
    const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json`, {
      params: {
        classificationName: 'Festival',
        size: 200,
        page: page,
        apikey: API_KEY
      }
    });

    //send API response data to the frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching festivals:", error);
    res.status(500).json({message: "Error fetching festivals"});
  }
});


// get request for feeds page
app.get('/Feeds', async (req, res) => {
  const query = `
    SELECT 
      Feeds.post_id,
      Feeds.post_message,
      Feeds.created_at,
      User_profile.first_name,
      User_profile.profile_picture_url,
      User_profile.location
    FROM 
      Feeds
    INNER JOIN 
      User_profile 
    ON 
      Feeds.user_id = User_profile.user_id
  `;

  try {
    // Await the execution of the query and store the results
    const [results] = await pool.query(query);

    // Send the results as a JSON response
    res.json(results);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});



//post comments endpoint 
app.post('/Comments', async (req, res) => {
  const { post_id, user_id, comment } = req.body;

  try {
    // Insert comment into database
    const [result] = await pool.query(`
        INSERT INTO Comments (post_id, user_id, comment)
        VALUES (?, ?, ?)
    `, [post_id, user_id, comment]);

    // Respond with the new comment ID
    res.status(201).json({ comment_id: result.insertId, post_id, user_id, comment });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});


app.post('/newpost', async (req, res) => {
  const { user_id, post_message } = req.body;

  if (!user_id || !post_message) {
      return res.status(400).json({ error: 'user_id and post_message are required' });
  }

  try {
      
      const [result] = await pool.query(
          'INSERT INTO Feeds (user_id, post_message) VALUES (?, ?)',
          [user_id, post_message]
      );

      const post_id = result.insertId;

      const [rows] = await pool.query(`
          SELECT 
              f.post_id,
              f.post_message,
              f.created_at,
              u.user_id,
              u.first_name,
              u.profile_picture_url
          FROM Feeds f
          JOIN User_profile u ON f.user_id = u.user_id
          WHERE f.post_id = ?
      `, [post_id]);

      const newPost = rows[0];

      res.status(201).json(newPost);
  } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Failed to create post' });
  }
});



// Get comments for a specific post
app.get('/posts/:id/comments', async (req, res) => {
  const postId = req.params.id;

  try {
    const [rows] = await pool.query(`
      SELECT c.comment_id, c.comment, c.created_at, u.first_name AS user_name
      FROM Comments c
      JOIN User_profile u ON c.user_id = u.user_id
      WHERE c.post_id = ?
    `, [postId]);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});


// // post request for feeds page
// app.post('/Feeds', async (req, res) => {
//     const {first_name, profile_picture_url, post_message} = req.body;
// if (!first_name || !profile_picture_url || !post_message) {
//     return res.status(400).json({error: 'Invalid Request'});
// }
// try {const [results] = await pool.query(
//     'INSERT INTO Feeds (first_name, profile_picture_url, post_message) VALUES (?, ?, ?)',
//     [first_name, profile_picture_url, post_message])
//     console.log('New post data:', results);
//     res.status(200).json({message: 'New post created'})
// } catch (err) {
//     console.error('Data insertion failed', err);
//     res.status(500).json({error: 'Data insertion failed'});
// }
// });


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

    // Check if the data is a JSON string or a comma-separated string and parse accordingly
    if (profile.favourite_artists) {
      try {
        profile.favourite_artists = JSON.parse(profile.favourite_artists);
      } catch (e) {
        profile.favourite_artists = profile.favourite_artists.split(',').map(artist => artist.trim());
      }
    }

    if (profile.plan_to_visit) {
      try {
        profile.plan_to_visit = JSON.parse(profile.plan_to_visit);
      } catch (e) {
        profile.plan_to_visit = profile.plan_to_visit.split(',').map(festival => festival.trim());
      }
    }

    if (profile.attended_festivals) {
      try {
        profile.attended_festivals = JSON.parse(profile.attended_festivals);
      } catch (e) {
        profile.attended_festivals = profile.attended_festivals.split(',').map(festival => festival.trim());
      }
    }

    console.log("Profile data:", profile);
    res.status(200).json(profile);

  } catch (error) {
    console.error("Error retrieving profile:", error);
    res.status(500).send("Error retrieving profile");
  }
});


//endpoint for updating user information - put works, however will need to ensure user authentication

app.put('/updateProfile/:id', async (req, res) => {
  const profileID = req.params.id; // the profile ID being edited
  const userid = req.params.id; // the logged-in user ID extracted from the JWT

  // Ensure the logged-in user is only editing their own profile
  if (userid !== profileID) {
      return res.status(403).send("You are not able to edit this profile");
  }

  const {
      first_name,
      age,
      location,
      about_me,
      favourite_artists,
      attended_festivals,
      plan_to_visit
  } = req.body;

  let updateQuery = 'UPDATE user_profile SET';
  const updateValues = [];

  // Add fields to update if they exist
  if (first_name) {
      updateQuery += ' first_name = ?,';
      updateValues.push(first_name);
  }
  if (age) {
      updateQuery += ' age = ?,';
      updateValues.push(age);
  }
  if (location) {
      updateQuery += ' location = ?,';
      updateValues.push(location);
  }
  if (about_me) {
      updateQuery += ' about_me = ?,';
      updateValues.push(about_me);
  }
  if (favourite_artists) {
      updateQuery += ' favourite_artists = ?,';
      updateValues.push(JSON.stringify(favourite_artists));
  }
  if (plan_to_visit) {
      updateQuery += ' plan_to_visit = ?,';
      updateValues.push(JSON.stringify(plan_to_visit));
  }
  if (attended_festivals) {
      updateQuery += ' attended_festivals = ?,';
      updateValues.push(JSON.stringify(attended_festivals));
  }

  updateQuery = updateQuery.slice(0, -1) + ' WHERE user_id = ?';
  updateValues.push(userid);

  try {
      const [result] = await pool.query(updateQuery, updateValues);

      // Check if the user was found and updated
      if (result.affectedRows === 0) {
          return res.status(404).json({ error: "User ID not present" });
      }

      res.status(200).json({ message: "Profile Updated" });

  } catch (err) {
      console.log(err);
      res.status(500).send("Error updating profile");
  }
});

