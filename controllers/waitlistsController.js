const User = require("../model/Users");
const Waitlist = require("../model/Waitlist");

const handleWaitlist = async (req, res) => {
    const { guests, date, time, request } = req.body;
    if (req.isAuthenticated()) {
        try {
            const user = await User.findOne({ username: req.user.username }).exec();
            const duplicate = await Waitlist.findOne({ email: user.username, date: date, time: time, numberOfGuest: parseInt(guests) }).exec();
            if (duplicate) {
                console.log("Duplicate exists:")
                console.log(duplicate);
                return res.send({ waitlistExists: true });
            } else {
                await Waitlist.create({
                    name: user.name,
                    email: user.username,
                    contact: user.contact,
                    numberOfGuest: guests,
                    date: date,
                    time: time,
                    request: request,
                    createdAt: new Date()
                });
                console.log("<---Waitlist Message--->");
                console.log(`User ${user.name} has been added to the waitlist for the booking of ${guests} guests on ${date} at ${time}.`);
                res.send({ waitlist: true });
            }
        } catch (error) {
            if (error) console.log(error);
        }

    } else {
        res.send({ redirect: "/login" });
    }
}

module.exports = { handleWaitlist };