import React from 'react'
import NavItems from '../../UI/Navigation/Items/Items'
import NavItem from './Item/Item'

const Items = (props) => {
    return (
        <NavItems style={props.style} DesktopOnly={props.DesktopOnly}>
            <NavItem link={"/"} exact>Burger Builder</NavItem>
            <NavItem link={"/orders"}>Orders</NavItem>
        </NavItems>
    )
}

export default Items
