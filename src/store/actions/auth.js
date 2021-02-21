import * as actionTypes from './actionsTypes'
import axios from 'axios'

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
}

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId
	}
}
export const authFail = (err) => {
	return {
		type: actionTypes.AUTH_FAIL,
		err: err
	}
}

export const auth = (email, password, isSignIn) => {
	return async (dispatch) => {
		const API_KEY = 'AIzaSyCahgtoLYH2Zf7C0wPjeak5NytJSXWzC0I'
		let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`

		if (!isSignIn)
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
		dispatch(authStart())
		try {
			const res = await axios.post(url, {
				email,
				password,
				returnSecureToken: true
			})
			console.log(res)
			dispatch(authSuccess(res.data.idToken, res.data.localId))
		} catch (err) {
			console.log(err)
			dispatch(authFail(err))
		}
	}
}
