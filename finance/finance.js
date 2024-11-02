let isAdding = false;
let isEditing = false;
let selectedRow = null;

function Add() {
    if (isAdding || isEditing) return;
    const activeTab = document.querySelector('.income').style.display === 'block' ? 'income-finance' : 'expense-finance';
    const table = document.getElementById(activeTab);
    const newRow = table.insertRow(-1);
    const dateCell = newRow.insertCell(0);
    const incomeCell = newRow.insertCell(1);
    const noteCell = newRow.insertCell(2);
    const removeCell = newRow.insertCell(3);
    dateCell.innerHTML = `<input type="text" id="date" placeholder="Date" style="width: 100px;">`;
    incomeCell.innerHTML = `<input type="number" id="income" placeholder="Income" style="width: 100px;">`;
    noteCell.innerHTML = `<input type="text" id="note" placeholder="Note" style="width: 100px;">`;

    removeCell.innerHTML = `<div class="button remove-button ti-minus" onclick="Remove()"></div>`;
    
    isAdding = true;
    document.getElementById("date").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            Handle();
        }
    });
    document.getElementById("income").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            Handle();
        }
    });
    document.getElementById("note").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            Handle();
        }
    });
}

function Handle() {
    const dateInput = document.getElementById("date").value;
    const incomeInput = document.getElementById("income").value;
    const noteInput = document.getElementById("note").value; // Default to an empty string if noteInput is empty

    if (dateInput && incomeInput) {
        const activeTab = document.querySelector('.income').style.display === 'block' ? 'income-finance' : 'expense-finance';
        const table = document.getElementById(activeTab);
        const lastRow = table.rows[table.rows.length - 1];
        lastRow.cells[0].textContent = dateInput;
        lastRow.cells[1].textContent = `$${parseFloat(incomeInput).toFixed(2)}`;
        lastRow.cells[2].textContent = noteInput;
        isAdding = false;
    } else {
        alert("Please enter both Date and Income.");
    }
}

function Remove() {
    const activeTab = document.querySelector('.income').style.display === 'block' ? 'income-finance' : 'expense-finance';
    const table = document.getElementById(activeTab);
    
    if (table.rows.length > 1) {
        table.deleteRow(table.rows.length - 1); 
        isAdding = false;
    } else {
        alert("No rows left to delete");
    }
}
function Edit() {
    isEditing = true;
    const activeTab = document.querySelector('.income').style.display === 'block' ? 'income-finance' : 'expense-finance';
    const table = document.getElementById(activeTab);
    
    if (table.rows.length < 1) {
        alert("No rows left to edit.");
    }
    isEditing = false;

    for (let i = 1; i < table.rows.length; i++) { 
        table.rows[i].onclick = function () {
            if (selectedRow) {
                selectedRow.style.backgroundColor = ""; 
            }
            selectedRow = this; 
            selectedRow.style.backgroundColor = "#f0f0f0";
        };
    }
    if (selectedRow) {
        const dateCell = selectedRow.cells[0];
        const incomeCell = selectedRow.cells[1];
        const noteCell = selectedRow.cells[2];
        dateCell.innerHTML = `<input type="text" id="editDate" value="${dateCell.textContent}" style="width: 100px;">`;
        incomeCell.innerHTML = `<input type="number" id="editIncome" value="${incomeCell.textContent.replace('$', '')}" style="width: 100px;">`;
        noteCell.innerHTML = `<input type="text" id="editNote" value="${noteCell.textContent}" style="width: 100px;">`;

        isEditing = true;
        document.getElementById("editNote").addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
                saveEdit();
            }
        });
    }
    function saveEdit() {
        const dateInput = document.getElementById("editDate").value;
        const incomeInput = document.getElementById("editIncome").value;
        const noteInput = document.getElementById("editNote").value;
    
        if (dateInput && incomeInput && noteInput) {
            selectedRow.cells[0].textContent = dateInput;
            selectedRow.cells[1].textContent = `$${parseFloat(incomeInput).toFixed(2)}`;
            selectedRow.cells[2].textContent = noteInput;
            selectedRow.style.backgroundColor = "";
            selectedRow = null;
            isEditing = false; 
        } else {
            alert("Please enter information");
        }
    }
}
function Save() {
    const activeTab = document.querySelector('.income').style.display === 'block' ? 'income-finance' : 'expense-finance';
    const table = document.getElementById(activeTab);

    if (table.rows.length > 1) {
        alert("Save successful.");
    } else {
        alert("No rows left to save.");
    }
    isEditing = false;
    saveMonthlyIncome();
    calculateTotalIncome();
}
function showTab(tab) {
    const incomeTab = document.querySelector('.income');
    const expenseTab = document.querySelector('.expense');

    if (tab === 'income') {
        incomeTab.style.display = 'block';
        expenseTab.style.display = 'none';

    } else if (tab === 'expense') {
        incomeTab.style.display = 'none';
        expenseTab.style.display = 'block';
    }
    isAdding = false;
    selectedRow = null;
}

// Initialize an array to store monthly incomes
const monthlyIncomes = Array(12).fill(0);

function saveMonthlyIncome() {
    // Reset the monthly incomes
    monthlyIncomes.fill(0);

    // Get the active table (either income or expense)
    const activeTab = document.querySelector('.income').style.display === 'block' ? 'income-finance' : 'expense-finance';
    const table = document.getElementById(activeTab);
    
    // Iterate through the rows of the table
    for (let i = 1; i < table.rows.length; i++) {
        const row = table.rows[i];
        const date = row.cells[0].textContent;
        const income = parseFloat(row.cells[1].textContent.replace('$', ''));
        
        // Extract month from the date
        const dateParts = date.split('/');
        const month = parseInt(dateParts[1], 10) - 1; // Convert to 0-based index
        
        if (!isNaN(month) && month >= 0 && month < 12) {
            // Add the income to the corresponding month
            monthlyIncomes[month] += income;
        }
    }
}

function displayTotalIncome() {
    const dropdown = document.getElementById('monthlyIncomeDropdown');
    const selectedMonth = parseInt(dropdown.value, 10);
    const totalIncomeElement = document.getElementById('totalIncome');

    if (!isNaN(selectedMonth)) {
        const totalIncome = monthlyIncomes[selectedMonth];
        totalIncomeElement.textContent = `$${totalIncome.toFixed(2)}`;
    } else {
        totalIncomeElement.textContent = '$0.00';
    }
}

// Example of setting the dropdown and total income initially
document.getElementById('monthlyIncomeDropdown').value = '';
document.getElementById('totalIncome').textContent = '$0.00';

function displayCurrentYear() {
    const currentYearElement = document.getElementById('currentYear');
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
}

// Call the function to set the current year on page load
displayCurrentYear();

function calculateTotalIncome() {
    const totalIncome = monthlyIncomes.reduce((acc, income) => acc + income, 0);
    const total = document.getElementById('totalYear');
    total.textContent = `$${total.toFixed(2)}`;
}

document.getElementById('totalYear').textContent = '$0.00';