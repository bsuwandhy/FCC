const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('Function convertHandler.getNum(input)', function() {
        test('Whole number input', function(done) {
            let input = '32L';
            assert.equal(convertHandler.getNum(input), 32);
            done();
        });

        test('Decimal number input', function(done) {
            let input = '32.1L';
            assert.equal(convertHandler.getNum(input), 32.1);
            done();
        });

        test('Fractional input', function(done) {
            let input = '1/32L';
            assert.equal(convertHandler.getNum(input), 1/32);
            done();
        });

        test('Fractional input with a decimal', function(done) {
            let input = '1.1/32L';
            assert.equal(convertHandler.getNum(input), 1.1/32);
            done();
        });

        test('Return error on a double-fraction', function(done) {
            let input = '1/2/32L';
            assert.equal(convertHandler.getNum(input), undefined);
            done();
        });

        test('No numerical input should default to 1', function(done) {
            let input = 'L';
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });
    });

    suite('Function convertHandler.getUnit(input)', function() {
        test('For each valid input unit', function(done) {
            let input = [
                "gal",
                "l",
                "mi",
                "km",
                "lbs",
                "kg",
                "GAL",
                "L",
                "MI",
                "KM",
                "LBS",
                "KG",
            ];
            let output = [
                "gal",
                "L",
                "mi",
                "km",
                "lbs",
                "kg",
                "gal",
                "L",
                "mi",
                "km",
                "lbs",
                "kg",
            ];
            input.forEach(function (ele, index) {
                assert.equal(convertHandler.getUnit(ele), output[index]);
            });
            done();
        });

        test('Unknown unit input', function(done) {
            assert.equal(convertHandler.getUnit('34kilograms'), undefined);
            done();
        });

        test('For each valid unit input', function(done) {
            let input = [
                "gal",
                "l",
                "mi",
                "km",
                "lbs",
                "kg"
            ];
            let output = [
                "L",
                "gal",
                'km',
                'mi',
                'kg',
                'lbs'
            ];
            input.forEach(function(e,i) {
                assert.equal(convertHandler.getReturnUnit(e), output[i]);
            });
            done();
        });
    });

    suite('Function convertHandler.spellOutUnit(unit)', function () {
        test('For each valid unit input', function(done) {
            let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
            let output = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
            input.forEach(function (e, i) {
                assert.equal(convertHandler.spellOutUnit(e), output[i]);
            });
            done();
        });
    });

    suite('Function convertHandler.convert(num, unit)', function() {
        test('Gal to L', function (done) {
            let input = [5, 'gal'];
            let output = 18.9271;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                output,
                0.1
            );
            done();
        });

        test('L to gal', function (done) {
            let input = [5, 'L'];
            let output = 1.32086;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                output,
                0.1
            );
            done();
        });

        test('Mi to km', function (done) {
            let input = [5, 'mi'];
            let output = 8.04672;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                output,
                0.1
            );
            done();
        });

        test('Km to mi', function (done) {
            let input = [5, 'km'];
            let output = 3.10686;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                output,
                0.1
            );
            done();
        });

        test('Lbs to kg', function (done) {
            let input = [5, 'lbs'];
            let output = 2.26796;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                output,
                0.1
            );
            done();
        });

        test('Kg to lbs', function (done) {
            let input = [5, 'kg'];
            let output = 11.0231;
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                output,
                0.1
            );
            done();
        })
    });
});