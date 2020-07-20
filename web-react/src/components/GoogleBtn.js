import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import UserContext from '../UserContext';
import Cookies from 'universal-cookie';
import gql from 'graphql-tag';
import { client } from '../index'


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
        const { user, setUser } = this.context
        let newUser;
        if (response.accessToken !== undefined) {
            this.setState({
                isLogined: true,
                accessToken: response.accessToken
            });
            const newUser = await client.query({
                query: gql`
                    query getSignIn($tokenId: String!){
                        signInGoogle(tokenId: $tokenId){
                            code,
                            success, 
                            message, 
                            accessToken,
                            refreshToken
                        }
                    }
                    `
                ,
                variables: {
                    tokenId: response.getAuthResponse().id_token
                }
            })
            const cookies = new Cookies();
            cookies.set(
                "refreshToken",
                newUser.data.signInGoogle.refreshToken,
                { expires: new Date(Date.now() + 15 * 60) }
            );
            cookies.set("accessToken", newUser.data.signInGoogle.accessToken, { expires: new Date(Date.now() + 7 * 24 * 60 * 60) });
        }
        console.log(this.state)
        setUser(newUser)
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