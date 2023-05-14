const modalContainer = document.querySelector(".modal-container");
const modalContent = document.querySelector(".modal-content");
const actionConfirmationBox = document.querySelector(".action-confirmation-box");
const actionResultBox = document.querySelector(".action-result-box");
const modalHeading = document.querySelector(".modal-heading");
const modalMessageAc = document.querySelector(".ac-modal-message");
const modalMessageAr = document.querySelector(".ar-modal-message");
const editBtn = document.querySelectorAll(".launch-edit-modal");
const deleteBtn = document.querySelectorAll(".launch-delete-modal");
const okAc = document.getElementById("ac-ok");
const okAr = document.getElementById("ar-ok");
const cancel = document.getElementById("ac-cancel");
const editform = document.getElementById("edit-reservation");
const closeEdit = document.querySelectorAll("[data-close-edit]");

closeEdit.forEach(close => {
    close.addEventListener("click", () => {
        editform.style.display = "none";
        modalContainer.style.display = "none";
        document.body.classList.remove('nav-active');
    });
});

editBtn.forEach(btn => {
    btn.addEventListener("click", (event) => {
        let target = event.target;
        let bookingID;
        while (target.parentNode) {
            if (target.dataset.idHolder) {
                bookingID = target.dataset.idHolder
                break;
            }
            target = target.parentNode;
        }
        setCurrentDate();
        setCurrentTime();
        modalContainer.style.display = "flex";
        actionConfirmationBox.style.display = "flex";
        actionResultBox.style.display = "flex";
        document.body.classList.add('nav-active');
        modalHeading.innerHTML = "Edit Reservation";
        modalMessageAc.innerHTML = "Are you sure you want to edit your reservation ID: " + bookingID + " ?";
        okAc.addEventListener("click", () => {
            actionConfirmationBox.style.display = "none";
            actionResultBox.style.display = "none";
            editform.style.display = "flex";

            // if (true) {
            //     let xhttp = new XMLHttpRequest();
            //     const formData = new FormData(form);
            //     const encodedData = new URLSearchParams(formData).toString();
            //     xhttp.open("POST", "/waitlist", true);
            //     xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            //     xhttp.send(encodedData);
            //     xhttp.onreadystatechange = function () {
            //         if (this.readyState == 4 && this.status == 200) {
            //             const responseText = JSON.parse(this.responseText);
            //             console.log(responseText);
            //             if (responseText.redirect) {
            //                 window.location.href = responseText.redirect;
            //             } else {
            //                 if (responseText.waitlist) {
            //                     bookingFailure.classList.add("gone");
            //                     waitlist.classList.add("show");
            //                 } else {
            //                     wEDate.innerHTML = bookingDate.innerHTML;
            //                     wETime.innerHTML = bookingTime.innerHTML;
            //                     wEDiner.innerHTML = bookingDiner.innerHTML;
            //                     bookingFailure.classList.add("gone");
            //                     waitlistExists.classList.add("show");
            //                 }
            //             }
            //         }
            //     };
            // }
        });
    });
});

/**
 * * Edit reservation-form 
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
    } else if (date.getHours() == 21 && date.getMinutes() < 30) {
        currentMinute = "30";
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
    formDate.addEventListener("input", () => {
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

/*  */

deleteBtn.forEach(btn => {
    btn.addEventListener("click", (event) => {
        let target = event.target;
        let bookingID;
        while (target.parentNode) {
            if (target.dataset.idHolder) {
                bookingID = target.dataset.idHolder
                break;
            }
            target = target.parentNode;
        }
        modalContainer.style.display = "flex";
        document.body.classList.add('nav-active');
        modalHeading.innerHTML = "Cancel Reservation";
        modalMessageAc.innerHTML = "Are you sure you want to cancel your reservation ID: " + bookingID + " ?";
        okAc.addEventListener("click", () => {
            let xhttp = new XMLHttpRequest();
            xhttp.open("DELETE", `bookings/${bookingID}`, true);
            xhttp.send();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const responseText = JSON.parse(this.responseText);
                    const pageUrl = window.location.href;
                    if (responseText.redirect) {
                        window.location.href = responseText.redirect;
                    } else {
                        console.log(responseText);
                        actionConfirmationBox.classList.add("gone");
                        cancel.style.display = "none";
                        actionResultBox.classList.add("show");
                        setTimeout(() => {
                            actionConfirmationBox.style.display = "none";
                        }, 1000);
                        if (responseText.status) {
                            modalMessageAr.innerHTML = "Your reservation ID: " + responseText.deletedId + " has been cancelled.";
                            okAr.addEventListener("click", () => {
                                modalContainer.style.display = "none";
                                document.body.classList.remove("nav-active");
                                window.location.href = pageUrl;
                            });
                        } else {
                            modalMessageAr.innerHTML = responseText.message;
                            okAr.addEventListener("click", () => {
                                modalContainer.style.display = "none";
                                document.body.classList.remove("nav-active");
                            });
                        }
                    }
                }
            };
        });
    });
});

cancel.addEventListener("click", () => {
    modalContainer.style.display = "none";
    document.body.classList.remove('nav-active');
});

