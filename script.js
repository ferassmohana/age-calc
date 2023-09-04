
const form = document.getElementById('form');

const day_label = document.getElementById("day_label");
const month_label = document.getElementById("month_label");
const year_label = document.getElementById("year_label");

const day_input = document.getElementById("day_input");
const month_input = document.getElementById("month_input");
const year_input = document.getElementById("year_input");

const day_message = document.getElementById("day_message");
const month_message = document.getElementById("month_message");
const year_message = document.getElementById("year_message");

let currentYear = new Date().getFullYear();

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function calculateAge(birthdate) {
    const today = new Date();
    const birth = new Date(birthdate);

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
        years--;
        months += 12;
    }

    if (days < 0) {
        const lastMonthDate = new Date(today.getFullYear(), today.getMonth() - 1, birth.getDate());
        days = Math.floor((today - lastMonthDate) / (1000 * 60 * 60 * 24));
    }

    if (today.getMonth() > birth.getMonth() && (days < 30)) {
        months--;
    }

    return { years, months, days };
}

function convertNumberToYear(number) {
    var year = new Date(number, 0).getFullYear();
    return year;
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    let checkCount = 0;

    // Validation of month
    // Check if month input is empty or not.
    if (month_input.value.trim().length == 0) {
        month_label.classList.add('error');
        month_input.classList.add('error');
        month_message.classList.add('active');
        month_message.textContent = "This field is required!";
        checkCount--;
    } else {
        month_label.classList.remove('error');
        month_input.classList.remove('error');
        month_message.classList.remove('active');
        checkCount++;
    }
    // Check if the month-input is valid
    if (month_input.value.trim().length) {
        if (1 > month_input.value || month_input.value > 12) {
            month_label.classList.add('error');
            month_input.classList.add('error');
            month_message.classList.add('active');
            month_message.textContent = "Must be valid month!";
            checkCount--;
        } else {
            month_label.classList.remove('error');
            month_input.classList.remove('error');
            month_message.classList.remove('active');
            checkCount++;
        }
    }

    // Validation of year
    // Check if year input is empty or not.
    if (year_input.value.trim().length == 0) {
        year_label.classList.add('error');
        year_input.classList.add('error');
        year_message.classList.add('active');
        year_message.textContent = "This field is required!";
        checkCount--;
    } else {
        year_label.classList.remove('error');
        year_input.classList.remove('error');
        year_message.classList.remove('active');
        checkCount++;
    }
    // check if input-year is bigger than the current year
    if (year_input.value.trim().length) {
        if (year_input.value > currentYear) {
            year_label.classList.add('error');
            year_input.classList.add('error');
            year_message.classList.add('active');
            year_message.textContent = "Must be in the past!";
            checkCount--;
        }
        else {
            year_label.classList.remove('error');
            year_input.classList.remove('error');
            year_message.classList.remove('active');
            checkCount++;
        }
    }

    // Validation of day
    // Check if day input is empty or not.
    if (day_input.value.trim().length == 0) {
        day_label.classList.add('error');
        day_input.classList.add('error');
        day_message.classList.add('active');
        day_message.textContent = "This field is required!";
        checkCount--;
    } else {
        day_label.classList.remove('error');
        day_input.classList.remove('error');
        day_message.classList.remove('active');
        checkCount++;
    }
    // Check the day is valid or not
    if (day_input.value.trim().length) {
        if (day_input.value > daysInMonth(Number(month_input.value), Number(year_input.value))) {
            day_label.classList.add('error');
            day_input.classList.add('error');
            day_message.classList.add('active');
            day_message.textContent = "Enter a valid day!";
            checkCount--;
        } else {
            day_label.classList.remove('error');
            day_input.classList.remove('error');
            day_message.classList.remove('active');
            checkCount++;
        }
    }

    // Check Validation of the input in the same year!
    if (year_input.value == new Date().getFullYear()) {
        if (month_input.value > new Date().getMonth() + 1) {
            month_label.classList.add('error');
            month_input.classList.add('error');
            month_message.classList.add('active');
            month_message.textContent = "Must be in the past!";
            checkCount--;
        } else {
            month_label.classList.remove('error');
            month_input.classList.remove('error');
            month_message.classList.remove('active');
            checkCount++;
        }
        if ((month_input.value == new Date().getMonth() + 1) && (day_input.value > new Date().getDate())) {
            day_label.classList.add('error');
            day_input.classList.add('error');
            day_message.classList.add('active');
            day_message.textContent = "Must be in the past!";
            checkCount--;
        } else {
            day_label.classList.remove('error');
            day_input.classList.remove('error');
            day_message.classList.remove('active');
            checkCount++;
        }
    } else {
        checkCount += 2;
    }

    if (checkCount === 8) {
        let years = year_input.value;
        let months = Number(month_input.value);
        let days = Number(day_input.value);
        if (years.length == 1) {
            years = "000" + years;
            Number(years)
        } else if (years.length == 2) {
            years = "00" + years;
            Number(years)
        } else if (years.length == 3) {
            years = "0" + years;
            Number(years)
        }
        const birthdate = `${years}-${months}-${days}`;
        const age = calculateAge(birthdate);

        const days_value_attribute = document.createAttribute("data-target");
        days_value_attribute.value = age.days;
        const months_value_attribute = document.createAttribute("data-target");
        months_value_attribute.value = age.months;
        const years_value_attribute = document.createAttribute("data-target");
        years_value_attribute.value = age.years;

        document.getElementById("day_value").setAttributeNode(days_value_attribute);
        document.getElementById("month_value").setAttributeNode(months_value_attribute);
        document.getElementById("year_value").setAttributeNode(years_value_attribute);

        const counters = document.querySelectorAll('.output-value');
        const speed = 999999;

        counters.forEach(counter => {
            counter.textContent = "0";
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                const increment = Math.ceil(target / speed);

                if (count < target) {
                    counter.innerText = count + increment;
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    }
})