import React from 'react';
import {connect} from 'react-redux';
import './menu-list-item.scss';

const MenuListItem = ({itemsInCart, menuItem, onAddToCard, id}) => {
    const {title, price, url} = menuItem;
    let classes = "menu__btn";

    // const [hover, setHover] = useState(false);

    // useEffect(() => {
    //     if (hover) {
    //         classes = "menu__btn__mod";
    //         console.log(classes);
    //     } else {
    //         classes = "menu__btn";
    //         console.log(classes);
    //     } 
    // })


    // if (itemsInCart.length > 0) {
    //     const actualItem = itemsInCart.find(item => item.id === id);
    //     console.log(actualItem);
    //     const {count} = actualItem;
    //     console.log(count);
    //     if (count > 1) {
    //         classes = classes + "menu__btn__mod";
    //     }
    // }
    
    return (
            <li 
                // onMouseEnter={() => setHover(true)}
                // onMouseOut={() => setHover(false)}
                className="menu__item">
                    <img className="menu__img" src={url} alt={title}></img>
                    <div className="menu__title">{title}</div>
                    <div className="menu__price-info">
                        <div className="menu__price">Price: <span>{price}$</span></div>
                        <button 
                            onClick={() => onAddToCard()} 
                            className={classes}
                        >Add to cart</button>
                    </div>
            </li>
    );
}


const mapStateToProps = (state) => {
    return {
        itemsInCart: state.itemsInCart
    }
}

export default connect(mapStateToProps)(MenuListItem);