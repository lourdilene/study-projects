const fs = require("fs");

fs.writeFile("message.txt", "Hello Node JS !", (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
