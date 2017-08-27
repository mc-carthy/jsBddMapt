function nonpositiveValidationRule(n, result) {
    if (n <= 0) {
        result.push('error.nonpositive');
    }
}

function notDivisibleByGivenNumberValidationRule(divisor, error) {
    return function(n, result) {
        if (n % divisor === 0) {
            result.push(error);
        }
    }
}

var notDivisibleBy3ValidationRule = notDivisibleByGivenNumberValidationRule(3, 'error.three');
var notDivisibleBy5ValidationRule = notDivisibleByGivenNumberValidationRule(5, 'error.five');

module.exports = function (n) {
    var result = [];
    nonpositiveValidationRule(n, result);
    notDivisibleBy3ValidationRule(n, result);
    notDivisibleBy5ValidationRule(n, result);
    return result;
}