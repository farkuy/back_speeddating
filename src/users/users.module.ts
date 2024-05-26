import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {UserProfile} from "../user_profile/user_profile.model";
import {UserProfileModule} from "../user_profile/user_profile.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      SequelizeModule.forFeature([User, Role, UserRoles, UserProfile]),
      RolesModule,
      forwardRef(() => AuthModule),
      forwardRef(() => UserProfileModule),
  ],
    exports: [
        UsersService,
    ]
})
export class UsersModule {}
