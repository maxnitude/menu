import React from 'react';
import './menu-list-item.scss';

const MenuListItem = ({isItemInCart, menuItem, onAddToCard, classes, itemsInCart}) => {
    const {title, price, url} = menuItem;
    let buttonTitle = "Add to cart";
    if (itemsInCart) {
        const {count, added} = itemsInCart;
        if (added === true) {
            buttonTitle = `Added: ${count}`;
        }
    }
    
    return (
            <li 
                className="menu__item">
                    <img className="menu__img" src={url} alt={title}></img>
                    <div className="menu__title">{title}</div>
                    <div className="menu__price-info">
                        <div className="menu__price">Price: <span>{price}$</span></div>
                        <button 
                            onClick={() => {
                                onAddToCard();
                                isItemInCart()
                                }
                            } 
                            className={classes}
                        >{buttonTitle}</button>
                    </div>
            </li>
    );
}

export default MenuListItem;