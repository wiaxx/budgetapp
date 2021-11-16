document.querySelector("#dateFilter").defaultValue = new Date().toISOString().slice(0, 10);

// get localStorage data, convert to js object
let savedCosts = localStorage.getItem("costs");
let jsonCostOutput = JSON.parse(savedCosts);

let outputCosts = jsonCostOutput.map(saved => "<th>" + saved.date + "</th><th>" + saved.description + "</th><th>" + saved.value + ":- </th>");

// function for show income input from localStorage
function getCosts() {
    truncateTable();

    for (let i = 0; i < outputCosts.length; i++) {
        const tableRow = document.createElement("tr");
        tableRow.classList.add("trRow");
        let output = document.querySelector("tbody");
        output.appendChild(tableRow);
        tableRow.innerHTML = outputCosts[i];
    }
}

document.querySelector("#showCosts").addEventListener('click', getCosts);

// function to show input based on chosen from-date
function filterByDate() {
    truncateTable();

    let chosenDate = document.querySelector("#dateFilter").value;

    jsonCostOutput.filter(e => {
        if (chosenDate <= e.date) {
            const tableRow = document.createElement("tr")
            document.querySelector("tbody").appendChild(tableRow).innerHTML = `<td>${e.date}</td><td>${e.description}</td><td>${e.value}:-</td>`;
        }
    });
}

document.querySelector("#btnFilter").addEventListener('click', filterByDate);

// // function for remove previous rows
function truncateTable() {
    let rowCount = document.querySelector("#outputCosts").rows.length;
    for (let i = rowCount - 1; i > 0; i--) {
        document.querySelector("#outputCosts").deleteRow(i);
    }
}