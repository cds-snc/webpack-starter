const fs = require("fs");
const content = fs.readFileSync("dist/filelist.json");
const json = JSON.parse(content);
console.log(json.page1);
