import stringify from 'qs-stringify';
import request from '../utils/request';
import * as moment from 'moment';

const apiAddress = '/api';//'http://47.56.168.254'
//const apiAddress = '/mock';

export async function testAPI(params) {
	//GET
	let qstr = stringify(params);
  	return request(`${apiAddress}/api/0.1/lszx/manager/devices?${qstr}`);

  	//POST
	return request(`${apiAddress}/api/0.1/lszx/userToken/rootToken`, {
	    method: 'POST',
	    body: params,
	});
}

export async function getAllTransactionList() {
	const data = [
		{ hash: 'dva', eth: 1 },
   		{ hash: 'antd', eth: 2 },
   	]
	return data;
}

export async function getMyTransactionList(params) {
	const data = [
		{ hash: 'Mydva', eth: 1 },
   		{ hash: 'Myantd', eth: 2 },
   	]
	return data;
}

export async function getStaticticsList(params) {
	const data = [
		{ hash: 'Mydva', eth: 1 },
   		{ hash: 'Myantd', eth: 2 },
   	]
	return data;
}

export async function getAdminList(params) {
	const data = {
		sup: [
			{ name: 'Mydva', lv: 1 },
		],
		sub: [
			{ name: 'Mydva', lv: 1 },
	   		{ name: 'Mydva', lv: 1 },
	   		{ name: 'Mydva', lv: 1 },
	   		{ name: 'Mydva', lv: 1 },
	   		{ name: 'Mydva', lv: 1 },
	   		{ name: 'Mydva', lv: 1 },
	   		{ name: 'Mydva', lv: 1 },
	   		{ name: 'Mydva', lv: 1 },
	   		{ name: 'Mydva', lv: 1 },
		],
	}
	return data;
}

export async function getIC(params) {
	return {
		data: 'a1111'
	}
	let qstr = stringify(params);
  	return request(`${apiAddress}/inviteCode?${qstr}`);
}
