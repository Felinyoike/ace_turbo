const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('route.ts') || file.endsWith('page.tsx') || file.endsWith('layout.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}
const files = walk('src/app');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Skip client components as they can't export dynamic
  if (content.includes('"use client"') || content.includes("'use client'")) {
    return;
  }
  if (!content.includes('export const dynamic')) {
    fs.writeFileSync(file, 'export const dynamic = "force-dynamic";\n' + content);
    console.log('Patched: ' + file);
  }
});
console.log('Done');
