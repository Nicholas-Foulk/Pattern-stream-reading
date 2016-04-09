var fs = require('fs')
var liner = require('./assign3.js')
var source = fs.createReadStream('./input.txt')
source.pipe(liner)
liner.on('readable', function () {
     var line
     while (null !== (line = liner.read())) {
          // do something with line
		  console.log(line)
     }
})