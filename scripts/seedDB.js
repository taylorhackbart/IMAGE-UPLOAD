const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost/photos"
);
//Example text to be pushed to DB
const ExampleSeed = [
  {
    example: "EXAMPLE",
  },
];

db.Example.remove({})
  .then(() => db.Example.collection.insertMany(ExampleSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
