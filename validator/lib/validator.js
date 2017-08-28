var nonpositiveValidationRule = require('./rules/nonpositive');
var notDivisibleByGivenNumberValidationRule = require('./rules/nondivisible');

var validationRules = [
    nonpositiveValidationRule,
    notDivisibleByGivenNumberValidationRule(3, 'error.three'),
    notDivisibleByGivenNumberValidationRule(5, 'error.five')
];  

module.exports = function (validationRules) {
    return function (n) {
      return validationRules.reduce(function (result, rule) {
        rule(n, result);
        return result;
      }, []);
    };
  };