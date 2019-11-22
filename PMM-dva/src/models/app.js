
export default {

  namespace: 'app',

  state: {
    lang: 'cn'
  },

  effects: {
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
