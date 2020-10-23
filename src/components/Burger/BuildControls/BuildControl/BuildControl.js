import React from 'react'
import {BuildControl, BuildLabel, BuildButton} from '../../../styled/styled-build-controls'

const buildControl = (props) => {
    return (
        <BuildControl>
          <BuildLabel>{props.label}</BuildLabel>
          <BuildButton less>Less</BuildButton>
          <BuildButton more>More</BuildButton>  
        </BuildControl>
    )
}

export default buildControl
