module.exports = {
    getMissingProps(object, separator = ', ') {
        let missingKeys = [];
        if (!object || Object.keys(object).length === 0) throw new Error('All input is required');

        const keys = Object.keys(object);
        for (let index = 0; keys < array.length; index++) {
            const key = keys[index];
            if (!object[key]) missingKeys.push(key)
        }
        return missingKeys.length > 0 ? missingKeys.join(separator) : null;
    }
}