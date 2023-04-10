const User = require("../model/Users");
const Booking = require("../model/Bookings");

const renderReservation = async (req, res) => {
  if (req.isAuthenticated()) {
    const user = await User.findOne({ username: req.user.username });
    const numberOfGuests = req.cookies.numberOfGuest;
    const selectedDate = req.cookies.date;
    const selectedTime = req.cookies.time;
    const clientRequest = req.cookies.request;
    res.clearCookie("numberOfGuest");
    res.clearCookie("date");
    res.clearCookie("time");
    res.clearCookie("request");
    res.clearCookie("bookingValidate");
    res.clearCookie("previousUrl");
    res.render("reservation", {
      username: user.name,
      loggedIn: true,
      guest: numberOfGuests,
      date: selectedDate,
      time: selectedTime,
      request: clientRequest,
      status: 0,
    });
  } else {
    res.render("reservation", {
      username: "",
      loggedIn: false,
      guest: "",
      date: "",
      time: "",
      request: "",
      status: 0,
    });
  }
};

const handleBooking = async (req, res) => {
  const { guests, date, time, request } = req.body;
  console.log(req.body);
  if (req.isAuthenticated()) {
    const user = await User.findOne({ username: req.user.username });
    await Booking.create({
      name: user.name,
      email: user.username,
      contact: user.contact,
      numberOfGuest: guests,
      date: date,
      time: time,
      request: request,
    });
    setTimeout(() => {
      res.render("reservation", {
        username: user.name,
        loggedIn: true,
        name: "", // TODO change render properties
        email: "",
        request: "",
        status: 1,
      });
    }, 1000);
  } else {
    const referrerUrl = req.originalUrl;
    res
      .cookie("previousUrl", `${referrerUrl}`, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
      })
      .cookie("numberOfGuest", `${guests}`, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
      })
      .cookie("date", `${date}`, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
      })
      .cookie("time", `${time}`, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
      })
      .cookie("request", `${request}`, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
      })
      .cookie("bookingValidate", "true", {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
      })
      .redirect("/login");
  }
};

module.exports = { handleBooking, renderReservation };
