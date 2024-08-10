// import {createUser} from "fetchHelper.js"


document.addEventListener("DOMContentLoaded", () => {
    let createAppointmentBtn = document.querySelector(".create-appointment-btn");
    let addFoodItemBtn = document.querySelector("#add-food-item");
    let testApiBtn = document.querySelector("#test-food-api");
    let donationsContainer = document.querySelector(".donations");


    createAppointmentBtn.addEventListener("click", (event) => {
        event.preventDefault();
        let username = document.querySelector("#create-appointment-user").value;
        let date = document.querySelector("#create-appointment-date").value;
        let description = document.querySelector("#create-appointment-description").value;

        //this function create a new appointments in the database
        createAppointment(username, date, description)

        document.querySelector("#create-appointment-user").value = ""
        document.querySelector("#create-appointment-date").value = ""
        document.querySelector("#create-appointment-description").value = ""
    })

    addFoodItemBtn.addEventListener("click", (event) => {
        event.preventDefault();
        let element = document.createElement("div");
        element.classList.add("row")
        element.innerHTML = `<select name="food-options" id="">
                            <option value="n/a">Select Your Donation</option>
                            <option value="Potato">Potato</option>
                            <option value="Tomato">Tomato</option>
                            <option value="Onion">Onion</option>
                            <option value="Cucumber">Cucumber</option>
                            <option value="Pumpkin">Pumpkin</option>
                            <option value="Apples">Apples</option>
                            <option value="Oranges">Oranges</option>
                            <option value="Bananas">Bananas</option>
                            <option value="Peaches">Peaches</option>
                        </select>
                        <!-- <input type="" placeholder="Description" id="create-appointment-description"> -->
                        <input type="number" placeholder="Qty (In Pounds)" id="create-appointment-description">`
        console.log(element)
        donationsContainer.appendChild(element)
        // extractItems();
        // clearForm(donationsContainer)
    })

    testApiBtn.addEventListener("click", (event) => {

        console.log(extractItems())
    })

});

// helper to get an array of items in the form
function extractItems() {
    let foodItems = [];
    let rows = document.querySelectorAll(".donations .row");

    rows.forEach(row => {
        let foodOption = row.querySelector("select[name='food-options']").value;
        let weight = row.querySelector("input[type='number']").value;

        if (foodOption !== "n/a" && weight > 0) {
            foodItems.push({
                food: foodOption,
                weight: weight
            });
        }
    });

    // console.log(foodItems);
    return foodItems;
}

//helper to reset the form after submitting
function clearForm(donationsContainer) {
    donationsContainer.innerHTML = `<div class="row">
                        <select name="food-options" id="">
                            <option value="n/a">Select Your Donation</option>
                            <option value="Potato">Potato</option>
                            <option value="Tomato">Tomato</option>
                            <option value="Onion">Onion</option>
                            <option value="Cucumber">Cucumber</option>
                            <option value="Pumpkin">Pumpkin</option>
                            <option value="Apples">Apples</option>
                            <option value="Oranges">Oranges</option>
                            <option value="Bananas">Bananas</option>
                            <option value="Peaches">Peaches</option>
                        </select>
                        <!-- <input type="" placeholder="Description" id="create-appointment-description"> -->
                        <input type="number" placeholder="Qty (In Pounds)" id="create-appointment-description">
                    </div>`
}

























// ______________________________________________________________________________________
// ______________________________________________________________________________________
// ______________________________________________________________________________________
//API Access to backend
let server = "https://group-project-api.onrender.com";
// let server = "http://localhost:3000";


// creates a new user
function createUser(username, password, first, last) {
    const data = {
        username: username,
        password: password,
        first: first,
        last: last
    };

    fetch(`${server}/api`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error('Server responded: ' + text);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('New User Created:', data.username);
            alert("New User Created: " + data.username)
        })
        .catch(error => {
            console.error('Error:', error.message);
            alert(error.message);
        });
}



function createAppointment(username, date, description) {
    const data = {
        user: username,
        date: date,
        description: description
    };

    fetch(`${server}/create-appointment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error('Server responded: ' + text);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('New appointment created:', data);
            alert("New appointment created for " + data.user + " at " + data.date)
        }) // todo create item food connected to this appntmnt
        .catch(error => {
            console.error('Error:', error.message);
            alert(error.message);
        });
}

// todo create item food 
function createFoodItems(foodInfo, appointmentID) {
    let data = {
        appointmentID: appointmentID,
        foodInfo: foodInfo
    }

    fetch(`${server}/create-food-items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error('Server responded: ' + text);
            });
        }
        return response.json();
    }).then(data => {
        console.log('New food item created:', data);
        // alert("New appointment created for " + data.user + " at " + data.date)
    })
}


// returns an array of all appointments for a user
function getAllAppointments(username) {
    fetch(`${server}/get-appointments?username=${username}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            return response.text().then(errorText => {
                throw new Error("error: server responded: " + errorText);
            })
        }

        return response.json();
    }).then(dataJSON => {
        // let usernames = dataJSON.map(object => object.username)
        console.log('Appointments Data:', dataJSON);
        alert("Appointments Data: " + JSON.stringify(dataJSON));
    }).catch(error => {
        console.error("Error: ", error.message);
        alert(error.message)
    })
}




// returns an array of all users
function getAllUsers() {
    fetch(`${server}/api`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            return response.text().then(errorText => {
                throw new Error("error: server responded: " + errorText);
            })
        }

        return response.json();
    }).then(dataJSON => {
        // let usernames = dataJSON.map(object => object.username)
        console.log('Users Data:', dataJSON);
        alert("User Data: " + JSON.stringify(dataJSON));
    }).catch(error => {
        console.error("Error: ", error.message);
        alert(error.message)
    })
}