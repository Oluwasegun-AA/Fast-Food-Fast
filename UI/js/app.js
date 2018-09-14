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
    for (let i = 0; i < figures1.length; i++) {
        if (figures1[i].className == 'show') {
            figures1[i].className = '';
            pointer = i;
        }
    }
    for (let i = 0; i < figures2.length; i++) {
        if (figures2[i].className == 'show') {
            figures2[i].className = '';
            pointer = i;
        }
    }
    if (++pointer == figures1.length) {
        pointer = 0;
    }
    figures1[pointer].className = 'show';
    figures2[pointer].className = 'show';
    setTimeout(moveForward, slideInterval);
}

/**
 * function playsback the slideshow at interval "slideInterval"
 */
function startPlayback() {    
    setTimeout(moveForward, slideInterval);
}