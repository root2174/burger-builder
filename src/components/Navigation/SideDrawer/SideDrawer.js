import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../../Navigation/Items/Items'
import SideDrawer from '../../UI/Navigation/SideDrawer/SideDrawer'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {
	return (
		<>
			<Backdrop show={props.open} onClick={props.closed} />
			<SideDrawer open={props.open} close={!props.open} onClick={props.closed}>
				<Logo height="11%" />
				<nav>
					<NavigationItems
						style={{ marginTop: '20px' }}
						isAuthenticated={props.isAuth}
					/>
				</nav>
			</SideDrawer>
		</>
	)
}

export default sideDrawer
