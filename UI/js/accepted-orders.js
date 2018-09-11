let message = 'Order Fulfulled';
var completed = document.querySelectorAll('#completedText');
completed.forEach(btn => btn.addEventListener('click', function(){
    btn.innerHTML = message;
}));

