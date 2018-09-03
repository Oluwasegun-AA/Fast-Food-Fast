var loggedIn = 0;
var slideInterval = 3000;
var  close = document.getElementById("close");
var  login = document.getElementById('login');
var  signUp = document.getElementById('signUpButton');
var  loginSection = document.getElementById('loginSection');
var  userValidation = document.getElementById('userValidation');
var  LoginForm = document.getElementById('loginForm');
var  showPassword = document.getElementById('showPassword');
var  confirmPassword = document.getElementById('confirmPassword');
var  email = document.getElementById('email');
var  comparePassword = document.getElementById('comparePassword');
var  notMember = document.getElementById('notMember');
var  submitBtn = document.getElementById('submitBtn');
var  loginBtn = document.getElementById('loginBtn');
var  confirmPasswordLabel  = document.getElementById('confirmPasswordLabel')
var  emailLabel = document.getElementById('emailLabel');
var  message = document.getElementById('message');
var  password = document.getElementById('password');
var  letter = document.getElementById("letter");
var  capital = document.getElementById("capital");
var  number = document.getElementById("number");
var  length = document.getElementById("length");
var  username = document.getElementById('username');


var addToCartBtn = document.getElementById('addToCartBtn');
var cartWeight = document.getElementById('cartWeight');
var cart = cartWeight.innerHTML;
var click = document.querySelectorAll('#addToCartBtn');

click.forEach(btn => btn.addEventListener('click', function(){
  cart = Number(cart);
        cart += 1;
        cartWeight.innerHTML = cart;
 
 /*   if((username.innerHTML !== "") && (password.innerHTML !== "")){
        loggedIn = 1;
        
    }
   if(loggedIn !== 1){
        confirmPassword.style.display = 'none';
        comparePassword.style.display = 'none';
        email.style.display = 'none';
        notMember.style.display = 'block';
        submitBtn.style.display = 'none';
        loginBtn.style.display = 'block';
        confirmPasswordLabel.style.display = 'none';
        emailLabel.style.display = 'none';
        loginSection.style.display='block';
        
    }*/
}));

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
