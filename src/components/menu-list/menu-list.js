import React from 'react';
import MenuListItem from '../menu-list-item/menu-list-item';
import './menu-list.scss';

class MenuList extends React.Component {
    
    render() {
        const {menuItems, addedToCard, isItemInCart, itemsInCart} = this.props;

        return (
            <ul className="menu__list">
                {
                    menuItems.map(menuItem => {
                        const findItem = itemsInCart.find(item => item.id === menuItem.id) || null;
                        return <MenuListItem 
                            key={menuItem.id} 
                            menuItem={menuItem}
                            onAddToCard={() => addedToCard(menuItem.id, menuItem.price)}
                            isItemInCart={() => isItemInCart(menuItem.id)}
                            itemInCart={findItem || null}
                            />
                    })
                }
            </ul>
        )
    }
};

export default MenuList;