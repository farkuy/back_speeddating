import {Column, DataType, ForeignKey, BelongsTo, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/user.model";


enum Sex {
    MALE  = "Мужской",
    FEMALE  = "Женский"
}

interface UserProfileCreationAttrs {
    sex: string;
    age: Sex;
    hobbies: string [];
    about_yourself: string;
}

@Table({tableName: 'user_profile'})
export class UserProfile extends Model<UserProfile, UserProfileCreationAttrs> {
    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Мужской', description: 'Пол'})
    @Column({type: DataType.STRING, allowNull: false})
    sex: Sex;

    @ApiProperty({example: 24, description: 'Возраст'})
    @Column({type: DataType.INTEGER, allowNull: false, validate: {min: 0}})
    age: number;

    @ApiProperty({example: ["Спорт", "Музыка", "Что угодно, но не программирование"], description: 'Увлечения'})
    @Column({type: DataType.ARRAY(DataType.STRING), allowNull: false})
    hobbies : string [];

    @ApiProperty({example: "Не нефор, не альтушка. Я - эталонный скуф", description: 'О себе'})
    @Column({type: DataType.STRING, allowNull: false})
    about_yourself : string;

    @ApiProperty({type: () => User, description: 'Профиль пользователя'})
    @BelongsTo(() => User, "userProfileId")
    user: User
}