import jwt from "jsonwebtoken"
import { Result, failure, success } from "../util/Result";
import { invalidToken } from "@src/strings/strings";
import { injectable } from "inversify";
import { UserData } from "@src/domain/model/UserData";

@injectable()
export class UserTokenValidationUsecase {
    invoke(userToken?: string): Result<UserData> {
        const token = userToken && userToken.split(" ")[1];
        if (token === null) return failure(invalidToken, 401);
            try {
                const jwtPayload = jwt.verify(token!, process.env.ACCESS_TOKEN_SECRET!);
                const user = jwtPayload as UserData
                return success(user);
            } catch (error) {
                return failure(invalidToken, 401);
            }
    }
}