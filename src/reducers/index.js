const initialState = {
    allMenu: [],
    visibleMenu: [],
    loading: true,
    itemsInCart: [],
    total: 0,
    totalCount: 0,
    categories: [],
    activeTab: 'Pizza',
    isMobMenu: false,
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
                return {
                    ...state,
                    itemsInCart: [
                        ...state.itemsInCart
                    ],
                    total: state.total + price,
                    totalCount: state.totalCount + 1,
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
                total: state.total+price,
                totalCount: state.totalCount + 1,
            };

        case 'ITEM_REMOVE_FROM_CARD':
            const delId = action.payload;
            const itemIndex = state.itemsInCart.findIndex(item => item.id === delId);
            const delItem = state.itemsInCart.find(item => item.id === delId); 
            if (delItem.count > 1) {
                delItem.count--;
                return {
                    ...state,
                    itemsInCart: [
                        ...state.itemsInCart
                    ],
                    total: state.total - delItem.price,
                    totalCount: state.totalCount - 1,
                };
            } else if (delItem.count === 0) {
                return {
                    ...state,
                    itemsInCart: [
                        ...state.itemsInCart.slice(0, itemIndex),
                        ...state.itemsInCart.slice(itemIndex + 1)
                    ],
                    totalCount: state.totalCount - 1,
                };
            } 
            return {
                ...state,
                itemsInCart: [
                    ...state.itemsInCart.slice(0, itemIndex),
                    ...state.itemsInCart.slice(itemIndex + 1)
                ],
                total: state.total - delItem.price,
                totalCount: state.totalCount - 1,
            };

        case 'PRODUCT_REMOVE_FROM_CARD':    
            const productId = action.payload;
            const productIndex = state.itemsInCart.findIndex(item => item.id === productId);
            const delProduct = state.itemsInCart.find(item => item.id === productId); 
            return {
                ...state,
                itemsInCart: [
                    ...state.itemsInCart.slice(0, productIndex),
                    ...state.itemsInCart.slice(productIndex + 1)
                ],
                total: state.total - delProduct.price*delProduct.count,
                totalCount: state.totalCount - delProduct.count,
            };

        case 'CHECK_ITEM_IN_CART':
            const checkId = action.payload;
            const itemInCart = state.itemsInCart.find(item => item.id === checkId);
            itemInCart.added = true;
            return {
                ...state,
            };

        case 'CHANGE_INPUT':
            const changedId = action.payload;
            const inputValue = action.value;
            const inputPrice = action.price;
            const itemInCarts = state.itemsInCart.find(item => item.id === changedId);
            const prevCount = itemInCarts.count;
            itemInCarts.count = inputValue;
            return {
                ...state,
                itemsInCart: [
                    ...state.itemsInCart
                ],
                total: state.total + inputPrice*inputValue - inputPrice*prevCount,
                totalCount: state.totalCount + inputValue - prevCount,
            };  

        case 'TOGGLE_MOB_MENU': 
            return {
                    ...state,
                    isMobMenu: !state.isMobMenu,
                };

        default:
            return state;
    }
}

export default reducer;