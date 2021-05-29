import React from "react";

const PolygonBuilder: React.FC<{time: number[], scale: number[], width?: number, height?: number, fill: string}> = ({
    time, scale, width = 400, height = 200, fill
}) => {
    let biggestPoint = 0;
    scale.forEach(pos => pos > biggestPoint ? biggestPoint = pos : null);
    const returnPolygonCoordinates = (): string => {
        let pathString = "";
        pathString += (scale.map((point, index) => `${(width * (time[index]/time[time.length - 1]))},${(height * (biggestPoint - point)/biggestPoint)}`)).join(" ");
        pathString += " " + (scale.reverse().map((point, index) => `${(width * (time[time.length - index - 1]/time[time.length - 1]))},${(height * (point + biggestPoint)/biggestPoint)}`)).join(" ");
        return pathString;
    }    
    return <polygon stroke="red" strokeWidth="0" points={returnPolygonCoordinates()} fill={fill}></polygon>
}

export default PolygonBuilder;