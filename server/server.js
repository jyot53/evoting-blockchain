const express = require('express');
const app = express();
const cookieparser = require('cookie-parser');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const port = process.env.PORT || 8000;

dotenv.config();
require('./db/connection');
app.use(express.json());
app.use(cookieparser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret : process.env.SESSION_SECRET,
    key: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized : false,
    cookie:{
        expires:60*60*24
    }
}));


app.use(require('./routes/web'));

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})