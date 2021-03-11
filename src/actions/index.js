const menuLoaded = (newMenu) => {
    return {
        type: 'MENU_LOADED',
        payload: newMenu
    };
};

const menuRequested = () => {
    return {
        type: 'MENU_REQUESTED',
    };
};

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
    isItemInCart
};