import {Injectable} from '@nestjs/common';
import {CreateRoleDto} from "./dto/create-user.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./roles.model";

@Injectable()
export class RolesService {

    constructor (@InjectModel(Role) private rileRepository: typeof Role){
    }
    async createRole(dto: CreateRoleDto) {
        const role = await this.rileRepository.create(dto);
        return role
    }

    async getRoleByValue(value: string) {
        const role = await this.rileRepository.findOne({where: {value}});
        return role
    }
}
