import React from 'react';
import MenuListItem from '../menu-list-item/menu-list-item';
import {connect} from 'react-redux';
import WithRestoService from '../hoc/with-resto-service';
import {menuLoaded, menuRequsted, addedToCard, isItemInCart} from '../../actions/index';
import Spinner from '../spinner/spinner';

import './menu-list.scss';

class MenuList extends React.Component {
    componentDidMount() {
        this.props.menuRequsted();
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
                        let classes = "menu__btn";
                        const findItem = itemsInCart.find(item => item.id === menuItem.id) || null;
                        if (findItem && findItem.added === true) {
                            classes = "menu__btn__mod";
                        }
                        return <MenuListItem 
                            key={menuItem.id} 
                            menuItem={menuItem}
                            onAddToCard={() => addedToCard(menuItem.id, menuItem.price)}
                            isItemInCart={() => isItemInCart(menuItem.id)}
                            classes={classes}
                            itemsInCart={findItem || null}
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
    menuRequsted,
    addedToCard,
    isItemInCart
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));