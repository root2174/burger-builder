import React from 'react'
import { Main } from '../styled/styled-basic'

const layout = (props) => {
    return(
    <>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <Main showcase>
            {props.children}
        </Main>
    </>
    )
}

export default layout;