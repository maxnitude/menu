import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {deleteFromCard, addedToCard, isItemInCart, changeInput} from '../../actions/index';
import './added-button.scss';

const AddedButton = ({isItemInCart, addedToCard, deleteFromCard, item, changeInput}) => {
 
    const {count, price, id} = item;

    const [decrButton, setDecrButton] = useState(true);

    const [incrButton, setIncrButton] = useState(true);

    const [alertMessage, setAlertMessage] = useState(false);

    useEffect(() => {
        if (count === 0) {
            setDecrButton(false);
        } else if (count === 49) {
            setIncrButton(false);
        }  else if (count < 49 && count > 0) {
            setIncrButton(true);
            setDecrButton(true);
        } 
    }, [count])

    let decrButtonClass = decrButton ? "added-btn__minus" : "added-btn__minus added-btn__inactive";
    let incrButtonClass = incrButton ? "added-btn__plus" : "added-btn__plus added-btn__inactive";
    let alertMessageClass = alertMessage ? "added-btn__alert-message" : "added-btn__alert-message__inactive";

    return (
        <div className="added-btn">
            <button 
                className={decrButtonClass}
                disabled = {!decrButton}
                onClick={() => {
                        if (decrButton) {
                            deleteFromCard(id);
                        } 
                    }
                } 
            >-</button>
            <div className="added-btn__title">
                <input 
                    className="added-btn__input" 
                    type="text" 
                    value={count}
                    onChange={()=>{}}
                    onBlur={(e) => {
                        const value = e.target.value;
                        if ( value === '') {
                            changeInput(id, price, 1);
                            setDecrButton(true);   
                        }
                        setAlertMessage(false)
                        } 
                    }
                    onInput={(e) => {
                        const value = e.target.value;
                        const num = Number(e.target.value);
                        if (!isNaN(num) && value !== '') {
                            if (num === 0 ) {
                                changeInput(id, price, 1);
                            } else if (value > 49) {
                                setAlertMessage(true);
                                setTimeout(() => {
                                    setAlertMessage(false);
                                }, 3000);
                                changeInput(id, price, 49);
                            } else {
                                changeInput(id, price, num);
                            }
                        } else if (value === '' ) {
                            setDecrButton(false);
                            changeInput(id, price, value);
                        } else if (isNaN(num)) {
                            if (value.match(/\d+/) === null) {
                                changeInput(id, price, 1);
                            } else  {
                                const numFromString = Number(value.match(/\d+/)[0]);
                                changeInput(id, price, numFromString);
                            };
                        }                 
                    }}
                ></input>
            </div> 
            <button 
                className={incrButtonClass}
                disabled = {!incrButton}
                onClick={() => {
                    isItemInCart(id);
                    addedToCard(id, price)
                    }
                } 
            >+</button>
            <span className={alertMessageClass}>No more than 49</span>
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
