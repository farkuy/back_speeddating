import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/user.model";
import {UserProfile} from "./user_profile.model";

@Table({tableName: 'user-user_profile', createdAt: false, updatedAt: false})
export class UserUserProfile extends Model<UserUserProfile> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => UserProfile)
    @Column({type: DataType.INTEGER})
    userProfile: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;
}