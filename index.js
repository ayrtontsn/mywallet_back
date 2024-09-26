import express from "express"
import cors from "cors"

import dotenv from "dotenv"
import signUpRouter from "./src/routers/userRouter.js";

dotenv.config();

const app = express();
app.use(express.json())
app.use(cors());

app.use(signUpRouter);

const porta = process.env.PORTA
app.listen(porta,()=>{console.log(`entrando com sucesso na porta: ${porta}`)});