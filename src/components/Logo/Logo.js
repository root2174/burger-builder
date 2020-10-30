import React from 'react'
import burgerLogo from '../../assets/images/burger-logo.png'
import Div from '../UI/Logo/Div'
import Img from '../UI/Logo/Img'

const logo = (props) => {
    return (
        <Div DesktopOnly={props.DesktopOnly} style={{height: props.height}}>
            <Img src={burgerLogo} alt="MyBurger Logo" />
        </Div>
    )
}

export default logo
