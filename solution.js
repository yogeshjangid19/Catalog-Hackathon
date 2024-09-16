const readline = require('readline');

// Function to decode base-encoded value to decimal
function decodeBaseValue(base, value) {
    return parseInt(value, base);
}

// Function to perform Lagrange interpolation
function lagrangeInterpolation(points, xValue) {
    let result = 0;
    const n = points.length;

    // Calculate the Lagrange polynomial
    for (let i = 0; i < n; i++) {
        let term = points[i].y;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                term *= (xValue - points[j].x) / (points[i].x - points[j].x);
            }
        }
        result += term;
    }
    return result;
}

// Function to find the constant term from the test case data
function findConstantTerm(testCase) {
    const points = [];

    // Decode and prepare points
    for (let key in testCase) {
        if (key === 'keys') continue; // Skip metadata

        const x = parseInt(key); // x-coordinate from the key
        const base = parseInt(testCase[key].base); // Base for decoding
        const yEncoded = testCase[key].value; // Encoded y value
        const y = decodeBaseValue(base, yEncoded); // Decode y value
        points.push({ x, y });
    }

    // Use Lagrange interpolation to find the polynomial value at x = 0
    const constantTerm = lagrangeInterpolation(points, 0);
    return constantTerm;
}

// Test case JSON data
const testCase = {
    "keys": {
        "n": 9,
        "k": 6
    },
    "1": {
        "base": "10",
        "value": "28735619723837"
    },
    "2": {
        "base": "16",
        "value": "1A228867F0CA"
    },
    "3": {
        "base": "12",
        "value": "32811A4AA0B7B"
    },
    "4": {
        "base": "11",
        "value": "917978721331A"
    },
    "5": {
        "base": "16",
        "value": "1A22886782E1"
    },
    "6": {
        "base": "10",
        "value": "28735619654702"
    },
    "7": {
        "base": "14",
        "value": "71AB5070CC4B"
    },
    "8": {
        "base": "9",
        "value": "122662581541670"
    },
    "9": {
        "base": "8",
        "value": "642121030037605"
    }
};

// Calculate and display the constant term
const constantTerm = findConstantTerm(testCase);
console.log('The constant term (c) of the polynomial is:', constantTerm);
