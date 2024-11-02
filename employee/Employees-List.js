const employeeList = document.getElementById("employee-list");
const employeeNameInput = document.getElementById("employeeName");
const employeeGenderInput = document.getElementById("gender");
const employeeTimeInput = document.getElementById("employeeTime");
const employeeShiftworkInput = document.getElementById("employeeShiftwork");
const employeeInput = document.getElementById("employeeInput");
let currentRow1, currentRow2;

const openProlile = document.querySelector('.js-open-profile');
const modal = document.querySelector('.user-menu');
const stopModal = document.querySelector('.js-close-profile');
const closeModal = document.querySelector('body');

function showMenu() {
    modal.classList.add('open');
}

function hideMenu() {
    modal.classList.remove('open');
}
closeModal.addEventListener('click', hideMenu);
openProlile.addEventListener('click', showMenu);
stopModal.addEventListener('click', function(event) {
    event.stopPropagation();
});

function showEmployeeList() {
    employeeInput.style.display = "block";
    employeeNameInput.value = "";
    employeeGenderInput.value = "";
    employeeTimeInput.value = "";
    employeeShiftworkInput.value = "";
    employeeNameInput.focus();
    editMode = false;
}

function saveEmployList() {
    const name = employeeNameInput.value;
    const gender = employeeGenderInput.value;
    const time = employeeTimeInput.value;
    const shiftwork = employeeShiftworkInput.value;
    if (name && gender && time && shiftwork) {
        if (editMode && currentRow1 && currentRow2) {
            currentRow1.cells[0].textContent = name;
            currentRow1.cells[1].textContent = `Time: ${time} months`;
            currentRow2.cells[0].textContent = `Gender: ${gender}`;
            currentRow2.cells[1].textContent = `Shift-work: ${shiftwork}`;
        } else {
            const newRow1 = employeeList.insertRow(-1);
            const newRow2 = employeeList.insertRow(-1);
            newRow1.insertCell(0).textContent = name;
            newRow1.insertCell(1).textContent = `Time: ${time} months`;
            newRow2.insertCell(0).textContent = `Gender: ${gender}`;
            newRow2.insertCell(1).textContent = `Shift-work: ${shiftwork}`;
        }
        employeeInput.style.display = "none";
        clearInputs();
    } else {
        alert("Please enter all employee information");
    }
}

function deleteEmployee() {
    const rows = employeeList.rows;
    if (rows.length > 1) {
        employeeList.deleteRow(rows.length - 1);
        employeeList.deleteRow(rows.length - 1);
    } else {
        alert("No employee information to delete");
    }
}

function sortEmployeeList() {
    const tbody = employeeList.querySelector('tbody');
    const rows = Array.from(tbody.rows);
    const pairs = [];

    // Nhóm các hàng thành các cặp
    for (let i = 0; i < rows.length; i += 2) {
        if (i + 1 < rows.length) {
            pairs.push([rows[i], rows[i + 1]]);
        }
    }

    // Sắp xếp các cặp dựa trên tên nhân viên
    pairs.sort((a, b) => {
        const nameA = a[0].cells[0].textContent.toLowerCase();
        const nameB = b[0].cells[0].textContent.toLowerCase();
        return nameA.localeCompare(nameB);
    });

    // Xóa nội dung hiện tại của tbody
    tbody.innerHTML = '';

    // Thêm lại các cặp hàng đã sắp xếp
    pairs.forEach(pair => {
        tbody.appendChild(pair[0]);
        tbody.appendChild(pair[1]);
    });
}

function clearInputs() {
    employeeNameInput.value = "";
    employeeGenderInput.value = "";
    employeeTimeInput.value = "";
    employeeShiftworkInput.value = "";
}

// Function to filter employees by shift work
function filterEmployeesByShift() {
    const morningShift = [];
    const afternoonShift = [];
    const nightShift = [];
    const rows = employeeList.rows;

    for (let i = 1; i < rows.length - 1; i += 2) {
        const name = rows[i].cells[0].textContent;
        const shiftwork = rows[i + 1].cells[1].textContent.replace('Shift-work: ', '');

        if (shiftwork === 'Morning') {
            morningShift.push(name);
        } else if (shiftwork === 'Afternoon') {
            afternoonShift.push(name);
        } else if (shiftwork === 'Night') {
            nightShift.push(name);
        }
    }

    return {
        morningShift,
        afternoonShift,
        nightShift
    };
}


// Function to print the filtered employee lists
function printFilteredEmployees(shift) {
    const employees = filterEmployeesByShift();
    let shiftEmployees;

    if (shift === 'Morning') {
        shiftEmployees = employees.morningShift;
    } else if (shift === 'Afternoon') {
        shiftEmployees = employees.afternoonShift;
    } else if (shift === 'Night') {
        shiftEmployees = employees.nightShift;
    }

    console.log(`Employees working the ${shift} shift:`);
    shiftEmployees.forEach(employee => {
        console.log(`- ${employee}`);
    });
}

// Event listeners
document.querySelector('.addbutton').addEventListener('click', showEmployeeList);
document.querySelector('.deletebutton').addEventListener('click', deleteEmployee);
document.querySelector('.sortbutton').addEventListener('click', sortEmployeeList);

employeeNameInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        saveEmployList();
    }
});
employeeGenderInput.addEventListener("change", function() {
    if (this.value) {
        employeeTimeInput.focus();
    }
});
employeeTimeInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        employeeShiftworkInput.focus();
    }
});
employeeShiftworkInput.addEventListener("change", function() {
    if (this.value) {
        saveEmployList();
    }
});

// Thêm event submit cho form
document.getElementById('employeeInput').addEventListener('submit', function(event) {
    event.preventDefault();
    saveEmployList();
});

// Dropdown button event listener
document.querySelector('.dropdown-item.morning').addEventListener('click', function() {
    printFilteredEmployees('morning');
});

document.querySelector('.dropdown-item.afternoon').addEventListener('click', function() {
    printFilteredEmployees('afternoon');
});

document.querySelector('.dropdown-item.night').addEventListener('click', function() {
    printFilteredEmployees('night');
});

