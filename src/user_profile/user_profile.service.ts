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


    async changeProfile(id: number, dto: CreateUserProfile) {
        const profile = await this.userProfileRepository.findOne({where: {id}});

        if (!profile) {
            throw new Error("Не удалось найти профиль");
        }

        profile.sex = dto.sex;
        profile.age = dto.age;
        profile.hobbies = dto.hobbies;
        profile.about_yourself = dto.about_yourself;

        await profile.save();
        return profile;
    }

    async getProfile(id: number) {
        try {
            const profile = await this.userProfileRepository.findOne({where: {id}});
            return profile;
        } catch (e) {
            throw new Error("Не удалось найти профиль")
        }
    }
}
