import React, { Component } from 'react'
import { Main } from '../../components/styled/styled-basic'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'

class Layout extends Component {
	state = {
		showSideDrawer: false
	}

	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false })
	}

	//DEPENDS ON THE OLD STATE
	sideDrawerToggleHandler = () => {
		this.setState((prevState) => {
			return { showSideDrawer: !prevState.showSideDrawer }
		})
	}

	render() {
		return (
			<>
				<Toolbar
					isAuth={this.props.isAuth}
					drawerToggleClicked={this.sideDrawerToggleHandler}
				/>
				<SideDrawer
					isAuth={this.props.isAuth}
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}
				/>
				<Main showcase>{this.props.children}</Main>
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.token !== null
	}
}

export default connect(mapStateToProps)(Layout)
