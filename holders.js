const ethers = require('ethers')
const { promises: fs } = require("fs");

const alchemyKey = 'ax9JWBl7Q9xTdUhe1Giyjg6rOJJvIAAn'
const alchemyEndpoint = 'https://opt-mainnet.g.alchemy.com/v2/' + alchemyKey

const opNftAddress = '0xfA14e1157F35E1dAD95dC3F822A9d18c40e360E2'

const PROVIDER = {
    OPTIMISM: new ethers.providers.JsonRpcProvider(alchemyEndpoint),
};
let txtFiles =[]
async function getFiles() {
let files = await fs.readdir("./")
files.forEach(file=>{console.log(file);if (file.slice(-3) === "txt" && file !== "addressList.txt"){txtFiles.push(file)}})
console.log(txtFiles)
return txtFiles;
}
let ownerAbi = ["function ownerOf(uint256 tokenId) public view returns (address)"]
const contract = new ethers.Contract(opNftAddress, ownerAbi, PROVIDER.OPTIMISM)
let newHolders = []
async function readFile(filename) {
    console.log("file",filename)
let data = await fs.promises.readFile('./' + filename);

        
            data = JSON.parse(data)
            console.log(data.length)
           return data
              
    
}

async function go(){
    let files = await getFiles()
    files.forEach((entry) => {
    readFile(entry).then(results=>{results.forEach((result)=>{
    let token = result.token
    let owner = contract.ownerOf(token)
    if (result.address === owner) {
        console.log("still owns it")
        newHolders.push(entry)
    }})})})
}
go()
