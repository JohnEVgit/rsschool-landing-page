"use strict";

const htmlElem = document.documentElement;
const bodyElem = document.querySelector('.body-js');
const headerNavElem = bodyElem.querySelector('.header-nav-js');
const headerNavListElem = bodyElem.querySelector('.header-nav-list-js');
const headerNavToggleButtonElem = bodyElem.querySelector('.header-nav-toggle-button-js');

const headerThemeInputElems = bodyElem.querySelectorAll('.header-theme-input-js');
let colorTheme;

headerThemeInputElems.forEach((elem) => {
    elem.addEventListener('change', (e) => {
        colorTheme = e.target.dataset.theme;
        updateColorTheme();
    });
});

const updateColorTheme = () => {
  htmlElem.dataset.theme = colorTheme;
  localStorage.setItem("colorTheme", colorTheme);
};

const setHeaderThemeInputTheme = () => {
  headerThemeInputElems.forEach((elem) => {
    if (elem.dataset.theme === colorTheme) {
      elem.checked = true;
    }
  });
};

if (localStorage.getItem("colorTheme")) {
  colorTheme = localStorage.getItem("colorTheme");
  updateColorTheme();
  setHeaderThemeInputTheme();
}

headerNavToggleButtonElem.addEventListener("click", (e) => {
    window.scrollTo({top: 0});
    
    const thisElem = e.currentTarget;

    thisElem.classList.toggle('button--is-active');
    bodyElem.classList.toggle('page__body--is-tablet-fixed');
    headerNavElem.classList.toggle('header-nav--is-active');
    headerNavListElem.classList.toggle('header-nav__list--is-active');
});

headerNavListElem.addEventListener("click", (e) => {
    const thisElem = e.target;

    if (thisElem.closest('.header-nav__link')) {
        bodyElem.classList.remove('page__body--is-tablet-fixed');
        headerNavElem.classList.remove('header-nav--is-active');
        headerNavListElem.classList.remove('header-nav__list--is-active');
        headerNavToggleButtonElem.classList.remove('button--is-active');
    }
});
