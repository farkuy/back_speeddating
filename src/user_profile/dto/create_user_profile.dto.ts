import {ApiProperty} from "@nestjs/swagger";
import {Sex} from "../user_profile.model";

export class CreateUserProfile {
    @ApiProperty({example: 'Мужской', description: 'Пол'})
    readonly sex: Sex;

    @ApiProperty({example: 24, description: 'Возраст'})
    readonly age: number;

    @ApiProperty({example: ["Спорт", "Музыка", "Что угодно, но не программирование"], description: 'Увлечения'})
    readonly hobbies : string [];

    @ApiProperty({example: "Не нефор, не альтушка. Я - эталонный скуф", description: 'О себе'})
    readonly about_yourself : string;
}
