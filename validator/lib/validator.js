module.exports = function (n) {
    if (n <= 0) {
        return ['error.nonpositive'];
    }
    if (n % 3 === 0) {
        return ['error.three'];
    }
    return [];
}