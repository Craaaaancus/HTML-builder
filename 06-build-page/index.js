const fs = require("fs");
const path = require("path");
const promise = require("fs/promises");

const pathToAssets = path.join(__dirname, "assets");
const pathToComponents = path.join(__dirname, "components");
const pathToStyles = path.join(__dirname, "styles");
const pathToProject = path.join(__dirname, "project-dist");

const createHTML = async (pathToProject, pathToComponents) => {
  let template = await promise.readFile(path.join(__dirname, "template.html"), "utf-8",  (e) => {
    if (e) console.log(e);
  });
  const htmlComponents = await promise.readdir(pathToComponents, {withFileTypes: true});
  for (let file of htmlComponents){
    const readEl = await promise.readFile(path.join(pathToComponents, file.name), "utf-8");
    if (file.isFile() && path.extname(file.name) === ".html"){
      template = template.replaceAll(`{{${path.basename(file.name, ".html")}}}`, readEl);
    }
  }   
  
  fs.writeFile(path.join(pathToProject, "index.html"), template, (e) => {
    if (e) console.log(e);
  });
}

const createCSS = async (pathToProject, pathToStyles) => {
  const styleComponents = await promise.readdir(pathToStyles, {withFileTypes: true});
  const writableStream = fs.createWriteStream(path.join(pathToProject, "style.css"));
  for (let file of styleComponents){
    if (file.isFile() && path.extname(file.name) === ".css"){
      const pathToCSSFile = path.join(pathToStyles, file.name);
      const readableStream = fs.createReadStream(pathToCSSFile, "utf-8");
      readableStream.pipe(writableStream);
    }
  }    
}

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
            } 
        );
      }
      if (el.isDirectory()){
        copyDir(path.join(pathToFolder, el.name), path.join(pathToFolderCopy, el.name));
      }
    }
  });
}

fs.mkdir(pathToProject, {recursive: true}, (err) => {
  if (err) console.log(err);
});

createCSS(pathToProject, pathToStyles);
createHTML(pathToProject, pathToComponents);
copyDir(pathToAssets, path.join(pathToProject, "assets"));