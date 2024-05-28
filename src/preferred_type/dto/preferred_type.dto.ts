import {ApiProperty} from "@nestjs/swagger";
import {Sex} from "../../user_profile/user_profile.model";
import {IAgePartner} from "../preferred_type.model";

export class CreateUserPreferred{
    @ApiProperty({example: 'Женский', description: 'Пол'})
    readonly sex: Sex;

    @ApiProperty({example: {
            min_age: 18,
            max_age: 46,
        }, description: 'Возраст партнера'})
    readonly age: IAgePartner;

    @ApiProperty({example: ["Спорт", "Музыка", "Что угодно, но не программирование"], description: 'Увлечения'})
    readonly hobbies : string [];

    @ApiProperty({example: "Хочется альтушку тихую", description: 'Что вы хотите от партнера'})
    readonly want_to_see_in_a_partner : string;
}
