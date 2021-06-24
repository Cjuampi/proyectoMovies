require("dotenv").config();
require('./database/mongo.cnx')
const express = require("express");
var cors = require('cors')
const app = express();
const router = require("./routes/routes")
const PORT = process.env.PORT || 3000;
const passport = require("./middlewares/passport");
const cookieParser = require('cookie-parser');

app.use(cors())

app.set("view engine", "pug");
app.set("views", "./views");
app.use("/Public", express.static('Public'));

app.use(cookieParser())
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);

app.listen(PORT, ()=>{
    console.log(`EJEMPLO http://localhost:${PORT}`);
})