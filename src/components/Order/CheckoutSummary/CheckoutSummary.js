import React from 'react'
import styled from 'styled-components'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

const CheckoutSummary = (props) => {
  const BurgerDiv = styled.div`
    width: 300px;
    height: 300px;
    margin: auto;
    margin-bottom: 150px;
  `
  const Div = styled.div`
    text-align: center;
    width: 80%;
    margin: auto;

    @media (min-width: 600px) {
      width: 500px;
    }
  `

  return (
    <Div>
      <h1>We hope it tastes well!</h1>
      <BurgerDiv>
        <Burger ingredients={props.ingredients}/>
      </BurgerDiv>
      <Button danger onClick={props.onClick}>CANCEL</Button>
      <Button sucess>CONTINUE</Button>
    </Div>
  )
}

export default CheckoutSummary
