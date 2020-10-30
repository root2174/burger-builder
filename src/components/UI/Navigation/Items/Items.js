import styled, { css } from 'styled-components'

const NavItems = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: left;
    height: 100%;
    ${props => 
        props.DesktopOnly && 
        css`
            display: none;
        `
    }

    @media (min-width:500px) {
        flex-direction: row;
        align-items: center;

        ${props => 
        props.DesktopOnly && 
        css`
            display: flex;
            flex-direction: row;
        `
        }
    }

    
`

export default NavItems