import React from "react"

import { Route,Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
