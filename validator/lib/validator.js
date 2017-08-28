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

var validationRules = [
    nonpositiveValidationRule,
    notDivisibleByGivenNumberValidationRule(3, 'error.three'),
    notDivisibleByGivenNumberValidationRule(5, 'error.five')
];  

module.exports = function (n) {
    return validationRules.reduce(function(result, rule) {
        rule(n, result);
        return result;
    }, []);
}