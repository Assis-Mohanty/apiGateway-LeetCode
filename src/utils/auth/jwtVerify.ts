import jwt from "jsonwebtoken"
import { serverConfig } from "../../config"
export interface JwtPayload {
    userId: string;
    username: string;
    role: RoleEnum;
}
export enum RoleEnum{
    USER = "user",
    ADMIN = "admin"
}


export async function verifyJwt(jwtString:string):Promise<JwtPayload>{
    return new Promise((resolve,reject)=>{
        jwt.verify(jwtString,serverConfig.JWT_ACCESS_SECRET,(err:any,payload:any)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(payload as JwtPayload)
            }
        })
    })
}

