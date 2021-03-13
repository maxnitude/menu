const menuRequested = () => {
    return {
        type: 'MENU_REQUESTED',
    };
};

const menuLoaded = (newMenu, tab) => {
    return {
        type: 'MENU_LOADED',
        payload: newMenu,
        tab: tab,
    };
};

const categoriesLoaded = () => {
    return {
        type: 'CATEGORIES_LOADED',
    };
};

const changeTab = (tab) => {
    return {
        type: 'CHANGE_TAB',
        tab: tab,
    };
}

const addedToCard = (id, price) => {
    return {
        type: 'ITEM_ADD_TO_CARD',
        payload: id,
        price: price
    };
};

const deleteFromCard = (id) => {
    return {
        type: 'ITEM_REMOVE_FROM_CARD',
        payload: id
    };
};

const isItemInCart = (id) => {
    return {
        type: 'CHECK_ITEM_IN_CART',
        payload: id
    };
};

export {
    menuLoaded,
    menuRequested,
    addedToCard,
    deleteFromCard,
    isItemInCart,
    categoriesLoaded,
    changeTab
};