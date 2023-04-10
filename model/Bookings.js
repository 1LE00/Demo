const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    type: String
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
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
