const path = require("path");
const fs = require("fs");

const pathToTXT = path.join(__dirname, 'text.txt');
let readableStream = fs.createReadStream(pathToTXT , 'utf-8');

readableStream.on('data', function(chunk){
  console.log(chunk);
});