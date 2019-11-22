import Web3 from 'web3';
import contractConfig from '../utils/contractConfig';

export default function myContract(HttpProvider) {
	let web3 = new Web3(new Web3.providers.HttpProvider(HttpProvider));
	let myContract = new web3.eth.Contract(contractConfig.ABI,contractConfig.address);

	function fromWei(number) {
		return web3.utils.fromWei(number);
	}

	//通过metaMask钱包API获取用户地址
	async function _getAddress() {
		try {
		  const accounts = await window.ethereum.enable();
		  return accounts;
		} catch (error) {
		  console.error(error)
		}
	}

	/*
	//通过imToken获取用户地址
	async _getAddress() {
		const accounts = await imToken.callAPI('user.showAccountSwitch', { chainType: null }, function(err, address){
		  if(err) {
		    alert(err.message)
		  } else {
		    return address;
		  }
		})
	}
	*/

	async function getUserInfo() {
		let address = await _getAddress().then(address => {
		  return address[0];
		})
		let banlance = await web3.eth.getBalance(address).then(banlance => {
		  return web3.utils.fromWei(banlance, 'ether');
		})
		return {
			address,
		  	banlance,
		}
	}

	//获取用户在合同上的状态信息
	async function getContractUserInfo(myAddress) {
		let data = await myContract.methods.getUserByAddress(myAddress).call();
		return data;
	}

	//投注
	async function bet(myAddress, betValue, inviteCode, beInvitedCode) {
		let data = await myContract.methods.bet(inviteCode, beInvitedCode).encodeABI();
		const raw = await _configTransaction({
			myAddress,
			betValue,
			data,
		}).then(data => {
			return data;
		})
		let transactionInfo = _sendSignTransactionPromise(raw);
		return transactionInfo;
	}

	//再次投注
	async function againBet(myAddress, betValue) {
		let data = await myContract.methods.againBet(betValue).encodeABI();
		const raw = await _configTransaction({
			myAddress,
			betValue,
			data,
		}).then(data => {
			return data;
		})
		let transactionInfo = _sendSignTransactionPromise(raw);
		return transactionInfo;
	}

	//领取导师祝福奖励
	async function drawTutorBless(myAddress, betValue=0) {
		let data = await myContract.methods.drawTutorBless().encodeABI();
		const raw = await _configTransaction({
			myAddress,
			betValue,
			data,
		}).then(data => {
			return data;
		})
		let transactionInfo = _sendSignTransactionPromise(raw);
		return transactionInfo;
	}

	//提现可用余额
	async function drawBalance(myAddress, betValue=0) {
		let data = await myContract.methods.drawBalance().encodeABI();
		const raw = await _configTransaction({
			myAddress,
			betValue,
			data,
		}).then(data => {
			return data;
		})
		let transactionInfo = _sendSignTransactionPromise(raw);
		return transactionInfo;
	}

	//查询交易hash状态
	function getTransactionReceipt(hash) {
		return web3.eth.getTransactionReceipt(hash);
	}

	//配置交易
	async function _configTransaction(arg) {
		let gasPrice = await web3.eth.getGasPrice();
		let nonce = await web3.eth.getTransactionCount(arg.myAddress);
		let opt = {
			from: arg.myAddress,
			to: contractConfig.address,
			value: web3.utils.toHex(web3.utils.toWei(arg.betValue.toString())),
			gasPrice: gasPrice,
			data: arg.data,
			nonce: nonce.toString(),
		};
		let gas = 21000/*await web3.eth.estimateGas(opt)*/;
		opt.gas = web3.utils.toHex(gas);
		return opt;
	}

	//发起交易
	function _sendSignTransactionPromise(params) {
		if(window.ethereum.isMetaMask){
			//调用metaMask钱包交易API
			return new Promise((reslove, reject) => {
				window.ethereum.sendAsync({
				  method: 'eth_sendTransaction',
				  params: [params],
				  from: params.from,
				},(err, result) => {
					if(err){
						reject(err);
					}else{
						reslove(result);
					}
				})
			})
		}else if(window.ethereum.isImToken){
			//调用imToken钱包交易API
			return new Promise((reslove, reject) => {
				window.imToken.callAPI('transaction.tokenPay', params, function (err, signature) {
				  	if(err){
						reject(err);
					}else{
						reslove(signature);
					}
				})
			})
			
		}
	}

	return { 
		fromWei,
		getUserInfo,
		getContractUserInfo,
		bet,
		againBet,
		drawTutorBless,
		drawBalance,
		getTransactionReceipt,
	}
}