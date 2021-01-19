import React, { Component } from 'react'
import styled from 'styled-components'
import Button from '../../components/UI/Button/Button'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import Input from '../../components/UI/Input/Input'

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
export default class ContactData extends Component {

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name'
        }
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        }
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        }
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        }
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        }
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
            },
        ]
        }
      }
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
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value}
          />
        ))}
        <Button success onClick={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) form = <Spinner />
    return (
      <ContactDiv>
        <h4>Enter your Contact Data</h4>
        { form }
      </ContactDiv>
    )
  }
}
