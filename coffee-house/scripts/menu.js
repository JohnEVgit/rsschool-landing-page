const menuList = {
    coffee: [
        {
            id: 1,
            title: 'Irish coffee',
            description: 'Fragrant black coffee with Jameson Irish whiskey and whipped milk',
            price: 7,
        },
        {
            id: 2,
            title: 'Kahlua coffee',
            description: 'Classic coffee with milk and Kahlua liqueur under a cap of frothed milk',
            price: 7,
        },
        {
            id: 3,
            title: 'Honey raf',
            description: 'Espresso with frothed milk, cream and aromatic honey',
            price: 5.5,
        },
        {
            id: 4,
            title: 'Ice cappuccino',
            description: 'Cappuccino with soft thick foam in summer version with ice',
            price: 5,
        },
        {
            id: 5,
            title: 'Espresso',
            description: 'Classic black coffee',
            price: 4.5,
        },
        {
            id: 6,
            title: 'Latte',
            description: 'Espresso coffee with the addition of steamed milk and dense milk foam',
            price: 5.5,
        },
        {
            id: 7,
            title: 'Latte macchiato',
            description: 'Espresso with frothed milk and chocolate',
            price: 5.5,
        },
        {
            id: 8,
            title: 'Coffee with cognac',
            description: 'Fragrant black coffee with cognac and whipped cream',
            price: 6.5,
        },
    ],
    tea: [
        {
            id: 1,
            title: 'Moroccan',
            description: 'Fragrant black tea with the addition of tangerine, cinnamon, honey, lemon and mint',
            price: 4.5,
        },
        {
            id: 2,
            title: 'Ginger',
            description: 'Original black tea with fresh ginger, lemon and honey',
            price: 5,
        },
        {
            id: 3,
            title: 'Cranberry',
            description: 'Invigorating black tea with cranberry and honey',
            price: 5,
        },
        {
            id: 4,
            title: 'Sea buckthorn',
            description: 'Toning sweet black tea with sea buckthorn, fresh thyme and cinnamon',
            price: 5.5,
        },
    ],
    dessert: [
        {
            id: 1,
            title: 'Marble cheesecake',
            description: 'Philadelphia cheese with lemon zest on a light sponge cake and red currant jam',
            price: 3.5,
        },
        {
            id: 2,
            title: 'Red velvet',
            description: 'Layer cake with cream cheese frosting',
            price: 4,
        },
        {
            id: 3,
            title: 'Cheesecakes',
            description: 'Soft cottage cheese pancakes with sour cream and fresh berries and sprinkled with powdered sugar',
            price: 4.5,
        },
        {
            id: 4,
            title: 'Creme brulee',
            description: 'Delicate creamy dessert in a caramel basket with wild berries',
            price: 4,
        },
        {
            id: 5,
            title: 'Pancakes',
            description: 'Tender pancakes with strawberry jam and fresh strawberries',
            price: 4.5,
        },
        {
            id: 6,
            title: 'Honey cake',
            description: 'Classic honey cake with delicate custard',
            price: 4.5,
        },
        {
            id: 7,
            title: 'Chocolate cake',
            description: 'Cake with hot chocolate filling and nuts with dried apricots',
            price: 5.5,
        },
        {
            id: 8,
            title: 'Black forest',
            description: 'A combination of thin sponge cake with cherry jam and light chocolate mousse',
            price: 6.5,
        },
    ],
};

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

const menuSizeTabStartElem = bodyElem.querySelector('#menu-tab-coffee.menu-tab-js');
if (!menuSizeTabStartElem.checked) {
    menuSizeTabStartElem.checked = true;
}

const showMenuMoreButton = () => {
    if (menuGridStartPosition < menuList[menuGridCategory].length) {
        menuMoreButtonElem.classList.add('menu__more--is-active');
    } else {
        menuMoreButtonElem.classList.remove('menu__more--is-active');
    }
};

const createMenuLayout = () => {
    const menuCategoryList = menuList[menuGridCategory];

    for (let i = menuGridStartPosition; i < menuGridCount * menuGridPage && i !== menuCategoryList.length; i++) {
        const thisEl = menuCategoryList[i];
        menuGridLayout += `
        <div class="menu__item menu-item" data-id="${thisEl.id}" tabindex="0">
            <picture class="menu-item__picture">
                <source srcset="images/menu/${menuGridCategory}/${menuGridCategory}-${thisEl.id}.avif 1x, images/menu/${menuGridCategory}/${menuGridCategory}-${thisEl.id}-2x.avif 2x" type="image/avif">
                <source srcset="images/menu/${menuGridCategory}/${menuGridCategory}-${thisEl.id}.webp 1x, images/menu/${menuGridCategory}/${menuGridCategory}-${thisEl.id}-2x.webp 2x" type="image/webp">
                <img class="menu-item__img" src="images/menu/${menuGridCategory}/${menuGridCategory}-${thisEl.id}.jpg" alt="${thisEl.title}" width="340" height="340"
                    srcset="images/menu/${menuGridCategory}/${menuGridCategory}-${thisEl.id}.jpg 1x, images/menu/${menuGridCategory}/${menuGridCategory}-${thisEl.id}-2x.jpg 2x">
            </picture>
            <div class="menu-item__info">
                <h3 class="menu-item__title">${thisEl.title}</h3>
                <p class="menu-item__text">${thisEl.description}</p>
                <p class="menu-item__price">$${thisEl.price.toFixed(2)}</p>
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
    createMenuLayout();

    menuGridElem.innerHTML += menuGridLayout;
    menuGridLayout = '';

    menuGridStartPosition = getMenuGridStartPosition();
    showMenuMoreButton();
};

addMenuLayout();

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
        createPopup(thisElem.dataset.id);
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
const popupCloseButtonElem = bodyElem.querySelector('.close-popup-js');

const popupPictureElem = bodyElem.querySelector('.popup-picture-js');
const popupTitleElem = bodyElem.querySelector('.popup-title-js');
const popupDescriptionElem = bodyElem.querySelector('.popup-description-js');
const popupPriceElem = bodyElem.querySelector('.popup-price-js');

let popupPrice = 0;
let popupSizePrice = 0;
let popupAdditivesPrice = 0;

const calcPrice = (price) => {
    return (price + popupSizePrice + popupAdditivesPrice).toFixed(2);
};

const createPopupImage = (id) => {
    return `<source srcset="images/menu/${menuGridCategory}/${menuGridCategory}-${id}.avif 1x, images/menu/${menuGridCategory}/${menuGridCategory}-${id}-2x.avif 2x" type="image/avif">
    <source srcset="images/menu/${menuGridCategory}/${menuGridCategory}-${id}.webp 1x, images/menu/${menuGridCategory}/${menuGridCategory}-${id}-2x.webp 2x" type="image/webp">
    <img class="popup__img" src="images/menu/${menuGridCategory}/${menuGridCategory}-${id}.jpg" alt="Irish coffee" width="340" height="340"
      srcset="images/menu/${menuGridCategory}/${menuGridCategory}-${id}.jpg 1x, images/menu/${menuGridCategory}/${menuGridCategory}-${id}-2x.jpg 2x">`;
};

const createPopup = (id) => {
    popupPictureElem.innerHTML = createPopupImage(id);
    popupTitleElem.textContent = menuList[menuGridCategory][id - 1].title;
    popupDescriptionElem.textContent = menuList[menuGridCategory][id - 1].description;

    popupPrice = menuList[menuGridCategory][id - 1].price;
    popupPriceElem.textContent = `$${calcPrice(popupPrice)}`;
};

const resetPopupPrice = () => {
    popupSizePrice = 0;
    popupAdditivesPrice = 0;

    bodyElem.querySelector('#size-tab-s.popup-tab-size-js').checked = true;

    bodyElem.querySelectorAll(".popup-tab-addiives-js").forEach((elem) => {
        elem.checked = false;
    });
}

popupCloseButtonElem.addEventListener("click", () => {
    popupElem.close();
});

popupElem.addEventListener("close", () => {
    bodyElem.classList.remove('page__body--is-fixed');

    resetPopupPrice();
});

popupElem.addEventListener("click", (e) => {
    if (!e.target.closest('.popup__wrapper')) {
        popupCloseButtonElem.click();
    }
});

bodyElem.querySelectorAll(".popup-tab-size-js").forEach((elem) => {
    elem.addEventListener('change', (e) => {
        thisElem = e.target;
        popupSizePrice = +thisElem.dataset.sizePrice;
        popupPriceElem.textContent = `$${calcPrice(popupPrice)}`;
    });
});

bodyElem.querySelectorAll(".popup-tab-addiives-js").forEach((elem) => {
    elem.addEventListener('change', (e) => {
        thisElem = e.target;

        if (thisElem.checked) {
            popupAdditivesPrice += +thisElem.dataset.additivesPrice;
        } else {
            popupAdditivesPrice -= +thisElem.dataset.additivesPrice;
        }

        popupPriceElem.textContent = `$${calcPrice(popupPrice)}`;
    });
});
