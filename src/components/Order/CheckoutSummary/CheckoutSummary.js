import React from 'react'
import styled from 'styled-components'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

  const BurgerDiv = styled.div`
    width: 700px;
    height: 450px;
    margin: auto;
    margin-bottom: 10px;
    overflow: auto;
  `
  const Div = styled.div`
    text-align: center;
    width: 80%;
    margin: auto;

    @media (min-width: 600px) {
      width: 500px;
    }
  `
const CheckoutSummary = (props) => {

  return (
    <Div>
      <h1>We hope it tastes well!</h1>
      <BurgerDiv>
        <Burger ingredients={props.ingredients}/>
      </BurgerDiv>
      <Button danger onClick={props.checkoutCancelled}>CANCEL</Button>
      <Button sucess onClick={props.checkoutContinued}>CONTINUE</Button>
    </Div>
  )
}

export default CheckoutSummary
