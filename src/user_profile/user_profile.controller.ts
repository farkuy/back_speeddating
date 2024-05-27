import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {UserProfileService} from "./user_profile.service";
import {CreateUserProfile} from "./dto/create_user_profile.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {UserProfile} from "./user_profile.model";

@Controller('user-profile')
export class UserProfileController {
    constructor(private roleService: UserProfileService) {}

    @ApiOperation({summary: 'создать профиль пользователя'})
    @ApiResponse({status: 200, type: UserProfile})
    @Post()
    create(@Body() dto: CreateUserProfile) {
        return this.roleService.createProfile(dto);
    }

    @ApiOperation({summary: 'получить профиль пользователя'})
    @ApiResponse({status: 200, type: UserProfile})
    @Get('/:value')
    getProfile(@Param ('value') value: string) {
        return this.roleService.getProfile(value);
    }
}
