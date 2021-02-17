const mongoose = require("mongoose");

const Schema = mongoose.Schema

const ExampleSchema = new Schema({
  images:  [
    {
      _id: {type: String},
      id: { type: String },
      src: { type: String },
    },
  ],
})
const Example = mongoose.model("Example", ExampleSchema)

module.exports = Example;