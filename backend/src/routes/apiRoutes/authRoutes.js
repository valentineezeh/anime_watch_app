import express from 'express';
import AuthController from '../../controllers/authController';
import verifyUserInput from '../../middlewares/verifyInputs';

const authRouter = express.Router();

authRouter.post('/register', verifyUserInput.registerUserRequestBody, AuthController.SignUp);

authRouter.post('/login', verifyUserInput.registerUserRequestBody, AuthController.SignIn);

authRouter.post('/refresh-token', AuthController.GetNewToken);

export default authRouter;
