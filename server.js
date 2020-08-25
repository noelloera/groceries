const express = require("express");
const app = express();
const path = require("path")
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser")
const morgan = require("morgan")
//Routes
const lists = require("./routes/lists.js")
//Middleware
app.use(
    morgan("tiny"),
    bodyParser.json(),
    bodyParser.urlencoded({extended: false}),
    ("/lists", lists)
)

//The root will serve the application 
app.use(express.static(path.join(__dirname,"build")))
app.get('/',(req,res)=>{
    res.status(200)
    res.sendFile(path.join(__dirname,"./build","index.html"))
})
console.log("now listening in port... "+PORT)
app.listen(PORT)