const initialState = {
    allMenu: [],
    visibleMenu: [],
    loading: true,
    itemsInCart: [],
    total: 0,
    categories: [],
    activeTab: 'Pizza'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_REQUESTED':
            return {
                ...state,
                loading: true
            };
        
        case 'MENU_LOADED':
            const allMenu = action.payload;
            let tab = action.tab;
            if (tab === null) {
                tab = state.activeTab;
            }
            const visibleMenu = [];
            allMenu.forEach(item => {  
                if (state.categories.indexOf(item.category) === -1) {
                    state.categories.push(item.category);
                };
            })

            allMenu.forEach(item => {
                if (item.category === tab) {
                    visibleMenu.push(item);
                }
            })

            return {
                ...state,
                allMenu: action.payload,
                visibleMenu: visibleMenu,
                loading: false,
                categories: state.categories,
                activeTab: tab,
            };

        case 'CHANGE_TAB':
            const touch = action.tab;
            const touchMenu = [];
            state.allMenu.forEach(item => {
                if (item.category === touch) {
                    touchMenu.push(item);
                }
            })
            return {
                ...state,
                visibleMenu: [...touchMenu],
                activeTab: touch,
            };

        case 'ITEM_ADD_TO_CARD':
            const id = action.payload;
            const price = action.price;
            const item = state.visibleMenu.find(item => item.id === id);
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
            const itemIndex = state.itemsInCart.findIndex(item => item.id === idx);
            const delItem = state.itemsInCart.find(item => item.id === idx); 
            if (delItem.count > 1) {
                delItem.count--;
                return {
                    ...state,
                    itemsInCart: [
                        ...state.itemsInCart
                    ],
                    total: state.total - delItem.price
                };
            }   
            return {
                ...state,
                itemsInCart: [
                    ...state.itemsInCart.slice(0, itemIndex),
                    ...state.itemsInCart.slice(itemIndex + 1)
                ],
                total: state.total - delItem.price
            }

        case 'CHECK_ITEM_IN_CART':
            const idy = action.payload;
            const itemInCart = state.itemsInCart.find(item => item.id === idy);
            itemInCart.added = true;
            return {
                ...state,
            };

        default:
            return state;
    }
}

export default reducer;