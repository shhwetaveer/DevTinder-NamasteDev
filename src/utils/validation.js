const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is required");
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough");
    }

};

const validateEditProfileData = (req) =>{

    const allowedUpdateFields = ['firstname','lastname','photoUrl','bio','skills'];

    const isEditAllowed = Object.keys(req.body).every(field => allowedUpdateFields.includes(field));
    return isEditAllowed;
}

module.exports ={
    validateSignUpData,
    validateEditProfileData
};