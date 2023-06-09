import jwt from 'jsonwebtoken';
import { MongoServerError } from 'mongodb';
import config from './config.js';
export const auth = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'NO_TOKEN' });
    }
    token = token.split(' ')[1];
    try {
        req.payload = jwt.verify(token, config.SECRET);
        next();
    }
    catch (e) {
        return next(new Error('INVALID_CREDENTIALS'));
    }
};
export const errorHandler = (err, req, res, next) => {
    if (err.message === 'NO_TOKEN')
        return res.status(401).json({ error: 'NO_TOKEN' });
    if (err.message === 'INVALID_CREDENTIALS')
        return res.status(403).json({ error: 'INVALID_CREDENTIALS' });
    if (err.message === 'NOT_FOUND')
        return res.status(404).json({ error: 'NOT_FOUND' });
    if (err.message === 'INVALID_PASSWORD')
        return res.status(422).json({ error: 'INVALID_PASSWORD' });
    if (err.message === 'NOT_AUTHORIZED')
        return res.status(401).json({ error: 'NOT_AUTHORIZED' });
    if (err.message === 'MISSING_DATA')
        return res.status(400).json({ error: 'MISSING_DATA' });
    if (err instanceof MongoServerError && err.code === 11000)
        return res.status(422).json({ error: 'DUPLICATE_ENTITY', entities: Object.keys(err.keyPatter) });
    //Unknown Error
    console.error(err);
    return res.status(500).json({ error: 'SERVER_ERROR', err });
};
//# sourceMappingURL=middlewares.js.map