const express = require("express");
const cors = require('cors');
const app = express();
const mainController = require("./controllers/mainController")

app.use(cors());
app.use(express.static('public'));

app.get('/', mainController.def);
app.post('/', mainController.def);
app.post("/define/:word", mainController.def);

app.get("/define/:word", mainController.getDefinition);
app.listen("3000", ()=>{
    console.log("Server is listening to port 3000");
})