import { BrowserRouter } from "react-router-dom";
import React, { memo } from 'react'
import Home from './pages/home'

export default memo(function App() {
  return (
    <BrowserRouter>
       <Home/>
    </BrowserRouter>
  )
})