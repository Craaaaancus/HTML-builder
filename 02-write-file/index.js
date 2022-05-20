const fs = require("fs");
const path = require("path");
const readline = require("readline");
const process = require("process");

let writableStream = fs.createWriteStream(path.join(__dirname, "text.txt"));
const rl = readline.createInterface({ 
  input:  process.stdin,
  output: process.stdout
});

rl.on("SIGINT", () => {
  rl.close();
  console.log("\nFile recording completed, good bye!");
});
rl.on('line', (input) => {
  if (input.trim() === "exit") {
    rl.close();
    console.log("File recording completed, good bye!");
  }
  else {
    console.log("Please, enter some text: ");
    writableStream.write(input + " ");
  }
});

console.log("Welcome to second task!");
console.log("Please, enter some text: ");