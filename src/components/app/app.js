import React from 'react';
import {MainPage, CartPage} from '../pages';
import AppHeader from '../app-header/app-header';
import {Route} from 'react-router-dom';
 
class App extends React.Component  {

    render () {
        return (
                <div className="app">
                <AppHeader/>
                <Route exact path='/' component={MainPage}  />
                <Route path="/cart" component={CartPage} />
                </div>
        )
    }     
}

export default App;