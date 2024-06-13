require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
const AccRepo = require("./data/account")
const WebRepo = require("./data/web")
const db = require("./config/db")

const port = process.env.PORT;

//Connect to database
db.connectDB();

//Middleware
app.use(cors());
app.use(express.urlencoded({extended: true}));

//Endpoint
app.post('/createAccount', AccRepo.createAcc);
app.post('/loginAccount', AccRepo.loginAcc);
app.put('/updateAccount', AccRepo.updtAcc);
app.delete('/deleteAccount', AccRepo.delAcc);

/* 
app.get("/", (req, res) => {
    console.log("Here")
    res.send("Hi")
})

app.listen(3000)
*/

app.listen(port, () => {
    console.log("Server is running and listening on port ", port);
});