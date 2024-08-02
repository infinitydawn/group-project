const loginForm=document.querySelector("#login");
const createAccount=document.querySelector("#createAccount"); /*from id from login.html*/

document.querySelector("#linkCreateAccount"),addEventListener("click", e =>{
    e.preventDefault();
    loginForm.classList.add("form-hidden");
    createAccountform.classList.remove("form-hidden");

})
document.querySelector("#linkLogin"),addEventListener("click", e =>{
    loginForm.classList.remove("form-hidden");
    createAccountform.classList.add("form-hidden");
    
})