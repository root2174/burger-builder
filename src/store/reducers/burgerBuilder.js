import {
	ADD_INGREDIENT,
	INIT_INGREDIENTS_FAILED,
	REMOVE_INGREDIENT,
	SET_INGREDIENTS
} from '../actions/actionsTypes'

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false
}

const INGREDIENT_PRICE = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.6,
	meat: 1.5
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
			}
		case REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
			}
		case SET_INGREDIENTS:
			return {
				...state,
				error: false,
				totalPrice: 4,
				ingredients: action.ingredients
			}
		case INIT_INGREDIENTS_FAILED:
			return {
				...state,
				error: true
			}
		default:
			return state
	}
}

export default reducer
