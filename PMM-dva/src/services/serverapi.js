import stringify from 'qs-stringify';
import request from '../utils/request';
import * as moment from 'moment';

const apiAddress = '/api';//'http://47.56.168.254'
//const apiAddress = '/mock';

export async function getAllTransactionList() {
	const data = [
		{ hash: 'dva', eth: 1 },
   		{ hash: 'antd', eth: 2 },
   	]
	return data;
}

export async function getMyTransactionList(params) {
	return request(`${apiAddress}/api/v1/game/pmm/betRecord`, {
	    method: 'POST',
	    body: params,
	});
}

export async function getStaticticsList(params) {
	return request(`${apiAddress}/api/v1/game/pmm/dataStatistics`, {
	    method: 'POST',
	    body: params,
	});
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
	return request(`${apiAddress}/api/v1/game/pmm/invitationCode`, {
	    method: 'POST',
	    body: params,
	});
}

export async function payReceipt(params) {
	return request(`${apiAddress}/api/v1/game/pmm/betSuccess`, {
	    method: 'POST',
	    body: params,
	});
}
