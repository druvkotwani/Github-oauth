var express = require('express');
var cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
var bodyParser = require('body-parser');

const CLIENT_ID = 'fd007f1738fb2dd8e61a';
const CLIENT_SECRET = 'd084e8fbf9c334c7a390e05fc01b856954de79ff'

var app = express();
app.use(cors());
app.use(bodyParser.json());

//code begin passed from the frontend 
app.get("/getAccessToken", async function (req, res) {

    console.log(req.query.code)

    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;

    await fetch('https://github.com/login/oauth/access_token' + params, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data)
        res.send(data);
    })
})

//getUserData
// access token is going to be passed in as an Authorization header


app.get('/getUserData', async function (req, res) {
    req.get('Authorization') //Bearer <access_token>
    await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
            'Authorization': req.get('Authorization')

        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data)
        res.json(data);
    })
})

app.get('/', function (req, res) {
    res.send('Hello to the oauth by Dhruv!')
})


app.listen(4000, function () {
    console.log('CORS-enabled web server listening on port 4000')
});