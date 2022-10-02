const fs = require("fs");
const ethers = require("ethers");
const { promises: fsA } = require("fs");

let bigArray = [];
let jsonFiles = [];


// get all files with JSON extension in current directory
async function getFileNames() {
  let files = await fsA.readdir("./json/");
  files.forEach((file) => {
    console.log(file);
    if (file.slice(-4) === "json" && file !== "addressList.txt") {
      jsonFiles.push(file);
    }
  });
  console.log(jsonFiles);
  return jsonFiles;
}

// read file data
async function readFile(filename) {
  let data = await fs.promises.readFile("./json/" + filename);
  data = JSON.parse(data);
  console.log(data.length);
  return data;
}

async function go() {
  // get JSON files in directory
  let files = await getFileNames();

  // loop through filenames
  // read JSON data from file
  // add file JSON to one big array
  for (x = 0; x < files.length; x++) {
    
    let returnData = await readFile(files[x]);
    //   console.log(returnData)
    bigArray = bigArray.concat(returnData);
  }

  // initialize new list of current token holders
  // loop through big array to create new array array of holders
  // if new array already has token replace previous holder with new holder
  let holderList = [];
  bigArray.forEach((holder) => {

    let newHolder = {
      address: holder.toAddress,
      token: holder.token,
      cid: holder.cid,
    };
    let dupIndex = holderList.findIndex((x) => x.token === holder.token);
    if (dupIndex > -1) {
      holderList[dupIndex] = newHolder;
    } else {
      holderList.push(newHolder);
    }
  });

  console.log("total events ", bigArray.length);
  console.log("new holders ", holderList.length);

  // write holders to json file
  fs.writeFile("./holdersList.json", JSON.stringify(holderList), (err) => {
    if (err) {
      console.error(err);
    }
  });
}
go();
