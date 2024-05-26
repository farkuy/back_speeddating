import {Module} from '@nestjs/common';
import {UserProfileService} from './user_profile.service';
import {UserProfileController} from './user_profile.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {UserProfile} from "./user_profile.model";
import {User} from "../users/user.model";
import {UserUserProfile} from "./user-user_profile.model";

@Module({
  providers: [UserProfileService],
  controllers: [UserProfileController],
  imports: [
    SequelizeModule.forFeature([UserProfile, User, UserUserProfile])
  ],
})
export class UserProfileModule {}
