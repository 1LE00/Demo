const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const User = require("../model/Users");
const Booking = require("../model/Bookings");
const Waitlist = require("../model/Waitlist");

const verifyAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.clearCookie("previousUrl");
        res.clearCookie("userRedirect");
        next();
    } else {
        const referrerUrl = req.originalUrl;
        res
            .cookie("previousUrl", `${referrerUrl}`, {
                maxAge: 5 * 60 * 1000,
                httpOnly: true,
            })
            .cookie("userRedirect", "true", {
                maxAge: 5 * 60 * 1000,
                httpOnly: true,
            })
            .redirect("/login");
    }
}
router
    .route("/$|(/|home|index)$")
    .get(verifyAuthentication, async (req, res) => {
        const user = await User.findOne({ username: req.user.username });
        res.render("user/home", {
            username: user.name,
            email: user.username,
            contact: user.contact,
            loggedIn: true
        });
    });

router.
    route("/booking_details")
    .get(verifyAuthentication, async (req, res) => {
        const user = await User.findOne({ username: req.user.username });
        const bookingDetails = await Booking.find({ email: user.username }).select({
            id: 1, name: 1, email: 1, contact: 1, numberOfGuest: 1, date: 1, time: 1, assignedTable: 1, _id: 0
        }).populate('assignedTable', 'tableNumber -_id');
        console.log(bookingDetails);
        res.render("user/booking-details", {
            username: user.name,
            loggedIn: true,
            bookings: bookingDetails
        });
    })
    .put(verifyAuthentication, async (req, res) => {

    })
    .delete(verifyAuthentication, async (req, res) => {

    });


router.
    route("/booking_history")
    .get(verifyAuthentication, async (req, res) => {
        const user = await User.findOne({ username: req.user.username });
        const bookingDetails = await Booking.find({ email: user.username }).select({
            id: 1, name: 1, email: 1, contact: 1, numberOfGuest: 1, date: 1, time: 1, assignedTable: 1, _id: 0
        }).populate('assignedTable', 'tableNumber -_id');
        console.log("bookingDetails");
        console.log(bookingDetails);
        res.render("user/booking-history", {
            username: user.name,
            loggedIn: true,
            bookings: bookingDetails
        });
    });

router.
    route("/order_history")
    .get(verifyAuthentication, async (req, res) => {
        const user = await User.findOne({ username: req.user.username });
        res.render("user/order-history", {
            username: user.name,
            loggedIn: true
        })
    });

router.
    route("/waitlist")
    .get(verifyAuthentication, async (req, res) => {
        const user = await User.findOne({ username: req.user.username });
        const waitlistDetails = await Waitlist.find({ email: user.username }).select({
            id: 1, name: 1, email: 1, contact: 1, numberOfGuest: 1, date: 1, time: 1, createdAt: 1, _id: 0
        });
        console.log("waitlistDetails");
        console.log(waitlistDetails);
        res.render("user/waitlist", {
            username: user.name,
            loggedIn: true,
            waitlists: waitlistDetails
        })
    });


router.
    route("/waitlist/:id")
    .delete(verifyAuthentication, async (req, res) => {
        const ID = parseInt(req.params.id);
        console.log(ID);
        try {
            const recordToBeDeleted = await Waitlist.findOne({ id: ID }).exec();
            console.log("recordToBeDeleted");
            console.log(recordToBeDeleted);
            const deletedRecord = await Waitlist.findByIdAndDelete(recordToBeDeleted._id).exec();
            if (!null) {
                console.log(deletedRecord);
                res.send({ status: true, deletedId: ID });
            } else {
                res.send({ status: false, message: `Waitlist with ID: ${ID} doesnt exist` });
            }
        } catch (error) {
            if (error) {
                console.log(error);
            }
        }
    });

router.
    route("/bookings/:id")
    .get(verifyAuthentication, async (req, res) => {

    })
    .post(verifyAuthentication, async (req, res) => {

    })
    .put(verifyAuthentication, async (req, res) => {

    })
    .delete(verifyAuthentication, (async (req, res) => {
        const ID = parseInt(req.params.id);
        console.log(ID);
        try {
            const recordToBeDeleted = await Booking.findOne({ id: ID }).exec();
            console.log(recordToBeDeleted);
            const deletedRecord = await Booking.findByIdAndDelete(recordToBeDeleted._id).exec();
            if (!null) {
                console.log(deletedRecord);
                res.send({ status: true, deletedId: ID });
            } else {
                res.send({ status: false, message: `Reservation with ID: ${ID} doesnt exist` });
            }
        } catch (error) {
            if (error) {
                console.log(error);
            }
        }
    }));
module.exports = router;
