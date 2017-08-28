var chai = require('chai');
var expect = chai.expect;
var factoryWithConfiguration = require('./../lib/factory');

describe('A Validator', function () {
    var validator;
    var configuration;
    // The below before statement would set up the validator object only once in this scenario
    // The beforeEach statement will ensure a new validator object is created prior to each test

    // before(function() {
    context('using the default configuration rules', function() {
        beforeEach(function() {
            configuration = function() {
                configuration.callCount++;
                configuration.args = Array.prototype.slice.call(arguments);
                return [
                    {type: 'nonpositive'},
                    {type: 'nondivisible', options: {divisor: 3, error: 'error.three'}},
                    {type: 'nondivisible', options: {divisor: 5, error: 'error.five'}}
                ];
            };
            configuration.callCount = 0;        
            var newValidator = factoryWithConfiguration(configuration);
            validator = newValidator('default')
        });
    
        it('will access the configuration to get the validation rules', function() {
            expect(configuration.callCount).to.be.equal(1);
            expect(configuration.args).to.be.deep.equal(['default']);
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

    context('using the alternative validation rules', function() {
        beforeEach(function() {
            configuration = function() {
                configuration.callCount++;
                configuration.args = Array.prototype.slice.call(arguments);
                return [
                    {type: 'nonpositive'},
                    {type: 'nondivisible', options: {divisor: 11, error: 'error.eleven'}}
                ];
            };
            configuration.callCount = 0;
            var newValidator = factoryWithConfiguration(configuration);
            validator = newValidator('alternative');
        });

        it('will access the configuration to get the validation rules', function() {
            expect(configuration.callCount).to.be.equal(1);
            expect(configuration.args).to.be.deep.equal(['alternative']);
        });
    
        it('will return no errors for valid numbers', function () {
            expect(validator(7)).to.be.empty;
        });

        describe('will return error.five for divisible by 11 numbers:', function () {
            it('like 11', function() {
                expect(validator(11)).to.include('error.eleven');
            });
            it('like 55', function() {
                expect(validator(55)).to.include('error.eleven');
            });
        });
    });
});