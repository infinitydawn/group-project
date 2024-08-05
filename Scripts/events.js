document.addEventListener("DOMContentLoaded", () => {
    let getAllAppointmentsBtn = document.querySelector(".get-all-appointments-btn");


    getAllAppointmentsBtn.addEventListener("click", (event) => {
        event.preventDefault()
        let username = document.querySelector("#get-appointment-user").value;
        let appointmentTime = document.querySelector(".appointment-time");
        let appointmentDesc = document.querySelector(".appointment-desc");
        let appointmentID = document.querySelector(".appointment-id");
        let container = document.querySelector(".appointments-container");

        getAllAppointments(username).then(apptData => {
            document.querySelector("#get-appointment-user").value = ""

            let htmlVal = ""

            apptData.forEach(element => {
                htmlVal += `<div class="appointments-item">
                <div class="row"><div>Appointment #: </div><p class="appointment-id">${element._id}</p></div>
                <div class="row"><div>DATE: </div><p class="appointment-time">${element.date}</p></div>
                <div class="row"><div>INFO: </div><p class="appointment-desc">${element.description}</p></div>
            </div>`
            });

            appointmentTime.value = apptData[0].date;

            container.innerHTML = htmlVal;

            console.log("appoitnmetnns data new: " + JSON.stringify(apptData))
        });
    })

});



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
        })
        .catch(error => {
            console.error('Error:', error.message);
            alert(error.message);
        });
}


// returns an array of all appointments for a user
function getAllAppointments(username) {
    return fetch(`${server}/get-appointments?username=${username}`, {
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
        return dataJSON;
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