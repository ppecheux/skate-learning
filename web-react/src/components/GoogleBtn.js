import React, { Component, useContext } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import UserContext from '../UserContext';
class GoogleBtn extends Component {

    static contextType = UserContext

    constructor(props) {

        super(props);

        this.state = {
            isLogined: false,
            accessToken: ''
        };
    }


    componentDidMount() {
        const { user, setUser } = this.context

        console.log(user)
    }

    login = (response) => {
        const { user, setUser } = this.context
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

        console.log(setUser)
        console.log(user)
        setUser({ id: response.profileObj.email })
        console.log(user)
    };

    logout = (response) => {
        const { user, setUser } = this.context
        this.setState(state => ({
            isLogined: false,
            accessToken: ''
        }));
        setUser(null)
    }

    handleLoginFailure = (response) => {
        alert('Failed to log in')
    }

    handleLogoutFailure = (response) => {
        alert('Failed to log out')
    }

    render() {

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

export default GoogleBtn;