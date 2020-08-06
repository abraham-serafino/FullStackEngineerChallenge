import { BrowserRouter, Route, Switch } from "react-router-dom"
import MainLayout from "/imports/App/Main.layout"
import { Meteor } from "meteor/meteor"
import NotFoundPage from "/imports/App/NotFound.page"
import React from "react"
import { withTracker } from "meteor/react-meteor-data"

import EmployeeAdminPage from '/imports/EmployeeAdmin/EmployeeAdmin.page';

const AppRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
      <MainLayout>
        <Component {...props} />
      </MainLayout>
    )}
  />
)

const Router = () => (
  <BrowserRouter>
    <Switch>
      <AppRoute exact path="/" component={EmployeeAdminPage} />
      <AppRoute exact path="/admin" component={EmployeeAdminPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
)

export { AppRoute }

export default withTracker(() => ({ user: Meteor.user() })) (Router)
