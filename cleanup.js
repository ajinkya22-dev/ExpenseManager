#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to recursively get all files with specific extensions
function getAllFiles(dir, extensions) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath, extensions));
    } else if (extensions.some(ext => item.endsWith(ext))) {
      files.push(fullPath);
    }
  }

  return files;
}

// Function to safely remove files
function removeFiles(files) {
  for (const file of files) {
    try {
      fs.unlinkSync(file);
      console.log(`Removed: ${file}`);
    } catch (error) {
      console.error(`Failed to remove: ${file}`, error);
    }
  }
}

// Main function
async function main() {
  try {
    console.log('Starting cleanup process...');

    // Get root directory
    const rootDir = process.cwd();

    // Get all TypeScript files
    console.log('Finding TypeScript files...');
    const tsFiles = getAllFiles(rootDir, ['.ts', '.tsx']);
    console.log(`Found ${tsFiles.length} TypeScript files`);

    // Remove TypeScript config files that are no longer needed
    const configFilesToRemove = [
      path.join(rootDir, 'tsconfig.json'),
      path.join(rootDir, 'tsconfig.app.json'),
      path.join(rootDir, 'tsconfig.node.json'),
      path.join(rootDir, 'vite.config.ts'),
      path.join(rootDir, 'tailwind.config.ts')
    ];

    // Create a JavaScript version of tailwind.config.ts if it exists
    const tailwindTsPath = path.join(rootDir, 'tailwind.config.ts');
    if (fs.existsSync(tailwindTsPath)) {
      const tailwindContent = fs.readFileSync(tailwindTsPath, 'utf-8');
      const jsContent = tailwindContent
        .replace(/import type {.*} from ['"].*['"];?\n?/g, '')
        .replace(/: Config/g, '')
        .replace(/as const/g, '');

      fs.writeFileSync(path.join(rootDir, 'tailwind.config.js'), jsContent);
      console.log('Created tailwind.config.js');
    }

    // Remove TypeScript files
    console.log('Removing TypeScript files...');
    removeFiles(tsFiles);

    // Remove TypeScript config files
    console.log('Removing TypeScript config files...');
    removeFiles(configFilesToRemove.filter(file => fs.existsSync(file)));

    // Final cleanup message
    console.log('\nCleanup complete! Your project has been converted from TSX to JSX.');
    console.log('\nReminder: If you encounter any issues after conversion:');
    console.log('1. Check import paths in your JSX files');
    console.log('2. Update any ESLint or Babel configurations if needed');
    console.log('3. Check for any TypeScript-specific code that might need adaptation');

  } catch (error) {
    console.error('An error occurred during conversion:', error);
  }
}

// Run the main function
main().catch(console.error);
