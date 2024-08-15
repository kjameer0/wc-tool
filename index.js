const { argv } = require("node:process");
const resolve = require("path").resolve;
process.stdin.setEncoding("utf8");

const globalData = [];

process.stdin.on("data", function (data) {
  globalData.push(data);
});
process.stdin.on("end", function (data) {
  main(globalData.join(""));
  process.exit();
});

const fs = require("fs");
// print process.argv
function parseTerminalArgumentsWithoutCat(args) {
  const argRecord = {};
  //check that there is at least one parameter provided and it is a path
  if (args.length === 0 || !args.at(-1).includes(".")) {
    throw new Error("Please supply a valid path");
  }
  argRecord.path = args.pop();
  if (argRecord.path[0] === ".") {
    argRecord.path = resolve(argRecord.path);
  }
  //only take first option
  if (args.length > 0) {
    argRecord.option = args[0];
  }
  return argRecord;
}

function getFileText(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return data;
  } catch (err) {
    console.error(err);
  }
}
function getNumberOfLines(fileText) {
  return "Number of lines: " + fileText.toString().split("\n").length;
}
function getNumberOfWords(fileText) {
  const words = fileText.toString().split(" ");
  return "# of words: " + words.length;
}
function getNumberOfBytes(fileText) {
  const bytes = fileText.length;
  return "# of bytes: " + bytes;
}
function main(globalData) {
  let fileText;
  let commandOption;
  let filePath = "";
  if (globalData && globalData.length > 0) {
    fileText = globalData;
    commandOption = argv[argv.length - 1] || "";
  } else {
    const { path, option } = parseTerminalArgumentsWithoutCat(argv.slice(2));
    filePath = path;
    fileText = getFileText(filePath);
    commandOption = option;
  }
  switch (commandOption) {
    case "-l":
      console.log(getNumberOfLines(fileText) + " " + filePath);
      break;
    case "-w":
      console.log(getNumberOfWords(fileText) + " " + filePath);
      break;
    case "-c":
      console.log(getNumberOfBytes(fileText) + " " + filePath);
      break;
    default:
      console.log(
        [
          getNumberOfBytes(fileText),
          getNumberOfLines(fileText),
          getNumberOfWords(fileText),
        ].join(" ") +
          " " +
          filePath
      );
      break;
  }
  process.exit();
}
//process.stdin.isTTY if the process is connected to the raw terminal instead of being
//piped from another command
//TTY is true if nothing is being piped or redirected. it is true if the terminal
//is running interactively
//if this is true that means there is no cat, so we run main without external data
//and read the file the user passes in with node
if (process.stdin.isTTY) main();
