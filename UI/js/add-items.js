let showImage = document.getElementById('showImage');
let uploadImage = document.getElementById('uploadImage');
let previewContent = document.getElementById('previewContent');
let submitItem = document.getElementById('submitItem');
let itemTag = document.getElementById('itemTag');
let itemName = document.getElementById('itemName');
let ItemPrice = document.getElementById('itemPrice');
let preview = document.getElementById('preview');
let addToCartBtn = document.getElementById('addToCartBtn');
let itemAdded_review = "";
let imageValue;
let nameArr = [];
let tagArr = [];
let priceArr = [];
let imageArr = [];
let itemAdded = [];
let length = 0;
let lengthI =0;

//Eventlistener to listen for when a new file is uploaded
uploadImage.addEventListener('change', uploadPicture);
function uploadPicture(input) {
    let file = input.target.files[0];
    var readFile = new FileReader();

    readFile.onload = function (imageFile) {
        let data = imageFile.target.result;
        showImage.src = data;
        imageArr[lengthI] = data;
        lengthI++;
    };

    readFile.readAsDataURL(file);
}

submitItem.addEventListener('click', function () {
    preview.style.display = "block";
    tagArr[length] = itemTag.value;
    nameArr[length] = itemName.value;
    priceArr[length] = itemPrice.value;
    if (itemPrice.value > 19999999) {
        alert(" Items above 10 Million Naira will not be added");
        return;
    }
    itemAdded[length] = `<div id="item" >
    <label id="description" >` + nameArr[length] + `</label>
    <label id="description" >price : `+ priceArr[length] + `</label>
    <img src="`+ showImage.src + `" id="itemLogo" />
    <button type="button" id="addToCartBtn" class="g">Add to Cart</button>
    <div id="editDelete">
    <button type="button"  onclick=" editElement(`+ length + `)"  id="editBtn" >Edit</button>
    <button type="button" onclick=" removeElement(`+ length + `)"  id="deleteBtn" >Delete</button>
    </div></div>`

    refereshList();
    length++;
});


//Function removes an element from the document
function removeElement(len) {
    itemAdded[len] = "";
    refereshList();
}

//Function Presents the element for Edit
function editElement(len) {
    let currrentName = nameArr[len];
    let currentTag = tagArr[len];
    let currentPrice = priceArr[len];
    let currentImage = imageArr[len];
    itemTag.value = currentTag;
    itemName.value = currrentName;
    ItemPrice.value = currentPrice;
    showImage.src = currentImage;
    removeElement(len);
    refereshList();
}

function refereshList(){
    previewContent.innerHTML ="";
    for (let i=0; i<itemAdded.length; i++) {
        previewContent.innerHTML += itemAdded[i];
    }
}