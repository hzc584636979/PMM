import Web3 from 'web3';
import contractConfig from '../utils/contractConfig';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export function createWeb3(HttpProvider) {
	let web3 = new Web3(new Web3.providers.HttpProvider(HttpProvider));
	return web3;
}

export default function myContract(HttpProvider) {
	let web3 = createWeb3(HttpProvider);
	let myContract = new web3.eth.Contract(contractConfig.ABI,contractConfig.address);

	function fromWei(number) {
		return web3.utils.fromWei(number, 'ether');
	}

	//通过metaMask钱包API获取用户地址
	async function _getMetaMaskAddress() {
		const accounts = await window.ethereum.enable().then(address => address);
		return accounts[0];
	}

	//通过imToken获取用户地址
	async function _getImTokenAddress() {
		const accounts = await window.imToken.callAPI('user.showAccountSwitch', { chainType: null }, function(err, address){
		  if(err) {
		    alert(err.message)
		  } else {
		    return address;
		  }
		})
	}

	async function getUserInfo() {
		try {
			let address = '';
			if(window.ethereum.isMetaMask){
				address = await _getMetaMaskAddress();
			}else if(window.ethereum.isImToken){
				address = await _getImTokenAddress();
			}else {
				window.g_app._store.dispatch(routerRedux.push('/'))
				return {
					address: "",
				  	banlance: "",
				}
			}
			
			let banlance = await web3.eth.getBalance(address);
			return {
				address,
			  	banlance: web3.utils.fromWei(banlance, 'ether'),
			}
		} catch(error) {
			message.error('同步信息出错');
			return {
				address: "",
			  	banlance: "",
			}
			console.log(error)
		}
	}

	//获取用户在合同上的状态信息
	async function getContractUserInfo(myAddress) {
		let data = await myContract.methods.getUserByAddress(myAddress).call();
		console.log('合约用户详情',data)
		return data;
	}

	//投注
	async function bet(myAddress, betValue, inviteCode, beInvitedCode) {
		console.log(inviteCode, beInvitedCode)
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
			betValue: 0,
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
	async function getTransactionReceipt(hash) {
		let data = await web3.eth.getTransactionReceipt(hash).then(receipt => {
			console.log(receipt)
			return (receipt ? receipt : getTransactionReceipt(hash));
		})
		return data;
	}

	//配置交易
	async function _configTransaction(arg) {
		let gasPrice = await web3.eth.getGasPrice();
		console.log(web3.utils.fromWei(gasPrice, 'ether'))
		let nonce = await web3.eth.getTransactionCount(arg.myAddress);
		let opt = {
			from: arg.myAddress,
			to: contractConfig.address,
			value: web3.utils.toHex(web3.utils.toWei(arg.betValue.toString())),
			gasPrice: gasPrice,
			data: arg.data,
			nonce: nonce.toString(),
		};
		console.log(opt)
		let gas = await web3.eth.estimateGas(opt);
		console.log(gas)
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