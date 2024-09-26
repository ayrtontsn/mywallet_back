import bcrypt from "bcrypt"
import httpStatus from "http-status"
import jwt from "jsonwebtoken"

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

export async function signInUser(req,res) {
    const user = req.body
    try {
        const userSignIn = await db.collection("users").findOne({email: user.email})
        if (!userSignIn){
            return res.sendStatus(httpStatus.NOT_FOUND)
        }
        if(!bcrypt.compareSync(user.password,userSignIn.password)){
            return res.sendStatus(httpStatus.UNAUTHORIZED)
        }

        delete userSignIn.password

        const secretkey = process.env.JWT_SECRET;
        const configtoken = { expiresIn: 60*60*24 }; //1dia
        const token = jwt.sign(userSignIn,secretkey,configtoken);

        return res.status(200).send(token)

    } catch (error) {
        console.log(error.message)
        return res.status(500).send(error.message)
    }    
}