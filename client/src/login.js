import Controller from './controller';
import auth from './auth';

const login = document.getElementById('login');
const signUp = document.getElementById('signUpButton');
const loginSection = document.getElementById('loginSection');
const userValidation = document.getElementById('userValidation');
const LoginForm = document.getElementById('loginForm');
const showPassword = document.getElementById('showPassword');
const confirmPassword = document.getElementById('confirmPassword');
const email = document.getElementById('email');
const comparePassword = document.getElementById('comparePassword');
const notMember = document.getElementById('notMember');
const submitBtn = document.getElementById('submitBtn');
const loginBtn = document.getElementById('loginBtn');
const confirmPasswordLabel = document.getElementById('confirmPasswordLabel');
const emailLabel = document.getElementById('emailLabel');
const message = document.getElementById('message');
const password = document.getElementById('password');
const letter = document.getElementById('letter');
const capital = document.getElementById('capital');
const number = document.getElementById('number');
const length = document.getElementById('length');
const username = document.getElementById('username');
const login_return = document.getElementById('login_return');
const signUpButton = document.getElementById('signUpButton');
const section1 = document.getElementById('section1');
const textWrapper = document.getElementById('textWrapper');
const baseUrl = 'https://fast-food-fast1.herokuapp.com/api/v1';

const controller = new Controller(baseUrl);

// resizes the dimensions of the Screen to fit the screen
function autoResizeDiv() {
  if ((section1 == null) || (textWrapper == null)) {
    return;
  }
  section1.style.height = `${window.innerHeight}px`;
  textWrapper.style.height = `${window.innerHeight - 250}px`;
}
window.onresize = autoResizeDiv;
autoResizeDiv();


// submits a registration data
submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const body = JSON.stringify({
      user_name: username.value,
      user_role: 'User',
      user_email: email.value,
      user_password: password.value,
    });
    const method = {
      method: 'POST',
      headers: {
        Accept: 'text/plain, application/json, */*',
        'Content-type': 'application/json',
      },
      body,
    };
    if (comparePassword.innerHTML === 'Password matching') {
      const data = await controller.post('/auth/signup', method);
      console.log(data);
      // logs in user
      userLogin(); 
      alert('Signup Successful, Please Login');
    } else alert('Error! Signup Failed, Password does not match');
  } catch (err) {
    if (err) {
      alert('Network Error, Please check your network connection and try again');
    }
  }
});

// submits a login data for validation
loginBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const body = JSON.stringify({
      user_name: username.value,
      user_role: 'User',
      user_password: password.value,
    });
    const method = {
      method: 'POST',
      headers: {
        Accept: 'text/plain, application/json, */*',
        'Content-type': 'application/json',
      },
      body,
    };
    const data = await controller.post('/auth/login', method);
    console.log(data);
    if (data.auth === 'true') {
      localStorage.setItem('token', data.token);
    }
    if (data.user.user_role === 'User') {
      window.location.replace('https://fast-food-fast1.herokuapp.com/front-page.html');
    } else window.location.replace('https://fast-food-fast1.herokuapp.com/admin.html');
  } catch (err) {
    if (err) {
      alert('Network Error, Please check your network connection and try again');
    }
  }
});


// eventListener Opens the Login View when the login button is clicked
login.addEventListener('click', userLogin);

signUp.addEventListener('click', userSignup);

login_return.addEventListener('click', userLogin);


// event listener to toggle password visibility
showPassword.addEventListener('click', viewPassword);


// When the user clicks on the password field, show the message box
password.onfocus = () => {
  message.style.display = 'block';
};

// When the user clicks outside of the password field, hide the message box
password.onblur = () => {
  message.style.display = 'none';
};

// When the user starts to type text into the password field
password.onkeyup = function () {
  let count = 0;
  // Validate lowercase letters
  const lowerCase = /[a-z]/g;
  validate(letter, lowerCase, count++);

  // Validate capital letters
  const upperCase = /[A-Z]/g;
  validate(capital, upperCase, count++);

  // Validate numbers
  const numbers = /[0-9]/g;
  validate(number, numbers, count++);

  // Validate length
  if (password.value.length >= 8) {
    length.classList.remove('invalid');
    length.classList.add('valid');
    count++;
  } else {
    length.classList.remove('valid');
    length.classList.add('invalid');
  }
  if (count == 4) {
    message.style.display = 'none';
  }
};

// function allows to toggle betwwen Password visibilty
function viewPassword() {
  if (password.type === 'password') {
    password.type = 'text';
    confirmPassword.type = 'text';
  } else {
    password.type = 'password';
    confirmPassword.type = 'password';
  }
}

/**
 * function allows to Validate password with a green tick
 * @param {*} attribute - the P element to be modified
 * @param {*} check - the Regex pattern to be checked for
 * @param {*} count - count stores the number of rules obeyed
 */
function validate(attribute, check, count) {
  if (password.value.match(check)) {
    attribute.classList.remove('invalid');
    attribute.classList.add('valid');
  } else {
    attribute.classList.remove('valid');
    attribute.classList.add('invalid');
  }
}


/* checks if the text entered in the 'password section'
and 'confirm password' section are the same
*/
confirmPassword.onkeyup = function () {
  if (confirmPassword.value == password.value) {
    comparePassword.style.color = 'green';
    comparePassword.innerHTML = 'Password matching';
  } else {
    comparePassword.style.color = 'red';
    comparePassword.innerHTML = 'Password not matching';
  }
};

function userSignup() {
  login_return.style.display = 'block';
  confirmPassword.style.display = 'block';
  comparePassword.style.display = 'block';
  email.style.display = 'block';
  notMember.style.display = 'none';
  submitBtn.style.display = 'block';
  loginBtn.style.display = 'none';
  confirmPasswordLabel.style.display = 'block';
  emailLabel.style.display = 'block';
}

export function userLogin() {
  confirmPassword.style.display = 'none';
  comparePassword.style.display = 'none';
  email.style.display = 'none';
  notMember.style.display = 'block';
  submitBtn.style.display = 'none';
  loginBtn.style.display = 'block';
  confirmPasswordLabel.style.display = 'none';
  emailLabel.style.display = 'none';
  loginSection.style.display = 'block';
  login_return.style.display = 'none';
}
