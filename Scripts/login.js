//wait till page is loaded fully
document.addEventListener("DOMContentLoaded", ()=>{

    //stop refreshing the page upon submission
    // document.querySelector("#createAccount").addEventListener("submit", (event)=>{
    //     event.preventDefault();
    // })

    // const loginForm=document.querySelector("#login");
    // const createAccount=document.querySelector("#createAccount"); /*from id from login.html*/
    

    //sign up form code starts here
    let signupBtn = document.querySelector(".button-signup")

    // wait untill sign up button is clicked
    signupBtn.addEventListener("click", (event) =>{
        // stop page reload upon click to actually see server's response
        event.preventDefault()

        // find all fields on page
        let email = document.querySelector(".input-email-signup")
        let password = document.querySelector(".input-password-signup")
        let firstName = document.querySelector(".input-first-signup")
        let lastName = document.querySelector(".input-last-signup")


        // make an api call to database to create a new user
        createUser(email.value, password.value, firstName.value, lastName.value);

        // clear all field
        email.value = ""
        password.value = ""
        firstName.value = ""
        lastName.value = ""

    })


    document.querySelector(".button-test").addEventListener("click",()=>{
        getAllUsers()
    })





})






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