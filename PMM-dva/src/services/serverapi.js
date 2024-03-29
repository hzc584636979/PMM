import stringify from 'qs-stringify';
import request from '../utils/request';
import * as moment from 'moment';

let apiAddress = '';
if(process.env.NODE_ENV == 'development') {
	apiAddress = '/api/api/v1';
}else {
	apiAddress = 'https://www.boq.hk/api/api/v1';//192.168.1.20:7001
}

export async function getAllTransactionList() {
	const data = [
		{ hash: 'dva', eth: 1 },
   		{ hash: 'antd', eth: 2 },
   	]
	return data;
}

export async function getMyTransactionList(params) {
	return request(`${apiAddress}/game/pmm/betRecord`, {
	    method: 'POST',
	    body: params,
	});
}

export async function getStaticticsList(params) {
	return request(`${apiAddress}/game/pmm/dataStatistics`, {
	    method: 'POST',
	    body: params,
	});
}

export async function getAdminList(params) {
	return request(`${apiAddress}/game/pmm/teamDetail`, {
	    method: 'POST',
	    body: params,
	});
}

export async function getIC(params) {
	return request(`${apiAddress}/game/pmm/invitationCode`, {
	    method: 'POST',
	    body: params,
	});
}

export async function payReceipt(params) {
	return request(`${apiAddress}/game/pmm/betSuccess`, {
	    method: 'POST',
	    body: params,
	});
}
