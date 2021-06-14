import React from "react";
import ParametersForm from "./components/parameters-form/parameters-form";
import UniverseDisplay from "./components/universe-display/universe-display";
import styles from "./index.scss";

const getDefaultValues = () => ({
    initialTime: 0,
    finalTime: 13.5,
    radiationDensity: 0.001,
    matterDensity: 0.25,
    darkEnergyDensity: 0.75,
    metricDensity: 1.001,
    hubbleConstant: Number("75E-6")
});

const Home: React.FC = () => {
    const [parameters, setUniverseParameters] = React.useState(getDefaultValues());
    
    const [inputParam, setInputParam] = React.useState(parameters);

    const setStateHandler = (value: number, key: string) => {
        setUniverseParameters((prevState) => ({...prevState, [key]: value}));
    }
    
    const getDefaultValuesHandler = () => {
        setUniverseParameters(getDefaultValues());        
    }

    return <div className={styles.bodyBackground}>
        <UniverseDisplay config={inputParam}></UniverseDisplay>
        <ParametersForm state={parameters} setState={setStateHandler} submit={() => setInputParam(parameters)} reset={getDefaultValuesHandler}></ParametersForm>
    </div>
}

export default Home;