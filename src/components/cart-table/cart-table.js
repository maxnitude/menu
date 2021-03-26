import React from 'react';
import './cart-table.scss';
import {connect} from 'react-redux';
import {deleteProduct} from '../../actions/index';
import AddedButton from '../added-button/added-button'

const CartTable = ({itemsInCart, total, deleteProduct}) => {
    return (
        <>
            <div className="cart__title">{ total > 0 ? 'Your order:' : 'Cart is empty'}</div>
            <div className="cart__list">
                {
                    itemsInCart.map(item => {
                        const {title, price, url, id, count} = item;

                        return (
                            <div key={id} className="cart__item">
                                <div className="cart__item-img">
                                    <img src={url} className="cart__item-img__source" alt={title}></img>
                                </div>
                                <div className="cart__item-description">
                                    <div className="cart__item-title">{title}</div>
                                    <div className="cart__item-price">{price}$/count</div>
                                    <AddedButton item={item}/>
                                    <div className="cart__item-price__total">{count*price}$</div>
                                    <div onClick={() => deleteProduct(id)} className="cart__item-delete"></div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        itemsInCart: state.itemsInCart,
        total: state.total
    }
}

const mapDispatchToProps = {
    deleteProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(CartTable);