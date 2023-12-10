const sliderInnerElem = bodyElem.querySelector('.slider-inner-js');
const sliderSlidesElem = sliderInnerElem.querySelector('.slider-slides-js');
const sliderSlideElems = sliderSlidesElem.querySelectorAll('.slider-slide');

const sliderButtonPrevElem = bodyElem.querySelector('.slider-button-prev-js');
const sliderButtonNextElem = bodyElem.querySelector('.slider-button-next-js');

const sliderPaginationElems = bodyElem.querySelectorAll('.slider-pagination-value-js');

const slidesCount = sliderSlideElems.length;
const autoplayDelay = 6000;
let currentSlideIndex = 0;
let isSliderPaused = false;

let sliderPaginationWidth = 0;
let createSliderPaginationAnimation;

const startSliderPaginationAnimation = () => {
    createSliderPaginationAnimation = setInterval(() => {
        if (!isSliderPaused) {
            sliderPaginationWidth += 9 / autoplayDelay * 100;
            sliderPaginationElems[currentSlideIndex].style.width = `${sliderPaginationWidth}%`;
        }

        if (sliderPaginationWidth >= 100) {
            goToNextSlide();
        }
    }, 9);
};

startSliderPaginationAnimation();

const stopSliderPaginationAnimation = () => {
    sliderPaginationWidth = 0;
    sliderPaginationElems[currentSlideIndex].style.width = 0;
    clearInterval(createSliderPaginationAnimation);
};

const goToSlide = () => {
    sliderSlidesElem.style.transform = `translateX(${-100 * currentSlideIndex}%)`;
    startSliderPaginationAnimation();
};

const goToPrevSlide = () => {
    stopSliderPaginationAnimation();
    if (currentSlideIndex > 0) {
        currentSlideIndex -= 1;
    } else {
        currentSlideIndex = slidesCount - 1;
    }
    goToSlide();
};

const goToNextSlide = () => {
    stopSliderPaginationAnimation();
    if (currentSlideIndex < slidesCount - 1) {
        currentSlideIndex += 1;
    } else {
        currentSlideIndex = 0;
    }
    goToSlide();
};

sliderButtonPrevElem.addEventListener("click", goToPrevSlide);

sliderButtonNextElem.addEventListener("click", goToNextSlide);

sliderSlidesElem.addEventListener("mouseover", () => {
    if (!isSliderPaused) {
        isSliderPaused = true;
    }
});

sliderSlidesElem.addEventListener("mouseleave", () => {
    if (isSliderPaused) {
        isSliderPaused = false;
    }
});

let xStartPosition;
let yStartPosition;
let slideToPrev = false;
let slideToNext = false;

const sliderTouchStartHandle = (e) => {
    if (!isSliderPaused) {
        isSliderPaused = true;
    }
    xStartPosition = e.touches[0].clientX;
    yStartPosition = e.touches[0].clientY;
};

const sliderTouchEndHandle = () => {
    if (isSliderPaused) {
        isSliderPaused = false;
    }
    if (slideToPrev) {
        goToPrevSlide();
        slideToPrev = false;
        sliderInnerElem.style.left = '0';
    }
    if (slideToNext) {
        goToNextSlide();
        slideToNext = false;
        sliderInnerElem.style.left = '0';
    }
};

const sliderMoveStartHandle = (e) => {
    if (!xStartPosition || !yStartPosition) {
        return;
    }

    let xEndPosition = e.touches[0].clientX;
    let yEndPosition = e.touches[0].clientY;

    let xDist = xStartPosition - xEndPosition;
    let yDist = yStartPosition - yEndPosition;

    if (Math.abs(xDist) > Math.abs(yDist)) {
        if (xDist > 0) {
            slideToNext = true;
            sliderInnerElem.style.left = '-12px';
        } else {
            slideToPrev = true;
            sliderInnerElem.style.left = '12px';
        }
    }

    xStartPosition = null;
    yStartPosition = null;
};

sliderSlidesElem.addEventListener("touchstart", sliderTouchStartHandle);
sliderSlidesElem.addEventListener("touchend", sliderTouchEndHandle);
sliderSlidesElem.addEventListener("touchmove", sliderMoveStartHandle);