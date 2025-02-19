Sparse Matrix Operations in JavaScript
This project implements sparse matrix operations (addition, subtraction, multiplication) using a memory-efficient approach. The matrices are stored using a sparse representation, where only non-zero elements are saved. This is ideal for large matrices where most elements are zero.

The code is written in JavaScript (Node.js), and it performs matrix operations on input sparse matrices stored in files.

Table of Contents
Overview
Features
Requirements
File Structure
How to Run
Matrix Operations
Error Handling
License
Overview
This JavaScript project provides functionality to:

Load sparse matrices from files.
Perform matrix operations such as addition, subtraction, and multiplication on sparse matrices.
Save the results of the operations to output files.

Features
Sparse Matrix Representation: Only non-zero elements are stored to optimize memory usage.
Matrix Operations: Supports addition, subtraction, and multiplication of sparse matrices.
File Input/Output: Loads sparse matrices from text files and outputs results to text files.
Error Handling: Handles incorrect matrix dimensions, invalid file formats, and unsupported operations.
Requirements
Node.js (version 12.x or higher)
File System Module (fs): Used for reading and writing files.
Path Module: Used for managing file and directory paths.

File Structure
The project is structured as follows:

bash
Copy
/sparse-matrix-project
├── Sample_inputs/           # Directory containing input matrix files
├── Outputs/                 # Directory where result files will be saved
├── index.js # Main script containing the SparseMatrix class and operations
└── README.md                # This README file
Sample Inputs
The input files should contain sparse matrix data in the following format:

rows=8433
cols=3180
(0, 381, -694)
(0, 128, -838)
(0, 639, 857)
(0, 165, -933)
(0, 1350, -89)
rows: The number of rows in the matrix.
cols: The number of columns in the matrix.
Each subsequent line represents a non-zero element of the matrix in the form (row, column, value).
Outputs
The output files will be saved in the Outputs/ directory with filenames indicating the operation performed, e.g., matrix1_additionResult.txt, matrix1_subtractionResult.txt, and matrix1_multiplicationResult.txt.

How to Run
1. Clone the repository:
bash
Copy
git clone (https://github.com/cinna03/dsa.git)
cd dsa
2. Install Node.js (if not already installed):
Download and install Node.js from nodejs.org.
Verify installation by running:
bash
Copy
node -v
npm -v
3. Add input files:
Place your input sparse matrix files in the Sample_inputs/ directory. Make sure the format of the files matches the structure described above.
4. Run the script:
In the root directory of the project, run the script:
bash
Copy
node index.js
The script will:

Load the sparse matrices from the Sample_inputs/ directory.
Perform addition, subtraction, and multiplication on the matrices.
Save the results to the Outputs/ directory.
5. View Results:
Check the Outputs/ directory for files containing the results of the operations:
matrix1_additionResult.txt
matrix1_subtractionResult.txt
matrix1_multiplicationResult.txt (if matrix multiplication is possible)
Matrix Operations
Addition: Adds corresponding elements of two matrices. If one matrix does not have a non-zero value at a position, it uses the value from the other matrix.
Subtraction: Subtracts corresponding elements of two matrices. If one matrix does not have a non-zero value at a position, it uses the value from the other matrix (with a negative sign).
Multiplication: Performs matrix multiplication. The number of columns in the first matrix must match the number of rows in the second matrix. The result is computed using the dot product of rows and columns.
Example
Assume you have two sparse matrices matrix1.txt and matrix2.txt in the Sample_inputs/ directory. Running the script will:

Add the matrices and save the result as matrix1_additionResult.txt.
Subtract the matrices and save the result as matrix1_subtractionResult.txt.
If the matrices are compatible for multiplication (i.e., the number of columns in matrix1.txt equals the number of rows in matrix2.txt), the multiplication result will be saved as matrix1_multiplicationResult.txt.
Error Handling
Invalid Matrix Dimensions: If the matrices have mismatched dimensions for addition, subtraction, or multiplication, an error will be thrown: Matrices must have the same dimensions for [operation].
Incorrect File Format: If the input file is not correctly formatted (e.g., missing parentheses, incorrect value types), the program will throw an error: Input file has wrong format.
Empty or Missing Files: If no files are found in the Sample_inputs/ directory, the program will throw an error: No files found in the Sample_inputs directory.
