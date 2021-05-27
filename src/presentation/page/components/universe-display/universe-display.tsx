import mapSampleReducer from "@/util/map-sample-reducer/map-sample-reducer";
import { retrieveUniverseExpansionObject } from "@/util/friedmann/friedmann";
import React from "react";
import SVGBuilder from "../svg-builder/svg-builder";


const UniverseDisplay: React.FC<{config?: any, resolution?: number}> = ({config, resolution = 100}) => {
        const expansionRate = mapSampleReducer(retrieveUniverseExpansionObject(undefined, config.initialTime, config.finalTime, config.radiationDensity, config.matterDensity, config.darkEnergyDensity, config.metricDensity, config.hubbleConstant), resolution);
    return <div>
        <SVGBuilder time={expansionRate.get("time")} scale={expansionRate.get("scale")}></SVGBuilder>
    </div>

}

export default UniverseDisplay;