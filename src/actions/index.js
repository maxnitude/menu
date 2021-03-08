const menuLoaded = (newMenu) => {
    return {
        type: 'MENU_LOADED',
        payload: newMenu
    };
};

const menuRequsted = () => {
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

const deleteFromCard = (id, price, count) => {
    return {
        type: 'ITEM_REMOVE_FROM_CARD',
        payload: id,
        price: price,
        count: count
    };
};

export {
    menuLoaded,
    menuRequsted,
    addedToCard,
    deleteFromCard
};