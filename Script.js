let expenses = [];
let totalAmount = 0;
let categoryTotals = {};

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expnese-table-body');
const totalAmountCell = document.getElementById('total-amount');
const confirmBtn = document.getElementById('confirmBtn');
let myChart;

addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <=0 ) {
        alert('Please enter a valid amount')
        return;
    }
    if(date === '') {
        alert('Please select a date')
        return;
    }

    // Update category totals
    if (categoryTotals[category]) {
        categoryTotals[category] += amount;
    } else {
        categoryTotals[category] = amount;
    }

    expenses.push({category, amount, date});

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    updateChart();
    updateTable();
});

function updateChart() {
    const xValues = Object.keys(categoryTotals);
    const yValues = Object.values(categoryTotals);
    const barColors = ["red", "green", "blue", "orange"];

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart("myChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            title: {
                display: true,
                text: "Your Finances"
            }
        }
    });
}

function updateTable() {
    // Clear existing rows
    while (expensesTableBody.firstChild) {
        expensesTableBody.removeChild(expensesTableBody.firstChild);
    }

    // Add new rows
    for (const expense of expenses) {
        const newRow = expensesTableBody.insertRow();
        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();
        const deleteBtn = document.createElement('button');

        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            // Update category totals
            categoryTotals[expense.category] -= expense.amount;

            totalAmount -= expense.amount;
            totalAmountCell.textContent = totalAmount;

            expenses.splice(expenses.indexOf(expense), 1);
            expensesTableBody.removeChild(newRow);

            updateChart();
        });

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount;
        dateCell.textContent = expense.date;
        deleteCell.appendChild(deleteBtn);
    }
}

confirmBtn.addEventListener('click', function () {
    var result = confirm("Do you want to confirm?");
    if (result == true) {
        // Perform confirmation actions
    }
});
