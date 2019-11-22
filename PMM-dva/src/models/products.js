import { getAllTransactionList, getMyTransactionList } from '../services/serverapi';

export default {
	namespace: 'products',
	state: [],
    effects: {
    	*getAll(_, { select, call, put }) {
    		const list = yield call(getAllTransactionList);
    		yield put({
		        type: 'save',
        		payload: list,
		    });
	    },
	    *getMy(_, { select, call, put }) {
    		const address = yield select(({ index }) => index.address)
    		const list = yield call(getMyTransactionList, { address });
    		yield put({
		        type: 'save',
        		payload: list,
		    });
	    },
    },
	reducers: {
		save(state, action) {
			return action.payload;
		}
	},
};