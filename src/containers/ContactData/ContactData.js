import React, { Component } from 'react'
import styled from 'styled-components'
import Button from '../../components/UI/Button/Button'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'

export default class ContactData extends Component {
  ContactDiv = styled.div`
  margin: 20px auto;
  width: 80%;
  text-align: center;
  box-shadow: 0 2px 3px #ccc;
  border: 1px solid #eee;
  padding: 10px;
  box-sizing: border-box;

  @media (min-width: 600px) {
    width: 500px;
  }
`

  Input = styled.input`
    display: block;
  `

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault()
    console.log(this.props.ingredients)
    this.setState({ loading: true })
    const order = {
        ingredients: this.props.ingredients,
        price: this.state.totalPrice,
        customer: {
            name: 'Lucas Magalhães',
            address: {
                street: '21th Jump Street',
                zipCode: '99999',
                country: 'USA'
            },
            email: 'lucas@gmail.com'
        },
        deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
        .then(response => {
            this.setState({ loading: false })
            this.props.history.push('/')
        })
        .catch(err => {
            console.log(err)
            this.setState({ loading: false })
        })
  }

  render() {
    let form = (
      <form>
        <this.Input type="text" name="name" placeholder="Your name" />
        <this.Input type="email" name="email" placeholder="Your email" />
        <this.Input type="text" name="street" placeholder="Your street" />
        <this.Input type="text" name="postal" placeholder="Your postal code" />
        <Button success onClick={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) form = <Spinner />
    return (
      <this.ContactDiv>
        <h4>Enter your Contact Data</h4>
        { form }
      </this.ContactDiv>
    )
  }
}
