const fs = require('fs');

module.exports = {
    readFile(path) {
        return fs.readFileSync(path, 'utf8');
    },

    convertStringToArray(string) {
        return string.split("\r\n").map(Number);
    },

    addRandomElement2Array(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        const randomElement = array[randomIndex];
        array.push(randomElement);
        return array;
    }
};