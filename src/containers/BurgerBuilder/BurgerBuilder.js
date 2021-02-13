import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Backdrop from '../../components/UI/Backdrop/Backdrop'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../components/hoc/WithErrorHandler'
import axios from '../../axios-orders'
import { connect } from 'react-redux'
import {
	addIngredient,
	removeIngredient,
	initIngredients
} from '../../store/actions'
class BurgerBuilder extends Component {
	state = {
		purchasing: false
	}

	componentDidMount() {
		this.props.onInitIngredients()
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey]
			})
			.reduce((sum, el) => {
				return sum + el
			}, 0)
		return sum > 0
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true })
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	}

	purchaseContinueHandler = () => {
		this.props.history.push({
			pathname: '/checkout'
		})
	}

	render() {
		const disabledInfo = {
			...this.props.ings
		}

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary = null

		let burger = this.props.error ? (
			<p style={{ textAlign: 'center' }}>Ingredients can't be loaded.</p>
		) : (
			<Spinner />
		)

		if (this.props.ings != null) {
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					totalPrice={this.props.price}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinue={this.purchaseContinueHandler}
				/>
			)

			burger = (
				<>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						addIngredient={this.props.onIngredientAdded}
						removeIngredient={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						price={this.props.price}
						purchasable={this.updatePurchaseState(this.props.ings)}
						ordered={this.purchaseHandler}
					/>
				</>
			)
		}

		return (
			<>
				<Modal show={this.state.purchasing}>{orderSummary}</Modal>
				<Backdrop
					show={this.state.purchasing}
					onClick={this.purchaseCancelHandler}
				/>
				{burger}
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		price: state.totalPrice,
		props: state.error
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(removeIngredient(ingName)),
		onInitIngredients: () => dispatch(initIngredients())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
