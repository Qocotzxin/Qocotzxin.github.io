import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./app.scss";

class App extends Component {
    render() {
        return ( 
            <div className='App'>
                <h1> Hola mundo! </h1>
            </div>
        );
    }
}

export default hot(module)(App);