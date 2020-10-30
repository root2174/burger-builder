import React from 'react'
import {BuildControl, BuildLabel, BuildButton} from '../../../styled/styled-build-controls'

const buildControl = (props) => {
    return (
        <BuildControl>
          <BuildLabel>{props.label}</BuildLabel>
          <BuildButton 
            less
            onClick={props.removeIngredient}
            disabled={props.disabled}>
              Less
          </BuildButton>
          <BuildButton
            more
            onClick={props.addIngredient}>
              More
          </BuildButton>  
        </BuildControl>
    )
}

export default buildControl
