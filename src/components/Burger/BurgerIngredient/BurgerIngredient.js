import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Ingredient } from '../../styled/styled-ingredients';

export default class BurgerIngredient extends Component {

    render() {
        let ingredient = null;

        switch (this.props.type) {
            case ('bread-bottom'):
                ingredient = <Ingredient breadBottom/>
                break;
    
            case ('bread-top'):
                ingredient = (
                    <Ingredient breadTop>
                        <Ingredient seeds1/>
                        <Ingredient seeds2/>
                    </Ingredient>
                )
                break;
    
            case ('meat'):
                ingredient = <Ingredient meat/>
                break;
    
            case ('cheese'):
                ingredient = <Ingredient cheese/>
                break;
    
            case ('salad'):
                ingredient = <Ingredient salad/>
                break;
    
            case ('bacon'):
                ingredient = <Ingredient bacon/>
                break;
    
            default:
                ingredient = null;
        }
        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}
