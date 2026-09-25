let productsObj;

fetch('./json/products.json')
    .then(response => response.json())
    .then(data => {
        productsObj = data;

        addMenuLayout();
    })
    .catch(error => console.log(error));

const menuGridElem = bodyElem.querySelector('.menu-grid-js');
const menuMoreButtonElem = bodyElem.querySelector('.menu-more-button-js');

let isMobile = window.innerWidth <= 768;

const getMenuGridCount = () => {
    return isMobile ? 4 : 8
};
const getMenuGridStartPosition = () => menuGridCount * menuGridPage;

let menuGridCount = getMenuGridCount();
let menuGridPage = 1;
let menuGridStartPosition = 0;

let menuGridCategory = 'coffee';
let menuGridLayout = '';

let menuCategoryList = [];

const menuSizeTabStartElem = bodyElem.querySelector('#menu-tab-coffee.menu-tab-js');
if (!menuSizeTabStartElem.checked) {
    menuSizeTabStartElem.checked = true;
}

const showMenuMoreButton = () => {
    if (menuGridStartPosition < menuCategoryList.length) {
        menuMoreButtonElem.classList.add('menu__more--is-active');
    } else {
        menuMoreButtonElem.classList.remove('menu__more--is-active');
    }
};

const createMenuLayout = () => {
    for (let i = menuGridStartPosition; i < menuGridCount * menuGridPage && i !== menuCategoryList.length; i++) {
        const thisEl = menuCategoryList[i];

        menuGridLayout += `
        <div class="menu__item menu-item" data-id="${i}" tabindex="0">
            <picture class="menu-item__picture">
                <source srcset="images/menu/${menuGridCategory}/${menuGridCategory}-${i + 1}.avif 1x, images/menu/${menuGridCategory}/${menuGridCategory}-${i + 1}-2x.avif 2x" type="image/avif">
                <source srcset="images/menu/${menuGridCategory}/${menuGridCategory}-${i + 1}.webp 1x, images/menu/${menuGridCategory}/${menuGridCategory}-${i + 1}-2x.webp 2x" type="image/webp">
                <img class="menu-item__img" src="images/menu/${menuGridCategory}/${menuGridCategory}-${i + 1}.jpg" alt="${thisEl.name}" width="340" height="340"
                    srcset="images/menu/${menuGridCategory}/${menuGridCategory}-${i + 1}.jpg 1x, images/menu/${menuGridCategory}/${menuGridCategory}-${i + 1}-2x.jpg 2x">
            </picture>
            <div class="menu-item__info">
                <h3 class="menu-item__title">${thisEl.name}</h3>
                <p class="menu-item__text">${thisEl.description}</p>
                <p class="menu-item__price">$${thisEl.price}</p>
            </div>
        </div>`;
    }
};

const resetMenuLayout = () => {
    menuGridCount = getMenuGridCount();
    menuGridStartPosition = 0;
    menuGridPage = 1;
    menuGridLayout = '';
    menuGridElem.innerHTML = '';
};

const addMenuLayout = () => {
    menuCategoryList = productsObj.filter(elem => elem.category === menuGridCategory);

    createMenuLayout();

    menuGridElem.innerHTML += menuGridLayout;
    menuGridLayout = '';

    menuGridStartPosition = getMenuGridStartPosition();
    showMenuMoreButton();
};

menuMoreButtonElem.addEventListener('click', () => {
    menuGridPage += 1;
    addMenuLayout();
});

window.addEventListener('resize', () => {
    if (isMobile && window.innerWidth > 768) {
        isMobile = false;

        resetMenuLayout();
        addMenuLayout();
    } else if (!isMobile && window.innerWidth <= 768) {
        isMobile = true;

        resetMenuLayout();
        addMenuLayout();
    }
});

bodyElem.querySelectorAll(".menu-tab-js").forEach((elem) => {
    elem.addEventListener('change', (e) => {
        menuGridCategory = e.target.dataset.category;
        resetMenuLayout();
        addMenuLayout();
    });
});

const showMenuPopup = (e) => {
    const thisElem = e.target.closest('.menu-item');

    if (thisElem) {
        createPopup(+thisElem.dataset.id);
        popupElem.showModal();
        bodyElem.classList.add('page__body--is-fixed');
    }
}

menuGridElem.addEventListener("click", (e) => {
    showMenuPopup(e);
});

menuGridElem.addEventListener("keydown", (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
        showMenuPopup(e);
    }
});

const popupElem = bodyElem.querySelector('.popup-js');
let popupCloseButtonElem;
let popupPriceElem;

let popupPrice = 0;
let popupSizePrice = 0;
let popupAdditivesPrice = 0;
let popupLayout = '';

const calcPrice = (price) => {
    return (price + popupSizePrice + popupAdditivesPrice).toFixed(2);
};

const createPopupSizeTabsLayout = (id) => {
    let popupSizeTabsLayout = '';
    const popupSizeTabsObj = menuCategoryList[id].sizes;
    let i = 0;

    for (tab in popupSizeTabsObj) {
        popupSizeTabsLayout += `<li class="popup__tab tab">
        <input class="tab__input visually-hidden popup-tab-size-js" type="radio" name="size-tab" id="size-tab-${tab}"
            data-size-price="${popupSizeTabsObj[tab]['add-price']}"${i === 0 ? ' checked' : ''}>
            <label class="tab__label" data-tab="${tab}" for="size-tab-${tab}">${popupSizeTabsObj[tab].size}</label>
        </li>`;
        i++;
    };

    return popupSizeTabsLayout;
}

const createPopupAdditivesTabsLayout = (id) => {
    let popupAdditivesTabsLayout = '';
    const popupSizeTabsArr = menuCategoryList[id].additives;

    for (let i = 0; i < popupSizeTabsArr.length; i++) {
        popupAdditivesTabsLayout += `<li class="popup__tab tab">
            <input class="tab__input visually-hidden popup-tab-additives-js" type="checkbox" name="additives-tab-${i + 1}"
                id="additives-tab-${i + 1}" data-additives-price="${popupSizeTabsArr[i]['add-price']}">
            <label class="tab__label" data-tab="${i + 1}" for="additives-tab-${i + 1}">${popupSizeTabsArr[i].name}</label>
        </li>`;
    };

    return popupAdditivesTabsLayout;
}

const createPopupLayout = (id) => {
    popupLayout = `<div class="popup__wrapper">
    <picture class="popup__picture popup-picture-js">
        <source srcset="images/menu/${menuGridCategory}/${menuGridCategory}-${id + 1}.avif 1x, images/menu/${menuGridCategory}/${menuGridCategory}-${id + 1}-2x.avif 2x" type="image/avif">
        <source srcset="images/menu/${menuGridCategory}/${menuGridCategory}-${id + 1}.webp 1x, images/menu/${menuGridCategory}/${menuGridCategory}-${id + 1}-2x.webp 2x" type="image/webp">
        <img class="popup__img" src="images/menu/${menuGridCategory}/${menuGridCategory}-${id + 1}.jpg" alt="Irish coffee" width="340" height="340"
        srcset="images/menu/${menuGridCategory}/${menuGridCategory}-${id + 1}.jpg 1x, images/menu/${menuGridCategory}/${menuGridCategory}-${id + 1}-2x.jpg 2x">
    </picture>
    <div class="popup__info">
        <div class="popup__text">
            <h3 class="popup__title popup-title-js">${menuCategoryList[id].name}</h3>
            <p class="popup__description popup-description-js">${menuCategoryList[id].description}</p>
        </div>
        <div class="popup__options">
            <p class="popup__label">Size</p>
            <ul class="popup__tabs">${createPopupSizeTabsLayout(id)}</ul>
        </div>
        <div class="popup__options">
            <p class="popup__label">Additives</p>
            <ul class="popup__tabs">${createPopupAdditivesTabsLayout(id)}</ul>
        </div>
        <p class="popup__price">
            <span>Total:</span>
            <span class="popup-price-js">$${menuCategoryList[id].price}</span>
        </p>
        <div class="popup__alert popup-alert">
            <svg class="popup-alert__icon" width="16" height="16" aria-hidden="true">
                <use href="images/sprite.svg#alert" />
            </svg>
            <p class="popup-alert__text">The cost is not final. Download our mobile app to see the final price and place
                your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
        </div>
        <button class="popup__close button button--theme-secondary close-popup-js" type="button">Close</button>
    </div>
</div>`};

const popupCloseButtonHandle = () => {
    popupElem.close();
};

const popupTabSizeHandle = (e) => {
    thisElem = e.target;
    popupSizePrice = +thisElem.dataset.sizePrice;
    popupPriceElem.textContent = `$${calcPrice(popupPrice)}`;
};

const popupTabAdditivesHandle = (e) => {
    thisElem = e.target;

    if (thisElem.checked) {
        popupAdditivesPrice += +thisElem.dataset.additivesPrice;
    } else {
        popupAdditivesPrice -= +thisElem.dataset.additivesPrice;
    }

    popupPriceElem.textContent = `$${calcPrice(popupPrice)}`;
};

const resetPopupPrice = () => {
    popupSizePrice = 0;
    popupAdditivesPrice = 0;
}

const createPopup = (id) => {
    createPopupLayout(id);
    popupElem.innerHTML = popupLayout;

    popupPrice = +menuCategoryList[id].price;

    popupCloseButtonElem = bodyElem.querySelector('.close-popup-js');
    popupPriceElem = bodyElem.querySelector('.popup-price-js');

    popupCloseButtonElem.addEventListener("click", popupCloseButtonHandle);

    popupElem.querySelectorAll(".popup-tab-size-js").forEach((elem) => {
        elem.addEventListener('change', popupTabSizeHandle);
    });

    popupElem.querySelectorAll(".popup-tab-additives-js").forEach((elem) => {
        elem.addEventListener('change', popupTabAdditivesHandle);
    });
};

popupElem.addEventListener("close", () => {
    bodyElem.classList.remove('page__body--is-fixed');
    resetPopupPrice();
});

popupElem.addEventListener("click", (e) => {
    if (!e.target.closest('.popup__wrapper')) {
        popupElem.close();
    }
});