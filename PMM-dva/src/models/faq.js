import { getAdminList } from '../services/serverapi';

export default {
	namespace: 'faq',
	state: {
		sup: [],
		sub: [],
	},
    effects: {
    	*item({ payload }, { select, call, put }) {
    		const list = yield call(getAdminList, payload);
    		yield put({
		        type: 'save',
        		payload: {
        			...list,
        		},
		    });
	    },
    },
	reducers: {
		save(state, action) {
			return {
				...state,
				...action.payload
			};
		}
	},
};