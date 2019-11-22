import { getIC } from '../services/serverapi';

export default {

  namespace: 'index',

  state: {
    
  },

  effects: {
    *inviteCode({ payload }, { call }) {
      const inviteCode = yield call(getIC, payload);
      return inviteCode;
    },
    *address({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          address: payload.address
        }
      })
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
