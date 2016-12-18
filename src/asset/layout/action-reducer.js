// action
export const actionList = {
	layoutAction() {	
		return {
			type: 'increase',
			payload: 'something useless'
		}
	},
	layoutAsync() {}
}

// reducer
export const reducerList = {
	layoutReducer(state = {count: 0}, action) {
		const count = state.count
		switch (action.type) {
			case 'increase':
				return {count: count + 1}
			default:
				return state
		}
	}
}

// export {action, reducer}