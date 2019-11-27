import { getIC } from '../services/serverapi';

export default {

  namespace: 'index',

  state: {
    lang: 'cn'
  },

  effects: {
    *inviteCode({ payload }, { call }) {
      const data = yield call(getIC, payload);
      return data.data;
    },
    *address({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          ...payload,
        }
      })
    },
    *lang({ payload }, { call, put }) { 
      yield put({ 
        type: 'save', 
        payload: {
          lang: payload.lang
        }
      });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
