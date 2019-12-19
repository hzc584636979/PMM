
export default {

  namespace: 'app',

  state: {
    lang: 'cn'
  },

  effects: {
    *saveUserInfo({ payload={} }, { put }) {
      window.g_setLocalStorage(JSON.stringify(payload))
      yield put({
        type: 'save',
        payload: {
          ...payload,
        }
      })
    },
    *lang({ payload }, { call, put }) { 
      window.Lang = payload.lang;
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
