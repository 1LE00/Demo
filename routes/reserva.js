const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../model/Users");
const Booking = require("../model/Bookings");
const Waitlist = require("../model/Waitlist");
const Message = require("../model/Messages");
const { Table } = require("../model/Tables");

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const verifyAdmin = async (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAdmin) {
        res.clearCookie("previousUrl");
        res.clearCookie("adminRedirect");
        next();
    } else {
        const referrerUrl = req.originalUrl;
        res
            .cookie("previousUrl", `${referrerUrl}`, {
                maxAge: 1 * 60 * 1000,
                httpOnly: true,
            })
            .cookie("adminRedirect", "true", {
                maxAge: 1 * 60 * 1000,
                httpOnly: true,
            })
        res.redirect("/reserva/auth/admin/verify");
    }
}

router
    .route("/$|(/|home|index)$")
    .get(verifyAdmin, async (req, res) => {
        res.render("admin/index");
    });

router.route("/bookings")
    .get(verifyAdmin, async (req, res) => {
        const bookings = await Booking.find({}).populate("assignedTable").exec();
        console.log("All Bookings");
        console.log(bookings);
        const now = new Date();
        const filteredBookings = bookings.filter((booking) => {
            const bookingDateTime = `${booking.date} ${booking.time}`;
            const bookingDate = new Date(bookingDateTime);
            return bookingDate > now;
        });
        console.log("filtered Bookings");
        console.log(filteredBookings);
        res.render("admin/bookings", { bookings: filteredBookings });
    })
    .delete(verifyAdmin, async (req, res) => {

    });

router.route("/tables")
    .get(verifyAdmin, async (req, res) => {
        const tables = await Table.find({}).exec();
        console.log("All tables");
        console.log(tables);
        res.render("admin/tables", { tables: tables });
    })
    .delete(verifyAdmin, async (req, res) => {

    });

router.route("/users")
    .get(verifyAdmin, async (req, res) => {
        const users = await User.find({ isAdmin: false }).exec();
        console.log("All users");
        console.log(users);
        res.render("admin/users", { users: users });
    })
    .delete(verifyAdmin, async (req, res) => {

    });

router.route("/waitlists")
    .get(verifyAdmin, async (req, res) => {
        const waitlists = await Waitlist.find({}).exec();
        console.log("All waitlists");
        console.log(waitlists);
        const now = new Date();
        const filteredwaitlists = waitlists.filter((waitlists) => {
            const waitlistsDateTime = `${waitlists.date} ${waitlists.time}`;
            const waitlistsDate = new Date(waitlistsDateTime);
            return waitlistsDate > now;
        });
        console.log("filtered waitlists");
        console.log(filteredwaitlists);
        res.render("admin/waitlists", { waitlists: filteredwaitlists });
    })
    .delete(verifyAdmin, async (req, res) => {

    });

router.route("/messages")
    .get(verifyAdmin, async (req, res) => {
        const messages = await Message.find({}).exec();
        console.log("All messages");
        console.log(messages);
        res.render("admin/messages", { messages: messages });
    })
    .delete(verifyAdmin, async (req, res) => {

    });

router.route("/dishes")
    .get(verifyAdmin, async (req, res) => {
        const dishes = await Dish.find({}).exec();
        console.log("All dishes");
        console.log(dishes);
        res.render("admin/dishes", { dishes: dishes });
    })
    .delete(verifyAdmin, async (req, res) => {

    });

router.route("/auth/admin/verify")
    .get(async (req, res) => {
        res.render("admin/auth", { message: '', loginUsername: '', loginPassword: '' });
    })
    .post(async (req, res, next) => {
        try {
            const { username, password } = req.body;

            passport.authenticate("local", function (err, user, info, status) {
                if (err) {
                    return next(err);
                }
                if (!user || user.isAdmin == false) {
                    return res.render("admin/auth", {
                        message: "Incorrect Username or Password",
                        loginUsername: username,
                        loginPassword: password,
                    });
                }
                req.logIn(user, function (err) {
                    if (err) {
                        return next(err);
                    }
                    if (req.cookies.adminRedirect) {
                        return res.redirect(`${req.cookies.previousUrl}`);
                    } else {
                        return res.redirect("/reserva");
                    }
                });
            })(req, res, next);
        } catch (error) {
            if (error) {
                console.log(error);
            }
        }
    });

module.exports = router;
