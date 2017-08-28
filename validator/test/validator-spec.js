var chai = require('chai');
var expect = chai.expect;
var validator = require('../lib/validator/validator');

function expectedToInclueErrorWhenInvalid(number, error) {
    it('like ' + number, function() {
        expect(validator(number)).to.include(error);
    });
}

describe('A Validator', function () {
    it('will return no errors for valid numbers', function () {
        expect(validator(7)).to.be.empty;
    });

    describe('will return error.nonpositive for not strictly positive numbers:', function () {
        expectedToInclueErrorWhenInvalid(0, 'error.nonpositive');
        expectedToInclueErrorWhenInvalid(-2, 'error.nonpositive');
    });

    describe('will return error.three for divisible by 3 numbers:', function () {
        expectedToInclueErrorWhenInvalid(3, 'error.three');
        expectedToInclueErrorWhenInvalid(15, 'error.three');
    });

    describe('will return error.five for divisible by 5 numbers:', function () {
        expectedToInclueErrorWhenInvalid(5, 'error.five');
        expectedToInclueErrorWhenInvalid(15, 'error.five');
    });
});