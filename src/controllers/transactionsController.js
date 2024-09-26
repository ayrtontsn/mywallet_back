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
    console.log(user)

    try {
        const transactionsUser = await db.collection("transactions")
                                        .find({id: user._id})
                                        .toArray()
        console.log(transactionsUser)
        return res.send(transactionsUser.reverse())
    } catch (error) {
        console.log(error.message)
        return res.status(500).send(error.message)
    }    
}