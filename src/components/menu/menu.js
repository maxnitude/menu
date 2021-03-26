import React from 'react';
import WithRestoService from '../hoc/with-resto-service';
import {connect} from 'react-redux';
import {menuLoaded, menuRequested, addedToCard, isItemInCart, changeTab} from '../../actions/index';
import Spinner from '../spinner/spinner';
import MenuList from '../menu-list/menu-list';
import './menu.scss';

class Menu extends React.Component {

    componentDidMount() {
        this.props.menuRequested();
        const {RestoService} = this.props;
        RestoService.getMenuItems()
         .then(res => this.props.menuLoaded(res.menu, null));
    }

    render() {
        const {categories, 
            menuItems, 
            loading, 
            addedToCard, 
            isItemInCart, 
            itemsInCart, 
            changeTab, 
            activeTab} = this.props;
        
        if (loading) {
            return <Spinner/>
        }

        return (
            <div className="menu">
                <ul className="menu__tabs">
                    {
                        categories.map((item, index) => {
                            return (
                                <li 
                                    className={activeTab === item ? "menu__tabs-item active" : "menu__tabs-item"}
                                    key={index} //¯\_(ツ)_/¯
                                    onClick={() => changeTab(item)}
                                    >{item}
                                </li> 
                            )
                        })
                    }
                </ul>
                <MenuList 
                    menuItems={menuItems}
                    addedToCard={addedToCard} 
                    isItemInCart={isItemInCart}
                    itemsInCart={itemsInCart}
                />
            </div>
            
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        menuItems: state.visibleMenu,
        loading: state.loading,
        itemsInCart: state.itemsInCart,
        categories: state.categories,
        activeTab: state.activeTab
    }
}

const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    addedToCard,
    isItemInCart,
    changeTab
}

export default  WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(Menu));