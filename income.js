document.querySelector("#dateFilter").defaultValue = new Date().toISOString().slice(0, 10);

// get localStorage data, convert to js object
let savedIncome = localStorage.getItem("income");
let jsonOutput = JSON.parse(savedIncome);

let outputIncome = jsonOutput.map(saved => "<td>" + saved.date + "</td><td>" + saved.description + "</td><td>" + saved.value + ":- </td>");

// function for show income input from localStorage
function getIncome() {
    truncateTable()

    for (let i = 0; i < outputIncome.length; i++) {
        const tableRow = document.createElement("tr")
        tableRow.classList.add("trRow");
        let output = document.querySelector("tbody");
        output.appendChild(tableRow);
        tableRow.innerHTML = outputIncome[i];
    }
}

document.querySelector("#getIncome").addEventListener('click', getIncome);

// function to show input based on chosen from-date
function filterByDate() {
    truncateTable();

    let chosenDate = document.querySelector("#dateFilter").value;

    jsonOutput.filter(e => {
        if (chosenDate <= e.date) {
            const tableRow = document.createElement("tr")
            document.querySelector("tbody").appendChild(tableRow).innerHTML = `<td>${e.date}</td><td>${e.description}</td><td>${e.value}:-</td>`;
        }
    });
}

document.querySelector("#btnFilter").addEventListener('click', filterByDate);

// function for remove previous rows
function truncateTable() {
    let rowCount = document.querySelector("#outputIncome").rows.length;
    for (let i = rowCount - 1; i > 0; i--) {
        document.querySelector("#outputIncome").deleteRow(i);
    }
}