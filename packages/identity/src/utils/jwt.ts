import { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken"
import { env } from "@kanban/config"

export class JwtHandler {
    private constructor() { }
    public static signJWT(payload: JwtPayload) {
        const options: SignOptions = { expiresIn: "15m" }
        return jwt.sign(payload, env.JWT_SECRET, options)
    }
    public static checkJWT(token: string) {
        return jwt.verify(token, env.JWT_SECRET)
    }
}
