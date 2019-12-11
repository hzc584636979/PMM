import { getIC, payReceipt } from '../services/serverapi';

export default {
	namespace: 'develop',
	state: {},
    effects: {
    	*inviteCode({ payload }, { call }) {
	      const data = yield call(getIC, payload);
	      return data.data.invitationCode;
	    },
	    *receipt({ payload }, { call }) {
	      yield call(payReceipt, payload);
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