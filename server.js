const express = require("express");
const cors = require("cors")
const morgan = require("morgan")
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
require('dotenv').config()
const bodyParser = require('body-parser');

//Creating an upload size limit- very important to allow larger images to be uploaded through the browser
app.use(bodyParser.urlencoded({ extended: false , limit: "100gb"}))
app.use(bodyParser.json({limit: "100gb"}))

app.use(cors());
app.use(morgan("dev"))

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}
// Connect to the Mongo DB through Atlas or Robo3T
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/photos", options, (err)  => { 
    if (err) throw err;
    console.log("DB connection established")
}
);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
