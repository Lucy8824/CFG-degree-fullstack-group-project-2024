const express = require(`express`);

const app = express();
app.get(`/`, (req, res) => {
    res.json({
    message: `hello world`
});
});


app.listen(3003, () => {
    console.log(`listening on port 3003`)
})