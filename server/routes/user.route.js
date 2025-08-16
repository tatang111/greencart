import express from 'express'
import { isAuth, login, logOut, register } from '../controllers/user.controller.js';
import authUser from '../middleware/authUser.js';

const userRouter = express.Router();

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/is-auth", authUser, isAuth)
userRouter.delete("/logout", authUser, logOut)

export default userRouter