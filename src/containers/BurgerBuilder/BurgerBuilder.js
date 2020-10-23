import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'

export default class BurgerBuilder extends Component {

    state = {
        igredients: {
            salad: 1,
            bacon: 2,
            cheese: 1,
            meat: 2
        }
    }

    render() {
        return (
            <>
                <div>
                   <Burger ingredients={this.state.igredients}/> 
                </div>
                <div>
                    Build Controls
                </div>

            </>
        )
    }
}
