export var loggedIn = 0;
export var slideInterval = 3000;
export var  close = document.getElementById("close");
export var  login = document.getElementById('login');
export var  signUp = document.getElementById('signUpButton');
export var  loginSection = document.getElementById('loginSection');
export var  userValidation = document.getElementById('userValidation');
export var  LoginForm = document.getElementById('loginForm');
export var  showPassword = document.getElementById('showPassword');
export var  confirmPassword = document.getElementById('confirmPassword');
export var  email = document.getElementById('email');
export var  comparePassword = document.getElementById('comparePassword');
export var  notMember = document.getElementById('notMember');
export var  submitBtn = document.getElementById('submitBtn');
export var  loginBtn = document.getElementById('loginBtn');
export var  confirmPasswordLabel  = document.getElementById('confirmPasswordLabel')
export var  emailLabel = document.getElementById('emailLabel');
export var  message = document.getElementById('message');
export var  password = document.getElementById('password');
export var  letter = document.getElementById("letter");
export var  capital = document.getElementById("capital");
export var  number = document.getElementById("number");
export var  length = document.getElementById("length");
export var  username = document.getElementById('username');




function getFigures1() {
    return document.getElementById('slide1').getElementsByTagName('figure');
}

function getFigures2() {
    return document.getElementById('slide2').getElementsByTagName('figure');
}

//eventListener Opens the Login View when the login button is clicked
login.addEventListener("click", function(){

    confirmPassword.style.display = 'none';
    comparePassword.style.display = 'none';
    email.style.display = 'none';
    notMember.style.display = 'block';
    submitBtn.style.display = 'none';
    loginBtn.style.display = 'block';
    confirmPasswordLabel.style.display = 'none';
    emailLabel.style.display = 'none';
    loginSection.style.display='block';
});



//eventListener closes the login/register view when the close " X " icon is clicked
close.addEventListener("click", function(){
    loginSection.style.display='none';
});

showPassword.addEventListener("click", viewPassword);
//starts image slide show
startPlayback();


/**
 * function changes the slide-show pictures
 */
function moveForward() {
    var pointer;
    var figures1 = getFigures1();
    var figures2 = getFigures2();
    for (var i = 0; i < figures1.length; i++) {
        if (figures1[i].className == 'show') {
            figures1[i].className = '';
            pointer = i;
        }
    }
    for (var i = 0; i < figures2.length; i++) {
        if (figures2[i].className == 'show') {
            figures2[i].className = '';
            pointer = i;
        }
    }
    if (++pointer == figures1.length) {
        pointer = 0;
    }
    figures1[pointer].className = 'show';
    figures2[pointer].className = 'show';
    setTimeout(moveForward, slideInterval);
}

/**
 * function playsback the slideshow at interval "slideInterval"
 */
function startPlayback() {    
    setTimeout(moveForward, slideInterval);
}



// When the user clicks anywhere outside of the modal, close it
window.onclick = function() {
    if (event.target == loginSection) {
        loginSection.style.display = "none";
    }
}

//When the user clicks on the password field, show the message box
password.onfocus = function() {
    message.style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
password.onblur = function() {
    message.style.display = "none";
}

// When the user starts to type text into the password field
password.onkeyup = function() {
  var count = 0;

  // Validate lowercase letters
  var lowerCase = /[a-z]/g;
  if(password.value.match(lowerCase)) {  
    letter.classList.remove("invalid");
    letter.classList.add("valid");
    count++;
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }
  
  // Validate capital letters
  var upperCase = /[A-Z]/g;
  if(password.value.match(upperCase)) {  
    capital.classList.remove("invalid");
    capital.classList.add("valid");
    count++;
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if(password.value.match(numbers)) {  
    number.classList.remove("invalid");
    number.classList.add("valid");
    count++;
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }
  
  // Validate length
  if(password.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
    count++;
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
  if (count == 4){
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



confirmPassword.onkeyup = function(){
  if (confirmPassword.value == password.value) {
    comparePassword.style.color = 'green';
    comparePassword.innerHTML = 'Password matching';
} else {
    comparePassword.style.color = 'red';
    comparePassword.innerHTML = 'Password not matching';
}
}

signUp.onclick = function(){
    confirmPassword.style.display = 'block';
    comparePassword.style.display = 'block';
    email.style.display = 'block';
    notMember.style.display = 'none';
    submitBtn.style.display = 'block';
    loginBtn.style.display = 'none';
    confirmPasswordLabel.style.display = 'block';
    emailLabel.style.display = 'block';
}

