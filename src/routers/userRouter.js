import { Router } from "express";
import { signUpUser } from "../controllers/userController.js";
import { signUpSchema } from "../schemas/userSchemas.js";
import { schemaValidate } from "../middlewares/schemaMiddleware.js";

const signUpRouter = Router();
signUpRouter.post("/signup",schemaValidate(signUpSchema),signUpUser)

export default signUpRouter