import { Request, Response } from "express";
import { SignupUser } from "../../core/usecase/signupUser";
import { LoginUser } from "../../core/usecase/loginUser";
import { GetMe } from "../../core/usecase/getMe";
import { env } from "../../config/env";

export class AuthController {
  constructor(private signupUserUC: SignupUser, private loginUserUC: LoginUser, private getMeUC: GetMe) {}

  signup = async (req: Request, res: Response) => {
    const { email, password } = req.body as { email: string; password: string; confirmPassword: string };
    const out = await this.signupUserUC.execute({ email, password });
    return res.status(201).json(out);
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body as { email: string; password: string };
    const out = await this.loginUserUC.execute({ email, password, jwtExpiresIn: env.JWT_EXPIRES_IN });
    return res.json(out);
  };

  me = async (req: Request & { userId?: number }, res: Response) => {
    const userId = req.userId!;
    const out = await this.getMeUC.execute(userId);
    return res.json(out);
  };
}
