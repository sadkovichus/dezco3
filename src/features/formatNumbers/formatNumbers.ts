function formatter(num: number): string {
    let returnedData = num.toLocaleString("en").split(',');
    if (returnedData.length >= 4) {
        return returnedData[0]+' млрд'
    } else if (returnedData.length >= 3) {
        return returnedData[0] + ' млн'
    } else if (returnedData.length >= 2) {
        return returnedData[0] + ' тыс'
    }
    return num.toString();
}

export default formatter;

