import React, {useState} from 'react';
import ReactDom from 'react-dom'
import { HashRouter, Switch, Route, withRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CustomersPage from './pages/CustomersPage'
import CustomersPageWithPagination from "./pages/CustomersPagesWithPagination"
import InvoicesPage from './pages/InvoicesPage'
import LoginPage from './pages/LoginPage'
import authAPI from './services/authAPI';
import PrivateRoute from './components/PrivateRoute'

import './styles/app.css';
// start the Stimulus application
import './bootstrap';

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated)

    const NavbarWithRouter = withRouter(Navbar)

    return (
       <HashRouter>
           <NavbarWithRouter isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated}/>
           <main className="container pt-5">
                <Switch>
                    <Route path="/login" render={(props) => 
                        <LoginPage 
                            onLogin={setIsAuthenticated}
                            {...props}
                        />
                    } />
                    <Route path="/customerspage" component={CustomersPageWithPagination} />
                    <PrivateRoute path="/customers" isAuthenticated={isAuthenticated} component={CustomersPage} />
                    <PrivateRoute path="/invoices" isAuthenticated={isAuthenticated} component={InvoicesPage} />
                    <Route path="/" component={HomePage} />
                </Switch>
           </main>
       </HashRouter>
    )
}

const rootElement = document.querySelector('#app')
ReactDom.render(<App />, rootElement)
