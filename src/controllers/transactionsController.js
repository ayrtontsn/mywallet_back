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

    if(page<0 || !(page%2==0 || page%2==1)){
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }
    
    const limit = 10; // limite por página
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

export async function transactionPut(req,res) {
    const newValue = req.body;
    const { id } = req.params;
    const user = res.locals.user;

    try {
        const transaction = await db.collection("transactions").findOne({_id: new ObjectId(id)})

        if(!transaction){
            return res.sendStatus(httpStatus.NOT_FOUND);
        }

        if(transaction.id!==user._id){
            return res.sendStatus(httpStatus.UNAUTHORIZED)
        }

        await db.collection("transactions").updateOne(
            { _id: new ObjectId(id) },
            {   
                $set: newValue
            })
        return res.sendStatus(httpStatus.NO_CONTENT)
    } catch (error) {
        console.log(error.message)
        return res.status(500).send(error.message)
    }    
}

export async function transactionDelete(req,res) {
    const { id } = req.params;
    const user = res.locals.user;

    try {
        const transaction = await db.collection("transactions").findOne({_id: new ObjectId(id)})

        if(!transaction){
            return res.sendStatus(httpStatus.NOT_FOUND);
        }

        if(transaction.id!==user._id){
            return res.sendStatus(httpStatus.UNAUTHORIZED)
        }

        await db.collection("transactions").deleteOne(
            { _id: new ObjectId(id) })
            
        return res.sendStatus(httpStatus.NO_CONTENT)
    } catch (error) {
        console.log(error.message)
        return res.status(500).send(error.message)
    }    
}