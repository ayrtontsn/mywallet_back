import { Router } from "express";
import { signInUser, signUpUser } from "../controllers/userController.js";
import { signInSchema, signUpSchema } from "../schemas/userSchemas.js";
import { schemaValidate } from "../middlewares/schemaMiddleware.js";

const userRouter = Router();
userRouter.post("/sign-up",schemaValidate(signUpSchema),signUpUser)
userRouter.post("/sign-in",schemaValidate(signInSchema),signInUser)

export default userRouter