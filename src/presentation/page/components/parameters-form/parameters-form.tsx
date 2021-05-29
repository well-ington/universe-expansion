import React from "react";
import styles from "./parameters-form.scss";
import Button from "../button/button";

const ParametersForm: React.FC<{setState: (value: number, key: string) => void, state, submit: () => void}> = ({setState, state, submit}) => {
    const [hide, setHide] = React.useState(false);
    
    const densityParameters = ["Radiation density", "Matter density", "Dark energy density", "Metric density", "Final time"];
    return <>    
    <div className={`${styles.container}`}>
        <div className={`${hide ? styles.hide : styles.show} ${styles.hideable}`}>
            {
                densityParameters.map((density) => {                
                    const itemKey = density.replace(/ (.){1}/gm, (_, group) => group.toUpperCase()).replace(/^(.)/, (_, group) => group.toLowerCase());
                    return <div>
                    <p>{density}</p>
                    <input type="number" value={state[itemKey]} onChange={(event) => setState(Number(event.target.value), itemKey)} />
                </div>
                })
            }
            <Button action={submit}>Calculate</Button> 
        </div>
        
        <div className={`${hide ? "" : ""}`}>
            <Button action={() => setHide(!hide)}>{hide ? "show" : "hide"}</Button>
        </div>
        
               
    </div>
    
    </>
}

export default ParametersForm;