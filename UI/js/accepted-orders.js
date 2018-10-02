let message = 'Order Fulfulled';
let completed = document.querySelectorAll('#completedText');
completed.forEach(btn => btn.addEventListener('click', function(){
    if (btn.innerHTML == message){
        btn.innerHTML = "Not Delivered";
    } else{
        btn.innerHTML = message;
    }
}));

