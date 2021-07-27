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


    const [selectedDescription, setSelectedDescription] = React.useState(-1)
    
    const [inputParam, setInputParam] = React.useState(parameters);
    const detectDensityPattern = new RegExp(/Density/);

    const setStateHandler = (value: number, key: string) => {

        if(key === "metricDensity") {
            
            
            setUniverseParameters((prevState) => ({...prevState, [key]: value}));
        } else if (detectDensityPattern.test(key)) {
            // const valueVariation =
            const entries = Object.keys(parameters).filter(item => detectDensityPattern.test(item));

            

            setUniverseParameters((prevState) => ({...prevState, [key]: value}));
        } else {
            setUniverseParameters((prevState) => ({...prevState, [key]: value}));
        }        
    }
    
    const getDefaultValuesHandler = () => {
        setUniverseParameters(getDefaultValues());        
    }

    const bgColors = ["hsl(75, 90%, 50%)", "hsl(180, 90%, 50%)", "hsl(285, 90%, 91%, 20%)", "hsl(285, 90%, 50%)",  "hsl(255, 90%, 50%)"];

    const colorStageName = [
        "Domínio da radiação",
        "Radiação de fundo do Universo",
        "Idade das trevas",
        "Domínio da matéria",
        "Domínio da energia escura"
    ]

    return <div className={styles.bodyBackground}>
        <UniverseDisplay config={inputParam}></UniverseDisplay>
        <div style={{
            flexDirection: 'row',
            display: 'flex',
            width: window.innerWidth,
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            position: 'absolute',
            bottom: 64,
            left: 0
        }}>
            {
                colorStageName.map((item, index) => <div onClick={() => setSelectedDescription(index === selectedDescription ? -1 : index)}
                style={{
                    width: 200,
                    color: index === selectedDescription ? 'black' : bgColors[index],
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: index === selectedDescription ? bgColors[index] :'#000000aa',
                    padding: 12,
                    cursor: 'pointer',
                    borderRadius: 12
                }} key={index + 'labelcolor'}>
                    <div style={{
                    width: 14, height: 14, borderRadius: 20, backgroundColor: index === selectedDescription ? 'black' :  bgColors[index],
                    marginBottom: 8
                    }} />
                    <p>{item}</p>                    
                </div>)
            }
        </div>
        <ParametersForm state={parameters} setState={setStateHandler} submit={() => setInputParam(parameters)} reset={getDefaultValuesHandler}></ParametersForm>        
    </div>
}

export default Home;