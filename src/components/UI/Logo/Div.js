import styled, { css } from 'styled-components'

const Div = styled.div`
    background-color: white;
    padding: 8px;
    height: 100%;
    box-sizing: border-box;
    border-radius: 5px;

    ${props => props.DesktopOnly && css`  
        @media screen and (max-width: 500px) {
            display: none;
        }
    `}
`

export default Div