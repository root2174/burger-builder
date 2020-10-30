import styled, { css, keyframes } from 'styled-components'

//ORDER ANIMATION
const orderButtonActiveAnimation = keyframes`
    0% {
        transform: scale(1);
    }
    60% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
`

const Button = styled.button` 

    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font: inherit;
    padding: 10px;
    margin: 10px;
    font-weight: bold;

    //ORDER BUTTON
    ${props =>
        props.order &&
        css`
            background-color: #DAD735;
            border: 1px solid #966909;
            color: #966909;
            font-family: inherit;
            font-size: 1.2em;
            padding: 15px 30px;
            box-shadow: 2px 2px 2px #966909;

            &:hover, &:active {
                background-color: #A0DB41;
                border: 1px solid #966909;
                color: #966909;
            }

            &:disabled {
                background-color: #C7C6C6;
                cursor: not-allowed;
                border: 1px solid #ccc;
                color: #888888;
            }

            &:not(:disabled) {
                animation: 0.3s ${orderButtonActiveAnimation} linear;
            }
        `
    }

    ${props =>
        props.success &&
        css`
            color: #5C9210
    `}

    ${props =>
        props.danger &&
        css`
            color: #944317
    `}
`

export default Button
