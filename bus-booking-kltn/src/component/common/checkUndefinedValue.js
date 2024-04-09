const CheckValueField = (formData) => {
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            if (formData[key] === null || formData[key] === undefined || formData[key] === '') {
                // console.log(`${key} is null, undefined, or empty`);
                return false
            } else {
                // console.log(`${key} has value: ${formData[key]}`);
                return true;
            }
        }
    }
}
export default CheckValueField;