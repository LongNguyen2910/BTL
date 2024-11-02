const Morning = ["Nguyen Van A", "Nguyen Thi B"]; // Example morning shift employees
const Afternoon = ["Nguyen Quang C", "Nguyen Kieu D"]; // Example afternoon shift employees
const Night = ["Nguyen Thi E", "Nguyen Van F"]; // Example night shift employees
function displayShiftWork(shift) {
    const shiftList = document.getElementById('shift-list');
    const shiftDropdown = document.getElementById('shiftDropdown');
    shiftList.innerHTML = ''; // Clear the existing list

    let employees
    if (shift === 'Morning') {
        employees = Morning;
    } else if (shift === 'Afternoon') {
        employees = Afternoon;
    } else if (shift === 'Night') {
        employees = Night;
    }

    // Update the shift title and dropdown button text
    shiftDropdown.textContent = `${shift} Shift`;

    // Add the employees to the list
    employees.forEach(employee => {
        const li = document.createElement('li');
        li.textContent = employee;
        li.className = 'list-group-item';
        shiftList.appendChild(li);
    });
}
displayShiftWork('Morning');

function updateDate() {
    const dateElement = document.getElementById('current-date');
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = `Date: ${currentDate.toLocaleDateString(undefined, options)}`;
}

// Call the function to set the date on page load
updateDate();

// Optional: Update the date every second (1000 milliseconds)
setInterval(updateDate, 1000);
