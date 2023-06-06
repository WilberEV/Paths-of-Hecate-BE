import express from "express";
import {Request, Response, NextFunction} from 'express';
import {createChara} from "./controler.js"

const charaRouter = express.Router()

//Create character
charaRouter.post('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await createChara(req.body))
    } catch(e){
        next(e)
    }
});


export default charaRouter