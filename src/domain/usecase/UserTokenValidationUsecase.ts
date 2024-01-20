import jwt from "jsonwebtoken"
import { Result, failure, success } from "../util/Result";
import { invalidToken } from "@src/strings/strings";
import { injectable } from "inversify";

@injectable()
export class UserTokenValidationUsecase {
    invoke(userToken?: string): Result<string> {
        const token = userToken && userToken.split(" ")[1];
        if (token === null) return failure(invalidToken, 401);
            try {
                const jwtPayload = jwt.verify(token!, process.env.ACCESS_TOKEN_SECRET!);
                const user = jwtPayload as {
                    username: string;
                    userType: string;
                }
                return success(user.username);
            } catch (error) {
                return failure(invalidToken, 401);
            }
    }
}