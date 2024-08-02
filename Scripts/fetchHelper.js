let server = "http://localhost:3000";



// document.addEventListener("DOMContentLoaded", () => {
//     let x = document.querySelector(".create-user-btn");

//     x.addEventListener("click", (event) => {
//         event.preventDefault();
//         let username = document.querySelector("#create-username").value;
//         let password = document.querySelector("#create-password").value;
//         let first = document.querySelector("#create-first").value;
//         let last = document.querySelector("#create-last").value;

//         createUser(username,password,first,last)

//         document.querySelector("#create-username").value = ""
//         document.querySelector("#create-password").value = ""
//         document.querySelector("#create-first").value = ""
//         document.querySelector("#create-last").value = ""
//         // console.log(endpoint);
//         // getData(endpoint);
//     })
// })

export function createUser(username, password, first, last){
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
          alert("New User Created: "+data.username)
        })
        .catch(error => {
          console.error('Error:', error.message);
          alert(error.message);
        });
}
