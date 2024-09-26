import { Router } from "express";

import { transactionPost } from "../controllers/transactionsController.js";
import { validateToken } from "../middlewares/validTokenMiddleware.js";
import { transactionsSchema } from "../schemas/userSchemas.js";
import { schemaValidate } from "../middlewares/schemaMiddleware.js";

const transactionRouter = Router();

transactionRouter.post("/transactions",validateToken,schemaValidate(transactionsSchema),transactionPost)

export default transactionRouter
