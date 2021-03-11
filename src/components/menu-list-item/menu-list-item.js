import React from 'react';
import './menu-list-item.scss';
import AddedButton from '../added-button/added-button';

const MenuListItem = ({isItemInCart, menuItem, onAddToCard, itemInCart}) => {
    const {title, price, url} = menuItem;
    
    return (
            <li 
                className="menu__item">
                    <img className="menu__img" src={url} alt={title}></img>
                    <div className="menu__title">{title}</div>
                    <div className="menu__price-info">
                        <div className="menu__price">Price: <span>{price}$</span></div>
                        { itemInCart ? 
                            <AddedButton item={itemInCart}/> :     
                            <button 
                                    onClick={() => {
                                        onAddToCard();
                                        isItemInCart()
                                        }
                                    } 
                                    className="menu__btn"
                            >Add to cart</button>
                        }
                    </div>
            </li>
    );
}

export default MenuListItem;