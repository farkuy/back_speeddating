import {forwardRef, Module} from '@nestjs/common';
import {PreferredTypeService} from './preferred_type.service';
import {PreferredTypeController} from './preferred_type.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/user.model";
import {UsersModule} from "../users/users.module";
import {UserProfileService} from "../user_profile/user_profile.service";
import {Preferred} from "./preferred_type.model";

@Module({
  providers: [PreferredTypeService],
  controllers: [PreferredTypeController],
  imports: [
    SequelizeModule.forFeature([Preferred, User]),
    forwardRef(() => UsersModule),
  ],
  exports: [
    PreferredTypeService
  ]
})
export class PreferredTypeModule {}
