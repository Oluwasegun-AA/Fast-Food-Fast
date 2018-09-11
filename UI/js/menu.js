var addToCartBtn = document.getElementById('addToCartBtn');
var cartWeight = document.getElementById('cartWeight');
var cart = cartWeight.innerHTML;
var click = document.querySelectorAll('#addToCartBtn');

click.forEach(btn => btn.addEventListener('click', function(){
  cart = Number(cart);
        cart += 1;
        cartWeight.innerHTML = cart;
  }));
  