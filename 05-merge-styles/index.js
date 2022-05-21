const fs = require("fs");
const path = require("path");
const pathToStyles = path.join(__dirname, "styles");
const pathToProject = path.join(__dirname, "project-dist");

fs.readdir(pathToStyles, {withFileTypes: true}, (err, files) => {
  if (err) console.log(err);
  else {
    let writableStream = fs.createWriteStream(path.join(pathToProject, "bundle.css"));
    for (let file of files){
      if (file.isFile() && path.extname(file.name) === ".css"){
        const pathToCSSFile = path.join(pathToStyles, file.name);
        let readableStream = fs.createReadStream(pathToCSSFile, "utf-8");
        readableStream.pipe(writableStream);
      }
    }
    console.log("bundle.css sucessfully created");
  }
});