import { sign } from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

export const createTokens = (user) => {
    console.log(user)
    const refreshToken = sign(
        { userEmail: user.email, count: user.count },
        process.env.JW_REFRESH_TOKEN_SECRET,
        {
            expiresIn: "7d"
        }
    );
    const accessToken = sign({ userEmail: user.email }, process.env.JW_ACCESS_TOKEN_SECRET, {
        expiresIn: "15min"
    });
    console.log(accessToken)

    return { refreshToken, accessToken };
};