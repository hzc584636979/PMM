export default {

  namespace: 'index',

  state: {

  },

  effects: {
    
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
