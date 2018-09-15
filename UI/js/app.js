let slideInterval = 3000;

function getFigures1() {
    return document.getElementById('slide1').getElementsByTagName('figure');
}

function getFigures2() {
    return document.getElementById('slide2').getElementsByTagName('figure');
}

//starts image slide show
startPlayback();

/**
 * function changes the slide-show pictures
 */
function moveForward() {
    let pointer;
    let figures1 = getFigures1();
    let figures2 = getFigures2();
    switchImage(figures1, pointer);
    pointer= switchImage(figures2, pointer);
    if (++pointer == figures1.length) {
        pointer = 0;
    }
    figures1[pointer].className = 'show';
    figures2[pointer].className = 'show';
    setTimeout(moveForward, slideInterval);
}


/**
 *function makes the next image visible by seting the classname to 'show'
 * @param {*} element - the array of images
 * @param {*} pointer - position of active image
 */
function switchImage(element, pointer){
for (let i = 0; i < element.length; i++) {
    if (element[i].className == 'show') {
        element[i].className = '';
        pointer = i;
        return pointer;
    }
}
}

/**
 * function playsback the slideshow at interval "slideInterval"
 */
function startPlayback() {    
    setTimeout(moveForward, slideInterval);
}