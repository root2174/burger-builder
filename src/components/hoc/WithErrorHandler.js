import React, { Component } from 'react'

import Modal from '../../components/UI/Modal/Modal'
import Backdrop from '../../components/UI/Backdrop/Backdrop'

const WithErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null
		}

		componentWillMount = () => {
			this.reqInterceptor = axios.interceptors.request.use((request) => {
				this.setState({ error: null })
				return request
			})
			this.resInterceptor = axios.interceptors.response.use(
				(response) => response,
				(error) => {
					this.setState({ error: error })
				}
			)
		}

		componentWillUnmount = () => {
			axios.interceptors.request.eject(this.reqInterceptor)
			axios.interceptors.response.eject(this.resInterceptor)
		}

		errorConfirmedHandler = () => {
			this.setState({ error: null })
		}

		render() {
			return (
				<>
					<Modal show={this.state.error}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
					<Backdrop
						show={this.state.error}
						onClick={this.errorConfirmedHandler}
					/>
				</>
			)
		}
	}
}

export default WithErrorHandler
