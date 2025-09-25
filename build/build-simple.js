const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔨 Building Better-Me Desktop App...');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Copy index.html to dist
fs.copyFileSync('index.html', 'dist/index.html');
console.log('✅ Copied index.html to dist/');

// Copy src directory to dist
if (fs.existsSync('src')) {
  execSync('xcopy /E /I /Y src dist\\src', { stdio: 'inherit' });
  console.log('✅ Copied src/ to dist/');
}

// Copy other necessary files
const filesToCopy = ['package.json'];
filesToCopy.forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, `dist/${file}`);
    console.log(`✅ Copied ${file} to dist/`);
  }
});

console.log('🎉 Build completed! Ready for Electron packaging.');
