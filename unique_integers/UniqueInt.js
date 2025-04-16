const fs = require('fs');
const readline = require('readline');

class UniqueInt {
    // Custom implementation of quicksort (more efficient than bubble sort)
    static quickSort(array, left = 0, right = array.length - 1) {
        if (left < right) {
            const pivotIndex = this.partition(array, left, right);
            this.quickSort(array, left, pivotIndex - 1);
            this.quickSort(array, pivotIndex + 1, right);
        }
        return array;
    }

    static partition(array, left, right) {
        const pivot = array[right];
        let i = left - 1;

        for (let j = left; j < right; j++) {
            if (array[j] <= pivot) {
                i++;
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        [array[i + 1], array[right]] = [array[right], array[i + 1]];
        return i + 1;
    }

    // Function to validate if a string represents a valid integer
    static isValidInteger(str) {
        if (!str) return false;
        
        str = str.trim();
        if (str === '') return false;
        
        // Fast check for valid integer format using regex
        return /^[+-]?\d+$/.test(str);
    }

    // Function to get current memory usage
    static getMemoryUsage() {
        const used = process.memoryUsage();
        return {
            heapUsed: Math.round(used.heapUsed / 1024 / 1024 * 100) / 100,
            heapTotal: Math.round(used.heapTotal / 1024 / 1024 * 100) / 100,
            external: Math.round(used.external / 1024 / 1024 * 100) / 100,
            rss: Math.round(used.rss / 1024 / 1024 * 100) / 100
        };
    }

    static async processFile(inputFilePath, outputFilePath) {
        const startTime = process.hrtime();
        const startMemory = this.getMemoryUsage();
        
        try {
            // Use Set for O(1) uniqueness checking instead of array
            const uniqueIntegers = new Set();
            
            // Create read stream and readline interface
            const fileStream = fs.createReadStream(inputFilePath);
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity
            });

            // Process file line by line
            for await (const line of rl) {
                const trimmed = line.trim();
                
                // Skip empty lines or lines with multiple numbers
                if (trimmed === '' || trimmed.includes(' ') || trimmed.includes('\t')) {
                    continue;
                }
                
                // Validate and process integer
                if (this.isValidInteger(trimmed)) {
                    uniqueIntegers.add(parseInt(trimmed, 10));
                }
            }
            
            // Convert Set to array and sort
            const sortedIntegers = this.quickSort(Array.from(uniqueIntegers));
            
            // Write to output file using write stream for efficiency
            const writeStream = fs.createWriteStream(outputFilePath);
            for (const num of sortedIntegers) {
                writeStream.write(num + '\n');
            }
            
            // Wait for write stream to finish
            await new Promise((resolve, reject) => {
                writeStream.end();
                writeStream.on('finish', resolve);
                writeStream.on('error', reject);
            });
            
            // Calculate and display performance metrics
            const endTime = process.hrtime(startTime);
            const endMemory = this.getMemoryUsage();
            
            const duration = (endTime[0] * 1000 + endTime[1] / 1000000).toFixed(2);
            const memoryDiff = {
                heapUsed: (endMemory.heapUsed - startMemory.heapUsed).toFixed(2),
                heapTotal: (endMemory.heapTotal - startMemory.heapTotal).toFixed(2),
                external: (endMemory.external - startMemory.external).toFixed(2),
                rss: (endMemory.rss - startMemory.rss).toFixed(2)
            };
            
            console.log(`\nProcessing ${inputFilePath}:`);
            console.log('Runtime Metrics:');
            console.log(`  Total Runtime: ${duration}ms`);
            console.log('Memory Usage (MB):');
            console.log(`  Heap Used: ${memoryDiff.heapUsed} (${endMemory.heapUsed} total)`);
            console.log(`  Heap Total: ${memoryDiff.heapTotal} (${endMemory.heapTotal} total)`);
            console.log(`  External: ${memoryDiff.external} (${endMemory.external} total)`);
            console.log(`  RSS: ${memoryDiff.rss} (${endMemory.rss} total)`);
            console.log(`Unique Integers Found: ${sortedIntegers.length}`);
            
        } catch (error) {
            console.error(`Error processing file: ${error.message}`);
        }
    }
}

// Command line interface
if (require.main === module) {
    if (process.argv.length !== 4) {
        console.error('Usage: node UniqueInt.js <input_file> <output_file>');
        process.exit(1);
    }
    
    const inputFile = process.argv[2];
    const outputFile = process.argv[3];
    UniqueInt.processFile(inputFile, outputFile)
        .catch(error => {
            console.error('Error:', error);
            process.exit(1);
        });
} 