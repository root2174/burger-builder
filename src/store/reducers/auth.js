import * as actionTypes from '../actions/actionsTypes'

const initialState = {
	token: null,
	userId: null,
	err: null,
	loading: false
}

const authStart = (state, action) => {
	return {
		...state,
		err: null,
		loading: true
	}
}

const authSuccess = (state, action) => {
	console.log(action.idToken, action.userId)
	return {
		...state,
		idToken: action.idToken,
		userId: action.userId,
		err: null,
		loading: false
	}
}

const authFail = (state, action) => {
	return {
		...state,
		err: action.err,
		loading: false
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state, action)
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action)
		case actionTypes.AUTH_FAIL:
			return authFail(state, action)
		default:
			return state
	}
}

export default reducer
