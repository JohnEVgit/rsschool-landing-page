const sliderSlidesElem = bodyElem.querySelector('.slider-slides-js');
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

sliderButtonPrevElem.addEventListener("click", () => {
    goToPrevSlide();
});

sliderButtonNextElem.addEventListener("click", () => {
    goToNextSlide();
});

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
