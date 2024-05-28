import {BelongsTo, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/user.model";
import {Sex} from "../user_profile/user_profile.model";

export interface IAgePartner {
    min_age: number,
    max_age: number,
}

interface PreferredCreationAttrs {
    sex: Sex;
    age: IAgePartner;
    hobbies: string [];
    want_to_see_in_a_partner: string;
}

@Table({tableName: 'user_preferred'})
export class Preferred extends Model<Preferred, PreferredCreationAttrs> {
    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Женский', description: 'Пол'})
    @Column({type: DataType.STRING, allowNull: true})
    sex: Sex;

    @ApiProperty({example: {
            min_age: 18,
            max_age: 46,
        }, description: 'Возраст партнера'})
    @Column({type: DataType.INTEGER, allowNull: true, validate: {min: 18}})
    age: IAgePartner;

    @ApiProperty({example: ["Спорт", "Музыка", "Что угодно, но не программирование"], description: 'Увлечения'})
    @Column({type: DataType.ARRAY(DataType.STRING), allowNull: true})
    hobbies : string [];

    @ApiProperty({example: "Хочется альтушку тихую", description: 'Что вы хотите от партнера'})
    @Column({type: DataType.STRING, allowNull: true})
    want_to_see_in_a_partner : string;

    @ApiProperty({type: () => User, description: 'Профиль пользователя'})
    @BelongsTo(() => User, "userPreferredId")
    user: User
}