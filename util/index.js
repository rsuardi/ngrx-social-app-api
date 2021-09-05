module.exports = {
    getMissingProps(object, separator = ', ') {
        let missingKeys = [];
        if (!object || Object.keys(object).length === 0) throw new Error('All input is required');

        try {
            const keys = Object.keys(object);
            for (let index = 0; index < keys.length; index++) {
                const key = keys[index];
                if (!object[key]) missingKeys.push(key)
            }
            return missingKeys.length > 0 ? `[ ${missingKeys.join(separator)} ]` : null;
        } catch (error) {
            throw new Error(error);
        }

    },

    validateEmail(email) {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email)
    }
}