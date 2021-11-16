// fetcha header-image
async function fetchImg() {
    const response = await fetch('https://api.unsplash.com//photos/random?client_id=MrBKjudpbn-DaRLVMzoMnS-_1SsFcfWXYBUaSGDkMlw')
    response.json()
    .then( res =>  {
        document.querySelector("header").style.backgroundImage = `url('${res.urls.small}')`;
    });
}

window.addEventListener('load', fetchImg);

document.querySelector("#date").defaultValue = new Date().toISOString().slice(0, 10);

// empty array to store the input value
const inputBalance = [];
const inputIncome = [];
const inputCosts = [];

// variable to store balance
let saldo = 0;

// function for show the input on site
function saveInput(e) {
    e.preventDefault();

    // variables for input value
    let inputDesc = document.querySelector("#description").value;
    let inputValue = document.querySelector("#value").value;
    let inputDate = document.querySelector("#date").value;
    let inputCounter = document.querySelector("#counter").value;

    // store input value in object, to push to array. Use to filter later
    var totInput = {
        description: inputDesc,
        value: inputValue,
        date: inputDate,
        counter: inputCounter
    }

    // pusha objectet to array
    inputBalance.push(totInput);

    const tr = document.createElement("tr");
    let balance = document.querySelector(".balance");

    // if statement to place input in either income or costs
    if (inputCounter === "plus") {
        inputIncome.push(totInput);
        tr.innerHTML = `<td>${inputDate}</td> <td>${inputDesc}</td> <td>+${inputValue}</td>`;
        tr.classList.add("green");
        document.querySelector("tbody").appendChild(tr);
        saldo += Number(inputValue);
        balance.innerHTML = `Balance: ${saldo}:-`;
        localStorage.setItem("income", JSON.stringify(inputIncome));
    } else {
        inputCosts.push(totInput);
        tr.innerHTML = `<td>${inputDate}</td> <td>${inputDesc}</td> <td>-${inputValue}</td>`;
        tr.classList.add("red");
        document.querySelector("tbody").appendChild(tr);
        saldo -= Number(inputValue);
        balance.innerHTML = `Balance: ${saldo}:-`
        localStorage.setItem("costs", JSON.stringify(inputCosts));
    }
    // reset form after every input
    document.querySelector("form").reset();
}

// addEventListener for btn
document.querySelector("#btn").addEventListener('click', saveInput);