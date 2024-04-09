const CheckValue = (key) => {
    if (key === null || key === undefined || key === '') {
        return false
    } else {
        return true;
    }
}
export default CheckValue;