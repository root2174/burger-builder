import React, { Component } from 'react'
import styled from 'styled-components'
import Button from '../../components/UI/Button/Button'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import Input from '../../components/UI/Input/Input'
import { connect } from 'react-redux'
import withErrorHandler from '../../components/hoc/WithErrorHandler'
import { purchaseBurger } from '../../store/actions'

const ContactDiv = styled.div`
	margin: 20px auto;
	width: 60%;
	text-align: center;
	box-shadow: 0 2px 3px #ccc;
	border: 1px solid #eee;
	padding: 10px;
	box-sizing: border-box;

	@media (max-width: 600px) {
		width: 500px;
	}
`
class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip Code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{
							value: 'fastest',
							displayValue: 'Fastest'
						},
						{
							value: 'cheapest',
							displayValue: 'Cheapest'
						}
					]
				},
				validation: {},
				value: 'fastest',
				valid: true
			}
		},
		formIsValid: false
	}

	checkValidity = (value, rules) => {
		let isValid = true

		if (rules.required) {
			isValid = value.trim() !== '' && isValid
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.minLength && isValid
		}
		return isValid
	}

	orderHandler = (event) => {
		event.preventDefault()
		const formData = {}
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[
				formElementIdentifier
			].value
		}
		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData,
			userId: this.props.userId
		}

		this.props.onOrderBurger(order, this.props.token)
	}
	inputChangedHandler = (e, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm
		}
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier]
		}
		updatedFormElement.value = e.target.value
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		)
		updatedFormElement.touched = true
		updatedOrderForm[inputIdentifier] = updatedFormElement
		let formIsValid = true
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
		}
		this.setState({
			orderForm: updatedOrderForm,
			formIsValid: formIsValid
		})
	}

	render() {
		const formElementsArray = []
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			})
		}
		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map((formElement) => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						touched={formElement.config.touched}
						onChange={(e) => this.inputChangedHandler(e, formElement.id)}
						invalid={!formElement.config.valid}
					/>
				))}
				<Button order disabled={!this.state.formIsValid} success>
					ORDER
				</Button>
			</form>
		)
		if (this.props.loading) form = <Spinner />
		return (
			<ContactDiv>
				<h4>Enter your Contact Data</h4>
				{form}
			</ContactDiv>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onOrderBurger: (orderData, token) =>
			dispatch(purchaseBurger(orderData, token))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(ContactData, axios))
