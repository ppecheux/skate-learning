import { sign } from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

export const createTokens = (user) => {
  const refreshToken = sign(
    { userId: user.id, count: user.count },
    process.env.JW_REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d"
    }
  );
  const accessToken = sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "15min"
  });
  return { refreshToken, accessToken };
};