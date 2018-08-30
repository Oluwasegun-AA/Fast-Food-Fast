var slideInterval = 3000;

function getFigures1() {
    return document.getElementById('slide_with_text1').getElementsByTagName('figure');
}
function getFigures2() {
    return document.getElementById('slide_with_text2').getElementsByTagName('figure');
}

startPlayback();
function moveForward() {
    var pointer;
    var figures1 = getFigures1();
    var figures2 = getFigures2();
    for (var i = 0; i < figures1.length; i++) {
        if (figures1[i].className == 'visible') {
            figures1[i].className = '';
            pointer = i;
        }
    }
    for (var i = 0; i < figures2.length; i++) {
        if (figures2[i].className == 'visible') {
            figures2[i].className = '';
            pointer = i;
        }
    }
    if (++pointer == figures1.length) {
        pointer = 0;
    }
    figures1[pointer].className = 'visible';
    figures2[pointer].className = 'visible';
    setTimeout(moveForward, slideInterval);
}

function startPlayback() {    
    setTimeout(moveForward, slideInterval);
}


var close = document.getElementById("close");
var login = document.getElementById('login');
var cancleButton = document.getElementById('cancleButton');
var loginSection = document.getElementById('loginSection');
var userValidation = document.getElementById('user_validation')

login.addEventListener("click", function(){
    loginSection.style.display='block';
})
cancleButton.addEventListener("click", function(){
    loginSection.style.display='none';
})
close.addEventListener("click", function(){
    loginSection.style.display='none';
})

// When the user clicks anywhere outside of the modal, close it
window.onclick = hide_view(user_validation);

function hide_view(element) {
    if (event.target == element) {
        element.style.display = "none";
    }
}

