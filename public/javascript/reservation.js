const pageRight = document.querySelector(".page-right");

const pageBg = () => {
  if (pageRight.scrollTop > 0) topHeader.classList.add("bg");
  else topHeader.classList.remove("bg");
};

const pageHeader = () => {
  if (scrollPos <= pageRight.scrollTop) topHeader.classList.add("hide");
  else topHeader.classList.remove("hide");
};

let scrollPos = 0;
pageRight.addEventListener("scroll", () => {
  pageBg();
  pageHeader();
  scrollPos = pageRight.scrollTop;
});

/* Form scripts */

/*  // *SELECT CONTAINER ITEMS // */
const select = document.getElementById("guests");
const selectContainer = document.querySelector(".select-container");
const guestList = document.querySelector(".select-list");
const numberOfGuests = document.querySelector(".select-current");
const selectListOptions = document.querySelectorAll(".select-list-option");
const selectIcon = document.getElementById("select-icon");

/*  // *TIME CONTAINER ITEMS // */
const time = document.getElementById("time");
const timeContainer = document.querySelector(".time-dropdown-container");
const timeList = document.querySelector(".time-list");
const currentTime = document.querySelector(".time-current");
const timeOptions = document.querySelectorAll(".time-list-option");
const timeIcon = document.getElementById("time-icon");

if (selectContainer != null && timeContainer != null) {
  selectContainer.addEventListener("click", (event) => {
    guestList.classList.toggle("open");
    selectIcon.classList.toggle("rotate");
    if (event.target.classList.contains("option")) {
      selectListOptions.forEach((option) => {
        option.classList.remove("selected");
      });
      event.target.classList.add("selected");
      numberOfGuests.innerHTML = event.target.innerHTML;
      const selectOptions = [...select.options];
      selectOptions.forEach((selectOption) => {
        if (selectOption.innerHTML == numberOfGuests.innerHTML) {
          select.value = selectOption.getAttribute("value");
        }
      });
    }
  });

  selectContainer.addEventListener("blur", () => {
    guestList.classList.remove("open");
    selectIcon.classList.remove("rotate");
  });

  timeContainer.addEventListener("click", (event) => {
    timeList.classList.toggle("open");
    timeIcon.classList.toggle("rotate");
    if (event.target.classList.contains("option")) {
      timeOptions.forEach((option) => {
        option.classList.remove("selected");
      });
      event.target.classList.add("selected");
      currentTime.innerHTML = event.target.innerHTML;
      time.value = currentTime.innerHTML;
    }
  });

  timeContainer.addEventListener("blur", (event) => {
    timeList.classList.remove("open");
    timeIcon.classList.remove("rotate");
  });
} else {
  document.querySelector(".form-message-success").scrollIntoView();
}

const date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth() + 1;
let currentDate = date.getDate();
let currentHour = date.getHours();
let currentMinute = date.getMinutes();

let counterForHour = true;

function setCurrentTime() {
  if (date.getHours() >= 8 && date.getHours() < 21) {
    if (date.getMinutes() >= 30) {
      if (counterForHour) {
        currentHour++;
      }
      currentMinute = "00";
    } else {
      currentMinute = "30";
    }
  } else {
    currentHour = "8";
    currentMinute = "00";
  }

  const nextShift = currentHour.toString() + " " + currentMinute.toString();
  const timeOptionsArray = [...timeOptions];
  timeOptionsArray.forEach((timeOption) => {
    timeOption.classList.remove("selected");
    if (nextShift === timeOption.dataset.value) {
      currentTime.innerHTML = timeOption.innerHTML;
      time.value = currentTime.innerHTML;
      timeOption.classList.add("selected");
      const index = timeOptionsArray.indexOf(timeOption);
      timeOptionsArray.forEach((element) => {
        if (timeOptionsArray.indexOf(element) < index) {
          element.remove();
        }
      });
    }
  });
}

const formDate = document.querySelector("#date");

function addZeroToMonthOrDay(entity) {
  if (entity >= 1 && entity <= 9) {
    entity = `0${entity.toString()}`;
    return entity;
  } else {
    return entity;
  }
}

function setCurrentDate() {
  let maxMonth = "";
  let getMaxDate = "";
  if (formDate != null) {
    currentMonth = addZeroToMonthOrDay(currentMonth);

    /* Generate 1 month limit for date field */
    const d = new Date(
      currentYear,
      parseInt(currentMonth) - 1,
      currentDate + 30
    );

    if (d.getMonth() + 1 >= 1 && d.getMonth() + 1 <= 9)
      maxMonth = `0${(d.getMonth() + 1).toString()}`;
    else {
      maxMonth = (d.getMonth() + 1).toString();
    }

    /* Generate next day date */
    let getNextDate = new Date(
      currentYear,
      parseInt(currentMonth) - 1,
      currentDate + 1
    ).getDate();

    getNextDate = addZeroToMonthOrDay(getNextDate);

    if (d.getDate() >= 1 && d.getDate() <= 9)
      getMaxDate = `0${d.getDate().toString()}`;
    else {
      getMaxDate = d.getDate().toString();
    }

    /* // Set the date for the next day if the time exceeds the restaurant serving hours// */
    if (
      (date.getHours() >= 21 && date.getMinutes() > 30) ||
      date.getHours() > 21
    ) {
      formDate.value = `${currentYear}-${currentMonth}-${getNextDate}`;
    } else {
      currentDate = addZeroToMonthOrDay(currentDate);
      formDate.value = `${currentYear}-${currentMonth}-${currentDate}`;
    }
    // defining max and min date to select for reservation
    formDate.min = formDate.value;
    formDate.max = `${d.getFullYear()}-${maxMonth}-${getMaxDate}`;
  }
}

//display complete timeoptions when the user selects date other than today
if (formDate !== null) {
  formDate.addEventListener("input", (event) => {
    let min = formDate.min;
    let minYear = parseInt(min.slice(0, 4));
    let minMonth = parseInt(min.slice(5, 7));
    let minDate = parseInt(min.slice(8));
    let max = formDate.max;
    let maxYear = parseInt(max.slice(0, 4));
    let maxMonth = parseInt(max.slice(5, 7));
    let maxDate = parseInt(max.slice(8));
    let value = formDate.value;
    let vYear = parseInt(value.slice(0, 4));
    let vMonth = parseInt(value.slice(5, 7));
    let vDate = parseInt(value.slice(8));

    function setMonthOrYear(value, maxValue, minValue) {
      if (value >= maxValue) {
        value = maxValue;
      } else {
        value = minValue;
      }
    }

    setMonthOrYear(vYear, maxYear, minYear);
    setMonthOrYear(vMonth, maxMonth, minMonth);

    if (vMonth === maxMonth && vDate > maxDate) {
      vDate = maxDate;
    } else if (vMonth === minMonth && vDate < minDate) {
      vDate = minDate;
    }

    const adjustTimeOptions = () => {
      if (
        (vMonth === minMonth && vDate > currentDate) ||
        (vMonth === maxMonth && vDate <= currentDate)
      ) {
        let childrenOfTimeList = [...timeList.children];
        childrenOfTimeList.forEach((children) => {
          children.remove();
        });
        timeOptions.forEach((timeOption) => {
          timeList.appendChild(timeOption);
        });
      } else {
        counterForHour = false;
        setCurrentTime();
      }
    }

    adjustTimeOptions();

    vYear = vYear.toString();
    vMonth = addZeroToMonthOrDay(vMonth);
    vDate = addZeroToMonthOrDay(vDate);
    formDate.value = `${vYear}-${vMonth}-${vDate}`;

  });
}

const form = document.getElementById("reservation-form");

if (form != null) {
  form.addEventListener("submit", (event) => {
    const selectOptions = [...select.options];
    selectOptions.forEach((selectOption) => {
      if (selectOption.innerHTML == numberOfGuests.innerHTML.trim()) {
        select.value = selectOption.getAttribute("value");
      }
    });
  });
}

/* Confirmation Modal */
const modalInitiator = document.getElementById("modal-initiator");
const modalContainer = document.querySelector(".confirmation-modal-container");
const modalClose = document.getElementById("confirmation-modal-close");
const bookingDiner = document.querySelector(".booking-diner");
const bookingTime = document.querySelector(".booking-time");
const bookingDate = document.querySelector(".booking-date");
const completeReservation = document.querySelector(".cr");
/* Confirmation Modal */
if (modalInitiator != null) {
  modalInitiator.addEventListener("click", () => {
    modalContainer.style.display = "flex";
    document.body.classList.add("nav-active");
    const cd = new Date(formDate.value);
    const options = {
      month: "long",
      day: "numeric",
      weekday: "long"
    }
    bookingDate.innerHTML = cd.toLocaleString("en-us", options);
    bookingDiner.innerHTML = numberOfGuests.innerHTML.trim();
    bookingTime.innerHTML = currentTime.innerHTML;
  });
}

if (modalClose != null) {
  modalClose.addEventListener("click", () => {
    modalContainer.style.display = "none";
    document.body.classList.remove("nav-active");
  });
}

/* Confirmation Modal */

window.addEventListener("load", () => {
  setCurrentDate();
  setCurrentTime();
});


window.onclick = (event) => {
  if (event.target == modalContainer) {
    modalContainer.style.display = "none";
    document.body.classList.remove("nav-active");
  }
};

window.isConfirmationPage = false;


/* Form scripts */

/* 
    * Finish it asap
    TODO:  change the date field
    ? MIght need to move header to the bottom as well 
    ! DON'T FORGET TO MAKE THE FIELDS LOOK GOOD
 */
/* 
    ! DON NOT FORGET
    TODO CHECK DATATYPE OF TIME OPTIONS AND SELECT OPTIONS, AND SEE IF IT'S REALLY NECESSARY FOR IT TO BE CONVERTED INTO AN ARRAY
    ? THERE'S DATEPICKER FROM JQUERY IF YOU WANT TO USE IT
    
*/
