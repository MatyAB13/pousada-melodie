const fs = require('fs');
let json = fs.readFileSync('c:/Users/matia/OneDrive/Desktop/Nueva carpeta (3)/ad.json', 'utf8');

console.log('Original JSON length:', json.length);

// Check if there are actual newlines at position 11569-11572
console.log('Chars at 11568-11575:', json.substring(11568, 11575).split('').map(c => c.charCodeAt(0) + '(' + c + ')').join(', '));

// Fix: Replace any actual \n (char code 10) or \r (char code 13) that appears INSIDE a string value with escaped \n
// Also, fix the issue where we have \"\n which should be just \n inside a string

let out = '';
let i = 0;
let inString = false;
let escapeNext = false;
let newlineCount = 0;

while (i < json.length) {
  const char = json[i];
  const charCode = json.charCodeAt(i);
  
  if (escapeNext) {
    out += char;
    escapeNext = false;
    i++;
    continue;
  }
  
  if (char === '\\') {
    out += char;
    escapeNext = true;
    i++;
    continue;
  }
  
  if (char === '"') {
    out += char;
    inString = !inString;
    i++;
    continue;
  }
  
  // If we're inside a string and encounter actual newline (not escaped)
  if (inString && charCode === 10) { // \n
    out += '\\n';
    newlineCount++;
    i++;
    continue;
  }
  
  // Handle carriage return
  if (inString && charCode === 13) { // \r
    out += '\\r';
    newlineCount++;
    i++;
    continue;
  }
  
  out += char;
  i++;
}

console.log('Fixed', newlineCount, 'newlines');

// Try to parse
try {
  const parsed = JSON.parse(out);
  console.log('JSON is valid! Nodes:', parsed.nodes.length);
  fs.writeFileSync('c:/Users/matia/OneDrive/Desktop/Nueva carpeta (3)/ad_fixed.json', out);
  console.log('Saved to ad_fixed.json');
} catch (e) {
  console.log('Error:', e.message);
  
  const m = e.message.match(/position (\d+)/);
  if (m) {
    const pos = parseInt(m[1]);
    console.log('Position:', pos);
    console.log('Context around error:', out.substring(pos - 30, pos + 30));
  }
}

