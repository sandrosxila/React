import React from "react"
import Scene from "./components/Scene";
import Header from "./components/layout/Header";
import './App.css'

function App() {

    const boundsById = {};
    const setXById = {};

    return (
        <div>
            <Header/>
            <Scene boundsById={boundsById} setXById={setXById}/>
        </div>
    )
}

export default App;
