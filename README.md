# Unique Integers Processor

A high-performance JavaScript application that processes input files containing integers and generates output files with unique, sorted integers.

## Overview

This project provides a solution for processing large files containing integers, removing duplicates, and generating sorted output files. It is optimized for both memory usage and runtime performance while maintaining accuracy.

## Features

- **Efficient Processing**: Uses streaming I/O to handle large files without loading entire contents into memory
- **High Performance**: Implements optimized algorithms for sorting and uniqueness checking
- **Memory Efficient**: Minimizes memory usage through streaming and efficient data structures
- **Robust Validation**: Properly handles various input formats and edge cases
- **Performance Metrics**: Provides detailed runtime and memory usage statistics

## Requirements

- Node.js (v12 or higher recommended)
- Basic file system access

## Directory Structure

```
unique_integers/
├── UniqueInt.js          # Main implementation file
├── sample_inputs/        # Directory containing sample input files
│   ├── small_sample_input_01.txt
│   ├── small_sample_input_02.txt
│   ├── small_sample_input_03.txt
│   ├── small_sample_input_04.txt
│   ├── sample_01.txt
│   ├── sample_02.txt
│   ├── sample_03.txt
│   └── sample_04.txt
└── outputs/              # Directory for generated output files
```

## How It Works

1. **Input Processing**:
   - Reads input file line by line using streams
   - Validates each line for proper integer format
   - Skips empty lines and lines with multiple numbers
   - Handles leading/trailing whitespace

2. **Uniqueness Checking**:
   - Uses JavaScript Set for O(1) uniqueness checking
   - Efficiently maintains unique integers

3. **Sorting**:
   - Implements quicksort algorithm for efficient sorting
   - Sorts integers in ascending order

4. **Output Generation**:
   - Creates output file with one integer per line
   - Uses streaming for memory-efficient writing

## Usage

```bash
node UniqueInt.js <input_file> <output_file>
```

Example:
```bash
node UniqueInt.js sample_inputs/sample_01.txt outputs/sample_01_output.txt
```

## Performance

The implementation is optimized for:
- **Memory Usage**: Uses streaming and efficient data structures
- **Runtime**: Implements O(n log n) sorting and O(1) uniqueness checking
- **Scalability**: Handles both small and large files efficiently

## Input File Format

- One integer per line
- Valid integers can be positive or negative
- Empty lines are skipped
- Lines with multiple numbers are skipped
- Leading/trailing whitespace is handled automatically

## Output File Format

- One unique integer per line
- Integers are sorted in ascending order
- No duplicates
- No empty lines
- No formatting issues

## Error Handling

- Invalid input files are handled gracefully
- File system errors are caught and reported
- Memory errors are prevented through streaming
- Invalid integers are skipped with proper logging

## Performance Metrics

The program provides detailed performance metrics including:
- Total runtime in milliseconds
- Memory usage (heap, external, and RSS)
- Number of unique integers found

## Example Output

```
Processing sample_inputs/sample_01.txt:
Runtime Metrics:
  Total Runtime: 21.76ms
Memory Usage (MB):
  Heap Used: 0.72 (4.51 total)
  Heap Total: 0.25 (5.53 total)
  External: 0.38 (1.61 total)
  RSS: 1.86 (25.51 total)
Unique Integers Found: 37
```

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is open source and available under the MIT License. 