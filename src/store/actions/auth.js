import * as actionTypes from './actionsTypes'
import axios from 'axios'

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
}

export const authSuccess = (authData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData: authData
	}
}
export const authFail = (err) => {
	return {
		type: actionTypes.AUTH_FAIL,
		err: err
	}
}

export const auth = (email, password) => {
	return async (dispatch) => {
		const API_KEY = 'AIzaSyCahgtoLYH2Zf7C0wPjeak5NytJSXWzC0I'
		dispatch(authStart())
		try {
			const res = await axios.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
				{
					email,
					password,
					returnSecureToken: true
				}
			)
			console.log(res)
			dispatch(authSuccess(res.data))
		} catch (err) {
			console.log(err)
			dispatch(authFail(err))
		}
	}
}
