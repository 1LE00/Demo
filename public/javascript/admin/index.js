const primaryNavToggler = document.querySelectorAll("[data-nav-toggle");
const primaryNavbar = document.querySelector(".primary-navbar");
const primaryNav = document.querySelector(".primary-nav");
const main = document.getElementById("index-main");
const content = document.querySelector(".content");

// if (window.matchMedia("(min-width: 768px)")) {
//     primaryNavToggler.forEach((element) => {
//         element.addEventListener("click", (e) => {
//             primaryNavbar.classList.toggle("disappear");
//             primaryNav.classList.toggle("disappear");
//             main.classList.toggle("full-width");
//             console.log("i am run");
//         });
//     });
// } else {
//     primaryNavToggler.forEach((element) => {
//         element.addEventListener("click", (e) => {
//             primaryNavbar.classList.toggle("invisible");
//             primaryNav.classList.toggle("navbar-show");
//             document.body.classList.toggle("nav-active");

//         });
//     });
// }

if(screen.width >= 768){
    primaryNavToggler.forEach((element) => {
        element.addEventListener("click", (e) => {
            primaryNavbar.classList.toggle("disappear");
            primaryNav.classList.toggle("disappear");
            main.classList.toggle("full-width");
            console.log("i am run");
        });
    });
}else{
    primaryNavToggler.forEach((element) => {
        element.addEventListener("click", (e) => {
            primaryNavbar.classList.toggle("invisible");
            primaryNav.classList.toggle("navbar-show");
            document.body.classList.toggle("nav-active");

        });
    });
}

/*  */
const bookings = document.getElementById("bookings");
const tables = document.getElementById("tables");
const users = document.getElementById("users");
const waitlists = document.getElementById("waitlists");
const messages = document.getElementById("messages");
const dishes = document.getElementById("dishes");
const events = document.getElementById("events");

const checkUrl = () => {
    if (window.location.pathname == "/reserva/bookings") {
        bookings.classList.add("active");
    } else if (window.location.href == "http://localhost:3000/reserva/tables") {
        tables.classList.add("active");
    } else if (window.location.href == "http://localhost:3000/reserva/users") {
        users.classList.add("active");
    } else if (window.location.href == "http://localhost:3000/reserva/waitlists") {
        waitlists.classList.add("active");
    } else if (window.location.href == "http://localhost:3000/reserva/messages") {
        messages.classList.add("active");
    } else if (window.location.href == "http://localhost:3000/reserva/dishes") {
        dishes.classList.add("active");
    } else if (window.location.href == "http://localhost:3000/reserva/events") {
        events.classList.add("active");
    }
}

const loadContent = () => {
    if (!content.classList.contains("show-content")) {
        content.classList.add("show-content");
    }
}

window.onload = () => {
    checkUrl();
    loadContent();
}

/*  */