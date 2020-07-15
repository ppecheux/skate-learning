import { sign } from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

export const createTokens = (user) => {
    const refreshToken = sign(
        { userEmail: user.email, count: user.count },
        process.env.REACT_APP_JW_REFRESH_TOKEN_SECRET,
        {
            expiresIn: "7d"
        }
    );
    const accessToken = sign({ userEmail: user.email }, process.env.REACT_APP_JW_ACCESS_TOKEN_SECRET, {
        expiresIn: "15min"
    });

    return { refreshToken, accessToken };
};