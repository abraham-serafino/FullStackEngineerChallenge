import { createBrowserHistory } from "history"
import EmployeeAdminPage from "/imports/EmployeeAdmin/EmployeeAdmin.page"
import React from "react"
import { Router, Route, Switch } from "react-router"
import NotFoundPage from "./NotFound.page"

const browserHistory = createBrowserHistory()

const RoutesComponent = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/admin" component={EmployeeAdminPage}/>
      <Route component={NotFoundPage}/>
    </Switch>
  </Router>
)

export default RoutesComponent
