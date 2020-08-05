import React, { createContext, useState } from "react"
import HomePage from "/imports/App/Home.page"

import "bootstrap/dist/css/bootstrap.min.css"

const AppContext = createContext({})

const AppComponent = () => {
  const [appState, setAppState] = useState({})

  return (
    <AppContext.Provider value={{appState, setAppState}}>
      <HomePage />
    </AppContext.Provider>
  )
}

export default AppComponent
