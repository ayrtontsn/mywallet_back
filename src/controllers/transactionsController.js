import httpStatus from "http-status"

import {db} from "../config/database.js"


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
                user    
            })
        return res.sendStatus(httpStatus.CREATED)
    } catch (error) {
        console.log(error.message)
        return res.status(500).send(error.message)
    }    
}