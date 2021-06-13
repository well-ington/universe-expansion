import mapSampleReducer from "@/util/map-sample-reducer/map-sample-reducer";
import { retrieveUniverseExpansionObject } from "@/util/friedmann/friedmann";
import React from "react";
import SVGBuilder from "../svg-builder/svg-builder";


const UniverseDisplay: React.FC<{config?: any, resolution?: number}> = ({config, resolution = 500}) => {
    const expansionRate = React.useMemo(() => mapSampleReducer(retrieveUniverseExpansionObject(config.finalTime / 13.5, 
            config.initialTime, config.finalTime * 1000, config.radiationDensity, config.matterDensity, 
            config.darkEnergyDensity, config.metricDensity, config.hubbleConstant), resolution), [config.initialTime, config.finalTime, config.radiationDensity, config.matterDensity, 
                config.darkEnergyDensity, config.metricDensity, config.hubbleConstant, resolution]);
    return <SVGBuilder time={expansionRate.get("time")} scale={expansionRate.get("scale")}></SVGBuilder>

}

export default UniverseDisplay;