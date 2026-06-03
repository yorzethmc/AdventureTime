const fs = require('fs');

const files = fs.readdirSync('src/views').filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const path = 'src/views/' + file;
  let content = fs.readFileSync(path, 'utf8');
  
  content = content.replace(/import \{ GameState \} from '\.\.\/App';/g, "import type { GameState } from '../App';");
  
  if (file === '02-MissionBriefing.tsx') {
    content = content.replace("import { useState, useRef, useEffect }", "import { useState, useRef }");
  } else if (file === '05-DateTime.tsx') {
    content = content.replace("import { useState, useEffect } from 'react';\n", "");
  } else if (file === '09-Victory.tsx') {
    content = content.replace("import { useEffect } from 'react';\n", "");
  }
  
  fs.writeFileSync(path, content);
}
