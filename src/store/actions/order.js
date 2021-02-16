import {
	PURCHASE_BURGER_SUCCESS,
	PURCHASE_BURGER_FAIL,
	PURCHASE_BURGER_START,
	PURCHASE_INIT,
	FETCH_ORDERS_START,
	FETCH_ORDERS_SUCCESS,
	FETCH_ORDERS_FAIL
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
			dispatch(purchaseBurgerSuccess(res.data.name, orderData))
		} catch (err) {
			dispatch(purchaseBurgerFail(err))
		}
	}
}

export const purchaseInit = () => {
	return {
		type: PURCHASE_INIT
	}
}

export const fetchOrdersSuccess = (orders) => {
	return {
		type: FETCH_ORDERS_SUCCESS,
		orders: orders
	}
}

export const fetchOrdersFail = (err) => {
	return {
		type: FETCH_ORDERS_FAIL,
		err: err
	}
}

export const fetchOrdersStart = () => {
	return {
		type: FETCH_ORDERS_START
	}
}

export const fetchOrders = () => {
	return async (dispatch) => {
		try {
			dispatch(fetchOrdersStart())
			const res = await axios.get('/orders.json')
			const orders = Object.values(res.data).map((order, i) => {
				return { id: Object.keys(res.data)[i], ...order }
			})
			dispatch(fetchOrdersSuccess(orders))
		} catch (err) {
			dispatch(fetchOrdersFail(err))
		}
	}
}
