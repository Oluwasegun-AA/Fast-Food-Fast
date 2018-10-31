import Controller from './controller';

let addToCartBtn = document.getElementById('addToCartBtn');
let cartWeight = document.getElementById('cartWeight');
let cart = cartWeight.innerHTML;
let click = document.querySelectorAll('#addToCartBtn');

const controller = new Controller('https://fast-food-fast1.herokuapp.com/api/v1');

//Increaments the cart number when each individual "add to cart" button is clicked
click.forEach(btn => btn.addEventListener('click', async function(){
  cart = Number(cart);
        cart += 1;
        cartWeight.innerHTML = cart;
        let data = await controller.get('/menu');
        console.log(data);
  }));