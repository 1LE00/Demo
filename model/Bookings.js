const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {Table} = require("./Tables");

const bookingSchema = new Schema({
  name:{
    type: String
  },
  email:{
    type: String
  },
  contact:{
    type: Number
  },
  numberOfGuest: {
    type: Number
  },
  date: {
    type: String
  },
  time: {
    type: String
  },
  request: {
    type: String
  },
  assignedTable:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table"
  }
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
