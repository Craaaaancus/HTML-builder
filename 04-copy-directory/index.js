const fs = require("fs");
const path = require("path");
const pathToFolder = path.join(__dirname, "files");
const pathToFolderCopy = path.join(__dirname, "files-copy");

fs.mkdir(pathToFolderCopy, {recursive: true} , (err) => {
  if (err) console.log(err);
  else {
    fs.readdir(pathToFolder, (err, files) => {
      if (err) console.log(err);
      else {
        files.forEach(file => {
          fs.copyFile(path.join(pathToFolder, file), path.join(pathToFolderCopy, file),
            (err) => {
              if (err) console.log(err);
              else console.log(`File ${file} copied sucessfully`);
            } 
          );
        });
      }
    });
  }
});