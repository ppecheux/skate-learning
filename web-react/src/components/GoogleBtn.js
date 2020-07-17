import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import UserContext from '../UserContext';
import { createTokens } from "../auth";
import Cookies from 'universal-cookie';
import { getDbUserCount } from '../model/User'

class GoogleBtn extends Component {

    static contextType = UserContext

    constructor(props) {

        super(props);

        this.state = {
            isLogined: false,
            accessToken: ''
        };
    }

    login = async (response) => {
        console.log(response)
        console.log(response.profileObj)


        const options = {
            method: 'post'
        }

        fetch('/login', options)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        alert('Email not found, please retry')
                    }
                    if (response.status === 401) {
                        alert('Email and password do not match, please retry')
                    }
                } else {
                    console.log(response)
                }
            })

        const { user, setUser } = this.context
        let newUser;
        if (response.accessToken !== undefined) {
            this.setState({
                isLogined: true,
                accessToken: response.accessToken
            });
            newUser = {
                email: response.profileObj.email,
                givenName: response.profileObj.givenName,
                familyName: response.profileObj.familyName,
                count: "TODO"
            }
            const responseDbUser = await getDbUserCount(newUser);
            console.log(await responseDbUser)
            console.log(newUser)
            const { accessToken, refreshToken } = createTokens(newUser);
            const cookies = new Cookies();
            cookies.set("refresh-token", refreshToken);
            cookies.set("access-token", accessToken);
            console.log(cookies.get('refresh-token'));
        }
        console.log(this.state)
        setUser(newUser)
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