var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var CURRENT_DETAIL_INDEX = 0;

function setDetails(imgURL, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imgURL);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    CURRENT_DETAIL_INDEX = getThumbnailsArray().indexOf(thumbnail);
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}
   
function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);   
}   

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }           
    });
}

function addDetailImageButtonHandler(thumbnailArray) {
    'use strict';
    var rightButton = document.querySelector('[class="right-button');
    var leftButton = document.querySelector('[class="left-button"');

    rightButton.addEventListener('click', function () {click_button_right(thumbnailArray)});

    leftButton.addEventListener('click', function () {click_button_left(thumbnailArray)});
}

function click_button_right(thumbnailArray) {
    console.log(thumbnailArray);
    if (CURRENT_DETAIL_INDEX == thumbnailArray.length - 1) {
        CURRENT_DETAIL_INDEX = 0;
    } else {
        CURRENT_DETAIL_INDEX++;
    }

    setDetailsFromThumb(thumbnailArray[CURRENT_DETAIL_INDEX]);
    showDetails();
}

function click_button_left(thumbnailArray) {
    console.log('left');
    if (CURRENT_DETAIL_INDEX == 0) {
        CURRENT_DETAIL_INDEX = thumbnailArray.length - 1;
    } else {
        CURRENT_DETAIL_INDEX--;
    }

    setDetailsFromThumb(thumbnailArray[CURRENT_DETAIL_INDEX]);
    showDetails();
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
    addDetailImageButtonHandler(thumbnails);
}

initializeEvents();