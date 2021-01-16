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
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        axios.get('ingredients.json')
            .then((response) => {
                this.setState({ingredients: response.data})
            })
            .catch (
                (error) => {
                    this.setState({error: error})
                }
            )
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
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`)
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null

        let burger = this.state.error ? 
        <p style={{textAlign: 'center'}}>Ingredients can't be loaded.</p> 
        : <Spinner/>

        if (this.state.ingredients != null) {

            orderSummary = <OrderSummary 
                            ingredients={this.state.ingredients}
                            totalPrice={this.state.totalPrice}
                            purchaseCancelled={this.purchaseCancelHandler}
                            purchaseContinue={this.purchaseContinueHandler}/>

            burger = ( <>
                            <Burger ingredients={this.state.ingredients}/> 
                            <BuildControls
                                addIngredient={this.addIngredientHandler}
                                removeIngredient={this.removeIngredientHandler}
                                disabled={disabledInfo}
                                price={this.state.totalPrice}
                                purchasable={this.state.purchasable}
                                ordered={this.purchaseHandler}/>
                        </>)
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>            
        }

        return (
            <>
                <Modal show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                <Backdrop show={this.state.purchasing} onClick={this.purchaseCancelHandler}/> 
                {burger}

            </>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)
