import React from 'react'
import NavItems from '../../UI/Navigation/Items/Items'
import NavItem from './Item/Item'

const Items = (props) => {
	return (
		<NavItems style={props.style} DesktopOnly={props.DesktopOnly}>
			<NavItem link={'/'} exact>
				Burger Builder
			</NavItem>
			{props.isAuthenticated && <NavItem link={'/orders'}>Orders</NavItem>}
			{props.isAuthenticated ? (
				<NavItem link={'/logout'}>Logout</NavItem>
			) : (
				<NavItem link={'/auth'}>Authenticate</NavItem>
			)}
		</NavItems>
	)
}

export default Items
