export default {
	namespace: 'develop',
	state: {},
    effects: {
    	
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