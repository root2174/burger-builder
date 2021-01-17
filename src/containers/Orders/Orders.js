import React, { Component } from 'react'
import axios from '../../axios-orders'
import Order from '../../components/Order/Order'
import withErrorHandler from '../../components/hoc/WithErrorHandler'

class Orders extends Component {

  state = {
    orders: [],
    loading: true
  }

  async componentDidMount() {
    try{
      const res = await axios.get('/orders.json')
      const orders = Object.values(res.data).map((order, i) => {
        return { id: Object.keys(res.data)[i], ...order }
      })
      this.setState({ loading: false, orders: orders})
    } catch (err) {
      this.setState({ loading: false })
    }
  }

  render() {
    return (
      <div>
        {
          this.state.orders.map(order => (
            <Order 
              key={order.id}
              ingredients={order.ingredients}
              price={+order.price}
            />
          ))
        }        
      </div>
    )
  }
}

export default withErrorHandler(Orders, axios)