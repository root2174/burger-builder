import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';

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
`;
export default class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Name',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip Code',
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
				},
				valid: false,
				touched: false,
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{
							value: 'fastest',
							displayValue: 'Fastest',
						},
						{
							value: 'cheapest',
							displayValue: 'Cheapest',
						},
					],
				},
				value: '',
				valid: true,
			},
		},
		loading: false,
		formIsValid: false,
	};

	checkValidity = (value, rules) => {
		let isValid = true;

		if (rules) {
			if (rules.required) {
				isValid = value.trim() !== '' && isValid;
			}

			if (rules.minLength) {
				isValid = value.length >= rules.minLength && isValid;
			}

			if (rules.maxLength) {
				isValid = value.length <= rules.minLength && isValid;
			}
		}
		return isValid;
	};

	orderHandler = (event) => {
		event.preventDefault();
		console.log(this.props.ingredients);
		this.setState({ loading: true });
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[
				formElementIdentifier
			].value;
		}
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData,
		};
		axios
			.post('/orders.json', order)
			.then((response) => {
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch((err) => {
				console.log(err);
				this.setState({ loading: false });
			});
	};
	inputChangedHandler = (e, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm,
		};
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier],
		};
		updatedFormElement.value = e.target.value;
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);
		updatedFormElement.touched = true;
		updatedOrderForm[inputIdentifier] = updatedFormElement;
		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid =
				updatedOrderForm[inputIdentifier].valid && formIsValid;
		}
		this.setState({
			orderForm: updatedOrderForm,
			formIsValid: formIsValid,
		});
		console.log(this.state.formIsValid);
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key],
			});
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
						onChange={(e) =>
							this.inputChangedHandler(e, formElement.id)
						}
						invalid={!formElement.config.valid}
					/>
				))}
				<Button order disabled={!this.state.formIsValid} success>
					ORDER
				</Button>
			</form>
		);
		if (this.state.loading) form = <Spinner />;
		return (
			<ContactDiv>
				<h4>Enter your Contact Data</h4>
				{form}
			</ContactDiv>
		);
	}
}
