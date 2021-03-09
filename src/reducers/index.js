const initialState = {
    menu: [],
    loading: true,
    itemsInCart: [],
    total: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: state.menu,
                loading: true
            };
        case 'ITEM_ADD_TO_CARD':
            const id = action.payload;
            const price = action.price;
            const item = state.menu.find(item => item.id === id);
            const existingItem = state.itemsInCart.find(item => item.id === id);
            if (existingItem) {
                existingItem.count++;
                // console.log(existingItem.count);
                return {
                    ...state,
                    itemsInCart: [
                        ...state.itemsInCart
                    ],
                    total: state.total + price
                };
            }

            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id,
                count: 1,
            }   
            
            return {
                ...state,
                itemsInCart: [
                    ...state.itemsInCart,
                   newItem
                ],
                total: state.total+price
            };

        case 'ITEM_REMOVE_FROM_CARD':
            const idx = action.payload;
            const delPrice = action.price;
            const delCount = action.count;
            const itemIndex = state.itemsInCart.findIndex(item => item.id === idx);    
            return {
                ...state,
                itemsInCart: [
                    ...state.itemsInCart.slice(0, itemIndex),
                    ...state.itemsInCart.slice(itemIndex + 1)
                ],
                total: state.total - delPrice*delCount
            }

        case 'CHECK_ITEM_IN_CART':
            const idy = action.payload;
            const itemInCart = state.itemsInCart.find(item => item.id === idy);
            itemInCart.added = true;
            console.log(itemInCart);
            console.log(state.itemsInCart);
            return {
                ...state,
            };

        default:
            return state;
    }
}

export default reducer;