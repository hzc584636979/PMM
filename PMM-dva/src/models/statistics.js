export default {
	namespace: 'statistics',
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