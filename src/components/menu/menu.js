import React from 'react';
import WithRestoService from '../hoc/with-resto-service';
import {connect} from 'react-redux';
import {menuLoaded, menuRequested, addedToCard, isItemInCart, changeTab, toggleMobMenu} from '../../actions/index';
import Spinner from '../spinner/spinner';
import MenuList from '../menu-list/menu-list';
import './menu.scss';

class Menu extends React.Component {

    componentDidMount() {
        this.props.menuRequested();
        const {RestoService} = this.props;
        RestoService.getMenuItems()
         .then(res => this.props.menuLoaded(res.menu, null));

        document.addEventListener('click', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick)
    }

    handleClick = (e) => {
        const {toggleMobMenu, isMobMenu} = this.props;
        if (isMobMenu && !e.target.closest('.menu__tabs') && !e.target.closest('.menu-button__hamburger')) {
            toggleMobMenu();
        }
    }

    render() {
        const {categories, 
            menuItems, 
            loading, 
            addedToCard, 
            isItemInCart, 
            itemsInCart, 
            changeTab, 
            activeTab,
            isMobMenu,
            toggleMobMenu} = this.props;
        
        if (loading) {
            return <Spinner/>
        }
        
        const menuClass = !isMobMenu ? "menu" : "menu menu__mob"
        const buttonClass = !isMobMenu ? "menu-button__hamburger" : "menu-button__hamburger open"

        return (
            <div className={menuClass}>
                <button 
                className="menu-button__btn"
                onClick={() => toggleMobMenu()}
                >
                    <div className={buttonClass}>
                        <span></span>
                    </div>
            </button>
                <ul className="menu__tabs">
                    {
                        categories.map((item, index) => {
                            return (
                                <li
                                    className={activeTab === item ? "menu__tabs-item active" : "menu__tabs-item"}
                                    key={index} //¯\_(ツ)_/¯
                                    onClick={() => {
                                        changeTab(item);
                                        toggleMobMenu()
                                    }}
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
        activeTab: state.activeTab,
        isMobMenu: state.isMobMenu,
    }
}

const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    addedToCard,
    isItemInCart,
    changeTab,
    toggleMobMenu
}

export default  WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(Menu));