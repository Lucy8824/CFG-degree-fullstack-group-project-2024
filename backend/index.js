require(`dotenv`).config();
console.log(process.env);

const express = require(`express`);
const cors = require(`cors`);
const jwt = require(`jsonwebtoken`);

const port = process.env.PORT || 3003;

const app = express();

app.use(cors());

app.get(`/`, (req, res) => {
  res.json({
    message: `hello there you`,
  });
});

//request to generate JWT with post
app.post(`/user/generateToken`, (req, res) => {
  // this validates user
  const { username, password } = req.body;
  if (username === "validUser" && password === "validPassword") {
  }
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
});

// now verify JWT with get request

app.get("/user/validateToken", (req, res) => {
  //tokens are passed in header of request for security
  let = tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let = jwtSecretKey = process.env.JWT_SECRET_KEY;
  try {
    const token = req.header(tokenHeaderKey);
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return res.send("successfully verified");
    } else {
      return res.status(401).send(error);
    }
  } catch (error) {
    return res.status(401).send(error);
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}.`);
});
