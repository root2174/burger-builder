import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import styled, { css } from 'styled-components'
import * as actions from '../../store/actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Form = styled.form`
	margin: auto;
	padding: 3rem;
	width: 50%;
	box-shadow: 0 2px 3px #ccc;
	border: 1px solid #eee;
	box-sizing: border-box;
	position: relative;
`
const FormDiv = styled.div`
	width: 100%;
	padding: 10px;
	box-sizing: border-box;
`
const InputContainer = styled.div`
	margin-bottom: 2rem;
`
const Input = styled.input`
	outline: none;
	border: 1px solid #ccc;
	background-color: white;
	font: inherit;
	padding: 15px 10px;
	box-sizing: border-box;
	width: 100%;
	display: block;

	&:focus {
		outline: none;
		background-color: #ccc;
	}
	${(props) =>
		props.invalid &&
		props.touched &&
		css`
			border: 1px solid red;
			background-color: salmon;
		`}
`

export const Auth = (props) => {
	const [isSignIn, setIsSignIn] = useState(false)

	useEffect(() => {
		if (!props.buildingBurger && props.authRedirectPath !== '/') {
			props.onSetAuthRedirectPath()
		}
	}, [props, props.authRedirectPath, props.buildingBurger])

	const switchMethod = () => {
		setIsSignIn(!isSignIn)
	}
	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: Yup.object({
			email: Yup.string().email().required('Email is required.'),
			password: Yup.string()
				.required('Password is required.')
				.min(6, 'Password should be at least 6 characters long')
		}),
		onSubmit: (values) => {
			props.onAuth(values.email, values.password, isSignIn)
		}
	})
	return (
		<>
			{props.isAuthenticated && <Redirect to={props.authRedirectPath} />}
			{props.loading && <Spinner />}
			{!props.loading && (
				<FormDiv>
					<Form onSubmit={formik.handleSubmit}>
						<InputContainer>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="Email"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.email}
							/>
							{formik.touched.email && formik.errors.email ? (
								<div>{formik.errors.email}</div>
							) : null}
						</InputContainer>
						<InputContainer>
							<Input
								id="password"
								name="password"
								type="password"
								placeholder="Password"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.password}
							/>
							{formik.touched.password && formik.errors.password ? (
								<div>{formik.errors.password}</div>
							) : null}
						</InputContainer>
						<div
							className="buttons-container"
							style={{
								display: 'flex',
								alignContent: 'center',
								flexDirection: 'column'
							}}
						>
							<Button success type="submit">
								SUBMIT
							</Button>
							<Button type="button" danger onClick={switchMethod}>
								SWITCH TO {isSignIn ? 'SIGN UP' : 'SIGN IN'}
							</Button>
							{props.err && (
								<p style={{ color: 'red', fontWeight: 'bold' }}>
									{props.err.message}
								</p>
							)}
						</div>
					</Form>
				</FormDiv>
			)}
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		err: state.auth.err,
		isAuthenticated: state.auth.token !== null,
		buildingBurger: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, isSignIn) =>
			dispatch(actions.auth(email, password, isSignIn)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
