import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	SET_INGREDIENTS,
	INIT_INGREDIENTS_FAILED
} from './actionsTypes'
import axios from '../../axios-orders'
// action creators

export const addIngredient = (name) => {
	return {
		ingredientName: name,
		type: ADD_INGREDIENT
	}
}
export const removeIngredient = (name) => {
	return {
		ingredientName: name,
		type: REMOVE_INGREDIENT
	}
}

export const setIngredients = (ingredients) => {
	return {
		type: SET_INGREDIENTS,
		ingredients: ingredients
	}
}

export const initIngredientsFailed = () => {
	return {
		type: INIT_INGREDIENTS_FAILED
	}
}

export const initIngredients = () => {
	return (dispatch) => {
		axios
			.get('ingredients.json')
			.then((response) => {
				dispatch(setIngredients(response.data))
			})
			.catch(() => {
				dispatch(initIngredientsFailed())
			})
	}
}
