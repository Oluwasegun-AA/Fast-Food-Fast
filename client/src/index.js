import auth from './auth';
let loginSection = document.getElementById('loginSection');
let close = document.getElementById("close");

window.onload = async()=>{
    let userUrl = `https://fast-food-fast1.herokuapp.com/front-page.html`;
    let adminUrl = `https://fast-food-fast1.herokuapp.com/admin.html`;
    let token = localStorage.getItem('token');
    if (token !== null){
    let isValid = auth();
    try{
        if (isValid === "User"){
            window.location.replace(userUrl);
        } else window.location.replace(adminUrl);
            // window.location.href(link);
        } catch (err) {
            if (err) {
                window.location.replace('https://fast-food-fast1.herokuapp.com/');
                // window.location.href('./index.html');
            }
        }
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function () {
    if (event.target == loginSection) {
        loginSection.style.display = "none";
    }
}

//eventListener closes the login/register view when the close " X " icon is clicked
close.addEventListener("click", function () {
    loginSection.style.display = 'none';
});


