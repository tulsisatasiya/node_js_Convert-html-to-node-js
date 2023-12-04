const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
   
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let age = parseInt(req.body.age);


    if (isNaN(age) || age < 0) {
        return res.status(400).send({
            message: 'Form submission failed',
            error: 'Invalid age. Please enter a valid age.',
        });
    }

   
    if (age >= 18) {
        res.status(200).send({
            message: 'Form submitted successfully',
            data: {
                firstName: fname,
                lastName: lname,
                email: email,
                age: age,
            },
        });
    } else {
        res.status(400).send({
            message: 'Form submission failed',
            error: 'Age must be 18 or above.',
        });
    }
});

http.createServer(app).listen(50001);

