import Web3 from 'web3';
import contractConfig from '../utils/contractConfig';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import tp from 'tp-js-sdk';

export function createWeb3(HttpProvider) {
	let web3 = '';
	if(window.web3.currentProvider){
		console.log('createWeb3',1)
		web3 = window.web3.currentProvider;
	}else{
		console.log('createWeb3',2)
		web3 = new Web3.providers.HttpProvider(HttpProvider);
	}
	return new Web3(web3);
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
		console.log('111111')
		const accounts = await window.imToken.callPromisifyAPI('user.showAccountSwitch', { chainType: 'ETHEREUM' }).then(data => {
			console.log(data)
			return data;
		})
		return accounts;
	}

	//通过tockenpocket获取用户地址
	async function _getTockenpocketAddress() {
		const accounts = await tp.getCurrentWallet().then(data => data.data.address);
		return accounts;
	}

	//通过web3获取用户地址
	async function _getWeb3Address() {
		const accounts = await web3.eth.getAccounts().then(address => address);
		return accounts[0];
	}

	async function getUserInfo() {
		try {
			let address = '';
			if(tp.isConnected()){
				address = await _getTockenpocketAddress();
				console.log('getUserInfo-tockenpocket', address)
			}else if(window.ethereum.isMetaMask){
				address = await _getMetaMaskAddress();
				console.log('getUserInfo-isMetaMask', address)
			}else if(window.ethereum.isImToken){
				address = await _getImTokenAddress();
				console.log('getUserInfo-isImToken', address)
			}else if(_getWeb3Address()){
				address = await _getWeb3Address();
				console.log('getUserInfo-isWeb3', address)
			}else{
				console.log('getUserInfo-无钱包')
				window.g_app._store.dispatch(routerRedux.push('/'))
				return {
					address: "",
				  	banlance: "",
				}
			}
			
			let banlance = await web3.eth.getBalance(address);

			console.log(address, 'end')
			return {
				address,
			  	banlance: web3.utils.fromWei(banlance, 'ether'),
			}
		} catch(error) {
			console.log('getUserInfo-error')
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
		console.log('getTransactionReceipt', hash)
		return new Promise((reslove, reject) => {
			let timer = setInterval(async () => {
				let data = await web3.eth.getTransactionReceipt(hash).then(receipt => {
					console.log(receipt)
					if(receipt){
						clearInterval(timer);
						reslove(receipt);
					}
				})
			}, 500)
		})
	}

	/*async function getTransactionReceipt(hash) {
		console.log('getTransactionReceipt', hash)
		let data = await web3.eth.getTransactionReceipt(hash).then(receipt => {
			console.log(receipt)
			return (receipt ? receipt : getTransactionReceipt(hash));
		})
		console.log('getTransactionReceipt', data)
		return data;
	}*/

	//配置交易
	async function _configTransaction(arg) {
		let gasPrice = await web3.eth.getGasPrice();
		console.log(gasPrice)
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
		if(!tp.isConnected()) { 
			opt.gas = web3.utils.toHex(gas);
		}/*else {
			opt.gasLimit = web3.utils.toHex(gas);
		}*/
		return opt;
	}

	//发起交易
	function _sendSignTransactionPromise(params) {
		console.log('_sendSignTransactionPromise', params);
		if(tp.isConnected()) {
			//调用tokenpocket钱包交易API
			return new Promise((reslove, reject) => {
				tp.sendEthTransaction(params).then(data => {
					console.log('send-tockenpocket', data)
					if(data.result) {
						reslove(data.data);
					}else{
						reject(data);
					}
				})
			})
		}else if(window.ethereum.isMetaMask || window.ethereum.isImToken){
			//调用metaMask钱包交易API
			return new Promise((reslove, reject) => {
				window.ethereum.sendAsync({
				  method: 'eth_sendTransaction',
				  params: [params],
				  from: params.from,
				},(err, result) => {
					console.log(result)
					console.log('send-isMetaMask || window.ethereum.isImToken', 'err:', err, 'result:', result)
					if(err){
						reject(err);
					}else{
						reslove(result.result);
					}
				})
			})
		}else {
			//调用web3交易API
			return new Promise((reslove, reject) => {
				web3.eth.sendTransaction(params, function (err, hash) {
					console.log('send-isWeb3', err, hash)
				  	if(err){
						reject(err);
					}else{
						reslove(hash);
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