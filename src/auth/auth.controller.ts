import {Body, Controller, Get, Post, Req, Request} from '@nestjs/common';
import {CreateUserDto, HeadersReq} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post("/login")
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @Post("/registration")
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }

    @Get("/checkAuth")
    checkRegistration(@Req() req: Request & { headers: HeadersReq }) {
        return this.authService.checkAuth(req)
    }
}
