import Controller from './controller';
import auth from './auth'


let cartWeight = document.getElementById('cartWeight');
let cart = cartWeight.innerHTML;
let click = document.querySelectorAll('#addToCartBtn');
let close = document.getElementById("close");
let login = document.getElementById('login');
let itemsList = document.getElementById('itemsList');

const controller = new Controller('https://fast-food-fast1.herokuapp.com/api/v1');

// initiate login when the token is invalid or has expired
window.onload = async () => {
      let validity = await auth();
      if (validity === 'Failed') {
          return login.click();
      }
      getMenu();
}

window.onclick = function () {
      if (event.target == loginSection) {
            alert('Session timeout, Please login');
      }
}

//prevents closing the login/register view when the close " X " icon is clicked
close.addEventListener("click", function () {
      alert('Session timeout, Please login');
});

//Increaments the cart number when each individual "add to cart" button is clicked
click.forEach(btn => btn.addEventListener('click', async function () {
      cart = Number(cart);
      cart += 1;
      cartWeight.innerHTML = cart;
      let data = await controller.get('/menu');
      console.log(data);
}));

let model = `<div id="item" class="a">
<label id="description">Buger</label>
<label id="description">#1500 </label>
<img src="img/a.jpg" id="itemLogo" />
<button type="button" id="addToCartBtn" class="a">Add to Cart</button>
</div>`


async function getMenu(){
      try {
          let method = {
              method: 'GET',
              headers: {
                  'Accept': 'text/plain, application/json, */*',
                  'Content-type': 'application/json'
              }
          }
          let data = await controller.get('/menu', method)
          console.log(data);
      //     if (data.auth === "true") {
      //         localStorage.setItem('token', data.token);
      //     }
      //     if (data.user.user_role === "User") {
      //         window.location.replace('https://fast-food-fast1.herokuapp.com/front-page.html');
      //     } else window.location.replace(`https://fast-food-fast1.herokuapp.com/admin.html`);
      //     window.location.replace()
      } catch (err) {
            console.log('run but error');
      //     if (err) {
      //         alert("Network Error, Please check your network connection and try again");
      //     }
      }
  }
  
