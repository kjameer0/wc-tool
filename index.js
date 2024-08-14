const { argv } = require("node:process");
const fs = require("fs");
// print process.argv
function parseTerminalArguments(args) {
  const argRecord = {};
  //check that there is at least one parameter provided and it is a path
  if (args.length === 0 || !args.at(-1).includes(".")) {
    throw new Error("Please supply a valid path");
  }
  argRecord.path = args.pop();
  //only take first option
  if (args.length > 0) {
    argRecord.option = args[0];
  }
  return argRecord;
}
// getting a file path
// reading parameters from terminal command
// process the file
//read a file
function getFileText(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    //print number of lines
    return data;
  } catch (err) {
    console.error(err);
  }
}
function getNumberOfLines(filePath) {
  const fileText = getFileText(filePath);
  console.log(fileText.toString().split("\n").length, " ", filePath || ".txt");
}
function main() {
  const { path, option } = parseTerminalArguments(argv.slice(2));
  console.log("here are the options ", path, " ", option);
  switch (option) {
    case "-l":
      getNumberOfLines(path);
      return;
    default:
      getNumberOfLines(path);
      return;
  }
}
main();
