// import {createUser} from "fetchHelper.js"


document.addEventListener("DOMContentLoaded", () => {
    let createUserBtn = document.querySelector(".create-user-btn");
    let getAllUsersBtn = document.querySelector(".get-all-users-btn");

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



    getAllUsersBtn.addEventListener("click", ()=>{
        getAllUsers();
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