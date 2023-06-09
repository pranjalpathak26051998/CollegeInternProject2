
const isValid = function (value) {
    if (typeof value === "undefined" || value === "null") return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

const isValidrequestBody = function (data) {
    return Object.keys(data).length > 0;
};

const isValidString = function (input) {
    return (/^[a-zA-Z]+$/.test(input))
}

const isValidEmail = function (input) {
    return /^[\w\.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,}$/
        .test(input);
};

const isValidMobile = function (input) {
    return /^[+]?[0-9]{1,3}?[-\s.]?[(]?\d{1,4}[)]?[-\s.]?\d{1,4}[-\s.]?\d{1,9}$/
        .test(input);
};




module.exports.isValid = isValid
module.exports.isValidrequestBody = isValidrequestBody
module.exports.isValidString = isValidString
module.exports.isValidEmail = isValidEmail
module.exports.isValidMobile = isValidMobile

