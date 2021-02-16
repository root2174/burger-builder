import React, { Component } from 'react'
import axios from '../../axios-orders'
import Order from '../../components/Order/Order'
import withErrorHandler from '../../components/hoc/WithErrorHandler'
import { fetchOrders } from '../../store/actions'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
	async componentDidMount() {
		this.props.onFetchOrders()
	}

	render() {
		let orders = <Spinner />
		if (!this.props.loading) {
			orders = (
				<div>
					{this.props.orders.map((order) => (
						<Order
							key={order.id}
							ingredients={order.ingredients}
							price={+order.price}
						/>
					))}
				</div>
			)
		}
		return orders
	}
}

const mapStateToProps = (state) => {
	return {
		orders: state.order.orders,
		loading: state.order.loading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: () => dispatch(fetchOrders())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios))
