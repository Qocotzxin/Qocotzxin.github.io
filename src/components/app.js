import React, { Component } from "react";
import { hot } from "react-hot-loader";
import styles from "../../style/main.scss";

class App extends Component {
  render() {
    return (
      <div>
        <h1 className={styles.h1}> Github App! </h1>
      </div>
    );
  }
}

export default hot(module)(App);
