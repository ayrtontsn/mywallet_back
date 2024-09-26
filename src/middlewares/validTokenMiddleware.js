import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';

export function validateToken(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        const token = authorization?.replace("Bearer ", "");
        const secretkey = process.env.JWT_SECRET;

        const userData = jwt.verify(token, secretkey);

        res.locals.user = userData

        next()
    } catch (error) {
        return res.sendStatus(httpStatus.UNAUTHORIZED)
    }
}