import React from "react";
import styles from "./button.scss";

const Button: React.FC<{action: () => void}> = (props) => {
    return <button className={styles.container} onClick={props.action}>{props.children}</button>
}

export default Button;