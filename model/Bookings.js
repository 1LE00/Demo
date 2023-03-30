const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
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

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
