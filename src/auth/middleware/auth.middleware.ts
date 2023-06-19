import { HttpException, HttpStatus, NestMiddleware } from "@nestjs/common"
import { NextFunction, Response } from "express";
import { UserService } from "src/user/user.service";
import { AuthService } from "../auth.service";
import { User } from "@prisma/client";

export class AuthMiddleware implements NestMiddleware {
    constructor(private userService: UserService, private authService: AuthService){}

    async use(request: any, response: Response, next: NextFunction) {
        try {  
            const tokenArray: string[] = request.headers['authorization'].split(' ')
            const decodedToken = await this.authService.verifyJwt(tokenArray[1]);
            const user = await this.userService.byId(decodedToken.user.id);
            if(user) {
                request.user = user;
                next();
            } else {
              throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            }
          } catch {
              throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
          }
    }
}