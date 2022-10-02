const fs = require("fs");

// read holders data
async function getHolders() {
  let data = await fs.promises.readFile("./holdersList.json");
  data = JSON.parse(data);
  console.log(data.length);
  return data;
}

async function filterForCampaign(cid) {
  let cidHolders = [];
  let holders = await getHolders();

  // loop through holders and push campaign match to new array
  for (x = 0; x < holders.length; x++) {
    if (holders[x].cid === cid) {
      cidHolders.push(holders[x].address);
    }
  }
  console.log(cidHolders.length, " holders of campaign ", cid);
  return cidHolders;
}

async function writeCampaignHoldersToFile(cid) {
    cid = cid.toString()
  let filteredHolders = await filterForCampaign(cid);
  try{
  fs.writeFile("./holders/cid_" + cid + ".txt", JSON.stringify(filteredHolders), (err) => {
    if (err) {
      console.error(err);
    }
  });}catch(error){console.log(error)}
}

writeCampaignHoldersToFile(6351)
