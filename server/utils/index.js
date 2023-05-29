import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

//generate jwt token from a payload data
export const generateToken = async (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}

//decode a jwt token and get the actual data
export const decodeToken = async (token) => {
    const payload = jwt.decode(token, process.env.JWT_SECRET);
    return payload;
}

//hash password from user string password
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}

//verify if the password from a user is correct
export const verifyPassword = async (password, hashed) => {
    const isVerified = await bcrypt.compare(password, hashed);
    return isVerified;
}