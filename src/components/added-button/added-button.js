import React from 'react';
import {connect} from 'react-redux';
import {deleteFromCard, addedToCard, isItemInCart, changeInput} from '../../actions/index';
import './added-button.scss';

const AddedButton = ({isItemInCart, addedToCard, deleteFromCard, item, changeInput}) => {
 
    const {count, price, id} = item;

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
                {/* <span >Added:</span> */}
                <input 
                    className="added-btn__input" 
                    type="text" 
                    value={count}
                    onChange={() => {}} //?????
                    onInput={(e) => {
                        let value = e.target.value;
                        let numberValue = Number(value);
                            if (!numberValue && numberValue !== 0) {
                                changeInput(id, price, 1)
                            } else if (numberValue < 0) {
                                changeInput(id, price, 1)
                            } else if (numberValue > 49) {
                                changeInput(id, price, 49)
                            } else {
                                changeInput(id, price, numberValue)
                            }                       
                        }
                    }
                ></input>
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
    isItemInCart,
    changeInput
}
export default connect(mapStateToProps, mapDispatchToProps)(AddedButton);
