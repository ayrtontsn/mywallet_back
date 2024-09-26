import express from "express"
import cors from "cors"

import dotenv from "dotenv"
import userRouter from "./src/routers/userRouter.js";
import transactionRouter from "./src/routers/transactionsRouter.js";

dotenv.config();

const app = express();
app.use(express.json())
app.use(cors());

app.use(userRouter);
app.use(transactionRouter);

const porta = process.env.PORTA
app.listen(porta,()=>{console.log(`entrando com sucesso na porta: ${porta}`)});