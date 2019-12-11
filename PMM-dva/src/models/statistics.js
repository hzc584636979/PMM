import { getStaticticsList } from '../services/serverapi';

export default {
	namespace: 'statistics',
	state: {},
    effects: {
    	*getList(_, { select, call, put }) {
    		const walletAddress = yield select(({ index }) => window.getUserInfo(index).address);
    		const data = yield call(getStaticticsList, { walletAddress });
    		yield put({
		        type: 'save',
        		payload: data.data || {},
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