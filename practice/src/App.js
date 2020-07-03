import React from 'react';
import Contacts from "./components/Contacts";
import Header from "./components/Header";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import {Provider} from './context';

function App() {
    return (
        <Provider>
            <div className="App">
                <Header/>
                <div style={{marginTop: "20px"}} className="container">
                    <Contacts/>
                </div>
            </div>
        </Provider>
    );
}

export default App;
