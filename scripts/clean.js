const fs = require('fs');
const path = require('path');

const nextDir = path.join(__dirname, '..', '.next');

if (fs.existsSync(nextDir)) {
  try {
    fs.rmSync(nextDir, { recursive: true, force: true });
    console.log('🚀 Successfully cleared Next.js .next cache directory.');
  } catch (err) {
    console.warn('⚠️ Warning: Could not clear .next directory. It might be locked by a running process.');
  }
}
