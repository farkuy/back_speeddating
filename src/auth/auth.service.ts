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
        if (!authorization) {
            throw new HttpException('Отсутствует токен в запросе', HttpStatus.UNAUTHORIZED);
        }
        const jwt = authorization.replace('Bearer', '');
        try {
            console.log(3333, jwt)
            const decode = this.jwtService.verify(jwt)
            return this.generateToken(decode);
        }
        catch (e) {
            console.log(333, e)
            throw new UnauthorizedException({message: 'Что-то пошло не так, перезайдите в профиль'})
        }
    }

    private async generateToken(user: User) {
        const payload = {
            email: user.email,
            id: user.id,
            roles: user.roles,
            user_profile_id: user.user_profile.id,
            user_preferred_id: user.user_preferred.id,
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
