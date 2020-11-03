import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Backdrop from '../../components/UI/Backdrop/Backdrop'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../components/hoc/WithErrorHandler'
import axios from '../../axios-orders'

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.6,
    meat: 1.5
};
class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el
        },0)
        this.setState({purchasable: sum > 0})
        console.log(sum)
    }

    addIngredientHandler = (type) => {
        //UPDATE INGREDIENTS
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        
        //UPDATE TOTAL PRICE
        const oldTotalPrice = this.state.totalPrice
        const ingredientPrice = INGREDIENT_PRICE[type]
        const updatedTotalPrice = oldTotalPrice + ingredientPrice

        //CHANGE STATE
        this.setState(
            {
                totalPrice: updatedTotalPrice, 
                ingredients: updatedIngredients
            }           
        )

        //UPDATE PURCHASABLE STATE
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        //UPDATE INGREDIENTS
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount        

        //UPDATE TOTAL PRICE
        const oldPrice = this.state.totalPrice
        const ingredientPrice = INGREDIENT_PRICE[type]
        const updatedPrice = oldPrice - ingredientPrice

        //CHANGE STATE
        this.setState(
            {
                totalPrice: updatedPrice,
                ingredients: updatedIngredients
            }
        )
        //UPDATE PURCHASABLE STATE
        this.updatePurchaseState(updatedIngredients)
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
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
                this.setState({loading: false, purchasing: false})
            })
            .catch(err => {
                console.log(err)
                this.setState({loading: false, purchasing: false})
            })
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = <OrderSummary 
                                ingredients={this.state.ingredients}
                                totalPrice={this.state.totalPrice}
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinue={this.purchaseContinueHandler}/>

        if (this.state.loading) {
            orderSummary = <Spinner/>            
        }

        return (
            <>
                <Modal show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                <Backdrop show={this.state.purchasing} onClick={this.purchaseCancelHandler}/>
                <div>
                   <Burger ingredients={this.state.ingredients}/> 
                </div>
                <div>
                    <BuildControls
                        addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}/>
                </div>

            </>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)
