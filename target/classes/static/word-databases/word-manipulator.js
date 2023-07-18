const fs = require("fs");
const file = "word-databases/french-10k.txt";

// this method removes all duplicates, replaces spaces and "-" by new line, removes tabulators, numbers, and special characters, and convert all to lowercase
function removeDuplicates(fileName) {
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file from disk: ${err}`);
      return;
    }
    // convert to lowercase
    data = data.toLowerCase();

    // replace spaces, "-" with newline and remove tabs
    data = data.replace(/\s/g, "\n").replace(/-/g, "\n").replace(/\t/g, "");

    // remove numbers and special characters (if uncommented)
    data = data.replace(/[0-9]/g, ""); //.replace(/[^\w\s]|_/g, "");

    // split the contents by newline
    let words = data.split("\n");

    // remove empty lines
    words = words.filter((word) => word.trim() !== "");

    // remove duplicates using Set
    let uniqueWords = [...new Set(words)];

    // join the array back into a string with newline separators
    let output = uniqueWords.join("\n");

    // write the new content back to the file
    fs.writeFile(fileName, output, "utf8", (err) => {
      if (err) {
        console.error(`Error writing file to disk: ${err}`);
        return;
      }
      console.log("Successfully processed the file.");
    });
  });
}

removeDuplicates(file);
