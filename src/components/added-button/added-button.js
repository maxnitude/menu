import React from 'react';
import {connect} from 'react-redux';
import {deleteFromCard, addedToCard, isItemInCart} from '../../actions/index';
import './added-button.scss';

const AddedButton = ({isItemInCart, addedToCard, deleteFromCard, item}) => {
 
    const {count, price, id} = item;
    console.log(id);

    return (
        <div className="added-btn">
            <button 
                className="added-btn__minus"
                onClick={() => {
                    deleteFromCard(id)
                    }
                } 
            >-</button>
            <div className="added-btn__title">
                <span >Added:</span>
                <span >{count}</span>
            </div> 
            <button 
                className="added-btn__plus"
                onClick={() => {
                    isItemInCart(id);
                    addedToCard(id, price)
                    }
                } 
            >+</button>
        </div>  
    )

}

const mapStateToProps = ({itemsInCart}) => {
    return {
        itemsInCart
    }
}

const mapDispatchToProps = {
    deleteFromCard,
    addedToCard,
    isItemInCart
}
export default connect(mapStateToProps, mapDispatchToProps)(AddedButton);
