import { getAllTransactionList, getMyTransactionList } from '../services/serverapi';

export default {
	namespace: 'record',
	state: {},
    effects: {
    	*getAll(_, { select, call, put }) {
    		const list = yield call(getAllTransactionList);
    		yield put({
		        type: 'save',
        		payload: {
        			all: list,
        		},
		    });
	    },
	    *getMy(_, { select, call, put }) {
    		const address = yield select(({ index }) => window.getUserInfo(index).address);
    		const list = yield call(getMyTransactionList, { address });
    		yield put({
		        type: 'save',
        		payload: {
        			my: list,
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