import React from 'react';
import styles from "./Header.module.css"

const Header = props => (
    <div className={styles.header}>
        <h1>
            Clicky Game - Mean Girls Edition!
        </h1>
        <div className="scores">
            <ul>
              <div className="current-score">
                Current Score: {props.score}
              </div>
              <div className="current-score">
                Top Score: {props.topScore}
              </div>
            </ul>
        </div>
    </div>
);

export default Header

