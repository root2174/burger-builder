import styled from 'styled-components'

const DrawerToggle = styled.div`
    width: 40px;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    box-sizing: border-box;
    cursor: pointer;
    
    @media (min-width: 500px) {
        display: none;
    }
`

export default DrawerToggle