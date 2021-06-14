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
    const pickLastVal = Number([...prop.scale].sort((a,b) => a > b ? -1 : 1)[0]);
    // console.log(pickLastVal, prop.scale);
    const [lastValue, setLastValue] = React.useState(pickLastVal);
    
    const buildUniverseProportionArray = () => {
        const resultingArray = [];
        for (let i = 0; i < Math.floor(polygonSectionHeight/universeSizeOffset); i++) {
            resultingArray.push(universeSizeOffset * (i+1));
        }
        if(resultingArray.length < 2) {
            const slicedUniverseSize = polygonSectionHeight / 4;
            resultingArray.push(slicedUniverseSize);
            resultingArray.push(slicedUniverseSize * 2);
            resultingArray.push(slicedUniverseSize * 3);
            if(resultingArray.length < 4) {
                resultingArray.push(slicedUniverseSize * 4);
            }
        }
        return resultingArray;
    }
    const lineArray = React.useMemo(() => buildUniverseProportionArray(), [polygonSectionHeight, universeSizeOffset]);

    const proportionComponentConstructor = () => lineArray.map((pos) => <text y={pos > (polygonSectionHeight - 16) ? polygonSectionHeight - pos + 12 : polygonSectionHeight - pos - 2 } x={12}>{Math.floor((pos/universeSizeOffset) * 100)}% do tamanho do nosso Universo hoje</text>);

    const [memoTextLineArray, updateMemoTextLineArray] = React.useState(proportionComponentConstructor());

    React.useEffect(() => {
        if(pickLastVal !== lastValue) { 
            // console.log(pickLastVal, lastValue)
            updateMemoTextLineArray(proportionComponentConstructor());
            setLastValue(lastValue);
        }
    }, [pickLastVal])

    const memoLineArray = React.useMemo(() => lineArray.map((pos) => <line x1="0" x2={window.innerWidth} y1={polygonSectionHeight - pos} 
    y2={polygonSectionHeight - pos} stroke={"hsl(155, 50%, 50%)"} stroke-width="2" />), [lineArray]);


    const timeMap = new Map();
    timeMap.set("time", prop.time);
    const lastTime = prop.time[prop.time.length - 1];

    const reducedTimeMap = mapSampleReducer(timeMap, 10);
    console.log(reducedTimeMap, prop.time, );

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
        memoLineArray
        }

        {
        memoTextLineArray
        }

        {
            reducedTimeMap.get("time").map(pos => <line 
                x1={window.innerWidth * pos / lastTime} 
                x2={window.innerWidth * pos / lastTime} 
                y1={polygonSectionHeight} 
                y2={polygonSectionHeight * 2} stroke-width={2} stroke="hsl(155, 50%, 50%)"></line>)
        }

        {
            reducedTimeMap.get("time").map(pos => <text x={window.innerWidth * pos / lastTime} y={(polygonSectionHeight * 2) + 16}>
                {(pos/1000).toFixed(3)} {pos > 2000 ? "bilhões" : "bilhão"}
            </text>)
        }
        
    </svg>
}

export default SVGBuilder;