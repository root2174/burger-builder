import React, { Component } from 'react'

import Modal from '../../components/UI/Modal/Modal'
import Backdrop from '../../components/UI/Backdrop/Backdrop'


const WithErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {

        state = {
            error: null
        }

        componentDidMount = () => {
            axios.interceptors.request.use(request => {
                this.setState({error:null})
                return request
            })
            axios.interceptors.response.use( response => response, error => {
                this.setState({error: error})
            })
        }

        errorConfirmedHandler = () => {
            this.setState({error:null})
        }

        render () {
            return (
                <>
                    <Modal show={this.state.error}> 
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                    <Backdrop show={this.state.error}
                     onClick={this.errorConfirmedHandler}/>
                </>
            )
        }
    }
}

export default WithErrorHandler
