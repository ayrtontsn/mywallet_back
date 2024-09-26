import bcrypt from "bcrypt"
import httpStatus from "http-status"
//import { jsonWebToken } from "jsonwebtoken"

import {db} from "../config/database.js"


export async function signUpUser(req,res) {
    const user = req.body
    try {
        const checkemail = await db.collection("users").findOne({email: user.email})
        if (checkemail){
            return res.sendStatus(httpStatus.CONFLICT)
        }
        await db.collection("users").insertOne(
            {
                ...user,
                password: bcrypt.hashSync(user.password, 10)
            })
        return res.sendStatus(201)
    } catch (error) {
        console.log(error.message)
        return res.status(500).send(error.message)
    }    
}