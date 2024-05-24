import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: "farxse@mail.com", description: "Мыло пользователя"})
    readonly email: string;
    @ApiProperty({example: "qwe12345689propustilsemerku", description: "Пароль пользователя"})
    readonly password: string
}

export class CheckAuthDto {
    @ApiProperty({example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", description: "Токен авторизации"})
    readonly authorization: string;
}

export class JwtDto {
    readonly jwt: string
}

export interface HeadersReq {
    host: string;
    connection: string;
    'sec-ch-ua': string;
    accept: string;
    'sec-ch-ua-mobile': string;
    authorization: string;
    'user-agent': string;
    'sec-ch-ua-platform': string;
    origin: string;
    'sec-fetch-site': string;
    'sec-fetch-mode': string;
    'sec-fetch-dest': string;
    referer: string;
    'accept-encoding': string;
    'accept-language': string;
}

