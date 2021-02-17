import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Button from '../../components/UI/Button/Button'
import styled, { css } from 'styled-components'
import * as actions from '../../store/actions'
import { connect } from 'react-redux'

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
			props.onAuth(values.email, values.password)
		}
	})
	return (
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
				<Button
					success
					style={{
						padding: '0',
						margin: 'auto',
						position: 'absolute',
						right: '50%'
					}}
					type="submit"
				>
					SUBMIT
				</Button>
			</Form>
		</FormDiv>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password) => dispatch(actions.auth(email, password))
	}
}

export default connect(null, mapDispatchToProps)(Auth)
