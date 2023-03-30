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
          console.log(select.value);
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
      console.log(time.value);
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

function setCurrentTime() {
  if (currentHour >= 0 && currentHour < 21) {
    if (currentMinute >= 30) {
      currentHour++;
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

function setCurrentDate() {
 if(formDate != null){
  if (currentMonth >= 1 && currentMonth <= 9) {
    currentMonth = `0${currentMonth.toString()}`;
  }

  const d = new Date(currentYear, parseInt(currentMonth) - 1, currentDate + 30);
  if (d.getMonth() + 1 >= 1 && d.getMonth() + 1 <= 9) {
    maxMonth = `0${(d.getMonth() + 1).toString()}`;
  }

  
  if(date.getHours() > 21){
    formDate.value = `${currentYear}-${currentMonth}-${new Date(currentYear, parseInt(currentMonth) - 1 , currentDate + 1).getDate()}`;
  }else{
    formDate.value = `${currentYear}-${currentMonth}-${currentDate}`;
  }

  formDate.min = formDate.value;
  formDate.max = `${d.getFullYear()}-${maxMonth}-${d.getDate()}`;
 }
}

window.addEventListener("load", () => {
  setCurrentTime();
  setCurrentDate();
});

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
