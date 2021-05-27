import React from "react";

const ParametersForm: React.FC<{setState: (value: number, key: string) => void, state}> = ({setState, state}) => {
    const densityParameters = ["Radiation density", "Matter density", "Dark energy density", "Metric density", "Final time"];
    
    return <div>
        {
            densityParameters.map((density) => {                
                const itemKey = density.replace(/ (.){1}/gm, (_, group) => group.toUpperCase()).replace(/^(.)/, (_, group) => group.toLowerCase());
                return <div>
                <p>{density}</p>
                <input type="number" value={state[itemKey]} onChange={(event) => setState(Number(event.target.value), itemKey)} />
            </div>
            })
        }
    </div>
}

export default ParametersForm;