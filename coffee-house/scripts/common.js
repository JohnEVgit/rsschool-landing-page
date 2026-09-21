"use strict";

const htmlElem = document.documentElement;
const bodyElem = htmlElem.querySelector('.body-js');
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
