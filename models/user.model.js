const baseModel = require('./baseModel');
const validator = {
    username(username) {
        let isValid = true;
        let msg = 'Username is valid';

        if (!username || [].every.call(username, (c) => c === ' ')) {
            isValid = false;
            msg = 'Username cannot be empty or whaisepace!';
        }

        if (username.length < 3 || username.length > 20) {
            isValid = false;
            msg = 'Username must be betwin 3 and 20 characters long';
        }
        return {
            isValid,
            msg,
        };
    },

    password(password) {
        const isValid = true;
        const msg = 'Password is valid';

        if (!password || [].every.call(password, (c) => c === ' ')) {
            isValid = false;
            msg = 'Password cannot be empty or whaisepace!';
        }

        if (password.length < 3 || password.length > 20) {
            isValid = false;
            msg = 'Password must be betwin 3 and 20 characters long';
        }
        return {
            isValid,
            msg,
        };
    },
};

class User extends baseModel {
    static validateModel(model) {
        const validations = Object.keys(validator).reduce((result, prop) => {
            const currentValidator = validator[prop];
            const propertyToValidate = model[prop];
            const currentValidation = currentValidator(propertyToValidate);

            result[prop] = currentValidation;

            if (!currentValidation.isValid) {
                result.isModelValid = false;
            }

            return result;
        }, { isModelValid: true });

        return validations;
    }

    static toViewModel(model) {
        const viewModel = new User();
        Object.keys(model).forEach((prop) => {
            viewModel[prop] = model[prop];
        });

        return viewModel;
    }
}

module.exports = User;
