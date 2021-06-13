import React from "react";
import ParametersForm from "./components/parameters-form/parameters-form";
import UniverseDisplay from "./components/universe-display/universe-display";

const Home: React.FC = () => {
    const [parameters, setUniverseParameters] = React.useState({
            initialTime: 0,
            finalTime: 13.5,
            radiationDensity: 0.001,
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
        <UniverseDisplay config={inputParam}></UniverseDisplay>
        <ParametersForm state={parameters} setState={setStateHandler} submit={() => setInputParam(parameters)}></ParametersForm>
    </div>
}

export default Home;