import Web3 from 'web3';

export default function createWeb3(address) {
	return new Web3(new Web3.providers.HttpProvider(address));
}