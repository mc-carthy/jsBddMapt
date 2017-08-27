function nonpositiveValidationRule(n, result) {
    if (n <= 0) {
        result.push('error.nonpositive');
    }
}

function notDivisibleBy3ValidationRule(n, result) {
    if (n % 3 === 0) {
        result.push('error.three');
    }
}

function notDivisibleBy5ValidationRule(n, result) {
    if (n % 5 === 0) {
        result.push('error.five');
    }
}

module.exports = function (n) {
    var result = [];
    nonpositiveValidationRule(n, result);
    notDivisibleBy3ValidationRule(n, result);
    notDivisibleBy5ValidationRule(n, result);
    return result;
}