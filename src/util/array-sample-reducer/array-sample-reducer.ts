
const arraySampleReducer = (map: Map<string, number[]>, reduceTo: number, profileToGet: number = 1): Map<string, number[]> => {
    const reducedObject: Map<string, number[]> = new Map();
    let reduceProportion = 0;
    map.forEach((value: number[], key: string) => {
        const newArray: number[] = [];
        if(reduceProportion === 0) {
            reduceProportion = Math.floor((value.length * profileToGet) / reduceTo);
        }
        value.forEach((item: number, index: number) => {
            if(index%reduceProportion === 0 && index <= value.length * profileToGet) {
                newArray.push(item);
            }
        });
        reducedObject.set(key, newArray);
    });
    return reducedObject;
}

export default arraySampleReducer;