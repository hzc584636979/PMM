const Web3 = require("web3");
const contractConfig = require("./contractConfig");

let myContract = null;

module.exports.myContract = function(HttpProvider) {
  let web3 = new Web3(new Web3.providers.HttpProvider(HttpProvider));
  myContract = new web3.eth.Contract(contractConfig.ABI,contractConfig.address);
};

module.exports.getUserByAddress = async function(user_address) {
  const data = await myContract.methods.getUserByAddress(user_address).call();
  console.log("user:", data);
  return data;
};

module.exports.getBetByIndex = async function() {
  const data = await myContract.methods.getBetByIndex(0).call({from: "0xc804f0DaAA6EB8130648bC153D8002dd8A912451"});
  console.log("data:", data);
  return data;
};

module.exports.getGlobalData = async function() {
  const data = await myContract.methods.test().call();
  console.log("data:", data);
  return data;
};




