var validatorWith = require('./validator');
var nonpositiveValidationRule = require('./rules/nonpositive');
var nondivisibleValidationRule = require('./rules/nondivisible');

var ruleFactoryMap = {
    nonpositive: function() {
        return nonpositiveValidationRule;
    },
    nondivisible: function(options) {
        return nondivisibleValidationRule(options.divisor, options.error);
    }
};

function toValidatorRule(ruleDescription) {
    return ruleFactoryMap[ruleDescription.type](ruleDescription.options);
};

module.exports = function(findConfiguration) {
    return function(ruleSetName) {
        return validatorWith(findConfiguration(ruleSetName).map(toValidatorRule));
    };
};