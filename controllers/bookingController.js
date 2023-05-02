const User = require("../model/Users");
const Booking = require("../model/Bookings");
const { Table } = require("../model/Tables");

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
    checkTableAvailability(date, time, parseInt(guests));
    async function checkTableAvailability(date, time, partySize) {
      const totalSeats = await Table.find({}).exec();
      let restaurantCapacity = 0;
      for (let i = 0; i < totalSeats.length; i++) {
        restaurantCapacity += totalSeats[i].seatingCapacity;
      }
      console.log(restaurantCapacity);
      // if((restaurantCapacity - bookedSeats) >= partySize){
      //   bookedSeats+= partySize;
      // }else{
      //   console.log("No free tables available at this hour");
      // }

      async function createBooking(tableBooked) {
        try {
          const user = await User.findOne({ username: req.user.username }).exec();
          await Booking.create({
            name: user.name,
            email: user.username,
            contact: user.contact,
            numberOfGuest: guests,
            date: date,
            time: time,
            request: request,
            assignedTable: tableBooked._id
          });
          console.log("Table number " + tableBooked.tableNumber + " is booked for " + req.user.name + " at " + time + " on " + date + " for " + guests + " guests.");
          setTimeout(() => {
            res.render("reservation", {
              username: user.name,
              loggedIn: true,
              status: 1,
              cr: 1
            });
          }, 1000);
        } catch (err) {
          console.error(err);
        }
      }
      /* // *Find existing reservations */
      const existingReservations = await Booking.find(
        { date: date, time: time, numberOfGuest: partySize }).populate('assignedTable').exec();
      if (existingReservations.length != 0) {
        console.log("Existing reservations:")
        console.log(existingReservations);
        let existingReservations_id = [];
        for (let i = 0; i < existingReservations.length; i++) {
          existingReservations_id.push(existingReservations[i].assignedTable._id);
        }
        console.log('existingReservations_id');
        console.log(existingReservations_id);
        const tableData = await Table.find(
          { seatingCapacity: partySize }).select('_id tableNumber').exec();
        if (tableData.length != 0) {
          console.log("List of tables:");
          console.log(tableData);
          console.log('After filtering');
          let availableTables = tableData.filter(td => !existingReservations_id.some(eid => eid._id.equals(td._id)));
          console.log(availableTables);
          if (availableTables.length == 0) {
            const user = await User.findOne({ username: req.user.username }).exec();
            setTimeout(() => {
              res.render("reservation", {
                username: user.name,
                loggedIn: true,
                guest: "",
                date: "",
                time: "",
                request: "",
                status: 1,
                cr: 0
              });
            }, 1000);
          } else {
            const tableBooked = await Table.findOne({ _id: availableTables[0]._id }).exec();
            createBooking(tableBooked);
          }
        } else {
          switch (partySize) {
            case 3:
              const numberOfBookings = await Booking.find({ date: date, time: time }, 'numberOfGuest -_id').populate('assignedTable').exec();
              console.log(numberOfBookings);
              let bookedSeats = 0;
              let alreadyBookedTables = [];
              for (let i = 0; i < numberOfBookings.length; i++) {
                bookedSeats += numberOfBookings[i].numberOfGuest;
                alreadyBookedTables.push(numberOfBookings[i].assignedTable._id);
              }
              const listOfT10Tables = await Table.find({ seatingCapacity: 10 }).exec();
              const listOfT8Tables = await Table.find({ seatingCapacity: 8 }).exec();
              const listOfT6Tables = await Table.find({ seatingCapacity: 6 }).exec();
              const listOfT4Tables = await Table.find({ seatingCapacity: 4 }).exec();
              const listOfT2Tables = await Table.find({ seatingCapacity: 2 }).exec();
              const listOfT1Tables = await Table.find({ seatingCapacity: 1 }).exec();
              let t10 = listOfT10Tables.filter(lot => !alreadyBookedTables.some(abt => abt._id.equals(lot._id)));
              let t8 = listOfT8Tables.filter(lot => !alreadyBookedTables.some(abt => abt._id.equals(lot._id)));
              let t6 = listOfT6Tables.filter(lot => !alreadyBookedTables.some(abt => abt._id.equals(lot._id)));
              let t4 = listOfT4Tables.filter(lot => !alreadyBookedTables.some(abt => abt._id.equals(lot._id)));
              let t2 = listOfT2Tables.filter(lot => !alreadyBookedTables.some(abt => abt._id.equals(lot._id)));
              let t1 = listOfT1Tables.filter(lot => !alreadyBookedTables.some(abt => abt._id.equals(lot._id)));
              console.log("Already Booked tables");
              console.log(alreadyBookedTables);
              console.log("T10");
              console.log(t10);
              console.log("T8");
              console.log(t8);
              console.log("T6");
              console.log(t6);
              console.log("T4");
              console.log(t4);
              console.log("T2");
              console.log(t2);
              console.log("T1");
              console.log(t1);
              if (t4.length != 0) {
                const tableBooked = await Table.findOne({ tableNumber: t4[0].tableNumber }).exec();
                createBooking(tableBooked);
              } else {
                const user = await User.findOne({ username: req.user.username }).exec();
                setTimeout(() => {
                  res.render("reservation", {
                    username: user.name,
                    loggedIn: true,
                    guest: "",
                    date: "",
                    time: "",
                    request: "",
                    status: 1,
                    cr: 0
                  });
                }, 1000);
              }
              console.log("Booked seats");
              console.log(bookedSeats);
              console.log("table for 3");
              break;
            case 5:
              console.log("table for 5");
              break;
            case 7:
              console.log("table for 7");
              break;
            case 9:
              console.log("table for 9");
              break;
            case 11:
              console.log("table for 11");
              break;
            case 13:
              console.log("table for 13");
              break;
            case 15:
              console.log("table for 15");
              break;
            case 17:
              console.log("table for 17");
              break;
            case 19:
              console.log("table for 19");
              break;
            default:
              break;
          }
        }
      } else {
        console.log("No existing reservations");
        const tableData = await Table.find(
          { seatingCapacity: partySize }).exec();
        if (tableData.length != 0) {
          const tableBooked = await Table.findOne({ tableNumber: tableData[0].tableNumber }).exec();
          createBooking(tableBooked);
          console.log(tableData);
        }
        else {
          switch (partySize) {
            case 3:
              const numberOfBookings = await Booking.find({ date: date, time: time }, 'numberOfGuest -_id').populate('assignedTable').exec();
              console.log(numberOfBookings);
              let bookedSeats = 0;
              let alreadyBookedTables = [];
              for (let i = 0; i < numberOfBookings.length; i++) {
                bookedSeats += numberOfBookings[i].numberOfGuest;
                alreadyBookedTables.push(numberOfBookings[i].assignedTable._id);
              }
              const listOfT10Tables = await Table.find({ seatingCapacity: 10 }).exec();
              const listOfT8Tables = await Table.find({ seatingCapacity: 8 }).exec();
              const listOfT6Tables = await Table.find({ seatingCapacity: 6 }).exec();
              const listOfT4Tables = await Table.find({ seatingCapacity: 4 }).exec();
              const listOfT2Tables = await Table.find({ seatingCapacity: 2 }).exec();
              const listOfT1Tables = await Table.find({ seatingCapacity: 1 }).exec();
              let t10 = listOfT10Tables.filter(lot => !alreadyBookedTables.some(abt => abt._id.equals(lot._id)));
              let t8 = listOfT8Tables.filter(lot => !alreadyBookedTables.some(abt => abt._id.equals(lot._id)));
              let t6 = listOfT6Tables.filter(lot => !alreadyBookedTables.some(abt => abt._id.equals(lot._id)));
              let t4 = listOfT4Tables.filter(lot => !alreadyBookedTables.some(abt => abt._id.equals(lot._id)));
              let t2 = listOfT2Tables.filter(lot => !alreadyBookedTables.some(abt => abt._id.equals(lot._id)));
              let t1 = listOfT1Tables.filter(lot => !alreadyBookedTables.some(abt => abt._id.equals(lot._id)));
              console.log("T2");
              console.log(t2);
              console.log("T1");
              console.log(t1);
              console.log("Already Booked tables");
              console.log(alreadyBookedTables);
              console.log("Available tables");
              console.log(t4);
              if (t4.length != 0) {
                const tableBooked = await Table.findOne({ tableNumber: t4[0].tableNumber }).exec();
                createBooking(tableBooked);
              }
              const tables = {
                1: t1.length, 
                2: t2.length, 
                4: t4.length, 
                6: t6.length, 
                8: t8.length, 
                10: t10.length
              };
              for (let i = partySize + 1; i >= 1; i--) {
                if (i in tables && tables[i] > 0) {
                  const remaining = partySize - i;
                  if (remaining in tables && tables[remaining] > 0) {
                    tables[i]--;
                    tables[remaining]--;
                    console.log(`Table booked for ${partySize} participants (combination of ${i}-person and ${remaining}-person tables)`);
                    return;
                  }
                }
              }
              console.log(tables);
              console.log("Booked seats");
              console.log(bookedSeats);
              console.log("table for 3");
              break;
            case 5:
              console.log("table for 5");
              break;
            case 7:
              console.log("table for 7");
              break;
            case 9:
              console.log("table for 9");
              break;
            case 11:
              console.log("table for 11");
              break;
            case 13:
              console.log("table for 13");
              break;
            case 15:
              console.log("table for 15");
              break;
            case 17:
              console.log("table for 17");
              break;
            case 19:
              console.log("table for 19");
              break;
            default:
              break;
          }
        }
      }
    }
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
