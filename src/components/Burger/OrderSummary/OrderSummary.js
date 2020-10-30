import React,{ Component } from 'react'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {  

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(key => {
            return ( 
                <li key={key}>
                    <span style={{textTransform:'capitalize'}}>{key}</span>:
                    {this.props.ingredients[key]}
                </li>
                )
        })

        return (
            <>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>
                    <strong>
                        Grand total of: ${this.props.totalPrice.toFixed(2)}
                    </strong>
                </p>
                <p>Continue to Checkout?</p>
                <Button danger onClick={this.props.purchaseCancelled}>CANCEL</Button>
                <Button success onClick={this.props.purchaseContinue}>CONTINUE</Button>
            </>
        )
    }
    
}

export default OrderSummary
