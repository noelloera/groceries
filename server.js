const express = require("express");
const path = require("path")
const app = express();
const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser")
const morgan = require("morgan")
//routes
const lists = require("./routes/lists.js")
//This is the build being served at root
app.use(express.static(path.join(__dirname,"build")))
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"))
})
app.listen(PORT, "now listening on port... "+PORT)