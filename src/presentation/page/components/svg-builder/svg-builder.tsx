import mapSampleReducer from "@/util/map-sample-reducer/map-sample-reducer";
import React from "react";
import PolygonBuilder from "../polygon-builder/polygon-builder";

const SVGBuilder: React.FC<{time: number[], scale: number[]}> = (prop: { time, scale }) => {
    const bgColors = ["gold", "cyan", "black", "black", "hsl(285, 90%, 50%)",  "hsl(255, 90%, 50%)", "blue"];
    const expansionProfile = [0, 0.375, 375, 4000, 6700, 98000, 135000];
    const calculatedTime = prop.time[prop.time.length - 1];
    const polygonSectionHeight = window.innerHeight / 3;
    const universeProportions = (1/prop.scale[prop.scale.length - 1]);
    const universeSizeOffset = universeProportions * polygonSectionHeight;
    const lineArray = [];
    for (let i = 0; i < Math.floor(polygonSectionHeight/universeSizeOffset); i++) {
        lineArray.push(universeSizeOffset * (i+1));
    }

    if(lineArray.length < 2) {
        const test = (universeSizeOffset % polygonSectionHeight)/(4 * universeProportions);
        lineArray.push(test);
        lineArray.push(test * 2);
        lineArray.push(test * 3);
    }

    const myMap = new Map();
    myMap.set("proportion", lineArray);

    const resultingArray = mapSampleReducer(myMap, Math.min(3, lineArray.length));
    return <svg viewBox={`0 0 ${window.innerWidth} ${polygonSectionHeight * 2.1}`}>
        <defs>
            <linearGradient id="evolutionGradient">
            {
            expansionProfile.map(
                (profile, index) => <stop key={"color" + index} offset={`${(profile/calculatedTime) * 100}%`} stopColor={bgColors[index]} />)}
            </linearGradient>
        </defs>
        <PolygonBuilder height={polygonSectionHeight} width={window.innerWidth} time={prop.time} scale={prop.scale} fill={"url('#evolutionGradient')"}></PolygonBuilder>

        {
            resultingArray.get("proportion").map((pos) => <line x1="0" x2={window.innerWidth} y1={polygonSectionHeight - pos} y2={polygonSectionHeight - pos} stroke="green" />)
        }

        {

            resultingArray.get("proportion").map((pos) => <text y={pos > (polygonSectionHeight - 16) ? polygonSectionHeight - pos + 12 : polygonSectionHeight - pos - 2 } x={12}>{Math.floor((pos/universeSizeOffset) * 100)} % universe size</text>)
        }
        
    </svg>
}

export default SVGBuilder;