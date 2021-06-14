import React from "react";
import styles from "./button.scss";

const Button: React.FC<{action: () => void, className?: string, type?: string}> = (props) => {
    return <button className={`${props.className ? props.className : styles.container} ${styles[props.type]}`} onClick={props.action}>{props.children}</button>
}

export default Button;