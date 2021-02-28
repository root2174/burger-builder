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
		token: token,
		userId: userId
	}
}
export const authFail = (err) => {
	return {
		type: actionTypes.AUTH_FAIL,
		err: err
	}
}

export const logout = () => {
	localStorage.removeItem('token')
	localStorage.removeItem('expirationTime')
	localStorage.removeItem('userId')
	return {
		type: actionTypes.AUTH_LOGOUT
	}
}

export const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout())
		}, expirationTime * 1000)
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
			const expirationDate = new Date(
				new Date().getTime() + res.data.expiresIn * 1000
			)
			localStorage.setItem('token', res.data.idToken)
			localStorage.setItem('expirationDate', expirationDate)
			localStorage.setItem('userId', res.data.localId)
			dispatch(authSuccess(res.data.idToken, res.data.localId))
			dispatch(checkAuthTimeout(res.data.expiresIn))
		} catch (err) {
			dispatch(authFail(err.response.data.error))
		}
	}
}

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path
	}
}

export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem('token')
		if (!token) {
			dispatch(logout())
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'))
			if (expirationDate <= new Date()) {
				dispatch(logout())
			} else {
				const userId = localStorage.getItem('userId')
				dispatch(authSuccess(token, userId))
				dispatch(
					checkAuthTimeout(
						(expirationDate.getTime() - new Date().getTime()) / 1000
					)
				)
			}
		}
	}
}
