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

app.listen(port, () => {
  console.log(`listening on port ${port}.`);
});
