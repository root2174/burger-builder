import {
	PURCHASE_BURGER_SUCCESS,
	PURCHASE_BURGER_FAIL,
	PURCHASE_BURGER_START
} from './actionsTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: PURCHASE_BURGER_SUCCESS,
		id: id,
		data: orderData
	}
}
export const purchaseBurgerFail = (err) => {
	return {
		type: PURCHASE_BURGER_FAIL,
		err: err
	}
}

export const purchaseBurgerStart = () => {
	return {
		type: PURCHASE_BURGER_START
	}
}

export const purchaseBurger = (orderData) => {
	return async (dispatch) => {
		try {
			dispatch(purchaseBurgerStart())
			const res = await axios.post('/orders.json', orderData)
			dispatch(purchaseBurgerSuccess(res.data, orderData))
		} catch (err) {
			dispatch(purchaseBurgerFail(err))
		}
	}
}
