import { decodeToken } from "../utils/index.js";

export const authenticateUser = async (req, res, next) => {
    //get token from req headers
    const authorization= req.headers?.authorization;

    const token = authorization.split(' ')[1];

    if(!token) return res.status(403).json({message: 'No token found!'});

    //get user info from the cookies
    const user = await decodeToken(token);
    if(!user) return res.status(403).json({message: 'Invalid token! User not authenticated'});

    req.user = user;

    next();
}