import React from 'react'
import "./App.css"
import Main from './components/Main'
import { Route, Routes } from "react-router-dom";
// import Preview from './components/Preview';


export default function App() {

  return (
    <>
      {/* <Main /> */}
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/preview" element={<Preview/>}/> */}
      </Routes>
    </>
  )
}
