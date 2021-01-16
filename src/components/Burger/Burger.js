import React from 'react'
import Burger from '../styled/styled-burger'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {

    //Changing an Object into an Array of burger ingredients
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_,i) => {
                return <BurgerIngredient key={igKey+i} type={igKey} />
            });
    })
    .reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Start adding ingredients!</p>
    }

    return (
        <Burger>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </Burger>
    )
};

export default burger;

