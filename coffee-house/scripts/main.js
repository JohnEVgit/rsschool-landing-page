"use strict";

const bodyElem = document.querySelector('.body-js');
const headerNavElem = bodyElem.querySelector('.header-nav-js');
const headerNavListElem = bodyElem.querySelector('.header-nav-list-js');
const headerNavToggleButtonElem = bodyElem.querySelector('.header-nav-toggle-button-js');

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

    if (thisElem.closest('.header-nav__link') || thisElem.classList.contains('')) {
        bodyElem.classList.remove('page__body--is-tablet-fixed');
        headerNavElem.classList.remove('header-nav--is-active');
        headerNavListElem.classList.remove('header-nav__list--is-active');
        headerNavToggleButtonElem.classList.remove('button--is-active');
    }
});

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
        {
            id: 9,
            title: 'Coffee with cognac123',
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
    ]
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

let priceSize = 0;
let priceAdditives = 0;

const calcPrice = (price) => {
    return (price + priceSize + priceAdditives).toFixed(2);
};

const showMenuMoreButton = () => {
    if (menuGridStartPosition < menuList[menuGridCategory].length) {
        menuMoreButtonElem.classList.add('menu__more--is-active');
    } else {
        menuMoreButtonElem.classList.remove('menu__more--is-active');
    }
};

const createMenuLayout = () => {
    const menuCategoryList = menuList[menuGridCategory];

    for (let i = menuGridStartPosition; i < menuGridCount * menuGridPage && i !== menuCategoryList.length; i++ ) {
        const thisEl = menuCategoryList[i];
        menuGridLayout += `
        <div class="menu__item menu-item" tabindex="0">
            <picture class="menu-item__picture">
                <source srcset="images/menu/${menuGridCategory}/${menuGridCategory}-${thisEl.id}.avif 1x, images/menu/${menuGridCategory}/${menuGridCategory}-${thisEl.id}-2x.avif 2x" type="image/avif">
                <source srcset="images/menu/${menuGridCategory}/${menuGridCategory}-${thisEl.id}.webp 1x, images/menu/${menuGridCategory}/${menuGridCategory}-${thisEl.id}-2x.webp 2x" type="image/webp">
                <img class="menu-item__img" src="images/menu/${menuGridCategory}/${menuGridCategory}-${thisEl.id}.jpg" alt="${thisEl.title}" width="340" height="340"
                    srcset="images/menu/${menuGridCategory}/${menuGridCategory}-${thisEl.id}.jpg 1x, images/menu/${menuGridCategory}/${menuGridCategory}-${thisEl.id}-2x.jpg 2x">
            </picture>
            <div class="menu-item__info">
                <h3 class="menu-item__title">${thisEl.title}</h3>
                <p class="menu-item__text">${thisEl.description}</p>
                <p class="menu-item__price">$${calcPrice(thisEl.price)}</p>
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
menuGridStartPosition = getMenuGridStartPosition();

menuMoreButtonElem.addEventListener('click', () => {
    menuGridPage += 1;
    addMenuLayout();
});

window.addEventListener('resize', () => {
    if (isMobile && window.innerWidth > 768) {
        isMobile = false;

        resetMenuLayout();
        addMenuLayout();
        console.log('Desk');
    } else if (!isMobile && window.innerWidth <= 768) {
        isMobile = true;

        resetMenuLayout();
        addMenuLayout();
        console.log('Mob');
    }
});

document.querySelectorAll(".menu-tab-js").forEach((elem) => {
    elem.addEventListener('change', (e) => {
        menuGridCategory = e.target.dataset.category;
        resetMenuLayout();
        addMenuLayout();
    });
});
