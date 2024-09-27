import express from "express"
import cors from "cors"

import dotenv from "dotenv"
import userRouter from "./routers/userRouter.js";
import transactionRouter from "./routers/transactionsRouter.js";

dotenv.config();

const app = express();
app.use(express.json())
app.use(cors());

app.use(userRouter);
app.use(transactionRouter);

const porta = process.env.PORT || 5000
app.listen(porta,()=>{console.log(`Servidor rodando na porta: ${porta}`)});