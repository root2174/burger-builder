import React from 'react'
import styled from 'styled-components'

const Order = (props) => {
  const Div = styled.div`
    width: 100%;
    border: 1px solid #ccc;
    box-shadow: 0 2px 3px #ccc;
    padding: 10px;
    margin: 10px auto;
    box-sizing: border-box;

  `
  return (
    <Div>
      <p>Ingredients: </p>
      <p>Price: <strong>USD 5.45</strong></p>
    </Div>
  )
}

export default Order
