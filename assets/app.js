import React from 'react';
import ReactDom from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CustomersPage from './pages/CustomersPage'

import './styles/app.css';
// start the Stimulus application
import './bootstrap';

const App = () => {
    return (
       <HashRouter>
           <Navbar />
           <main className="container pt-5">
                <Switch>
                    <Route path="/customers" component={CustomersPage} />
                    <Route path="/" component={HomePage} />
                </Switch>
           </main>
       </HashRouter>
    )
}

const rootElement = document.querySelector('#app')
ReactDom.render(<App />, rootElement)
