const fs = require('fs');
const path = require('path');
const SparseMatrix = require('./SparseMatrix');  // Import SparseMatrix class

const sampleInputsPath = path.join(__dirname, '../sample_inputs');
const outputsPath = path.join(__dirname, '../outputs');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputsPath)) {
    fs.mkdirSync(outputsPath);
}

try {
    const files = fs.readdirSync(sampleInputsPath);
    if (files.length === 0) {
        throw new Error("No files found in the Sample_inputs directory.");
    }

    files.forEach(file => {
        const filePath = path.join(sampleInputsPath, file);
        const baseFileName = path.parse(file).name;

        const sparseMatrix1 = new SparseMatrix(filePath);
        const sparseMatrix2 = new SparseMatrix(null, sparseMatrix1.numRows, sparseMatrix1.numCols);

        const resultAddition = sparseMatrix1.add(sparseMatrix2);
        const resultSubtraction = sparseMatrix1.subtract(sparseMatrix2);

        const additionResultPath = path.join(outputsPath, `${baseFileName}_additionResult.txt`);
        const subtractionResultPath = path.join(outputsPath, `${baseFileName}_subtractionResult.txt`);

        fs.writeFileSync(additionResultPath, resultAddition.toString());
        fs.writeFileSync(subtractionResultPath, resultSubtraction.toString());

        console.log('Addition Result saved to ' + additionResultPath);
        console.log('Subtraction Result saved to ' + subtractionResultPath);

        if (sparseMatrix1.numCols === sparseMatrix2.numRows) {
            const multiplicationResultPath = path.join(outputsPath, `${baseFileName}_multiplicationResult.txt`);
            const resultMultiplication = sparseMatrix1.multiply(sparseMatrix2);
            fs.writeFileSync(multiplicationResultPath, resultMultiplication.toString());
            console.log('Multiplication Result saved to ' + multiplicationResultPath);
        } else {
            console.log('Matrices are incompatible for multiplication.');
        }        
    });
} catch (error) {
    console.error(error.message);
}
