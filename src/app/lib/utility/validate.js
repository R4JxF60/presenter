function validate(jsonData) {
    const validProps = { total: 'number', style: 'string', slides: 'object' };
    const fileProps = Object.keys(validProps);
    fileProps.forEach(prop => {
        if(!jsonData[prop] || typeof jsonData[prop] !== validProps[prop]) {
            throw Error('Not a valid file');
        }
    });
    return true;
}

module.exports = { validate: validate }