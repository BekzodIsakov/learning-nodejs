Node.js uses two primary module systems: CommonJS and ES Modules (ESM). Here's a breakdown of each:

### 1\. CommonJS

CommonJS is the original module system for Node.js and is synchronous, which means it loads modules synchronously. This system is still widely used and is the default in Node.js unless otherwise specified.

**Key Features:**

*   **require() Function:** Used to import modules. Example: const fs = require('fs');
    
*   **module.exports and exports Object:** Used to export modules. Example: module.exports = function() { ... }
    
*   **Synchronous Loading:** Modules are loaded synchronously, which can block execution if a module takes time to load.
    

**Example:**

**math.js:**
```
// Exporting using export statement
export function add(a, b) {
  return a + b;
}
```

**app.js:**
```
// Importing using require()
const math = require('./math');
console.log(math.add(2, 3)); // Output: 5
```

### 2\. ES Modules (ESM)

ES Modules is the modern module system based on the ECMAScript (JavaScript) specification. It supports both synchronous and asynchronous loading of modules and is also used by browsers.

**Key Features:**

*   **import and export Statements:** Used to import and export modules. Example: import fs from 'fs'; and export function add(a, b) { ... }
    
*   **Asynchronous Loading:** Modules can be loaded asynchronously, allowing non-blocking execution.
    
*   **Static Analysis:** The import/export statements are statically analyzed, allowing tools to optimize code.
    

**Example:**

To use ES Modules in Node.js, ensure your file has a .mjs extension or add "type": "module" in your package.json.

**math.mjs:**
```
// Exporting using export statement
export function add(a, b) {
  return a + b;
}
```

**app.mjs:**
// Importing using import statement
import { add } from './math.mjs';
console.log(add(2, 3)); // Output: 5```
```

### Choosing Between CommonJS and ESM

*   **Legacy Projects:** CommonJS is often used in older Node.js projects for compatibility reasons.
    
*   **Modern Projects:** ES Modules are preferred for new projects due to their compatibility with the latest JavaScript standards and browsers.
    

### Key Differences

FeatureCommonJSES ModulesFile Extension.js.mjs or .js with "type": "module"Import Syntaxconst fs = require('fs');import fs from 'fs';Export Syntaxmodule.exports = ...export default ... or export const ...LoadingSynchronousAsynchronous

### Migrating from CommonJS to ESM

If you're migrating a project from CommonJS to ESM, you'll need to:

1.  Rename files from .js to .mjs or set "type": "module" in package.json.
    
2.  Replace require() with import and module.exports with export.