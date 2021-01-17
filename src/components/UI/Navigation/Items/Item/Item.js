import styled, {css} from 'styled-components'
import {NavLink} from 'react-router-dom'

export const NavList = styled.li`
    margin: 10px 0;
    box-sizing: border-box;
    display: block;
    width: 100%;

    @media (min-width:500px){
        margin: 0;
        display: flex;
        height: 100%;
        align-items: center;
    }
    
`
const activeClassName = 'nav-item-active'
export const Link = styled(NavLink).attrs({ activeClassName })`
    color: #8F5C2C;
    text-decoration: none;
    width: 100%;
    box-sizing: border-box;
    display: block;

    &:hover, &.${activeClassName} {
        color: #40A4C8;
    }
    
    @media (min-width:500px){
        color: white;
        height: 100%;
        padding: 16px 10px;
        border-bottom: 4px solid transparent;

        &:hover, &.${activeClassName} {
            background-color: #8F5C2C;
            border-bottom: 4px solid #40A4C8;
            color: white;
        }

        ${props => props.active &&
            css`
                background-color: #8F5C2C;
                border-bottom: 4px solid #40A4C8;
                color: white; 
            `
        }
    }
`

