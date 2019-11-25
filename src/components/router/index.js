import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard"
const Router = () => (
    <div>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Redirect from="/" to="/login" />
        </Switch>
    </div>
);

export default Router;