const fs = require("fs");
const path = require("path");
const pathToFolder = path.join(__dirname, "secret-folder");

fs.readdir(pathToFolder, {withFileTypes: true}, (err, files) => {
  if (err) console.log(err);
  else{
    for (let dirent of files){
      if (dirent.isFile()){
        const ext = path.extname(dirent.name);
        const base = path.basename(dirent.name, ext);
        const pathToFile = path.join(pathToFolder, dirent.name);
        fs.stat(pathToFile, (error, stats) => {
          if (error) {
            console.log(error);
          }
          else {
            let size = stats.size;
            size /= 1024;
            console.log(base + " - " + ext + " - " + size.toFixed(3) + "kb");
          }
        });
      }
    }
  }
});

console.log("File info: ");