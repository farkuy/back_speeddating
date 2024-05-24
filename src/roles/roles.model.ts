import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {User} from "../users/user.model";
import {UserRoles} from "./user-roles.model";
import {ApiProperty} from "@nestjs/swagger";

interface RoleCreationAttrs {
    value: string;
    description: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'ADMIN', description: 'Значение роли'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @ApiProperty({example: 'Роль администратора', description: 'Описание роли'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @ApiProperty({type: [User], description: 'Список пользователей с этой ролью'})
    @BelongsToMany(() => User, () => UserRoles)
    roles: User[]
}