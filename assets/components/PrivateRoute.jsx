import React from 'react';
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = (props) => {
    return props.isAuthenticated ? (
        <Route path={props.path} component={props.component} />
    ) : (
        <Redirect to="/login" />
    )
}
 
export default PrivateRoute;