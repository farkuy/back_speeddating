import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Preferred} from "./preferred_type.model";
import {CreateUserPreferred} from "./dto/preferred_type.dto";

@Injectable()
export class PreferredTypeService {
    constructor (@InjectModel(Preferred) private userPreferredRepository: typeof Preferred){
    }

    async createPreferred(dto: CreateUserPreferred) {
        const preferred = await this.userPreferredRepository.create(dto);
        return preferred;
    }

    async changePreferred(id: number, dto: CreateUserPreferred) {
        const preferred = await this.userPreferredRepository.findOne({where: {id}});

        if (!preferred) {
            throw new Error("Не удалось найти предпочтения");
        }

        preferred.sex = dto.sex;
        preferred.age = dto.age;
        preferred.hobbies = dto.hobbies;
        preferred.want_to_see_in_a_partner = dto.want_to_see_in_a_partner;

        await preferred.save();
        return preferred;
    }

    async getPreferred(id: number) {
        try {
            const preferred = await this.userPreferredRepository.findOne({where: {id}});
            return preferred;
        } catch (e) {
            throw new Error("Не удалось найти предпочтения")
        }
    }
}

