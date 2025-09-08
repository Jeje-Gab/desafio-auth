import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { requireAuth } from "../middleware/requireAuth";
import { validateBody } from "../middleware/validate";
import { signupSchema, loginSchema } from "../validation/auth.schemas";

import { SignupUser } from "../../core/usecase/signupUser";
import { LoginUser } from "../../core/usecase/loginUser";
import { GetMe } from "../../core/usecase/getMe";
import { MySQLUserRepo } from "../../infra/db/MySQLUserRepo";
import { BcryptPasswordHasher } from "../../infra/security/BcryptPasswordHasher";
import { JwtTokenService } from "../../infra/security/JwtTokenService";

const router = Router();

// composition root (feature auth)
const usersRepo = new MySQLUserRepo();
const hasher = new BcryptPasswordHasher(10);
const tokens = new JwtTokenService();

const signupUser = new SignupUser(usersRepo, hasher);
const loginUser  = new LoginUser(usersRepo, hasher, tokens);
const getMe      = new GetMe(usersRepo);

const controller = new AuthController(signupUser, loginUser, getMe);

router.post("/signup", validateBody(signupSchema), controller.signup);
router.post("/login",  validateBody(loginSchema), controller.login);
router.get ("/me",     requireAuth(tokens),        controller.me);

export default router;
