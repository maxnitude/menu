import React from 'react';
import MenuListItem from '../menu-list-item/menu-list-item';
import {connect} from 'react-redux';
import WithRestoService from '../hoc/with-resto-service';
import {menuLoaded, menuRequsted, addedToCard} from '../../actions/index';
import Spinner from '../spinner/spinner';

import './menu-list.scss';

class MenuList extends React.Component {
    componentDidMount() {
        this.props.menuRequsted();
        const {RestoService} = this.props;
        RestoService.getMenuItems()
         .then(res => this.props.menuLoaded(res));
    }

    render() {
        const {menuItems, loading, addedToCard} = this.props;
        
        if (loading) {
            return <Spinner/>
        }
        
        return (
            <ul className="menu__list">
                {
                    menuItems.map(menuItem => {
                        return <MenuListItem 
                            key={menuItem.id} 
                            id={menuItem.id}
                            menuItem={menuItem}
                            onAddToCard={() => addedToCard(menuItem.id, menuItem.price)}/>
                    })
                }
            </ul>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading
    }
}

const mapDispatchToProps = {
    menuLoaded,
    menuRequsted,
    addedToCard
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));