import { getAllTransactionList, getMyTransactionList } from '../services/serverapi';

export default {
	namespace: 'record',
	state: {
		all: [],
		my: [],
	},
    effects: {
    	*getAll({ payload }, { select, call, put }) {
    		const data = yield call(getAllTransactionList, payload);
    		yield put({
		        type: 'saveAll',
        		payload: {
        			all: data.data || [],
        		},
		    });
		    return data.data || [];
	    },
	    *getMy({ payload }, { select, call, put }) {
    		const walletAddress = yield select(({ index }) => window.getUserInfo(index).address);
    		const data = yield call(getMyTransactionList, { walletAddress, ...payload });
    		yield put({
		        type: 'saveMy',
        		payload: {
        			my: data.data || [],
        			init: payload.init
        		},
		    });
		    return data.data || [];
	    },
    },
	reducers: {
		saveAll(state, action) {
			return {
				...state,
				all: [
					...state.all,
					...action.payload.all,
				]
			};
		},
		saveMy(state, action) {
			let data;
			action.payload.init ? 
				data = { 
					...state, 
					all: [],
					my: [
						...action.payload.my
					], 
				}
			:
				data = {
					...state,
					my: [
						...state.my,
						...action.payload.my,
					]
				}

			return data;
		},
	},
};