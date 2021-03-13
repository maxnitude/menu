import React from 'react';
import './cart-table.scss';
import {connect} from 'react-redux';
import {deleteFromCard} from '../../actions/index';
import AddedButton from '../added-button/added-button'

const CartTable = ({itemsInCart, total, deleteFromCard}) => {
    return (
        <>
            <div className="cart__title">{ total > 0 ? 'Ваш заказ:' : 'Корзина пуста'}</div>
            <div className="cart__list">
                {
                    itemsInCart.map(item => {
                        const {title, price, url, id, count} = item;

                        return (
                            <div key={id} className="cart__item">
                            <img src={url} className="cart__item-img" alt={title}></img>
                            <div className="cart__item-title">{title}</div>
                            <AddedButton item={item}/>
                            <div className="cart__item-title">{count} x {price}$</div>
                            <div className="cart__item-price">{count*price}$</div>
                            <div onClick={() => deleteFromCard(id, price, count)} className="cart__close">&times;</div>
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
    deleteFromCard
}

export default connect(mapStateToProps, mapDispatchToProps)(CartTable);