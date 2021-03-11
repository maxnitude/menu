import React from 'react';
import MenuListItem from '../menu-list-item/menu-list-item';
import {connect} from 'react-redux';
import WithRestoService from '../hoc/with-resto-service';
import {menuLoaded, menuRequested, addedToCard, isItemInCart} from '../../actions/index';
import Spinner from '../spinner/spinner';

import './menu-list.scss';

class MenuList extends React.Component {
    componentDidMount() {
        this.props.menuRequested();
        const {RestoService} = this.props;
        RestoService.getMenuItems()
         .then(res => this.props.menuLoaded(res.menu));
    }

    render() {
        const {menuItems, loading, addedToCard, isItemInCart, itemsInCart} = this.props;

        if (loading) {
            return <Spinner/>
        }

        return (
            <ul className="menu__list">
                {
                    menuItems.map(menuItem => {
                        const findItem = itemsInCart.find(item => item.id === menuItem.id) || null;
                        console.log(findItem);
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

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        itemsInCart: state.itemsInCart
    }
}

const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    addedToCard,
    isItemInCart
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));