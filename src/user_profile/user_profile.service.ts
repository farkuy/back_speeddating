import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UserProfile} from "./user_profile.model";
import {CreateUserProfile} from "./dto/create_user_profile.dto";

@Injectable()
export class UserProfileService {
    constructor (@InjectModel(UserProfile) private userProfileRepository: typeof UserProfile){
    }

    async createProfile(dto: CreateUserProfile) {
        const profile = await this.userProfileRepository.create(dto);
        return profile;
    }

    async getProfile(value: string) {
        const profile = await this.userProfileRepository.findOne({where: {value}});
        return profile;
    }
}
