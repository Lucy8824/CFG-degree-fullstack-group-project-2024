const express = require(`express`);
const cors = require(`cors`);

const app = express();

app.use(cors());

app.get(`/`, (req, res) => {
    res.json({
    message: `hello there you`
});
});


app.listen(3003, () => {
    console.log(`listening on port 3003`)
})