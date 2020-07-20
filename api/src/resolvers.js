import { OAuth2Client } from 'google-auth-library';
import { signInDb } from './model/User'
import { createTokens } from "./auth";

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID);

export default ({
    Query: {
        hello: () => 'world',
        signIn: async (obj, { email }, context, info) => {
            return "login user!";
        },
        signInGoogle: async (obj, { tokenId }, context, info) => {
            let ticket = null
            try {
                ticket = await client.verifyIdToken({
                    idToken: tokenId,
                    audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
                });
            } catch (error) {
                return {
                    code: 502,
                    success: false,
                    message: error.message,
                    accessToken: "",
                    refreshToken: ""
                }
            }
            const { email_verified, email, given_name, family_name, picture } = ticket.getPayload();
            if (email_verified) {
                const user = {
                    email: email,
                    given_name: given_name,
                    family_name: family_name,
                    profilePicture: picture
                }

                const dbUser = await signInDb(user);
                const { refreshToken, accessToken } = createTokens({ ...dbUser, ...user })
                return {
                    code: 200,
                    success: true,
                    message: "you are loged in",
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }

            } else {
                return {
                    code: 401,
                    success: false,
                    message: "email could not be verified",
                    accessToken: "",
                    refreshToken: ""
                }
            }
        }
    }
})