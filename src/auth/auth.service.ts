import {HttpException, HttpStatus, Injectable, Request, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto, HeadersReq} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs"
import {User} from "../users/user.model";

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
                private jwtService: JwtService) {
    }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const newUser = await this.userService.getUserByEmail(userDto.email);
        if (newUser) {
            throw new HttpException('Данный email занят', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword});
        return this.generateToken(user)
    }

    async checkAuth(req: Request & { headers: HeadersReq }) {
        const authorization = req.headers.authorization;
        console.log(222, req.headers)
        if (!authorization) {
            throw new HttpException('Отсутствует токен в запросе', HttpStatus.UNAUTHORIZED);
        }
        try {
            const bearer = authorization.split(' ')[0];
            const token = authorization.split(' ')[1];
            if (bearer !== "Bearer" || !token) {
                throw new UnauthorizedException({message: "Пользователь не авторизован"})
            }
            const user = this.jwtService.verify(token);
            return this.generateToken(user, user.user_profile_id, user.user_preferred_id);
        }
        catch (e) {
            console.log(333, e)
            throw new UnauthorizedException({message: 'Что-то пошло не так, перезайдите в профиль'})
        }
    }

    private async generateToken(user: User, user_profile_id?: number, user_preferred_id?: number) {
        const payload = {
            email: user.email,
            id: user.id,
            roles: user.roles,
            user_profile_id: user_profile_id || user.user_profile.id,
            user_preferred_id:  user_preferred_id || user.user_preferred.id,
        }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if (!user) {
            throw new UnauthorizedException({message: 'Неправильный логин или пароль'})
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({message: 'Неправильный логин или пароль'})
    }
}
