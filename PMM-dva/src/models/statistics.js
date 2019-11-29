import { getStaticticsList } from '../services/serverapi';

export default {
	namespace: 'statistics',
	state: {},
    effects: {
    	*getList(_, { select, call, put }) {
    		const address = yield select(({ index }) => window.getUserInfo(index).address);
    		const list = yield call(getStaticticsList, { address });
    		yield put({
		        type: 'save',
        		payload: {
        			list,
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