const express = require("express");
const app = express();
const path = require("path");
const PORT = 5000; //Should be changed to local port 
const bodyParser = require("body-parser");
const morgan = require("morgan");
const user = require("./routes/user.js");
const lists = require("./routes/lists.js");
const { connect, disconnect } = require("./database/database.js");


app.use(
  morgan("tiny"),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false })
);

connect();

app.use(user);
app.use(lists);

app.get("/", (req, res) => {
});
/* This will be for the production build

app.use(express.static(path.join(__dirname, "build")))

app.get('/',(req,res)=>{
    res.status(200)
    res.sendFile(path.join(__dirname,"./build","index.html"))
})*/
console.log("now listening in port... " + PORT);

app.listen(PORT);
