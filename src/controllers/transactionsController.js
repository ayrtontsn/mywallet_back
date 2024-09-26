import httpStatus from "http-status"

import {db} from "../config/database.js"
import { ObjectId } from "mongodb";


export async function transactionPost(req,res) {
    const transaction = req.body;
    const user = res.locals.user;

    if(transaction.type!=="deposit" && transaction.type!=="withdraw"){
        return res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY)
    }
    try {
        await db.collection("transactions").insertOne(
            {
                ...transaction,
                id: user._id,
                email: user.email,
                name: user.name
            })
        return res.sendStatus(httpStatus.CREATED)
    } catch (error) {
        console.log(error.message)
        return res.status(500).send(error.message)
    }    
}

export async function transactionGet(req,res) {
    const user = res.locals.user;

    let page = req.query.page || 1;

    if(page>0){
        page = parseInt(page)
    }else{
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }
    
    const limit = 10; // limite que você quiser
    const start = (page - 1) * limit;

    try {
        const transactionsUser = await db.collection("transactions")
                                        .find({id: user._id})
                                        .sort({_id: -1})
                                        .skip(start)
                                        .limit(limit)
                                        .toArray()

        return res.send(transactionsUser)
    } catch (error) {
        console.log(error.message)
        return res.status(500).send(error.message)
    }    
}