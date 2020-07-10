import React, { Component, useContext } from 'react'
import ReactDOM from 'react-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { UserContext } from '../UserContext';
import { withUserContext } from '../UserContext';
class GoogleBtn extends Component {

    constructor(props) {

        super(props);


        this.state = {
            isLogined: false,
            accessToken: ''
        };
    }


    componentDidMount() {
        console.log(this.props.userProvider.user)
    }

    login = (response) => {
        console.log(response)
        console.log(response.profileObj)
        if (response.accessToken !== undefined) {
            this.setState({
                isLogined: true,
                accessToken: response.accessToken
            });
        }
        console.log(this.state)
        console.log(response.profileObj.email)

        console.log(this.props.userProvider.setUser)
        console.log(this.props.userProvider.user)
        this.props.userProvider.setUser({ id: response.profileObj.email })
        console.log(this.props.userProvider.user)
    };

    logout = (response) => {
        this.setState(state => ({
            isLogined: false,
            accessToken: ''
        }));
        this.props.userProvider.setUser(null)
    }

    handleLoginFailure = (response) => {
        alert('Failed to log in')
    }

    handleLogoutFailure = (response) => {
        alert('Failed to log out')
    }

    render() {
        console.log(this.props.userProvider.user)

        return (
            <div>

                {this.state.isLogined ?
                    <GoogleLogout
                        clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}
                        buttonText='Logout'
                        onLogoutSuccess={this.logout}
                        onFailure={this.handleLogoutFailure}
                    >
                    </GoogleLogout> : <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}
                        buttonText='Login'
                        onSuccess={this.login}
                        onFailure={this.handleLoginFailure}
                        cookiePolicy={'single_host_origin'}
                        responseType='code,token'
                    />
                }
                {this.state.accessToken ? <h5>Your Access Token: <br /><br /> {this.state.accessToken}</h5> : null}

            </div>
        )
    }
}

export default withUserContext(GoogleBtn);