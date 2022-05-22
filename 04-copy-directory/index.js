const fs = require("fs");
const promise = require("fs/promises");
const path = require("path");
const pathToFolder = path.join(__dirname, "files");
const pathToFolderCopy = path.join(__dirname, "files-copy");

const copyDir = async (pathToFolder, pathToFolderCopy) => {
  await promise.mkdir(pathToFolderCopy, {recursive: true});

  fs.readdir(pathToFolderCopy, {withFileTypes: true}, (e, data) => {
    if (e) console.log(e);
    for (let el of data){
      fs.access(path.join(pathToFolder, el.name), (err) => {
        if (err){
          fs.rm(path.join(pathToFolderCopy, el.name), {recursive: true}, (err) => {
            if (err) console.log(err);
          });
        }
      });
    }
  });

  fs.readdir(pathToFolder, {withFileTypes: true}, (e, data) => {
    if (e) console.log(e);
    for (let el of data){
      if (el.isFile()){
        fs.copyFile(path.join(pathToFolder, el.name), path.join(pathToFolderCopy, el.name),
            (err) => {
              if (err) console.log(err);
              else console.log(`File ${el.name} copied sucessfully`);
            } 
        );
      }
      if (el.isDirectory()){
        copyDir(path.join(pathToFolder, el.name), path.join(pathToFolderCopy, el.name));
      }
    }
  });
}

copyDir(pathToFolder, pathToFolderCopy);