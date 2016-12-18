// action
const actionList = {
	increase() {
		return {
			type: 'increase',
			addend: 1 
		}
	},
	decrease() {
		return {
			type: 'decrease',
			subtrahend: 1
		}
	},
	userInfo() {
		return {
			type: 'userInfo',
			userInfo: {
				name: 'shifeng',
				age: 23
			}
		}
	},
	onIncreaseClick() {
		// 当这个函数执行时会经过
		return (dispatch, getState) => {
			dispatch(actionList.increase())
		}
	},
	onDecreaseClick() {
		return (dispatch, getState) => {
			dispatch(actionList.decrease())
		}
	},
	getUserInfo() {
		return (dispatch, getState) => {
			dispatch(actionList.userInfo())
		}
	}
}

// reducer
const reducerList = {
	state(state = initialState, action) {
		switch (action.type) {
			case 'increase':
				return {...state, count: state.count + 1}
			case 'decrease':
				return {...state, count: state.count - 1}
			case 'userInfo':
				return {...state, userInfo: action.userInfo}
			default:
				return state
		}
	}
}

var initialState = {
	count: 0,
	userInfo: {
		name: '',
		dept: ''
	}

}

export {actionList, reducerList}
