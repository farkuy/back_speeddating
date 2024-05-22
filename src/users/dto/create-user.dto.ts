export class CreateUserDto {
    readonly email: string;
    readonly password: string
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

