const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Customer = require("./models/customer");
const PORT = process.env.PORT || 3000;


const app = express();

mongoose.Promise = global.Promise;

// Connection to database
mongoose.connect("mongodb://localhost:27017/restaurant-website", {
  useNewUrlParser: true
});

var db = mongoose.connection;

// Serve HTML page
app.use(express.static(path.resolve(__dirname, "public")));

// Serve CSS file
app.use("/css", express.static("css"));
app.use("/assets", express.static("assets"));


// Body Parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Customer count
let customers = 0;

// Save customer to database
app.post("/check-availability", urlencodedParser, function(req, res) {
  console.log(req.body);
  let phone = req.body.phone;
  let email = req.body.email;

  let error = false;
  let control = false;

  db.collection("customers")
    .distinct("phone")
    .then(function(response) {
      response.forEach(function(item) {
        if (item === parseInt(phone)) {
          error = true;
          console.log("Error");
          res.setHeader("Content-Type", "application/json");
          res.json({ message: "Please try a different phone number" });
        } else {
          console.log("Success");
        }
      });
    })
    .catch(function(err) {
      console.log(err);
    });

  db.collection("customers")
    .distinct("email")
    .then(function(response) {
      response.forEach(function(item) {
        if (item.toLowerCase() === email.toLowerCase()) {
          error = true;

          res.setHeader("Content-Type", "application/json");
          res.json({ message: "Please try a different email" });

          return;
         
        } else {
          console.log("Success");
        }
      });
    })
    .catch(function(err) {
      console.log(err);
    });

  console.log("-----------------" + error);
  setTimeout(function() {
    if (customers > 2 && error !== true) {
      console.log("Sorry tables are full");
      res.json({ message: "Sorry, reservations are full" });
    } else if (error !== true) {
      console.log(req.body);

      let myData = new Customer(req.body);
      myData
        .save()
        .then(function(item) {
          customers++;
          console.log("---------- CUSTOMERS ---------");

          console.log(customers);
          console.log("-------------------------------------");

          // responds with status code 200 and data
          res.status(200).json({ message: "Reservation Successful" });

         

          // console.log(myData);
        })
        .catch(function(err) {
          res.status(400).send(err + " unable to save to database");
        });
    }
    error = false;
    return;
  }, 1000);
});

app.listen(PORT);
