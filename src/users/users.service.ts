import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {UserProfileService} from "../user_profile/user_profile.service";

@Injectable()
export class UsersService {
    constructor (@InjectModel(User) private userRepository: typeof User,
                 private rolesService: RolesService,
                 private userProfileService: UserProfileService
    ){}
    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.rolesService.getRoleByValue("USER");
        const profile = await this.userProfileService.createProfile({
            sex: null,
            age: null,
            hobbies: null,
            about_yourself: null,
        })
        await user.$set('roles', [role.id])
        await user.$set('user_profile', [profile.id])
        user.roles = [role];
        user.user_profile = profile;
        return user;
    }

    async getAllUser() {
        const users = await this.userRepository.findAll( {
            include: {all: true}
        } );
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user;
    }
}
