let addToCartBtn = document.getElementById('addToCartBtn');
let cartWeight = document.getElementById('cartWeight');
let cart = cartWeight.innerHTML;
let click = document.querySelectorAll('#addToCartBtn');

//Increaments the cart number when each individual "add to cart" button is clicked
click.forEach(btn => btn.addEventListener('click', function(){
  cart = Number(cart);
        cart += 1;
        cartWeight.innerHTML = cart;
  }));
  