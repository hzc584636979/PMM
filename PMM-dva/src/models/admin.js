import { getAdminList } from '../services/serverapi';

export default {
	namespace: 'admin',
	state: {
		user_self: {},
		user_next_level: [],
	},
    effects: {
    	*item({ payload }, { select, call, put }) {
    		const walletAddress = yield select(({ index }) => window.getUserInfo(index).address);
    		const data = yield call(getAdminList, { walletAddress });
    		yield put({
		        type: 'save',
        		payload: {
        			data: data.data || {},
        		},
		    });
	    },
    },
	reducers: {
		save(state, action) {
			return {
				...state,
				...action.payload.data
			};
		}
	},
};