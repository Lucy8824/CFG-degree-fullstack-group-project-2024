require('dotenv').config();

const express = require(`express`);
const cors = require(`cors`);
const app = express();
const PORT = 3003;


app.use(express.json());
app.use(cors());

const pool = require('./pool');

app.get(`/`, (req, res) => {
    res.json({
    message: `hello there you`
});
});


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
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



// post request for user sign up page
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


// post request for edit profile page
// app.post('/User_profile', async (req, res) => {
//     const {first_name, age, location, profile_picture_url, about_me, favourite_artists, attended_festivals, plan_to_visit} = req.body;

//     if()
//     });





// get request for feeds page
app.get('/Feeds', async (req, res) => {
    try {
        const [posts] = await pool.query('SELECT * FROM Feeds')
        res.json(posts)
    } catch (err) {
        res.status(500).json({message: 'Problem'})
    }
});


// post request for feeds page
app.post('/Feeds', async (req, res) => {
    const {first_name, profile_picture_url, post_message} = req.body;
if (!first_name || !profile_picture_url || !post_message) {
    return res.status(400).json({error: 'Invalid Request'});
}
try {const [results] = await pool.query(
    'INSERT INTO Feeds (first_name, profile_picture_url, post_message) VALUES (?, ?, ?)',
    [first_name, profile_picture_url, post_message])
    console.log('New post data:', results);
    res.status(200).json({message: 'New post created'})
} catch (err) {
    console.error('Data insertion failed', err);
    res.status(500).json({error: 'Data insertion failed'});
}
});
