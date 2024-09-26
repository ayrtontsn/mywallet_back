import joi from "joi"

export const signUpSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
})

export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

export const transactionsSchema = joi.object({
    value: joi.number().min(0).required(),
    description: joi.string().required(),
    type: joi.string().required()
})