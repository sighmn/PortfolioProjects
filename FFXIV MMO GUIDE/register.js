//took this from the book assignment. I figured since I did the assingment I could use it. 
function checkForm() {

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword  = document.getElementById("passwordConfirm");
const formErrors = document.getElementById("formErrors");

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
const lowerCaseRegex = /[a-z]/; 
const upperCaseRegex = /[A-Z]/; 
const numberRegex = /[0-9]/; 


//remove error class if valid 
formErrors.innerHTML = '';
fullName.classList.remove("error");
email.classList.remove("error");
password.classList.remove("error");
confirmPassword.classList.remove("error");

let errors= false; 


//full name error message 
if(fullName.value.length === 0) {
   displayError("Missing full name.");     
   fullName.classList.add("error"); 
   errors = true; 
}

//email error message 
if(!emailRegex.test(email.value)) { 
   displayError("Invalid or missing email address."); 
   email.classList.add("error");
   errors = true; 
}

//password length error
if(password.value.length < 10 || password.value.length > 20) {
   displayError("Password must be between 10 and 20 characters.");
   password.classList.add("error");
   errors = true;  
}

//lowercase error 
if(!lowerCaseRegex.test(password.value)) { 
   displayError("Password must contain at least one lowercase character.")
   password.classList.add("error"); 
   errors = true; 
}

//uppercase error
if(!upperCaseRegex.test(password.value)) {
   displayError("Password must contain at least one uppercase character."); 
   password.classList.add("error"); 
   errors = true; 
} 

//digit error
if(!numberRegex.test(password.value)) {
   displayError("Password must contain at least one digit."); 
   password.classList.add("error"); 
   errors = true; 
}

//password and confirmation match
if(password.value !== confirmPassword.value) {
   displayError("Password and confirmation password don't match.");
   password.classList.add("error");
   confirmPassword.classList.add("error");
   errors = true; 
}

// removing class "hide" or adding it depending if error
if (errors) {
   formErrors.classList.remove("hide");
} else {
   formErrors.classList.add("hide")
}

}

//function to simplify code. Creates list item and append 
function displayError(message) {
   const errorItem = document.createElement("li");
   errorItem.textContent = message;
   formErrors.appendChild(errorItem); 
}

document.getElementById("submit").addEventListener("click", function(event) {
   checkForm(); 

   event.preventDefault();
});

