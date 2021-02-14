import {
	PURCHASE_BURGER_SUCCESS,
	PURCHASE_BURGER_FAIL,
	PURCHASE_BURGER_START
} from '../actions/actionsTypes'

const initialState = {
	error: false,
	orders: [],
	loading: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case PURCHASE_BURGER_SUCCESS:
			const newOrder = {
				...action.data,
				id: action.id
			}
			return {
				...state,
				loading: false,
				orders: state.orders.concat(newOrder)
			}
		case PURCHASE_BURGER_FAIL:
			return {
				...state,
				loading: false
			}
		case PURCHASE_BURGER_START:
			return {
				...state,
				loading: true
			}
		default:
			return state
	}
}

export default reducer
