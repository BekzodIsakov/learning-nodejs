To debug a Node.js application using Chrome, you can use the built-in debugging capabilities of Node.js along with the Chrome DevTools. Here's a step-by-step guide on how to do this:
1. Start your Node.js application with the --inspect flag:   
`node --inspect your-app.js`   
This will start your application in debug mode and print a message like:`Debugger listening on ws://127.0.0.1:9229/...`

2. Open Google Chrome and navigate to: `chrome://inspect`
3. Under the "Remote Target" section, you should see your Node.js application. Click on "inspect" underneath it.
4. This will open a new Chrome DevTools window connected to your Node.js process.
5. In the DevTools, you can now:
  - Set breakpoints
  - Step through code
  - Inspect variables
  - Use the console
6. If you want to break on the first line of code, you can use:   
`node --inspect-brk your-app.js`   
This will pause execution on the first line of code.


