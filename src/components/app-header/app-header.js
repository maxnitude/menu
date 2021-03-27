import React from 'react';
import cartIcon from './shopping-cart-solid.svg';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './app-header.scss';

const AppHeader = ({total, totalCount}) => {

    return (
        <header className="header">
            <Link to='/' className="header__link">
                <h1 className="header__link-title">Menu</h1>
                
            </Link>
            <Link to='/cart' className="header__link" >
                <span className="header__price">{total} $</span>
                <img className="header__cart" src={cartIcon} alt="cart"></img>
                <span className="header__count">{totalCount}</span>
            </Link>
        </header>
    )
};

const mapStateToProps = (state) => {
    return {
        total: state.total,
        totalCount: state.totalCount,
    }
}

export default connect(mapStateToProps)(AppHeader);

