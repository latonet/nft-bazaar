const fs = require('fs')
binary = fs.readFileSync('build/hook.wasm').toString('hex').toUpperCase()
console.log(binary)