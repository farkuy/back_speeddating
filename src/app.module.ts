import {Module} from '@nestjs/common'
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/user.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { UserProfileModule } from './user_profile/user_profile.module';
import {UserProfile} from "./user_profile/user_profile.model";
import {UserUserProfile} from "./user_profile/user-user_profile.model";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number (process.env.POSTGRESS_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRESS_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, UserProfile, UserUserProfile],
            autoLoadModels: true,
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        UserProfileModule,
    ],
})
export class AppModule {

}