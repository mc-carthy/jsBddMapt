var chai = require('chai');
var expect = chai.expect;
var validatorWith = require('../lib/validator');
var nonpositiveValidationRule = require('./../lib/rules/nonpositive');
var nonDivisibleValidationRule = require('./../lib/rules/nondivisible');

describe('A Validator', function () {
    var validator;
    // The below before statement would set up the validator object only once in this scenario
    // The beforeEach statement will ensure a new validator object is created prior to each test
    
    // before(function() {
    beforeEach(function() {
        validator = validatorWith([
            nonpositiveValidationRule,
            nonDivisibleValidationRule(3, 'error.three'),
            nonDivisibleValidationRule(5, 'error.five')
        ]);
    });
    it('will return no errors for valid numbers', function () {
        expect(validator(7)).to.be.empty;
    });

    describe('will return error.nonpositive for not strictly positive numbers:', function () {
        it('like 0', function() {
            expect(validator(0)).to.include('error.nonpositive');
        });
        it('like -2', function() {
            expect(validator(-2)).to.include('error.nonpositive');
        });
    });

    describe('will return error.three for divisible by 3 numbers:', function () {
        it('like 3', function() {
            expect(validator(3)).to.include('error.three');
        });        
        it('like 15', function() {
            expect(validator(15)).to.include('error.three');
        });
    });

    describe('will return error.five for divisible by 5 numbers:', function () {
        it('like 5', function() {
            expect(validator(5)).to.include('error.five');
        });
        it('like 15', function() {
            expect(validator(15)).to.include('error.five');
        });
    });
});