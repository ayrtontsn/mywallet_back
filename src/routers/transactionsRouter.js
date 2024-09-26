import { Router } from "express";

import { 
    transactionDelete,
    transactionGet,
    transactionPost,
    transactionPut } from "../controllers/transactionsController.js";
import { validateToken } from "../middlewares/validTokenMiddleware.js";
import { transactionsSchema, updateTransationSchema } from "../schemas/userSchemas.js";
import { schemaValidate } from "../middlewares/schemaMiddleware.js";

const transactionRouter = Router();

transactionRouter.post("/transactions",validateToken,schemaValidate(transactionsSchema),transactionPost)
transactionRouter.get("/transactions",validateToken,transactionGet)
transactionRouter.put("/transactions/:id",validateToken,schemaValidate(updateTransationSchema),transactionPut)
transactionRouter.delete("/transactions/:id",validateToken,transactionDelete)

export default transactionRouter
