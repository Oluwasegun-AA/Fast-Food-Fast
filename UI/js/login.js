let loggedIn = 0;
let close = document.getElementById("close");
let login = document.getElementById('login');
let signUp = document.getElementById('signUpButton');
let loginSection = document.getElementById('loginSection');
let userValidation = document.getElementById('userValidation');
let LoginForm = document.getElementById('loginForm');
let showPassword = document.getElementById('showPassword');
let confirmPassword = document.getElementById('confirmPassword');
let email = document.getElementById('email');
let comparePassword = document.getElementById('comparePassword');
let notMember = document.getElementById('notMember');
let submitBtn = document.getElementById('submitBtn');
let loginBtn = document.getElementById('loginBtn');
let confirmPasswordLabel = document.getElementById('confirmPasswordLabel')
let emailLabel = document.getElementById('emailLabel');
let message = document.getElementById('message');
let password = document.getElementById('password');
let letter = document.getElementById("letter");
let capital = document.getElementById("capital");
let number = document.getElementById("number");
let length = document.getElementById("length");
let username = document.getElementById('username');


//eventListener Opens the Login View when the login button is clicked
login.addEventListener("click", function () {
    confirmPassword.style.display = 'none';
    comparePassword.style.display = 'none';
    email.style.display = 'none';
    notMember.style.display = 'block';
    submitBtn.style.display = 'none';
    loginBtn.style.display = 'block';
    confirmPasswordLabel.style.display = 'none';
    emailLabel.style.display = 'none';
    loginSection.style.display = 'block';
});

//eventListener closes the login/register view when the close " X " icon is clicked
close.addEventListener("click", function () {
    loginSection.style.display = 'none';
});


// When the user clicks anywhere outside of the modal, close it
window.onclick = function () {
    if (event.target == loginSection) {
        loginSection.style.display = "none";
    }
}

//When the user clicks on the password field, show the message box
password.onfocus = () => {
    message.style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
password.onblur = () => {
    message.style.display = "none";
}

// When the user starts to type text into the password field
password.onkeyup = function () {
    let count = 0;

    // Validate lowercase letters
    let lowerCase = /[a-z]/g;
    if (password.value.match(lowerCase)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
        count++;
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }

    // Validate capital letters
    let upperCase = /[A-Z]/g;
    if (password.value.match(upperCase)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
        count++;
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    // Validate numbers
    let numbers = /[0-9]/g;
    if (password.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
        count++;
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    // Validate length
    if (password.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
        count++;
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }
    if (count == 4) {
        message.style.display = "none";
    }
}

//function allows to toggle betwwen Password visibilty
function viewPassword() {
    if (password.type === "password") {
        password.type = "text";
        confirmPassword.type = "text";
    } else {
        password.type = "password";
        confirmPassword.type = "password";
    }
}



confirmPassword.onkeyup = function () {
    if (confirmPassword.value == password.value) {
        comparePassword.style.color = 'green';
        comparePassword.innerHTML = 'Password matching';
    } else {
        comparePassword.style.color = 'red';
        comparePassword.innerHTML = 'Password not matching';
    }
}

signUp.onclick = function () {
    confirmPassword.style.display = 'block';
    comparePassword.style.display = 'block';
    email.style.display = 'block';
    notMember.style.display = 'none';
    submitBtn.style.display = 'block';
    loginBtn.style.display = 'none';
    confirmPasswordLabel.style.display = 'block';
    emailLabel.style.display = 'block';
}