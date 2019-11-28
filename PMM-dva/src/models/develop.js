import { getIC } from '../services/serverapi';

export default {
	namespace: 'develop',
	state: {},
    effects: {
    	*inviteCode({ payload }, { call }) {
	      const data = yield call(getIC, payload);
	      return data.data;
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