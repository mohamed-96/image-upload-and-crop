// vars
let option = {
    viewMode: 3,
};
var initW;
var initH;
let canvasWidth

let result = document.querySelector('.result'),
    img_result = document.querySelector('.img-result'),
    img_w = document.querySelector('.img-w'),
    img_h = document.querySelector('.img-h'),
    save = document.querySelector('.save'),
    cropped = document.querySelector('.cropped'),
    range = document.querySelector('.slidecontainer'),
    upload = document.getElementById('fileInput'),
    uploadBtn = document.getElementById('upload'),
    cropper = '';
h3 = document.getElementById('size');


uploadBtn.addEventListener('click', (e) => {
    if (cropper) {
        reset();
    }
})

// on change show image with crop options
upload.addEventListener('change', (e) => {
    if (e.target.files.length) {
        // start file reader
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target.result) {
                result.classList.remove('hide');
                // create new image
                let img = document.createElement('img');
                img.id = 'image';
                img.src = e.target.result
                    // clean result before
                result.innerHTML = '';
                // append new image
                result.appendChild(img);
                // show save btn and options
                save.classList.remove('hide');

                // init cropper
                canvasWidth = img.clientWidth

                cropper = new Cropper(img, option);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }
});

// save on click
save.addEventListener('click', (e) => {
    e.preventDefault();
    // get result to data uri
    let imgSrc = cropper.getCroppedCanvas({}).toDataURL();

    // show image cropped
    cropped.src = imgSrc;
    initSize(imgSrc);


    hideCrop();

    // remove hide class of img
    cropped.classList.remove('hide');
    img_result.classList.remove('hide');
    range.classList.remove('hide');
});

document.getElementById('myRange').oninput = function() {
    let scale = document.getElementById('myRange').value;
    updateSize(scale);
    let v = parseFloat(document.getElementById('myRange').value) * 100
    console.log('v: ', v);
    document.getElementById('out').value = v + '%';
}



function initSize(src) {
    var j = new Image();
    j.src = src;
    setTimeout(() => {

        initW = (j.width / 300).toFixed(2);
        initH = (j.height / 300).toFixed(2);
        h3.innerHTML = initW + '" by ' + initH + '"'
    }, 60);

}

function updateSize(scale) {
    let w = (initW * scale).toFixed(2);
    let h = (initH * scale).toFixed(2);
    h3.innerHTML = w + '" by ' + h + '"'
    cropper.scale(scale).move(0, 0);
    let imgSrc = cropper.getCroppedCanvas({}).toDataURL();

    // show image cropped
    cropped.src = imgSrc;
}

function reset() {
    cropper.clear();
    cropped.classList.add('hide');
    img_result.classList.add('hide');
    save.classList.add('hide');
    range.classList.add('hide');
    result.innerHTML = '';
    h3.innerHTML = '';
}

function hideCrop() {
    result.classList.add('hide');
    save.classList.add('hide');
    result.innerHTML = '';

}