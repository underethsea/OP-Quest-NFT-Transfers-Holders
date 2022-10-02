const fetch = require("node-fetch");
const ethers = require("ethers");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

// const optimismEndpoint = "https://mainnet.optimism.io";

const alchemyEndpoint =
  "https://opt-mainnet.g.alchemy.com/v2/" + process.env.ALCHEMY_KEY;

const PROVIDER = {
  OPTIMISM: new ethers.providers.JsonRpcProvider(alchemyEndpoint),
};

// Optimism Quest NFT and transfer topic
const opNftAddress = "0xfA14e1157F35E1dAD95dC3F822A9d18c40e360E2";
const topic =
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
const nftABI = JSON.parse(
  '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newMinter","type":"address"}],"name":"EventMinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldMinter","type":"address"}],"name":"EventMinterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"minter","type":"address"}],"name":"addMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"burnBatch","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"cid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumMinted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"isOwnerOf","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"cid","type":"uint256"}],"name":"mint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256[]","name":"cidArr","type":"uint256[]"}],"name":"mintBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"minters","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"minter","type":"address"}],"name":"removeMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newName","type":"string"}],"name":"setName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newSymbol","type":"string"}],"name":"setSymbol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"transferable","type":"bool"}],"name":"setTransferable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newURI","type":"string"}],"name":"setURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"transferable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]'
);
const contract = new ethers.Contract(opNftAddress, nftABI, PROVIDER.OPTIMISM);


// campaign start
let fromBlock = 22945787;

// change to scrape recent events
 fromBlock = 26545787

let toBlock = "latest";

// fetch 80k blocks of events at a time
let step = 80000;

// standard sleep function to add a wait between calls
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// loop fromBlock to currentBlock in batches of step
// get all transfer events
// prepare fromAddress, toAddress, token, transactionHash
// use token to read CID
// write records to local file
async function go() {

  const currentBlock = await PROVIDER.OPTIMISM.getBlockNumber();
  console.log("current block ", currentBlock);

  let totalResults = [];

  for (x = fromBlock; x + step < currentBlock; x += step) {
    let nftTransfers = [];

    let filterItem = {
      address: opNftAddress,
      topics: [topic],
      fromBlock: parseInt(x),
      toBlock: parseInt(x + step),
    };

    console.log("getting block ", parseInt(x), " to block ", parseInt(x + step));
    let logs = await PROVIDER.OPTIMISM.getLogs(filterItem).catch((error) => {
      console.log("ERROR");
      console.log(error);
    });
    for (let event of logs) {
      let dataFromEvent = {
        fromAddress: ethers.utils.defaultAbiCoder
          .decode(["address"], event.topics[1])
          .toString(),
        toAddress: ethers.utils.defaultAbiCoder
          .decode(["address"], event.topics[2])
          .toString(),
        token: ethers.utils.defaultAbiCoder
          .decode(["uint256"], event.topics[3])
          .toString(),
        hash: event.transactionHash,
      };
      try {
        await sleep(34);
        // cid  campaign id
        let result = await contract.cid(dataFromEvent.token);
        dataFromEvent.cid = result.toString();
    
      } 
      // if reading CID fails write it as 0
      catch (error) {
        dataFromEvent.cid = 0;
        console.log("error on", dataFromEvent);
        console.log(error);
      }
      nftTransfers.push(dataFromEvent);
    }

    // if transfers found between block range -> write them to local JSON file
    if (nftTransfers.length > 0) {
      fs.writeFile(
        "./json/" + x + ".json",
        JSON.stringify(nftTransfers),
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
    }
    console.log("got ", logs.length, " events");
    totalResults = totalResults.concat(logs);
  }
  console.log("total length", totalResults.length);

}
go();
