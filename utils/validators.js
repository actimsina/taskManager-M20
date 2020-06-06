const validator = require('validator');

const RegisterInput = (data) => {
    let errors = {};

    if (data.username) {
        if (!validator.isLength(data.username.trim(), { min: 6, max: 30 })) {
            errors.username = 'Username must be between 6 and 30 characters.';
        }
    } else errors.username = 'Username is required.';

    if (data.password) {
        if (!validator.isLength(data.password.trim(), { min: 6, max: 30 })) {
            errors.password = 'Password must be between 6 and 30 characters.';
        }
    } else errors.password = 'Password is required.';

    if (data.firstName) {
        if (!validator.isLength(data.firstName.trim(), { min: 2, max: 30 })) {
            errors.firstName = 'First name must be between 2 and 30 characters';
        }
    } else errors.firstName = 'First name is required';

    if (data.lastName) {
        if (!validator.isLength(data.lastName.trim(), { min: 2, max: 30 })) {
            errors.lastName = 'Last name must be between 2 and 30 characters'
        }
    } else errors.lastName = 'Last name is required'

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

module.exports = {
    RegisterInput
}