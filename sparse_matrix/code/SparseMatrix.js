const fs = require('fs');

class SparseMatrix {
    constructor(matrixFilePath = null, numRows = null, numCols = null) {
        if (matrixFilePath) {
            this.loadFromFile(matrixFilePath);
        } else if (numRows !== null && numCols !== null) {
            this.numRows = numRows;
            this.numCols = numCols;
            this.matrix = {};
        } else {
            throw new Error("Either provide a matrix file path or specify dimensions for the matrix.");
        }
    }

    loadFromFile(filePath) {
        console.log('Reading file: ' + filePath);
        const data = fs.readFileSync(filePath, 'utf-8');
        this.loadFromData(data);
    }

    loadFromData(data) {
        const lines = data.split('\n').filter(line => line.trim() !== '');
        if (!this.numRows && !this.numCols) {
            this.numRows = parseInt(lines[0].split('=')[1].trim());
            this.numCols = parseInt(lines[1].split('=')[1].trim());
            this.matrix = {};
        }
        for (let i = 2; i < lines.length; i++) {
            const parts = lines[i].trim().slice(1, -1).split(',');
            const row = parseInt(parts[0].trim());
            const col = parseInt(parts[1].trim());
            const value = parseInt(parts[2].trim());
            this.setElement(row, col, value);
        }
    }

    getElement(currRow, currCol) {
        return this.matrix[`${currRow},${currCol}`] || 0;
    }

    setElement(currRow, currCol, value) {
        if (value !== 0) {
            this.matrix[`${currRow},${currCol}`] = value;
        } else {
            delete this.matrix[`${currRow},${currCol}`];
        }
    }

    add(other) {
        if (this.numRows !== other.numRows || this.numCols !== other.numCols) {
            throw new Error("Matrices must have the same dimensions for addition.");
        }
        const result = new SparseMatrix(null, this.numRows, this.numCols);
        for (const [key, value] of Object.entries(this.matrix)) {
            const [row, col] = key.split(',').map(Number);
            result.setElement(row, col, value + other.getElement(row, col));
        }
        for (const [key, value] of Object.entries(other.matrix)) {
            const [row, col] = key.split(',').map(Number);
            if (!this.matrix.hasOwnProperty(key)) {
                result.setElement(row, col, value);
            }
        }
        return result;
    }

    subtract(other) {
        if (this.numRows !== other.numRows || this.numCols !== other.numCols) {
            throw new Error("Matrices must have the same dimensions for subtraction.");
        }
        const result = new SparseMatrix(null, this.numRows, this.numCols);
        for (const [key, value] of Object.entries(this.matrix)) {
            const [row, col] = key.split(',').map(Number);
            result.setElement(row, col, value - other.getElement(row, col));
        }
        for (const [key, value] of Object.entries(other.matrix)) {
            const [row, col] = key.split(',').map(Number);
            if (!this.matrix.hasOwnProperty(key)) {
                result.setElement(row, col, -value);
            }
        }
        return result;
    }

    multiply(other) {
        if (this.numCols !== other.numRows) {
            throw new Error("Number of columns in the first matrix must match the number of rows in the second matrix for multiplication.");
        }
        const result = new SparseMatrix(null, this.numRows, other.numCols);
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < other.numCols; j++) {
                let dotProduct = 0;
                for (let k = 0; k < this.numCols; k++) {
                    dotProduct += this.getElement(i, k) * other.getElement(k, j);
                }
                if (dotProduct !== 0) {
                    result.setElement(i, j, dotProduct);
                }
            }
        }
        return result;
    }

    toString() {
        let result = `rows=${this.numRows}\ncols=${this.numCols}\n`;
        for (const [key, value] of Object.entries(this.matrix)) {
            const [row, col] = key.split(',').map(Number);
            result += `{${row},${col},${value}}\n`;
        }
        return result;
    }
}

module.exports = SparseMatrix;  // Export SparseMatrix class
