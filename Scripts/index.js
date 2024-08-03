// import {createUser} from "fetchHelper.js"


document.addEventListener("DOMContentLoaded", () => {
    let createUserBtn = document.querySelector(".create-user-btn");
    let getAllUsersBtn = document.querySelector(".get-all-users-btn");
    let createAppointmentBtn = document.querySelector(".create-appointment-btn");
    let getAllAppointmentsBtn = document.querySelector(".get-all-appointments-btn");

    createUserBtn.addEventListener("click", (event) => {
        event.preventDefault();
        let username = document.querySelector("#create-username").value;
        let password = document.querySelector("#create-password").value;
        let first = document.querySelector("#create-first").value;
        let last = document.querySelector("#create-last").value;

        //this function create a new user in the database
        createUser(username, password, first, last)

        document.querySelector("#create-username").value = ""
        document.querySelector("#create-password").value = ""
        document.querySelector("#create-first").value = ""
        document.querySelector("#create-last").value = ""
    })

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
    



    getAllUsersBtn.addEventListener("click", ()=>{
        getAllUsers();
    })


    getAllAppointmentsBtn.addEventListener("click", (event)=>{
        event.preventDefault()
        let username = document.querySelector("#get-appointment-user").value;
        getAllAppointments(username);
        document.querySelector("#get-appointment-user").value = ""
    })


    // const loginForm = document.querySelector("#login");
    // const createAccount = document.querySelector("#createAccount"); /*from id from login.html*/

    // document.querySelector("#linkCreateAccount"), addEventListener("click", () => {
    //     loginForm.classList.add("form-hidden");
    //     createAccountform.classList.remove("form-hidden");

    // })
    // document.querySelector("#linkLogin"), addEventListener("click", () => {
    //     loginForm.classList.remove("form-hidden");
    //     createAccountform.classList.add("form-hidden");

    // })

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
function getAllAppointments(username){
    fetch(`${server}/get-appointments?username=${username}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response =>{
        if(!response.ok){
            return response.text().then(errorText => {
                throw new Error("error: server responded: "+errorText);
            })
        }

        return response.json();
    }).then(dataJSON => {
        // let usernames = dataJSON.map(object => object.username)
        console.log('Appointments Data:', dataJSON);
        alert("Appointments Data: " + JSON.stringify(dataJSON));
    }).catch(error =>{
        console.error("Error: ",error.message);
        alert(error.message)
    })
}




// returns an array of all users
function getAllUsers(){
    fetch(`${server}/api`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response =>{
        if(!response.ok){
            return response.text().then(errorText => {
                throw new Error("error: server responded: "+errorText);
            })
        }

        return response.json();
    }).then(dataJSON => {
        // let usernames = dataJSON.map(object => object.username)
        console.log('Users Data:', dataJSON);
        alert("User Data: " + JSON.stringify(dataJSON));
    }).catch(error =>{
        console.error("Error: ",error.message);
        alert(error.message)
    })
}