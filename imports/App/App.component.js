import React, { createContext, useState } from "react"
import Router from "/imports/App/Routes.component"

import "bootstrap/dist/css/bootstrap.min.css"

const AppContext = createContext({})

const AppComponent = () => {
  const [appState, setAppState] = useState({})

  return (
    <AppContext.Provider value={{appState, setAppState}}>
      <Router />
    </AppContext.Provider>
  )
}

export default AppComponent
