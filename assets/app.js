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
import AuthContext from './contexts/AuthContext'
import CustomerPage from "./pages/CustomerPage"
import InvoicePage from "./pages/InvoicePage"
import RegisterPage from './pages/RegisterPage'
import { ToastContainer, toast } from 'react-toastify';
import ClientPage from './pages/ClientPage'

import 'react-toastify/dist/ReactToastify.css';
import './styles/app.css';
// start the Stimulus application
import './bootstrap';

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated)

    const NavbarWithRouter = withRouter(Navbar)

    const contextValue = {
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated
    }

    return (
        <AuthContext.Provider value={contextValue}>
        <HashRouter>
            <NavbarWithRouter />
            <main className="container pt-5">
                    <Switch>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/customerspage" component={CustomersPageWithPagination} />
                        <Route path="/register" component={RegisterPage} />
                        <PrivateRoute path="/client/:id" component={ClientPage} />
                        <PrivateRoute path="/customers/:id" component={CustomerPage} />
                        <PrivateRoute path="/customers"  component={CustomersPage} />
                        <PrivateRoute path="/invoices/:id" component={InvoicePage} />
                        <PrivateRoute path="/invoices" component={InvoicesPage} />
                        <Route path="/" component={HomePage} />
                    </Switch>
            </main>
        </HashRouter>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
       </AuthContext.Provider>
    )
}

const rootElement = document.querySelector('#app')
ReactDom.render(<App />, rootElement)
