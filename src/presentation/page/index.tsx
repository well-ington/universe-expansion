import React from "react";
import ParametersForm from "./components/parameters-form/parameters-form";
import UniverseDisplay from "./components/universe-display/universe-display";

const Home: React.FC = () => {
    const [parameters, setUniverseParameters] = React.useState({
            step: 0.1,
            initialTime: 0,
            finalTime: 13500,
            radiationDensity: 0.01,
            matterDensity: 0.25,
            darkEnergyDensity: 0.75,
            metricDensity: 1.001,
            hubbleConstant: Number("75E-6")
        });
    
    const [inputParam, setInputParam] = React.useState(parameters);


    const setStateHandler = (value: number, key: string) => {
        setUniverseParameters((prevState) => ({...prevState, [key]: value}));
    }

    return <div>
        <div>
            <UniverseDisplay config={inputParam}></UniverseDisplay>
        </div>

        <div>
            <ParametersForm state={parameters} setState={setStateHandler}></ParametersForm>
            <button onClick={() => setInputParam(parameters)}>do the barrel roll</button>
        </div>
        
    </div>
}

export default Home;