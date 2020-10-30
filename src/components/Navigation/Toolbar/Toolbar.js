import React from 'react'
import Header from '../../UI/Navigation/Toolbar/Header'
import Nav from '../../UI/Navigation/Toolbar/Nav'
import Logo from '../../Logo/Logo'
import NavigationItems from '../../Navigation/Items/Items'
import DrawerToggle from '../../UI/Navigation/SideDrawer/DrawerToggle'
import Line from '../../UI/Navigation/SideDrawer/Line'

const toolbar = (props) => {
    return (
        <Header>
            <DrawerToggle onClick={props.drawerToggleClicked}>
                <Line/>
                <Line/>
                <Line/>
            </DrawerToggle>
            <Logo DesktopOnly height="80%"/>
            <Nav>
                <NavigationItems DesktopOnly/>
            </Nav>            
        </Header>
    )
}

export default toolbar
