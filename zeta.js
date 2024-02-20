const fs = require('fs');

// Helper function to convert string to sentence case
function toSentenceCase(str) {
  return str.toLowerCase().replace(/^(.)|\s+(.)/g, function ($1) {
    return $1.toUpperCase();
  });
}

// Helper function to generate slug from string
function toSlug(str) {
  return str.toLowerCase().replace(/\s+/g, '-');
}

// Function to parse CSV file and create array of objects
function parseCSV(csvFilePath) {
  const data = fs.readFileSync(csvFilePath, 'utf-8');
  const lines = data.trim().split('\n');

  const objectsArray = [];
  let id = 1;

  lines.forEach(line => {
    const words = line.split(' ');
    const name = toSentenceCase(words.join(' '));
    const slug = toSlug(name);
    const obj = {id: id++, name, slug};
    objectsArray.push(obj);
  });

  return objectsArray;
}

// Example usage
const csvFilePath = './health.csv';
const result = parseCSV(csvFilePath);

const outputFilePath = 'output.js';
const outputContent = `const data = ${JSON.stringify(
  result,
  null,
  2,
)};\n\nmodule.exports = data;`;
fs.writeFileSync(outputFilePath, outputContent);
