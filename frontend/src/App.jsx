import React from "react"

import { Route,Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import ChatHome from "./pages/ChatHome"
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home/chat" element={<ChatHome/>}/>
      </Routes>
    </>
  )
}

export default App
