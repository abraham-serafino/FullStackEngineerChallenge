import AppComponent from "/imports/App/App.component"
import { Meteor } from "meteor/meteor"
import React from "react"
import { render } from "react-dom"

import "/imports/index.html"

Meteor.startup(() => {
  render(<AppComponent />, document.getElementById("app"))
})
