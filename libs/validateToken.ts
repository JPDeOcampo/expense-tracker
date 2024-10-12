import * as jose from "jose";
import * as cookie from 'cookie';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export const validateToken = async (request: Request) => {
  const cookies = request.headers.get("cookie");
  if (!cookies) {
    return { error: { message: "No authentication token", status: 401 } };
  }

  const { token } = cookie.parse(cookies || "");
  if (!token) {
    return { error: { message: "Token not found", status: 401 } };
  }

  try {
    const { payload } = await jose.jwtVerify(token, SECRET_KEY);
    const userId = payload.id;
    
    if (!userId) {
      return { error: { message: "Invalid token", status: 401 } };
    }
    
    return { userId };
  } catch (err) {
    return { error: { message: "Token verification failed", status: 401 } };
  }
};