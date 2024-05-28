import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {UserRoles} from "../roles/user-roles.model";
import {Role} from "../roles/roles.model";
import {ApiProperty} from "@nestjs/swagger";
import {UserProfile} from "../user_profile/user_profile.model";
import {Preferred} from "../preferred_type/preferred_type.model";

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: "1", description: "Уникальный индификатор"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @ApiProperty({example: "farxse@mail.com", description: "Мыло пользователя"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;
    @ApiProperty({example: "qwe12345689propustilsemerku", description: "Пароль пользователя"})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    @ApiProperty({example: false, description: "Забанен пользователь или нет"})
    banned: boolean;
    @ApiProperty({example: "За глупые вопросы тим лиду", description: "Причина бана"})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: boolean;
    @ApiProperty({example: ["ADMIN", "USER"], type: [Role], description: "Роли пользователя"})
    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @ApiProperty({type: UserProfile, description: "Инфомрация о пользователе"})
    @BelongsTo(() => UserProfile, "userProfileId")
    user_profile: UserProfile;

    @ApiProperty({type: Preferred, description: "Инфомрация о пользователе"})
    @BelongsTo(() => Preferred, "userPreferredId")
    user_preferred: Preferred;
}