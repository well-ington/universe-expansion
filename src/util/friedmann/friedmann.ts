export const retrieveUniverseExpansionObject = (
    step: number = 0.1,
    initialTime: number = 0,
    finalTime: number = 13500,
    radiationDensity: number = 0.01,
    matterDensity: number = 0.25,
    darkEnergyDensity: number = 0.75,
    metricDensity: number = 1.001,
    hubbleConstant: number = Number("75E-6")
  ) : Map<string, number[]> => {
    const numberOfIteractions: number = Math.floor(
      (finalTime - initialTime) / step
    );
    const scale: number[] = new Array(numberOfIteractions);
    const time: number[] = new Array(numberOfIteractions);
  
    scale[0] = 0.001;
    time[0] = initialTime;
  
    for (let i = 0; i < numberOfIteractions; i++) {
      const radiationEvolution: number = radiationDensity / Math.pow(scale[i], 2);
  
      const matterEvolution: number = matterDensity / scale[i];
      
      const darkMatterEvolution: number =
        darkEnergyDensity * Math.pow(scale[i], 2);
  
      const universeMetricProfile: number = 1 - metricDensity;
      const evolutionTermEquation: number =
        hubbleConstant *
        Math.pow(
          radiationEvolution +
            matterEvolution +
            darkMatterEvolution +
            universeMetricProfile,
          0.5
        );
  
      scale[i + 1] = scale[i] + step * evolutionTermEquation;
  
      time[i + 1] = time[i] + step;
    }
    const resultMap = new Map();
    resultMap.set("time", time);
    resultMap.set("scale", scale);
    return resultMap;
  };
  